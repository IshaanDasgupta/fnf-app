// theme/icon-button-variant.ts

import {
  BackgroundColorToken,
  BorderColorToken,
  ForegroundColorToken,
} from "@/types/theme-color";
import {
  IconButtonVariantConfig,
  ThemedIconButtonVariant,
} from "@/types/ui/themed-icon-button";

export const iconButtonVariants: Record<
  ThemedIconButtonVariant,
  IconButtonVariantConfig
> = {
  primary: {
    background: "primary",
    pressedBackground: "primaryPressed",
    icon: "text.inverse",
    borderWidth: 0,
    shadow: "md",
  },

  secondary: {
    background: "background.secondary",
    pressedBackground: "background.tertiary",
    selectedBackground: "background.elevated",
    icon: "text.primary",
    selectedIcon: "primary",
    borderWidth: 0,
    shadow: "md",
  },

  black: {
    background: "black",
    icon: "white",
    borderWidth: 0,
    shadow: "md",
  },

  outline: {
    border: "border.primary",
    pressedBackground: "background.secondary",
    selectedBackground: "background.elevated",
    selectedBorder: "primary",
    icon: "primary",
    shadow: "md",
  },

  ghost: {
    pressedBackground: "background.secondary",
    selectedBackground: "background.elevated",
    icon: "primary",
    borderWidth: 0,
  },

  fav: {
    background: "white",
    // pressedBackground: "background.secondary",
    icon: "accent.red",
    borderWidth: 0,
    shadow: "md",
  },

  tab: {
    icon: "text.tertiary",
    borderWidth: 0,
  },
};
