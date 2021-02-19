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
      <comet-chat-read-receipt :theme="theme" :message="parsedMessage" />
    </div>
  </div>
</template>
<script>
import {
  COMETCHAT_CONSTANTS,
  DEFAULT_STRING_PROP,
  DEFAULT_OBJECT_PROP,
} from "../../../../resources/constants";

import {
  cometChatCommon,
  cometChatMessage,
  cometChatBubbles,
} from "../../../../mixins/";

import CometChatReadReceipt from "../../CometChatReadReceipt/CometChatReadReceipt";
import CometChatMessageActions from "../../CometChatMessageActions/CometChatMessageActions";
import CometChatMessageReactions from "../CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

/**
 * Message bubble for sent sticker messages.
 *
 * @displayName CometChatSenderStickerMessageBubble
 */
export default {
  name: "CometChatSenderStickerMessageBubble",
  mixins: [cometChatCommon, cometChatBubbles, cometChatMessage],
  components: {
    CometChatReadReceipt,
    CometChatMessageActions,
    CometChatMessageReactions,
    CometChatThreadedMessageReplyCount,
  },
  props: {
    /**
     * The selected chat item object.
     */
    item: { ...DEFAULT_OBJECT_PROP },
    /**
     * Type of chat item.
     */
    type: { ...DEFAULT_STRING_PROP },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * The message object.
     */
    message: { ...DEFAULT_OBJECT_PROP },
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
    /**
     * Id of parent for the message.
     */
    parentMessageId: { ...DEFAULT_STRING_PROP },
  },
  data() {
    return {
      messageFrom: "sender",
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
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
    /**
     * Parses the sticker data from message.
     */
    stickerData() {
      let data = null;

      if (this.hasProperty(this.parsedMessage, "data")) {
        data = this.parsedMessage.data.customData;
      }

      return data;
    }
    /**
     * Local string constants.
     */,
    STRINGS() {
      return COMETCHAT_CONSTANTS;
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