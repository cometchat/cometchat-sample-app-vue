<template>
  <div :style="styles.container">
    <div
      ref="messageBubbleWrapperRef"
      :style="styles.messageActionWrapper"
      class="sender__audio__message__action__wrapper"
    >
      <comet-chat-message-actions
        v-bind="commonProps"
        @action="actionHandler"
      />
      <div :style="styles.wrapper">
        <div :style="styles.audioWrapper">
          <audio controls :style="styles.audio" class="sender__audio__message">
            <source :src="parsedMessage.data.url" />
          </audio>
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

export default {
  name: "CometChatSenderAudioMessageBubble",
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
        audio: style.messageAudioStyle(),
        wrapper: style.messageWrapperStyle(),
        container: style.messageContainerStyle(),
        infoWrapper: style.messageInfoWrapperStyle(),
        audioWrapper: style.messageAudioWrapperStyle(),
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
.sender__audio__message,
.sender__audio__message:focus {
  outline: none;
}
</style>
<style>
.sender__audio__message__action__wrapper:hover ul.message__actions {
  visibility: var(
    --sender-audio-message-bubble-hover-display,
    visible
  ) !important;
}
</style>