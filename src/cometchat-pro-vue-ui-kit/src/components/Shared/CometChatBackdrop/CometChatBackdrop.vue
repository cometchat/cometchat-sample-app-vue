<template>
  <div v-if="show" :style="styles" @click="emitEvent('click')"></div>
</template>
<script>
import { DEFAULT_BOOLEAN_PROP } from "../../../resources/constants";
import { cometChatCommon } from "../../../mixins";

import { backdropStyle } from "./style";

/**
 * Displays a backdrop, for modals.
 *
 * @displayName CometChatBackdrop
 */
export default {
  name: "CometChatBackdrop",
  mixins: [cometChatCommon],
  props: {
    /**
     * Shows the backdrop.
     */
    show: { ...DEFAULT_BOOLEAN_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        ...backdropStyle(),
      };
    },
  },
};
</script>