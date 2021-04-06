<template>
  <div :style="styles.container">
    <div
      ref="messageBubbleWrapperRef"
      :style="styles.messageActionWrapper"
      class="sender__file__message__action__wrapper"
    >
      <comet-chat-message-actions
        v-bind="commonProps"
        @action="actionHandler"
      />
      <div :style="styles.wrapper">
        <div :style="styles.fileWrapper">
          <a
            target="_blank"
            rel="noopener noreferrer"
            :style="styles.fileLink"
            class="sender__message__file__link"
            :href="message.data.attachments[0].url"
          >
            <span :style="styles.fileLinkContainer">
              <span>
                {{ message.data.attachments[0].name }}
              </span>
              <img
                :src="fileIcon"
                :alt="COMET_CHAT.MESSAGE_TYPE.FILE"
                class="sender__message__file__img"
              />
            </span>
          </a>
        </div>
      </div>
    </div>
    <comet-chat-message-reactions
      ref="reactionRef"
      v-bind="commonProps"
      :message-from="messageFrom"
      :logged-in-user="loggedInUser"
    />
    <div :style="styles.infoWrapper">
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
import { CometChat } from "@cometchat-pro/chat";

import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import { cometChatCommon, cometChatBubbles } from "../../../mixins/";

import CometChatReadReceipt from "../CometChatReadReceipt/CometChatReadReceipt";
import CometChatMessageActions from "../CometChatMessageActions/CometChatMessageActions";
import CometChatMessageReactions from "../Extensions/CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

import blueFile from "./resources/file-blue.svg";

/**
 * Message bubble for sent file messages.
 *
 * @displayName CometChatSenderFileMessageBubble
 */
export default {
  name: "CometChatSenderFileMessageBubble",
  mixins: [cometChatCommon, cometChatBubbles],
  components: {
    CometChatReadReceipt,
    CometChatMessageActions,
    CometChatMessageReactions,
    CometChatThreadedMessageReplyCount,
  },
  props: {
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
        wrapper: style.messageWrapperStyle(),
        container: style.messageContainerStyle(),
        infoWrapper: style.messageInfoWrapperStyle(),
        fileLink: style.messageFileLinkStyle(this.theme),
        fileWrapper: style.messageFileWrapperStyle(this.theme),
        fileLinkContainer: style.messageFileLinkContainerkStyle(),
        messageReactionsWrapper: style.messageReactionsWrapperStyle(),
        messageActionWrapper: style.messageActionWrapperStyle(
          this.parentMessageId
        ),
      };
    },
    /**
     * Icon computed from file images.
     */
    fileIcon() {
      return blueFile;
    },
    /**
     * Instance of "CometChat" to use in Vue html template.
     */
    COMET_CHAT() {
      return CometChat;
    },
  },
};
</script>
<style scoped>
.sender__message__file__link {
  background-color: var(--file-message-bg-color);
}
.sender__message__file__link:visited,
.sender__message__file__link:active,
.sender__message__file__link:hover {
  text-decoration: none;
  color: var(--file-message-color);
}
.sender__message__file__img {
  margin-left: 8px;
  border-radius: 4px;
  background-color: var(--file-message-bg-color);
}
</style>
<style>
.sender__file__message__action__wrapper:hover ul.message__actions {
  visibility: var(
    --sender-file-message-bubble-hover-display,
    visible
  ) !important;
}
</style>