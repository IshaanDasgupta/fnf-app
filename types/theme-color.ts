export interface ThemeColors {
  primary: string;
  primaryPressed: string;

  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
  };

  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };

  border: {
    primary: string;
    secondary: string;
  };

  status: {
    success: string;
    warning: string;
    error: string;
  };

  accent: {
    blue: string;
    green: string;
    orange: string;
    purple: string;
    yellow: string;
    red: string;
  };

  gradients: {
    hero: [string, string];
    primary: [string, string];
    surface: [string, string];
  };

  overlay: string;
  glass: string;
  mapBackground: string;

  black: string;
  white: string;
}

// Root Colors
export type BrandColorToken = "primary" | "primaryPressed" | "black" | "white";

// Backgrounds
export type BackgroundColorToken =
  | "background.primary"
  | "background.secondary"
  | "background.tertiary"
  | "background.elevated"
  | "black"
  | "white"
  | "primary";

// Text
export type TextColorToken =
  | "text.primary"
  | "text.secondary"
  | "text.tertiary"
  | "text.inverse";

// Borders
export type BorderColorToken = "border.primary" | "border.secondary";

// Status
export type StatusColorToken =
  | "status.success"
  | "status.warning"
  | "status.error";

// Accent Surfaces
export type AccentColorToken =
  | "accent.blue"
  | "accent.green"
  | "accent.orange"
  | "accent.purple"
  | "accent.yellow"
  | "accent.red";

// Misc
export type UtilityColorToken = "overlay" | "glass" | "mapBackground";

// Gradients
export type GradientColorToken =
  | "gradients.hero"
  | "gradients.primary"
  | "gradients.surface";

export type SemanticThemeColorKey =
  | BrandColorToken
  | BackgroundColorToken
  | TextColorToken
  | BorderColorToken
  | StatusColorToken
  | AccentColorToken
  | UtilityColorToken
  | GradientColorToken;

// Colors that can be used for text/icons
export type ForegroundColorToken =
  | BrandColorToken
  | TextColorToken
  | StatusColorToken
  | AccentColorToken
  | BackgroundColorToken;

// Colors that can be used as surfaces
export type SurfaceColorToken =
  | BrandColorToken
  | BackgroundColorToken
  | AccentColorToken
  | StatusColorToken;

// Colors that can be used for borders
export type OutlineColorToken =
  | BorderColorToken
  | BrandColorToken
  | StatusColorToken;
