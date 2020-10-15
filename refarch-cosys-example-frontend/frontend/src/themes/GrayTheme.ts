import { Theme } from "@/themes/Theme";

export const GrayTheme: Theme = {
  name: "Grau",
  light: {
    vuetifyTheme: {
      primary: "#363636",
      secondary: "#FFCC00",
      accent: "#FFCC00",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107",
    },
    useDarkTextForPrimaryColorAsBackground: false,
  },
  dark: {
    vuetifyTheme: {
      primary: "#606060",
      secondary: "#FFCC00",
      accent: "#ffe74a",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107",
    },
    useDarkTextForPrimaryColorAsBackground: false,
  },
};
