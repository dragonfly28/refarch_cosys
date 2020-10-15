import vuetify from "@/plugins/vuetify";
import { Theme } from "@/themes/Theme";
import { BlueTheme } from "@/themes/BlueTheme";
import { GrayTheme } from "@/themes/GrayTheme";
import { PetrolTheme } from "@/themes/PetrolTheme";
import { ITatMTheme } from "@/themes/ITatMTheme";

export interface ThemeState {
  theme: Theme;
  darkmode: boolean;
}

export default {
  state: {
    theme: BlueTheme,
    darkmode: false,
  } as ThemeState,

  getters: {
    getLightTheme: (state: ThemeState) => state.theme.light.vuetifyTheme,
    getDarkTheme: (state: ThemeState) => state.theme.dark.vuetifyTheme,
    getThemeName: (state: ThemeState) => state.theme.name,
    isDarkMode: (state: ThemeState) => state.darkmode,
    useDarkTextForPrimaryColorAsBackground: (state: ThemeState) => {
      if (state.darkmode)
        return state.theme.dark.useDarkTextForPrimaryColorAsBackground;
      else return state.theme.light.useDarkTextForPrimaryColorAsBackground;
    },
  },
  mutations: {
    SET_THEME(state: ThemeState, theme: Theme) {
      vuetify.framework.theme.themes.light = theme.light.vuetifyTheme;
      vuetify.framework.theme.themes.dark = theme.dark.vuetifyTheme;
      state.theme = theme;
    },
    SET_DARKMODE(state: any, darkmode: any) {
      vuetify.framework.theme.dark = darkmode;
      state.darkmode = darkmode;
    },
  },
  actions: {
    SET_DARKMODE(context: any, darkmode: boolean) {
      context.commit("SET_DARKMODE", darkmode);
    },

    SET_THEME(context: any, theme: string) {
      if (theme === "Blau") {
        context.commit("SET_THEME", BlueTheme);
      } else if (theme === "Grau") {
        context.commit("SET_THEME", GrayTheme);
      } else if (theme === "Petrol") {
        context.commit("SET_THEME", PetrolTheme);
      } else if (theme === "WIP_it@M") {
        context.commit("SET_THEME", ITatMTheme);
      }
    },
  },
};
