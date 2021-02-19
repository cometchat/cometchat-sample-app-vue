<template>
  <div :style="styles.messageContainer">
    <div :style="styles.messageWrapper">
      <template v-if="messageFrom === 'sender'">
        <div :style="styles.messageTextWrapper">
          <p :style="styles.messageText">
            {{ STRINGS.SENDER_DELETED_MESSAGE }}
          </p>
        </div>
        <div :style="styles.messageInfoWrapper">
          <span :style="styles.messageTimeStamp">{{ messageTime }}</span>
        </div>
      </template>
      <template v-else-if="messageFrom === 'receiver'">
        <div :style="styles.messageThumbnail" v-if="isGroup">
          <comet-chat-avatar
            border-width="1px"
            corner-radius="50%"
            :image="message.sender.avatar"
            :border-color="theme.borderColor.primary"
          />
        </div>
        <div :style="styles.messageDetail">
          <div :style="styles.nameWrapper" v-if="isGroup">
            <span :style="styles.name">{{ message.sender.name }}</span>
          </div>
          <div :style="styles.messageTextWrapper">
            <p :style="styles.messageText">
              {{ STRINGS.RECEIVER_DELETED_MESSAGE }}
            </p>
          </div>
          <div :style="styles.messageInfoWrapper">
            <span :style="styles.messageTimeStamp">
              {{ messageTime }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import { cometChatBubbles } from "../../../mixins/";

import { CometChatAvatar } from "../../Shared";

import * as style from "./style";

/**
 * Message bubble for deleted messages.
 *
 * @displayName CometChatDeleteMessageBubble
 */
export default {
  name: "CometChatDeleteMessageBubble",
  mixins: [cometChatBubbles],
  components: {
    CometChatAvatar,
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
     *
     */
    message: { ...DEFAULT_OBJECT_PROP },
    messageFrom: { ...DEFAULT_STRING_PROP },
  },
  computed: {
    /**
     * Computed styles for the bubble.
     */
    styles() {
      return {
        messageTextWrapper: style.messageTextWrapperStyle(
          this.theme,
          this.messageFrom
        ),
        name: style.nameStyle(this.theme),
        messageText: style.messageTextStyle(this.theme),
        messageThumbnail: style.messageThumbnailStyle(),
        messageTimeStamp: style.messageTimeStampStyle(this.theme),
        messageWrapper: style.messageWrapperStyle(this.messageFrom),
        messageContainer: style.messageContainerStyle(this.messageFrom),
        nameWrapper: style.nameWrapperStyle(this.message, this.messageFrom),
        messageInfoWrapper: style.messageInfoWrapperStyle(this.messageFrom),
        messageDetail: style.messageDetailStyle(this.message, this.messageFrom),
      };
    },
  },
};
</script>