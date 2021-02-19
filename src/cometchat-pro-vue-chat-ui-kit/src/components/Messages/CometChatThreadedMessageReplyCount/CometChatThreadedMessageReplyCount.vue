<template>
  <span
    :style="styles"
    v-if="canShowReply"
    class="cometchat__replycount"
    @click="emitAction('viewMessageThread', { message })"
  >
    {{ replyText }}
  </span>
</template>
<script>
import { DEFAULT_OBJECT_PROP } from "../../../resources/constants";

import { cometChatCommon, propertyCheck } from "../../../mixins/";

import { replyCountStyle } from "./style";

/**
 * Shows number of reply count for a given message.
 *
 * @displayName CometChatThreadedMessageReplyCount
 */
export default {
  name: "CometChatThreadedMessageReplyCount",
  mixins: [propertyCheck, cometChatCommon],
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * The message object.
     */
    message: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return replyCountStyle(this.theme);
    },
    /**
     * Computed reply text.
     */
    replyText() {
      const count = this.message.replyCount;
      return `${count || "0"} ${count === 1 ? "reply" : "replies"}`;
    },
    /**
     * Wether reply count can be shown.
     */
    canShowReply() {
      let replies = true;

      if (!this.hasProperty(this.message, "replyCount")) {
        replies = false;
      }

      return replies;
    },
  },
};
</script>
<style scoped>
.cometchat__replycount:hover {
  text-decoration: underline;
}
</style>