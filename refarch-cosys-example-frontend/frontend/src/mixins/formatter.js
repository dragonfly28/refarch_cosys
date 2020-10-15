import moment from "moment";

export default {
  methods: {
    startingCharUpperCase(text) {
      return text
        ? text.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
        : "";
    },
    formatDate(date) {
      return date ? moment(date).format("L") : "";
    },
  },
};
