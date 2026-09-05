import React from "react";
import { BaseToast, type BaseToastProps } from "react-native-toast-message";

import { useTheme } from "@/src/hooks/theme/useTheme";
import { radius } from "@/src/theme/radius";

function AppSuccessToast(props: BaseToastProps) {
  const { colors } = useTheme();

  return (
    <BaseToast
      {...props}
      style={{
        backgroundColor: colors.background.inverse,
        borderLeftColor: colors.accent.green,
        borderRadius: radius.card,
      }}
      text1Style={{
        color: colors.foreground.inverse,
      }}
      text2Style={{
        color: colors.foreground.tertiary,
      }}
    />
  );
}

function AppInfoToast(props: BaseToastProps) {
  const { colors } = useTheme();

  return (
    <BaseToast
      {...props}
      style={{
        backgroundColor: colors.background.inverse,
        borderLeftColor: colors.accent.yellow,
        borderRadius: radius.card,
      }}
      text1Style={{
        color: colors.foreground.inverse,
      }}
      text2Style={{
        color: colors.foreground.tertiary,
      }}
    />
  );
}

function AppErrorToast(props: BaseToastProps) {
  const { colors } = useTheme();

  return (
    <BaseToast
      {...props}
      style={{
        backgroundColor: colors.background.inverse,
        borderLeftColor: colors.accent.red,
        borderRadius: radius.card,
      }}
      text1Style={{
        color: colors.foreground.inverse,
      }}
      text2Style={{
        color: colors.foreground.tertiary,
      }}
    />
  );
}

export function useToastConfig() {
  return {
    success: AppSuccessToast,
    info: AppInfoToast,
    error: AppErrorToast,
  };
}
