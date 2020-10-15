export interface ConfigState {
  inputStyle: string[];
  editableStepper: boolean;
  horizontalStepper: boolean;
  projectsStyle: number;
  projectsPaginationStyle: string;
  searchStyle: string;
}

export default {
  state: {
    inputStyle: [],
    editableStepper: true,
    horizontalStepper: true,
    projectsStyle: 0,
    projectsPaginationStyle: "Infinite Scrolling",
    searchStyle: "Instant",
  } as ConfigState,

  getters: {
    isFilledInput: (state: ConfigState) => state.inputStyle.includes("Filled"),
    isSoloInput: (state: ConfigState) => state.inputStyle.includes("Solo"),
    isSoloInvertedInput: (state: ConfigState) =>
      state.inputStyle.includes("Solo Inverted"),
    isOutlinedInput: (state: ConfigState) =>
      state.inputStyle.includes("Outlined"),
    isShapedInput: (state: ConfigState) => state.inputStyle.includes("Shaped"),
    isRoundedInput: (state: ConfigState) =>
      state.inputStyle.includes("Rounded"),

    isEditableStepper: (state: ConfigState) => state.editableStepper,
    isHorizontalStepper: (state: ConfigState) => state.horizontalStepper,

    isProjectsList: (state: ConfigState) => state.projectsStyle === 0,
    isProjectsTable: (state: ConfigState) => state.projectsStyle === 1,

    isProjectsPaginationInfinite: (state: ConfigState) =>
      state.projectsPaginationStyle === "Infinite Scrolling",
    isProjectsPaginationButton: (state: ConfigState) =>
      state.projectsPaginationStyle === "Button",
    isProjectsPaginationPagination: (state: ConfigState) =>
      state.projectsPaginationStyle === "Pagination",

    isInstantSearch: (state: ConfigState) => state.searchStyle === "Instant",
    isAutocompleteSearch: (state: ConfigState) =>
      state.searchStyle === "Autocomplete",
  },

  mutations: {
    SET_INPUT_STYLE: (state: ConfigState, style: string[]) =>
      (state.inputStyle = style),
    SET_HORIZONTAL_STEPPER: (state: ConfigState, horizontalStepper: boolean) =>
      (state.horizontalStepper = horizontalStepper),
    SET_EDITABLE_STEPPER: (state: ConfigState, editableStepper: boolean) =>
      (state.editableStepper = editableStepper),
    SET_PROJECTS_STYLE: (state: ConfigState, style: number) =>
      (state.projectsStyle = style),
    SET_PROJECTS_PAGINATION_STYLE: (state: ConfigState, style: string) =>
      (state.projectsPaginationStyle = style),
    SET_SEARCH_STYLE: (state: ConfigState, style: string) =>
      (state.searchStyle = style),
  },
};
