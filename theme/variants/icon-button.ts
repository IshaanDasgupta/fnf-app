import {
  ThemedIconButtonSize,
  IconButtonSizeConfig,
  ThemedIconButtonVariant,
  IconButtonVariantConfig,
} from "@/types/ui/themed-icon-button";

export const iconButtonVariants: Record<
  ThemedIconButtonVariant,
  IconButtonVariantConfig
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

  inverse: {
    background: "background.inverse",
    foregroundColor: "foreground.inverse",
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

  accentPrimary: {
    background: "accent.primary",
    foregroundColor: "foreground.black",
    shadow: "md",
  },

  accentSecondary: {
    background: "accent.secondary",
    foregroundColor: "foreground.white",
    shadow: "md",
  },

  black: {
    background: "foreground.black",
    foregroundColor: "foreground.white",
    shadow: "md",
  },

  fav: {
    background: "background.tertiary",
    foregroundColor: "accent.red",
    shadow: "sm",
  },

  tab: {
    background: "background.primary",
    foregroundColor: "foreground.tertiary",
    shadow: "sm",
  },
};

export const iconButtonSizes: Record<
  ThemedIconButtonSize,
  IconButtonSizeConfig
> = {
  xs: { button: 28, icon: 14 },
  sm: { button: 36, icon: 16 },
  md: { button: 44, icon: 18 },
  lg: { button: 48, icon: 24 },
  xl: { button: 54, icon: 26 },
};
