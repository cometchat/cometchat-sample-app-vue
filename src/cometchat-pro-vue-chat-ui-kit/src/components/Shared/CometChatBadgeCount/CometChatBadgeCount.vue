<template>
  <span v-if="count" :style="styles">{{ count }}</span>
</template>
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_NUMBER_PROP,
} from "../../../resources/constants";

import { badgeStyle } from "./style";

/**
 * Shows a badge count.
 *
 * @displayName CometChatBadgeCount
 */
export default {
  name: "CometChatBadgeCount",
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * The count value to display.
     */
    count: { ...DEFAULT_NUMBER_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return badgeStyle(this.theme);
    },
  },
};
</script>