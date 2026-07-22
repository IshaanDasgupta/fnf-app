import {
  TextInputVariantConfig,
  ThemedTextInputVariant,
} from "@/types/ui/themed-text-input";

export const textInputVariants: Record<
  ThemedTextInputVariant,
  TextInputVariantConfig
> = {
  default: {
    background: "background.secondary",

    border: "border.primary",
    focusedBorder: "primary",
    errorBorder: "status.error",

    text: "text.primary",
    placeholder: "text.tertiary",

    label: "text.secondary",
    helper: "text.secondary",
    error: "status.error",

    shadow: true,

    inputTypography: "body",
  },

  filled: {
    background: "background.tertiary",

    border: "border.secondary",
    focusedBorder: "primary",
    errorBorder: "status.error",

    text: "text.primary",
    placeholder: "text.tertiary",

    label: "text.secondary",
    helper: "text.secondary",
    error: "status.error",

    inputTypography: "body",
  },

  outline: {
    background: "white",

    border: "border.primary",
    focusedBorder: "primary",
    errorBorder: "status.error",

    text: "text.primary",
    placeholder: "text.tertiary",

    label: "text.secondary",
    helper: "text.secondary",
    error: "status.error",

    inputTypography: "body",
    shadow: true,
  },

  ghost: {
    text: "text.primary",
    placeholder: "text.tertiary",

    label: "text.secondary",
    helper: "text.secondary",
    error: "status.error",

    borderWidth: 0,

    inputTypography: "body",
  },
};
