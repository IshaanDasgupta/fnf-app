import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { API_BASE_URL, ENDPOINTS } from "@/constants/endpoints";
import { useAuthStore } from "@/stores/auth";

interface AuthResponse {
  user: any;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

let refreshPromise: Promise<AuthResponse> | null = null;

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
  );

  store.updateTokens(data.accessToken, data.refreshToken, data.expiresAt);

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
      if (isRefreshRequest) {
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

      useAuthStore.getState().logout();

      return Promise.reject(err);
    }
  },
);

export default axiosClient;
