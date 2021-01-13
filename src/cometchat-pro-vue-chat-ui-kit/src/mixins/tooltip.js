export default {
  methods: {
    toggleTooltip(event, flag) {
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
    },
  },
};
