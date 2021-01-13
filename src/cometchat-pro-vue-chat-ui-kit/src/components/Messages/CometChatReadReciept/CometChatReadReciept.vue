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

export default {
  name: "CometChatReadReciept",
  mixins: [propertyCheck, cometChatBubbles],
  props: {
    theme: { ...DEFAULT_OBJECT_PROP },
    message: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    styles() {
      return msgTimestampStyle(this.theme);
    },
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