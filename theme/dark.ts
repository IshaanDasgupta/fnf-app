import { ThemeColors } from "@/types/theme-color";

export const darkColors: ThemeColors = {
  // Brand
  primary: "#63B7F7",
  primaryPressed: "#4DA4E8",

  // Backgrounds
  background: {
    primary: "#121417",
    secondary: "#1A1D22",
    tertiary: "#20242B",
    elevated: "#262B33",
  },

  // Text
  text: {
    primary: "#F8F8F8",
    secondary: "#C4C8CF",
    tertiary: "#8A909A",
    inverse: "#161A23",
  },

  // Borders
  border: {
    primary: "#343A43",
    secondary: "#454C57",
  },

  // Status Colors
  status: {
    success: "#87C989",
    warning: "#FFD18B",
    error: "#F08C8C",
  },

  // Accent Surfaces (chips, badges, tags)
  accent: {
    blue: "#274865",
    green: "#234833",
    orange: "#624531",
    purple: "#343F69",
    yellow: "#625429",
    red: "#EF4444",
  },

  // Utility
  overlay: "rgba(0,0,0,0.45)",
  glass: "rgba(255,255,255,0.08)",
  mapBackground: "#2A2C30",

  // Base Colors
  black: "#FFFFFF",
  white: "#161A23",

  // Gradients
  gradients: {
    hero: ["#1A1D22", "#2A2D34"],
    primary: ["#63B7F7", "#3186D8"],
    surface: ["#1A1D22", "#24272D"],
  },
};
