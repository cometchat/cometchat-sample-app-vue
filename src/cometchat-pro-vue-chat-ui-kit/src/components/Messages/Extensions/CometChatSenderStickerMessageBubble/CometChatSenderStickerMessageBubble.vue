<template>
  <div :style="styles.messageContainer">
    <div
      ref="messageBubbleWrapperRef"
      :style="styles.messageActionWrapper"
      class="sender__sticker__message__action__wrapper"
    >
      <comet-chat-message-actions
        v-bind="commonProps"
        @action="actionHandler"
      />
      <div :style="styles.messageWrapper">
        <div :style="styles.messageImgWrapper">
          <img
            v-if="stickerData"
            :src="stickerData.sticker_url"
            :alt="stickerData.sticker_name || STRINGS.STICKER"
            @load="positionTooltip"
          />
        </div>
      </div>
    </div>
    <comet-chat-message-reactions
      ref="reactionRef"
      v-bind="commonProps"
      :message-from="messageFrom"
      :logged-in-user="loggedInUser"
    />
    <div :style="styles.messageInfoWrapper">
      <comet-chat-threaded-message-reply-count
        v-bind="commonProps"
        v-if="!parentMessageId"
        @action="actionHandler"
      />
      <comet-chat-read-reciept :theme="theme" :message="parsedMessage" />
    </div>
  </div>
</template>
<script>
import {
  STRING_MESSAGES,
  DEFAULT_STRING_PROP,
  DEFAULT_OBJECT_PROP,
} from "../../../../resources/constants";

import {
  cometChatCommon,
  cometChatMessage,
  cometChatBubbles,
} from "../../../../mixins/";

import CometChatReadReciept from "../../CometChatReadReciept/CometChatReadReciept";
import CometChatMessageActions from "../../CometChatMessageActions/CometChatMessageActions";
import CometChatMessageReactions from "../CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

export default {
  name: "CometChatSenderStickerMessageBubble",
  mixins: [cometChatCommon, cometChatBubbles, cometChatMessage],
  components: {
    CometChatReadReciept,
    CometChatMessageActions,
    CometChatMessageReactions,
    CometChatThreadedMessageReplyCount,
  },
  props: {
    item: { ...DEFAULT_OBJECT_PROP },
    type: { ...DEFAULT_STRING_PROP },
    theme: { ...DEFAULT_OBJECT_PROP },
    message: { ...DEFAULT_OBJECT_PROP },
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
    widgetconfig: { ...DEFAULT_OBJECT_PROP },
    parentMessageId: { ...DEFAULT_STRING_PROP },
  },
  data() {
    return {
      messageFrom: "sender",
    };
  },
  computed: {
    styles() {
      return {
        messageWrapper: style.messageWrapperStyle(),
        messageContainer: style.messageContainerStyle(),
        messageImgWrapper: style.messageImgWrapperStyle(),
        messageInfoWrapper: style.messageInfoWrapperStyle(),
        messageReactionsWrapper: style.messageReactionsWrapperStyle(),
        messageActionWrapper: style.messageActionWrapperStyle(
          this.parentMessageId
        ),
      };
    },
    stickerData() {
      let data = null;

      if (this.hasProperty(this.parsedMessage, "data")) {
        data = this.parsedMessage.data.customData;
      }

      return data;
    },
    STRINGS() {
      return STRING_MESSAGES;
    },
  },
};
</script>
<style>
.sender__sticker__message__action__wrapper:hover ul.message__actions {
  visibility: var(
    --sender-sticker-message-bubble-hover-display,
    visible
  ) !important;
}
</style>