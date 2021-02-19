<template>
  <span :style="styles" />
</template>
<script>
import { DEFAULT_STRING_PROP } from "../../../resources/constants";

import { propertyCheck } from "../../../mixins/";

import { presenceStyle } from "./style";

/**
 * Displays user presence status.
 *
 * @displayName CometChatUserPresence
 */
export default {
  name: "CometChatUserPresence",
  mixins: [propertyCheck],
  props: {
    /**
     * Status of the user.
     * @values online, offline
     */
    status: { ...DEFAULT_STRING_PROP },
    /**
     * Border width of the component.
     */
    borderWidth: { ...DEFAULT_STRING_PROP, default: "1px" },
    /**
     * Border color of the component.
     */
    borderColor: { ...DEFAULT_STRING_PROP, default: "#aaa" },
    /**
     * Corner radius of the component.
     */
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "50%" },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        ...presenceStyle(this.status),
        borderStyle: "solid",
        borderColor: this.borderColor,
        borderWidth: this.borderWidth,
        borderRadius: this.cornerRadius,
      };
    },
  },
};
</script>
