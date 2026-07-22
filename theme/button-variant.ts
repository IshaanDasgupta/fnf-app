import { ButtonVariantConfig } from "@/types/ui/themed-button";

export const buttonVariants: Record<string, ButtonVariantConfig> = {
  primary: {
    background: "primary",
    pressedBackground: "primaryPressed",
    text: "text.inverse",
    shadow: true,
  },

  secondary: {
    background: "background.secondary",
    pressedBackground: "background.tertiary",
    text: "text.primary",
  },

  outline: {
    background: "white",
    pressedBackground: "background.secondary",
    border: "border.primary",
    text: "text.primary",
  },

  ghost: {
    background: undefined,
    pressedBackground: "background.secondary",
    text: "primary",
    borderWidth: 0,
    compact: true,
  },
};
