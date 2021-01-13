export default {
  methods: {
    hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    },
  },
};
