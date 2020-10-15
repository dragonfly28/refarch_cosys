export const baseURL = `${process.env.VUE_APP_API_URL}/api/vuedemo-backend-service`;

export const statusTypes = ["ENTWURF", "GEPLANT", "ABGESCHLOSSEN", "LAUFEND"];
export const referatTypes = [
  "BAU",
  "DIR",
  "KOM",
  "KULT",
  "KVR",
  "PLAN",
  "POR",
  "RAW",
  "RBS",
  "RGU",
  "RIT",
  "SKA",
  "SOZ",
];
export const membershipStateTypes = ["AKTIV", "EHEMALIG"];
export const techTypes = [
  "Spring",
  "Vue.js",
  "Polymer",
  "Oracle",
  "Elastic Search",
];
export const inputStyleTypes = [
  "Solo",
  "Solo Inverted",
  "Filled",
  "Outlined",
  "Rounded",
  "Shaped",
];
export const themeTypes = ["Blau", "Grau", "WIP_it@M", "Petrol"];
export const paginationStyleTypes = [
  "Infinite Scrolling",
  "Button",
  "Pagination",
];
export const searchStyleTypes = ["Instant", "Autocomplete"];

export const membershipRolesNames: {
  value: string;
  text: string;
}[] = [
  { value: "IT_ARCHITEKTUR", text: "IT-Architektur" },
  { value: "ENTWICKLUNG", text: "Entwicklung" },
  { value: "LEAD_ENTWICKLUNG", text: "Lead Entwicklung" },
  { value: "TRE", text: "TRE" },
  { value: "BRE", text: "BRE" },
  { value: "PROJEKTLEITUNG", text: "Projektleitung" },
  { value: "FACHBEREICH", text: "Fachbereich" },
  { value: "KOMPONENTENVERANTWORTUNG", text: "Komponentenverantwortung" },
];

export const membershipRolesNamesMap = {
  IT_ARCHITEKTUR: "IT-Architektur",
  ENTWICKLUNG: "Entwicklung",
  LEAD_ENTWICKLUNG: "Lead Entwicklung",
  TRE: "TRE",
  BRE: "BRE",
  PROJEKTLEITUNG: "Projektleitung",
  FACHBEREICH: "Fachbereich",
  KOMPONENTENVERANTWORTUNG: "Komponentenverantwortung",
};
