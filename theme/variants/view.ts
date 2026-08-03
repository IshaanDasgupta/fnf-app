import { ThemedViewVariant, ViewVariantConfig } from "@/types/ui/themed-view";

export const viewVariants: Record<ThemedViewVariant, ViewVariantConfig> = {
  primary: {
    background: "background.primary",
  },

  secondary: {
    background: "background.secondary",
  },

  tertiary: {
    background: "background.tertiary",
  },

  inverse: {
    background: "background.inverse",
  },

  transparent: {},

  "accent-primary": {
    background: "accent.primary",
  },
};
