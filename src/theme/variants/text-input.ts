import {
  ThemedInputVariantConfig,
  ThemedTextInputVariant,
} from "@/src/types/ui/themed-text-input";

export const textInputVariants: Record<
  ThemedTextInputVariant,
  ThemedInputVariantConfig
> = {
  primary: {
    background: "background.primary",
    borderColor: "border.secondary",

    labelColor: "foreground.secondary",

    textColor: "foreground.primary",
    placeholderColor: "foreground.tertiary",

    iconColor: "foreground.secondary",

    focusedBorder: "border.primary",
  },

  secondary: {
    background: "background.secondary",
    // borderColor: "border.primary",

    labelColor: "foreground.secondary",

    textColor: "foreground.primary",
    placeholderColor: "foreground.tertiary",

    iconColor: "foreground.secondary",

    focusedBorder: "accent.primary",
  },

  tertiary: {
    background: "background.tertiary",

    labelColor: "foreground.secondary",

    textColor: "foreground.primary",
    placeholderColor: "foreground.tertiary",

    iconColor: "foreground.secondary",

    focusedBorder: "accent.primary",
  },

  inverse: {
    background: "background.inverse",

    labelColor: "foreground.inverse",

    textColor: "foreground.inverse",
    placeholderColor: "foreground.tertiary",

    iconColor: "foreground.inverse",
  },

  outline: {
    background: "background.primary",
    borderColor: "border.primary",

    labelColor: "foreground.secondary",

    textColor: "foreground.primary",
    placeholderColor: "foreground.tertiary",

    iconColor: "foreground.secondary",

    focusedBorder: "accent.primary",
  },

  ghost: {
    background: "transparent",

    labelColor: "foreground.secondary",

    textColor: "foreground.primary",
    placeholderColor: "foreground.tertiary",

    iconColor: "foreground.secondary",
  },
};
