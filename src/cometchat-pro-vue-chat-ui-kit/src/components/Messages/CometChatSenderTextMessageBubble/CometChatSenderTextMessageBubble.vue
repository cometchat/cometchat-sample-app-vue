<template>
  <div :style="styles.container">
    <div
      ref="messageBubbleWrapperRef"
      :style="styles.messageActionWrapper"
      class="sender__message__action__wrapper"
    >
      <comet-chat-message-actions
        v-bind="commonProps"
        @action="actionHandler"
      />
      <div :style="styles.wrapper">
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
                    class="sender__message__text"
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
            class="sender__message__text"
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

import CometChatReadReciept from "../CometChatReadReciept/CometChatReadReciept";
import CometChatMessageActions from "../CometChatMessageActions/CometChatMessageActions";
import CometChatMessageReactions from "../Extensions/CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

export default {
  name: "CometChatSenderTextMessageBubble",
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
    widgetconfig: { ...DEFAULT_OBJECT_PROP },
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
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
        messageText: style.messageTextStyle(
          this.theme,
          this.parsedMessage,
          "",
          this.showVariation
        ),
        wrapper: style.messageWrapperStyle(),
        previewText: style.previewTextStyle(this.theme),
        previewData: style.previewDataStyle(this.theme),
        previewDesc: style.previewDescStyle(this.theme),
        previewLink: style.previewLinkStyle(this.theme),
        previewTitle: style.previewTitleStyle(this.theme),
        messageInfoWrapper: style.messageInfoWrapperStyle(),
        messagePreviewWrapper: style.messagePreviewWrapperStyle(),
        container: style.messageContainerStyle(this.parentMessageId),
        messageTextWrapper: style.messageTextWrapperStyle(this.theme),
        messageReactionsWrapper: style.messageReactionsWrapperStyle(),
        messagePreviewContainer: style.messagePreviewContainerStyle(this.theme),
        messageActionWrapper: style.messageActionWrapperStyle(
          this.parentMessageId
        ),
      };
    },
  },
  methods: {
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
.sender__message__action__wrapper:hover ul.message__actions {
  visibility: var(--sender-message-bubble-hover-display, visible) !important;
}
.sender__message__text > img {
  zoom: 1;
  width: 20px;
  height: 20px;
  margin: 0 2px;
  vertical-align: top;
  display: inline-block;
}
.sender__message__text a {
  color: #0432ff;
}
.sender__message__text a:hover {
  color: #04009d;
}
.sender__message__text a[href^="mailto:"] {
  color: #0432ff;
}
.sender__message__text a[href^="mailto:"]:hover {
  color: #f36800;
}
.sender__message__text a[href^="tel:"] {
  color: #3802da;
}
.sender__message__text a[href^="tel:"]:hover {
  color: #2d038f;
}
</style>