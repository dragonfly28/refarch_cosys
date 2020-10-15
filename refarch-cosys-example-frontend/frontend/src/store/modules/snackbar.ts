import { Levels } from "@/api/error";

const defaultTimeout: number = 5000;

export interface SnackbarState {
  message: string | undefined;
  level: Levels;
  show: boolean;
  timeout: number;
}

export default {
  namespaced: true,
  state: {
    message: undefined,
    level: Levels.INFO,
    show: false,
    timeout: defaultTimeout,
  } as SnackbarState,
  getters: {
    isErrorLevel: (state: SnackbarState) => state.level === "error",
  },
  mutations: {
    SET_MESSAGE(state: SnackbarState, message: string) {
      state.message = message;
    },
    SET_LEVEL(state: SnackbarState, level: Levels) {
      state.level = level;
    },
    SET_SHOW(state: SnackbarState, show: boolean) {
      state.show = show;
    },
    SET_TIMEOUT(state: SnackbarState, timeout: number) {
      state.timeout = timeout;
    },
  },
  actions: {
    showMessage(context: any, message: SnackbarState) {
      context.commit("SET_LEVEL", message.level ? message.level : Levels.INFO);
      context.commit("SET_MESSAGE", message.message);
      context.commit(
        "SET_TIMEOUT",
        message.level === Levels.ERROR ? 0 : defaultTimeout
      );
      context.commit("SET_SHOW", true);
    },
  },
};
