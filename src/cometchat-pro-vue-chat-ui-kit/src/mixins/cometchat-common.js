export default {
  computed: {
    canPlayAudio() {
      return true;
    },
  },
  methods: {
    emitAction(action, payload) {
      this.emitEvent("action", { action, ...payload });
    },
    emitEvent(name, payload) {
      if (this.$listeners && this.$listeners[name]) {
        this.$emit(name, payload);
      }
    },
    uid(i = 1) {
      return (
        `${i}` +
        Date.now().toString(36) +
        Math.random().toString(36).substring(2)
      );
    },
    setTheme(theme) {
      // JUST for fun
      const htmlEl = document.getElementsByTagName("html")[0];

      htmlEl.dataset.theme = theme;
    },
  },
};
