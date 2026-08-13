import "dotenv/config";
import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "fnf-app",
  slug: "fnf-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icons/logo.png",
  scheme: "friendlyfloors",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  ios: {
    bundleIdentifier: "com.aquiem.friendlyfloors",
    buildNumber: "1",
    supportsTablet: true,
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        "Friendly Floors uses your location to show listings near you.",
    },
  },

  android: {
    package: "com.aquiem.friendlyfloors",
    versionCode: 1,

    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/icons/logo.png",
      monochromeImage: "./assets/icons/logo.png",
    },

    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,

    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_ANDROID_API_KEY,
      },
    },
  },

  web: {
    output: "static",
    favicon: "./assets/icons/logo.png",
  },

  plugins: [
    "expo-router",
    "expo-location",
    [
      "expo-splash-screen",
      {
        image: "./assets/icons/logo.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    "expo-font",
  ],

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },

  extra: {
    router: {},
    eas: {
      projectId: "12b59665-979f-44b9-808b-dfe6dda36f0f",
    },
  },
};

export default config;
