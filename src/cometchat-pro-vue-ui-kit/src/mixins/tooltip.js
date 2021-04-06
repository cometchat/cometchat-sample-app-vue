export default {
  methods: {
    /**
     * Toggle tooltip utility
     * @param {*} event
     * @param {*} flag
     */
    toggleTooltip(event, flag) {
      try {
        const elem = event.target;

        const scrollWidth = elem.scrollWidth;
        const clientWidth = elem.clientWidth;

        if (scrollWidth <= clientWidth) {
          return false;
        }

        if (flag) {
          elem.setAttribute("title", elem.textContent);
        } else {
          elem.removeAttribute("title");
        }
      } catch (error) {
        console.log("Tooltip toggle failed with exception:", error);
      }
    },
  },
};
