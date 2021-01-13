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
                alt="file"
                :src="fileIcon"
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
      <comet-chat-read-reciept :theme="theme" :message="parsedMessage" />
    </div>
  </div>
</template>
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import { cometChatCommon, cometChatBubbles } from "../../../mixins/";

import CometChatReadReciept from "../CometChatReadReciept/CometChatReadReciept";
import CometChatMessageActions from "../CometChatMessageActions/CometChatMessageActions";
import CometChatMessageReactions from "../Extensions/CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

import blueFile from "./resources/file-blue.svg";

export default {
  name: "CometChatSenderFileMessageBubble",
  mixins: [cometChatCommon, cometChatBubbles],
  components: {
    CometChatReadReciept,
    CometChatMessageActions,
    CometChatMessageReactions,
    CometChatThreadedMessageReplyCount,
  },
  props: {
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
    fileIcon() {
      return blueFile;
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