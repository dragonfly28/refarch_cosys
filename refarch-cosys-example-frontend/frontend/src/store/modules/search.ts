export interface SearchState {
  drawerVisible: boolean;
  technologies: string[];
  start: Date | null;
  end: Date | null;
  query: string;
}

export default {
  state: {
    drawerVisible: false,
    technologies: [],
    start: null,
    end: null,
    query: "",
  } as SearchState,

  getters: {
    isDrawerVisible: (state: SearchState) => state.drawerVisible,
    getTechnologies: (state: SearchState) => [...state.technologies],
    getStartDate: (state: SearchState) => state.start,
    getEndDate: (state: SearchState) => state.end,
    isFiltering: (state: SearchState) =>
      state.technologies.length > 0 || !!state.start || !!state.end,
    getQuery: (state: SearchState) => state.query,
  },

  mutations: {
    SET_DRAWER_VISIBLE: (state: SearchState, visible: boolean) =>
      (state.drawerVisible = visible),
    SET_TECHNOLOGIES: (state: SearchState, techs: string[]) =>
      (state.technologies = techs),
    SET_START_DATE: (state: SearchState, date: Date) => (state.start = date),
    SET_END_DATE: (state: SearchState, date: Date) => (state.end = date),
    SET_QUERY: (state: SearchState, query: string) => (state.query = query),
  },
};
