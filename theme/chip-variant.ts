import { ChipVariantConfig, ThemedChipVariant } from "@/types/ui/themed-chip";

export const chipVariants: Record<ThemedChipVariant, ChipVariantConfig> = {
  primary: {
    background: "primary",
    pressedBackground: "primaryPressed",
    text: "text.inverse",
    shadow: "sm",
  },

  secondary: {
    background: "background.secondary",
    pressedBackground: "background.tertiary",
    selectedBackground: "primary",
    text: "text.primary",
    selectedText: "text.inverse",
    shadow: "sm",
  },

  tertiary: {
    background: "background.tertiary",
    pressedBackground: "background.elevated",
    selectedBackground: "primary",
    text: "text.secondary",
    selectedText: "text.inverse",
    shadow: "sm",
  },

  black: {
    background: "black",
    text: "white",
    shadow: "sm",
  },

  outline: {
    pressedBackground: "background.secondary",
    selectedBackground: "primary",
    border: "border.primary",
    selectedBorder: "primary",
    text: "text.primary",
    selectedText: "text.inverse",
    shadow: "sm",
  },

  ghost: {
    pressedBackground: "background.secondary",
    selectedBackground: "background.elevated",
    text: "primary",
    borderWidth: 0,
  },
};
