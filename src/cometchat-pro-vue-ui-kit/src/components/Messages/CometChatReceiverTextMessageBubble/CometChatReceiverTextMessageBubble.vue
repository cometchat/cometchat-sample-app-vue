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
          class="receiver__message__action__wrapper"
        >
          <comet-chat-message-actions
            :is-group="isGroup"
            v-bind="commonProps"
            @action="actionHandler"
          />
          <div :style="styles.messageTextContainer">
            <div v-if="linkPreviewData" :style="styles.messagePreviewContainer">
              <div :style="styles.messagePreviewWrapper">
                <img
                  :src="linkPreviewData.linkObject['image']"
                  :style="styles.messagePreviewWrapper.img"
                />
                <div :style="styles.previewData">
                  <div :style="styles.previewTitle">
                    <span>{{ linkPreviewData.linkObject["title"] }}</span>
                  </div>
                  <div :style="styles.previewDesc">
                    <span>{{ linkPreviewData.linkObject["description"] }}</span>
                  </div>
                  <div :style="styles.previewText">
                    <div
                      :style="{
                        ...styles.messageTextWrapper,
                        ...styles.previewText.textWrapper,
                      }"
                    >
                      <p
                        class="receiver__message__text"
                        :style="styles.messageText"
                        v-html="getMessageText()"
                      ></p>
                    </div>
                  </div>
                </div>
                <div :style="styles.previewLink">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    :style="styles.previewLink.a"
                    :href="linkPreviewData.linkObject['url']"
                    >{{ linkPreviewData.linkText }}</a
                  >
                </div>
              </div>
            </div>
            <div v-else :style="styles.messageTextWrapper">
              <p
                class="receiver__message__text"
                :style="styles.messageText"
                v-html="getMessageText()"
              ></p>
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
import twemoji from "twemoji";

import {
  DEFAULT_STRING_PROP,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import {
  cometChatCommon,
  cometChatMessage,
  cometChatBubbles,
} from "../../../mixins/";
import { linkify } from "../../../util/common";

import { CometChatAvatar } from "../../Shared";
import CometChatReadReceipt from "../CometChatReadReceipt/CometChatReadReceipt";
import CometChatMessageActions from "../CometChatMessageActions/CometChatMessageActions";
import CometChatMessageReactions from "../Extensions/CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

/**
 * Message bubble for received text messages.
 *
 * @displayName CometChatReceiverTextMessageBubble
 */
export default {
  name: "CometChatReceiverTextMessageBubble",
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
        messageText: style.messageTextStyle(
          this.parsedMessage.text,
          "",
          this.showVariation
        ),
        name: style.nameStyle(this.theme),
        previewImage: style.previewImageStyle(),
        messageDetail: style.messageDetailStyle(),
        messageWrapper: style.messageWrapperStyle(),
        previewData: style.previewDataStyle(this.theme),
        previewDesc: style.previewDescStyle(this.theme),
        previewText: style.previewTextStyle(this.theme),
        previewLink: style.previewLinkStyle(this.theme),
        messageThumbnail: style.messageThumbnailStyle(),
        nameWrapper: style.nameWrapperStyle(this.isGroup),
        previewTitle: style.previewTitleStyle(this.theme),
        messageInfoWrapper: style.messageInfoWrapperStyle(),
        messageTextContainer: style.messageTextContainerStyle(),
        messagePreviewWrapper: style.messagePreviewWrapperStyle(),
        messageTimestamp: style.messageTimestampStyle(this.theme),
        messageReactionsWrapper: style.messageReactionsWrapperStyle(),
        messageTextWrapper: style.messageTextWrapperStyle(this.theme),
        messageContainer: style.messageContainerStyle(this.parentMessageId),
        messagePreviewContainer: style.messagePreviewContainerStyle(this.theme),
        messageActionWrapper: style.messageActionWrapperStyle(
          this.parentMessageId
        ),
      };
    },
  },
  methods: {
    /**
     * Returns parsed message text.
     */
    getMessageText() {
      return twemoji.parse(linkify(this.parsedMessage.text), {
        folder: "svg",
        ext: ".svg",
      });
    },
  },
};
</script>
<style>
.receiver__message__action__wrapper:hover ul.message__actions {
  visibility: var(--receiver-message-bubble-hover-display, visible) !important;
}
.receiver__message__text > img {
  zoom: 1;
  width: 20px;
  height: 20px;
  margin: 0 2px;
  vertical-align: top;
  display: inline-block;
}
.receiver__message__text a {
  color: #0432ff;
}
.receiver__message__text a:hover {
  color: #04009d;
}
.receiver__message__text a[href^="mailto:"] {
  color: #0432ff;
}
.receiver__message__text a[href^="mailto:"]:hover {
  color: #f36800;
}
.receiver__message__text a[href^="tel:"] {
  color: #3802da;
}
.receiver__message__text a[href^="tel:"]:hover {
  color: #2d038f;
}
</style>