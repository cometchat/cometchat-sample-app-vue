<template>
  <span
    v-if="canShowReply"
    :style="countStyle"
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

export default {
  name: "CometChatThreadedMessageReplyCount",
  mixins: [propertyCheck, cometChatCommon],
  props: {
    theme: { ...DEFAULT_OBJECT_PROP },
    message: { ...DEFAULT_OBJECT_PROP },
    widgetconfig: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    countStyle() {
      return replyCountStyle(this.theme);
    },
    replyText() {
      const count = this.message.replyCount;
      return `${count || "0"} ${count === 1 ? "reply" : "replies"}`;
    },
    canShowReply() {
      let replies = true;

      if (!this.hasProperty(this.message, "replyCount")) {
        replies = false;
      }

      if (
        this.widgetconfig &&
        this.hasProperty(this.widgetconfig, "threaded-chats") &&
        this.widgetconfig["threaded-chats"] === false
      ) {
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