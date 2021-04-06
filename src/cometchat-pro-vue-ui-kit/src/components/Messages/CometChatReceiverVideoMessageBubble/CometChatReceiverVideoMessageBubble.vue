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
          <span :style="styles.name">
            {{ message.sender.name }}
          </span>
        </div>
        <div
          ref="messageBubbleWrapperRef"
          :style="styles.messageActionWrapper"
          class="receiver__video__message__action__wrapper"
        >
          <comet-chat-message-actions
            :is-group="isGroup"
            v-bind="commonProps"
            @action="actionHandler"
          />
          <div :style="styles.videoContainer">
            <div :style="styles.videoWrapper">
              <video
                controls
                :style="styles.video"
                class="receiver__video__message"
              >
                <source :src="parsedMessage.data.url" />
              </video>
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

/**
 * Message bubble for received video messages.
 *
 * @displayName CometChatReceiverVideoMessageBubble
 */
export default {
  name: "CometChatReceiverVideoMessageBubble",
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
        video: style.messageVideoStyle(),
        name: style.nameStyle(this.theme),
        detail: style.messageDetailStyle(),
        wrapper: style.messageWrapperStyle(),
        thumbnail: style.messageThumbnailStyle(),
        container: style.messageContainerStyle(),
        infoWrapper: style.messageInfoWrapperStyle(),
        videoWrapper: style.messageVideoWrapperStyle(),
        videoContainer: style.messageVideoContainerStyle(),
        nameWrapper: style.nameWrapperStyle(this.isGroup),
        timestamp: style.messageTimestampStyle(this.theme),
        messageReactionsWrapper: style.messageReactionsWrapperStyle(),
        messageActionWrapper: style.messageActionWrapperStyle(
          this.parentMessageId
        ),
      };
    },
  },
};
</script>
<style scoped>
.receiver__video__message:focus {
  outline: none;
}
</style>
<style>
.receiver__video__message__action__wrapper:hover ul.message__actions {
  visibility: var(
    --receiver-video-message-bubble-hover-display,
    visible
  ) !important;
}
</style>