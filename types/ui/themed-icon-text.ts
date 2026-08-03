import React from "react";
import { ViewProps } from "react-native";

import { ThemedTextVariant } from "@/types/ui/themed-text";
import { sizes } from "@/theme/size";
import { ThemedColorToken } from "@/types/theme-color";

export interface ThemedIconTextProps extends ViewProps {
  icon: React.ReactNode;
  label: string;

  iconColor?: ThemedColorToken;
  iconSize?: number;

  labelColor?: ThemedColorToken;
  variant?: ThemedTextVariant;

  gap?: keyof typeof sizes;
}
