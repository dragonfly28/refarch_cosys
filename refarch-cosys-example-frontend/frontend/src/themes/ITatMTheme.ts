import { Theme } from "@/themes/Theme";

export const ITatMTheme: Theme = {
  name: "WIP_it@M",
  light: {
    vuetifyTheme: {
      primary: "#FFCC00",
      secondary: "#ffd600",
      accent: "#424242",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107",
    },
    useDarkTextForPrimaryColorAsBackground: true,
  },
  dark: {
    vuetifyTheme: {
      primary: "#ffc107",
      secondary: "#ffea00",
      accent: "#9e9e9e",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107",
    },
    useDarkTextForPrimaryColorAsBackground: true,
  },
};
