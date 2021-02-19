<template>
  <span :style="styles">
    {{ messageTime }}
    <img v-if="ticks" :src="ticks" alt="time" class="message__timestamp__img" />
  </span>
</template>
<script>
import { DEFAULT_OBJECT_PROP } from "../../../resources/constants";

import { propertyCheck, cometChatBubbles } from "../../../mixins/";

import blueDoubleTick from "./resources/blue-double-tick-icon.png";
import greyDoubleTick from "./resources/grey-double-tick-icon.png";
import greyTick from "./resources/grey-tick-icon.png";

import { msgTimestampStyle } from "./style";

/**
 * Shows the read receipt for a given message.
 *
 * @displayName CometChatReadReceipt
 */
export default {
  name: "CometChatReadReceipt",
  mixins: [propertyCheck, cometChatBubbles],
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * The message object/
     */
    message: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return msgTimestampStyle(this.theme);
    },
    /**
     * computes the tick image.
     */
    ticks() {
      let ticks = null;

      if (this.message.messageFrom === "sender") {
        ticks = blueDoubleTick;

        if (
          this.message.sentAt &&
          !this.message.readAt &&
          !this.message.deliveredAt
        ) {
          ticks = greyTick;
        } else if (
          this.message.sentAt &&
          !this.message.readAt &&
          this.message.deliveredAt
        ) {
          ticks = greyDoubleTick;
        }
      }

      return ticks;
    },
  },
};
</script>
<style scoped>
.message__timestamp__img {
  margin-left: 3px;
  display: inline-block;
  vertical-align: bottom;
}
</style>