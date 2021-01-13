import { getExtensionsDataFromMessage } from "../util/common";

export default {
  computed: {
    pollData() {
      return getExtensionsDataFromMessage(this.message, "polls");
    },
    pollId() {
      return this.pollData ? this.pollData.id : null;
    },
    total() {
      return this.pollData ? this.pollData.results.total : null;
    },
    totalText() {
      return this.total === null
        ? ""
        : `${this.total} vote${this.total === 1 ? "" : "s"}`;
    },
    pollOptions() {
      return this.pollData ? this.pollData.results.options : null;
    },
  },
};
