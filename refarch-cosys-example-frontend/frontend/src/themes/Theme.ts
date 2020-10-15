import { VuetifyThemeVariant } from "vuetify/types/services/theme";

export interface VueDemoVuetifyThemeVariant {
  vuetifyTheme: VuetifyThemeVariant;
  useDarkTextForPrimaryColorAsBackground: boolean;
}

export interface Theme {
  name: string;
  light: VueDemoVuetifyThemeVariant;
  dark: VueDemoVuetifyThemeVariant;
}
