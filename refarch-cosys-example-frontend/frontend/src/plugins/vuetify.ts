import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

const theme = {
  themes: {
    /* light: {
      primary: "#1976D2",
      secondary: "#424242",
      accent: "#82B1FF",
      error: "#FF5252",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FFC107",
    },*/
    /*    dark: {
      primary: '#004d40',
      secondary: '#f9a825',
      accent: '#7BA4D9',
      error: '#FF5252',
      success: '#4CAF50',
      warning: '#FFC107',
      info: '#2196F3',
    }*/
  },
};

export default new Vuetify({
  theme: theme,
});
