import moment from "moment";

export default {
  methods: {
    startingCharUpperCase(text: string) {
      return text
        ? text.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
        : "";
    },
    formatDate(date: Date) {
      return date ? moment(date).format("L") : "";
    },
  },
};
