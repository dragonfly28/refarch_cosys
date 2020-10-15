import { Theme } from "@/themes/Theme";

export const BlueTheme: Theme = {
  name: "Blau",
  light: {
    vuetifyTheme: {
      primary: "#1565c0",
      secondary: "#2962ff",
      accent: "#424242",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107",
    },
    useDarkTextForPrimaryColorAsBackground: false,
  },
  dark: {
    vuetifyTheme: {
      primary: "#2196f3",
      secondary: "#2979ff",
      accent: "#9e9e9e",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107",
    },
    useDarkTextForPrimaryColorAsBackground: true,
  },
};
