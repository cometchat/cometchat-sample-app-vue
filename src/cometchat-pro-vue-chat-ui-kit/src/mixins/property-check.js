export default {
  methods: {
    /**
     * Checks for a property inside a given object
     * @param {*} obj
     * @param {*} prop
     */
    hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    },
  },
};
