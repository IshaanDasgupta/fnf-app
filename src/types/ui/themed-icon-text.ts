import React from "react";
import { ViewProps } from "react-native";

import { sizes } from "@/src/theme/size";
import { ThemedColorToken } from "@/src/types/theme-color";
import { ThemedTextVariant } from "@/src/types/ui/themed-text";

export interface ThemedIconTextProps extends ViewProps {
  icon: React.ReactNode;
  label: string;

  iconColor?: ThemedColorToken;
  iconSize?: number;

  labelColor?: ThemedColorToken;
  variant?: ThemedTextVariant;

  gap?: keyof typeof sizes;
}
