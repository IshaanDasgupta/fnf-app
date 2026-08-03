import {
  ThemedButtonVariant,
  ThemedButtonVariantConfig,
} from "@/types/ui/themed-button";

export const buttonVariants: Record<
  ThemedButtonVariant,
  ThemedButtonVariantConfig
> = {
  primary: {
    background: "background.primary",
    foregroundColor: "foreground.primary",
    shadow: "sm",
  },

  secondary: {
    background: "background.secondary",
    foregroundColor: "foreground.primary",
    shadow: "sm",
  },

  tertiary: {
    background: "background.tertiary",
    foregroundColor: "foreground.primary",
    shadow: "sm",
  },

  outline: {
    background: "background.primary",
    borderColor: "border.primary",
    foregroundColor: "foreground.primary",
    shadow: "sm",
  },

  ghost: {
    background: "background.primary",
    foregroundColor: "foreground.link",
    shadow: "sm",
  },

  "accent-primary": {
    background: "accent.primary",
    foregroundColor: "foreground.white",
    shadow: "sm",
  },

  "accent-secondary": {
    background: "accent.secondary",
    foregroundColor: "foreground.white",
    shadow: "md",
  },
};
