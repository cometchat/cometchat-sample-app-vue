<template>
  <div :style="styles.container">
    <div :style="styles.wrapper">
      <div :style="styles.thumbnail" v-if="isGroup">
        <comet-chat-avatar
          border-width="1px"
          corner-radius="50%"
          :image="parsedMessage.sender.avatar"
          :border-color="theme.borderColor.primary"
        />
      </div>
      <div :style="styles.detail">
        <div :style="styles.nameWrapper" v-if="isGroup">
          <span :style="styles.name">{{ parsedMessage.sender.name }} </span>
        </div>
        <div
          ref="messageBubbleWrapperRef"
          :style="styles.messageActionWrapper"
          class="receiver__file__message__action__wrapper"
        >
          <comet-chat-message-actions
            :is-group="isGroup"
            v-bind="commonProps"
            @action="actionHandler"
          />
          <div :style="styles.fileContainer">
            <div :style="styles.fileWrapper">
              <a
                target="_blank"
                rel="noopener noreferrer"
                :style="styles.fileLink"
                class="receiver__message__file__link"
                :href="parsedMessage.data.attachments[0].url"
                ><span :style="styles.fileLinkContainer">
                  <span>
                    {{ parsedMessage.data.attachments[0].name }}
                  </span>
                  <img
                    :src="fileIcon"
                    :alt="COMET_CHAT.MESSAGE_TYPE.FILE"
                    class="receiver__message__file__img"
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
          <comet-chat-read-receipt :theme="theme" :message="parsedMessage" />
          <comet-chat-threaded-message-reply-count
            v-bind="commonProps"
            v-if="!parentMessageId"
            @action="actionHandler"
          />
        </div>
      </div>
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

import { CometChatAvatar } from "../../Shared";
import CometChatReadReceipt from "../CometChatReadReceipt/CometChatReadReceipt";
import CometChatMessageActions from "../CometChatMessageActions/CometChatMessageActions";
import CometChatMessageReactions from "../Extensions/CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

import blueFile from "./resources/file-blue.svg";

/**
 * Message bubble for received file messages.
 *
 * @displayName CometChatReceiverFileMessageBubble
 */
export default {
  name: "CometChatReceiverFileMessageBubble",
  mixins: [cometChatCommon, cometChatBubbles],
  components: {
    CometChatAvatar,
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
      messageFrom: "receiver",
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        name: style.nameStyle(this.theme),
        detail: style.messageDetailStyle(),
        wrapper: style.messageWrapperStyle(),
        thumbnail: style.messageThumbnailStyle(),
        container: style.messageContainerStyle(),
        infoWrapper: style.messageInfoWrapperStyle(),
        fileLink: style.messageFileLinkStyle(this.theme),
        fileContainer: style.messageFileContainerStyle(),
        nameWrapper: style.nameWrapperStyle(this.isGroup),
        timestamp: style.messageTimestampStyle(this.theme),
        fileWrapper: style.messageFileWrapperStyle(this.theme),
        fileLinkContainer: style.messageFileLinkContainerStyle(),
        messageReactionsWrapper: style.messageReactionsWrapperStyle(),
        messageActionWrapper: style.messageActionWrapperStyle(
          this.parentMessageId
        ),
      };
    },
    /**
     * File icon computed from image.
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
.receiver__message__file__link {
  background-color: var(--file-recieve-message-bg-color) !important;
}
.receiver__message__file__link:visited,
.receiver__message__file__link:active,
.receiver__message__file__link:hover {
  text-decoration: none;
  color: var(--file-recieve-message-color);
}
.receiver__message__file__img {
  margin-left: 8px;
  border-radius: 4px;
  background-color: var(--file-recieve-message-bg-color);
}
</style>
<style>
.receiver__file__message__action__wrapper:hover ul.message__actions {
  visibility: var(
    --receiver-file-message-bubble-hover-display,
    visible
  ) !important;
}
</style>