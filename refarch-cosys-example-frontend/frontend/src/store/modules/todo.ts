import { Project } from "@/types/Project";
import store from "@/store/index";
import projectservice from "@/api/projectservice";
import moment from "moment";

interface TodoState {
  isLoading: boolean;
  todoProjects: Project[];
}

export default {
  state: {
    isLoading: false,
    todoProjects: [],
  } as TodoState,
  getters: {
    isTodosOverdue(state: TodoState): boolean {
      let overDueProjects = state.todoProjects.filter(
        (project) => moment().diff(project.dueDate, "days") >= 0
      );
      return overDueProjects.length > 0;
    },
    overdueTodos(state: TodoState): Project[] {
      return state.todoProjects;
    },
    isTodosLoading(state: TodoState): boolean {
      return state.isLoading;
    },
  },
  mutations: {
    TODO_UPDATE(state: TodoState, todoProjects: Project[]) {
      state.todoProjects = todoProjects;
    },
    SET_LOADING(state: TodoState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    updateTodos(context: any) {
      if (context.state.isLoading) return;
      context.commit("SET_LOADING", true);
      projectservice
        .getTodos()
        .then((value) => {
          context.commit("TODO_UPDATE", value);
          context.commit("SET_LOADING", false);
        })
        .catch((reason) => {
          store.dispatch("snackbar/showMessage", reason);
          context.commit("SET_LOADING", false);
        });
    },
  },
};
