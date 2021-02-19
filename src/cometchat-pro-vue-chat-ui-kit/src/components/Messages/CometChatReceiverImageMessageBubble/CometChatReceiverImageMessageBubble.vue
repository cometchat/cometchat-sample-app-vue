<template>
  <div :style="styles.container">
    <div :style="styles.wrapper">
      <div :style="styles.thumbnail" v-if="isGroup">
        <comet-chat-avatar
          border-width="1px"
          corner-radius="50%"
          :image="message.sender.avatar"
          :border-color="theme.borderColor.primary"
        />
      </div>
      <div :style="styles.detail">
        <div :style="styles.nameWrapper" v-if="isGroup">
          <span :style="styles.name">{{ parsedMessage.sender.name }}</span>
        </div>
        <div
          ref="messageBubbleWrapperRef"
          :style="styles.messageActionWrapper"
          class="receiver__image__message__action__wrapper"
        >
          <comet-chat-message-actions
            :is-group="isGroup"
            v-bind="commonProps"
            @action="actionHandler"
          />
          <div :style="styles.imgContainer">
            <div
              :style="styles.imgWrapper"
              class="message__image__wrapper"
              @click="
                emitEvent('action', { action: 'viewActualImage', message })
              "
            >
              <img
                alt="message"
                :src="imageUrl"
                :style="styles.img"
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

import {
  cometChatCommon,
  cometChatBubbles,
  thumbnailGeneration,
} from "../../../mixins/";

import { CometChatAvatar } from "../../Shared";
import CometChatReadReceipt from "../CometChatReadReceipt/CometChatReadReceipt";
import CometChatMessageActions from "../CometChatMessageActions/CometChatMessageActions";
import CometChatMessageReactions from "../Extensions/CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

import srcIcon from "./resources/1px.png";

/**
 * Message bubble for received image messages.
 *
 * @displayName CometChatReceiverImageMessageBubble
 */
export default {
  name: "CometChatReceiverImageMessageBubble",
  mixins: [cometChatCommon, cometChatBubbles, thumbnailGeneration],
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
      imageUrl: srcIcon,
      windowWidth: 1000,
      messageFrom: "receiver",
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        img: style.messageImg(),
        name: style.nameStyle(this.theme),
        detail: style.messageDetailStyle(),
        wrapper: style.messageWrapperStyle(),
        container: style.messageContainerStyle(),
        thumbnail: style.messageThumbnailStyle(),
        imgWrapper: style.messageImgWrapperStyle(),
        infoWrapper: style.messageInfoWrapperStyle(),
        imgContainer: style.messageImgContainerStyle(),
        nameWrapper: style.nameWrapperStyle(this.isGroup),
        timestamp: style.messageTimestampStyle(this.theme),
        messageReactionsWrapper: style.messageReactionsWrapperStyle(),
        messageActionWrapper: style.messageActionWrapperStyle(
          this.parentMessageId
        ),
      };
    },
  },
  mounted() {
    this.onResize();
    this.setImage();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<style scoped>
@media (min-width: 320px) and (max-width: 767px) {
  .message__img__wrapper {
    height: 100px !important;
    min-width: 50px !important;
    max-width: 150px !important;
    padding: 2px 2px !important;
  }
}
</style>
<style>
.receiver__image__message__action__wrapper:hover ul.message__actions {
  visibility: var(
    --receiver-image-message-bubble-hover-display,
    visible
  ) !important;
}
</style>