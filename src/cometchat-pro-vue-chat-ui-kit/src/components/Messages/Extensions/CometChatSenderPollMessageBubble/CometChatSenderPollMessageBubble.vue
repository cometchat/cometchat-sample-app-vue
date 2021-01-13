<template>
  <div :style="styles.messageContainer" v-if="pollData">
    <div
      ref="messageBubbleWrapperRef"
      :style="styles.messageActionWrapper"
      class="sender__poll__message__actions__wrapper"
    >
      <comet-chat-message-actions
        v-bind="commonProps"
        @action="actionHandler"
      />
      <div :style="styles.messageWrapper">
        <div :style="styles.messageTextWrapper">
          <p :style="styles.pollQuestion">{{ pollData.question }}</p>
          <ul :style="styles.pollAnswer">
            <li
              :key="i"
              :style="styles.pollAnswer.li"
              v-for="(pollOption, i) in pollOptions"
            >
              <div
                :style="getPollPercentStyle(getPollPercent(pollOption))"
              ></div>
              <div :style="styles.answerWrapper">
                <span :style="styles.answerWrapper.span">{{
                  getPollPercent(pollOption)
                }}</span>
                <p :style="styles.answerWrapper.p">{{ pollOption.text }}</p>
              </div>
            </li>
          </ul>
          <p :style="styles.pollTotal">{{ totalText }}</p>
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
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../../resources/constants";

import { polls, cometChatCommon, cometChatBubbles } from "../../../../mixins/";

import CometChatReadReciept from "../../CometChatReadReciept/CometChatReadReciept";
import CometChatMessageActions from "../../CometChatMessageActions/CometChatMessageActions";
import CometChatMessageReactions from "../CometChatMessageReactions/CometChatMessageReactions";
import CometChatThreadedMessageReplyCount from "../../CometChatThreadedMessageReplyCount/CometChatThreadedMessageReplyCount";

import * as style from "./style";

export default {
  name: "CometChatSenderPollMessageBubble",
  mixins: [polls, cometChatCommon, cometChatBubbles],
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
      requestInProgress: false,
    };
  },
  computed: {
    styles() {
      return {
        pollTotal: style.pollTotalStyle(),
        pollQuestion: style.pollQuestionStyle(),
        messageWrapper: style.messageWrapperStyle(),
        pollAnswer: style.pollAnswerStyle(this.theme),
        messageContainer: style.messageContainerStyle(),
        answerWrapper: style.answerWrapperStyle(this.theme),
        messageInfoWrapper: style.messageInfoWrapperStyle(),
        messageTextWrapper: style.messageTextWrapperStyle(this.theme),
        messageReactionsWrapper: style.messageReactionsWrapperStyle(),
        messageActionWrapper: style.messageActionWrapperStyle(
          this.parentMessageId
        ),
      };
    },
  },
  methods: {
    getPollPercent(pollOption) {
      let width = "0%";

      if (this.total) {
        width = (pollOption.count / this.total).toLocaleString("en", {
          style: "percent",
        });
      }
      return width;
    },
    getPollPercentStyle(percent) {
      return style.pollPercentStyle(this.theme, percent);
    },
  },
};
</script>
<style>
.sender__poll__message__actions__wrapper:hover ul.message__actions {
  visibility: var(
    --sender-message-poll-bubble-hover-display,
    visible
  ) !important;
}
</style>