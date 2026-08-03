export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };

  foreground: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    link: string;
    white: string;
    black: string;
  };

  border: {
    primary: string;
    secondary: string;
  };

  accent: {
    primary: string;
    secondary: string;

    blue: string;
    green: string;
    orange: string;
    purple: string;
    yellow: string;
    red: string;
  };

  transparent: string;
}

export type ThemedColorToken =
  | "background.primary"
  | "background.secondary"
  | "background.tertiary"
  | "background.inverse"
  | "foreground.primary"
  | "foreground.secondary"
  | "foreground.tertiary"
  | "foreground.inverse"
  | "foreground.link"
  | "foreground.white"
  | "foreground.black"
  | "border.primary"
  | "border.secondary"
  | "accent.primary"
  | "accent.secondary"
  | "accent.blue"
  | "accent.green"
  | "accent.orange"
  | "accent.purple"
  | "accent.yellow"
  | "accent.red"
  | "transparent";
