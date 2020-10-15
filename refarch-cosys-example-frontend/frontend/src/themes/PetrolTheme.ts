import { Theme } from "@/themes/Theme";

export const PetrolTheme: Theme = {
  name: "Petrol",
  light: {
    vuetifyTheme: {
      primary: "#00695c",
      secondary: "#ffd600",
      accent: "#f9a825",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107",
    },
    useDarkTextForPrimaryColorAsBackground: false,
  },
  dark: {
    vuetifyTheme: {
      primary: "#009688",
      secondary: "#ffea00",
      accent: "#ffc107",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107",
    },
    useDarkTextForPrimaryColorAsBackground: false,
  },
};
