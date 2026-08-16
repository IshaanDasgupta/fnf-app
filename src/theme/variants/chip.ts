import {
  ChipVariantConfig,
  ThemedChipVariant,
} from "@/src/types/ui/themed-chip";

export const chipVariants: Record<ThemedChipVariant, ChipVariantConfig> = {
  primary: {
    background: "background.primary",
    foregroundColor: "foreground.primary",
    shadow: "xs",
  },

  secondary: {
    background: "background.secondary",
    foregroundColor: "foreground.primary",
    shadow: "xs",
  },

  tertiary: {
    background: "background.tertiary",
    foregroundColor: "foreground.primary",
    shadow: "xs",
  },

  inverse: {
    background: "background.inverse",
    foregroundColor: "foreground.inverse",
    shadow: "xs",
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
  },

  "accent-primary": {
    background: "accent.primary",
    foregroundColor: "foreground.black",
    shadow: "xs",
  },

  "accent-secondary": {
    background: "accent.secondary",
    foregroundColor: "foreground.white",
    shadow: "xs",
  },

  black: {
    background: "foreground.black",
    foregroundColor: "foreground.white",
    shadow: "xs",
  },

  "selected-primary": {
    background: "background.primary",
    foregroundColor: "foreground.primary",
    shadow: "md",
  },

  "selected-secondary": {
    background: "background.secondary",
    foregroundColor: "foreground.primary",
    shadow: "md",
  },

  "selected-tertiary": {
    background: "background.tertiary",
    foregroundColor: "foreground.secondary",
    shadow: "md",
  },

  "selected-outline": {
    background: "background.primary",
    borderColor: "accent.primary",
    foregroundColor: "accent.primary",
    shadow: "lg",
  },

  "selected-ghost": {
    background: "background.secondary",
    foregroundColor: "foreground.link",
  },

  "selected-accent-primary": {
    background: "accent.primary",
    foregroundColor: "foreground.black",
    shadow: "md",
  },

  "selected-accent-secondary": {
    background: "accent.secondary",
    foregroundColor: "foreground.white",
    shadow: "md",
  },

  "selected-black": {
    background: "foreground.black",
    foregroundColor: "foreground.white",
    shadow: "md",
  },

  "listing-chip": {
    background: "background.inverse",
    foregroundColor: "foreground.inverse",
    shadow: "xs",
  },
};
