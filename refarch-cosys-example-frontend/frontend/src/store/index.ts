import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import config from "./modules/config";
import user from "./modules/user";
import snackbar from "./modules/snackbar";
import theme from "./modules/theme";
import todo from "./modules/todo";
import search from "@/store/modules/search";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["theme"],
    }),
  ],
  modules: {
    user,
    snackbar,
    theme,
    config,
    todo,
    search,
  },
  strict: debug,
});
