import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { API_BASE_URL, ENDPOINTS } from "@/src/constants/endpoints";
import { useAuthStore } from "@/src/stores/auth";

interface AuthResponse {
  user: any;
  accessToken: string;
  refreshToken: string;
  refreshExpiresAt: number;
}

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

let refreshPromise: Promise<AuthResponse> | null = null;

function isDeadRefreshToken(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 401;
}

async function refreshTokens(): Promise<AuthResponse> {
  const store = useAuthStore.getState();

  if (!store.refreshToken) {
    throw new Error("No refresh token");
  }

  const { data } = await axios.post<AuthResponse>(
    `${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`,
    {
      refreshToken: store.refreshToken,
    },
    { timeout: 5000 },
  );

  store.updateTokens(
    data.accessToken,
    data.refreshToken,
    data.refreshExpiresAt,
  );

  return data;
}

axiosClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isRefreshRequest = originalRequest.url?.includes(
      ENDPOINTS.AUTH.REFRESH,
    );

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isRefreshRequest
    ) {
      if (isRefreshRequest && isDeadRefreshToken(error)) {
        useAuthStore.getState().logout();
      }

      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshTokens();
      }

      const tokens = await refreshPromise;

      refreshPromise = null;

      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

      return axiosClient(originalRequest);
    } catch (err) {
      refreshPromise = null;

      if (isDeadRefreshToken(err)) {
        useAuthStore.getState().logout();
      }

      return Promise.reject(err);
    }
  },
);

export default axiosClient;
