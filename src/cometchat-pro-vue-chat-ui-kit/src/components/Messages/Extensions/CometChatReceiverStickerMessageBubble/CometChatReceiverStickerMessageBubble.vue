<template>
  <div :style="styles.messageContainer">
    <div :style="styles.messageWrapper">
      <div :style="styles.messageThumbnail" v-if="isGroup">
        <comet-chat-avatar
          border-width="1px"
          corner-radius="50%"
          :border-color="theme.borderColor.primary"
          :image="parsedMessage.sender.avatar"
        />
      </div>
      <div :style="styles.messageDetail">
        <div :style="styles.nameWrapper" v-if="isGroup">
          <span :style="styles.name">{{ message.sender.name }}</span>
        </div>

        <div
          ref="messageBubbleWrapperRef"
          :style="styles.messageActionWrapper"
          class="receiver__sticker__message__action__wrapper"
        >
          <comet-chat-message-actions
            :is-group="isGroup"
            v-bind="commonProps"
            @action="actionHandler"
          />
          <div :style="styles.messageImgContainer">
            <div :style="styles.messageImgWrapper">
              <img
                v-if="stickerData"
                :src="stickerData.sticker_url"
                :alt="stickerData.sticker_name || 'Sticker'"
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
} from "../../../../resources/constants";

import {
  cometChatCommon,
  cometChatMessage,
  cometChatBubbles,
} from "../../../../mixins/";

import { CometChatAvatar } from "../../../Shared";
import CometChatReadReceipt from "../../CometChatReadReceipt/CometChatReadReceipt";
import CometChatMessageActions from "../../CometChatMessageActions/CometChatMessageActions";
import CometChatMessageReactions from "../CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

/**
 * Message bubble for received sticker messages.
 *
 * @displayName CometChatReceiverStickerMessageBubble
 */
export default {
  name: "CometChatReceiverStickerMessageBubble",
  mixins: [cometChatCommon, cometChatMessage, cometChatBubbles],
  components: {
    CometChatAvatar,
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
        nameWrapper: style.nameWrapperStyle(),
        messageDetail: style.messageDetailStyle(),
        messageWrapper: style.messageWrapperStyle(),
        messageThumbnail: style.messageThumbnailStyle(),
        messageContainer: style.messageContainerStyle(),
        messageImgWrapper: style.messageImgWrapperStyle(),
        messageInfoWrapper: style.messageInfoWrapperStyle(),
        messageImgContainer: style.messageImgContainerStyle(),
        messageTimestamp: style.messageTimestampStyle(this.theme),
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
    },
  },
};
</script>
<style>
.receiver__sticker__message__action__wrapper:hover ul.message__actions {
  visibility: var(
    --receiver-sticker-message-bubble-hover-display,
    visible
  ) !important;
}
</style>