<template>
  <div :style="styles.wrapper" class="cometchat__thread__wrapper">
    <div :style="styles.header">
      <div :style="styles.headerWrapper">
        <div :style="styles.headerDetail">
          <h6 :style="styles.headerTitle">{{ STRINGS.THREAD }}</h6>
          <span :style="styles.headerName">
            {{ item.name }}
          </span>
        </div>
        <div
          :style="styles.headerClose"
          @click="emitAction('closeThreadClicked')"
        ></div>
      </div>
    </div>
    <div :style="styles.messageContainer" class="cometchat__thread__container">
      <div :style="styles.parentMessage">
        <template v-if="loggedInUser.uid === parentMessage.sender.uid">
          <template
            v-if="
              parentMessage.type === COMET_CHAT.MESSAGE_TYPE.TEXT &&
              parentMessage.text
            "
          >
            <comet-chat-sender-text-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template
            v-else-if="
              parentMessage.type === COMET_CHAT.MESSAGE_TYPE.IMAGE &&
              parentMessage.data.url
            "
          >
            <comet-chat-sender-image-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template
            v-else-if="
              parentMessage.type === COMET_CHAT.MESSAGE_TYPE.FILE &&
              parentMessage.data.attachments
            "
          >
            <comet-chat-sender-file-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template
            v-else-if="
              parentMessage.type === COMET_CHAT.MESSAGE_TYPE.VIDEO &&
              parentMessage.data.url
            "
          >
            <comet-chat-sender-video-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template
            v-else-if="
              parentMessage.type === COMET_CHAT.MESSAGE_TYPE.AUDIO &&
              parentMessage.data.url
            "
          >
            <comet-chat-sender-audio-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template v-else-if="parentMessage.type === ENUMS.CUSTOM_TYPE_POLL">
            <comet-chat-sender-poll-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template
            v-else-if="parentMessage.type === ENUMS.CUSTOM_TYPE_STICKER"
          >
            <comet-chat-sender-sticker-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
        </template>
        <template v-else>
          <template
            v-if="
              parentMessage.type === COMET_CHAT.MESSAGE_TYPE.TEXT &&
              parentMessage.text
            "
          >
            <comet-chat-receiver-text-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template
            v-else-if="
              parentMessage.type === COMET_CHAT.MESSAGE_TYPE.IMAGE &&
              parentMessage.data.url
            "
          >
            <comet-chat-receiver-image-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template
            v-else-if="
              parentMessage.type === COMET_CHAT.MESSAGE_TYPE.FILE &&
              parentMessage.data.attachments
            "
          >
            <comet-chat-receiver-file-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template
            v-else-if="
              parentMessage.type === COMET_CHAT.MESSAGE_TYPE.VIDEO &&
              parentMessage.data.url
            "
          >
            <comet-chat-receiver-video-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template
            v-else-if="
              parentMessage.type === COMET_CHAT.MESSAGE_TYPE.AUDIO &&
              parentMessage.data.url
            "
          >
            <comet-chat-receiver-audio-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template v-else-if="parentMessage.type === ENUMS.CUSTOM_TYPE_POLL">
            <comet-chat-receiver-poll-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
          <template
            v-else-if="parentMessage.type === ENUMS.CUSTOM_TYPE_STICKER"
          >
            <comet-chat-receiver-sticker-message-bubble
              :message="parentMessage"
              @action="actionHandler"
              v-bind="senderRecieverMessageCommonProps"
            />
          </template>
        </template>
      </div>
      <div :style="styles.messageSeparator">
        <span v-if="replyCount" :style="styles.messageReply">
          {{ replyText }}
        </span>
        <hr :style="styles.messageSeparator.hr" />
      </div>
      <comet-chat-message-list
        :item="item"
        :type="type"
        :theme="theme"
        :messages="messageList"
        :logged-in-user="loggedInUser"
        :messageconfig="messageconfig"
        :scroll-to-bottom="scrollToBottom"
        :parent-message-id="parentMessage.id"
        @action="actionHandler"
      />
      <comet-chat-message-composer
        :item="item"
        :type="type"
        :theme="theme"
        :reply-preview="replyPreview"
        :parent-message-id="parentMessage.id"
        :message-to-edit="messageToBeEdited"
        @action="actionHandler"
      />
    </div>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import * as enums from "../../../util/enums.js";

import { cometChatMessage, cometChatCommon } from "../../../mixins/";

import CometChatMessageList from "../CometChatMessageList/CometChatMessageList";
import CometChatMessageComposer from "../CometChatMessageComposer/CometChatMessageComposer";

import CometChatSenderTextMessageBubble from "../CometChatSenderTextMessageBubble/CometChatSenderTextMessageBubble";
import CometChatSenderFileMessageBubble from "../CometChatSenderFileMessageBubble/CometChatSenderFileMessageBubble";
import CometChatSenderImageMessageBubble from "../CometChatSenderImageMessageBubble/CometChatSenderImageMessageBubble";
import CometChatSenderVideoMessageBubble from "../CometChatSenderVideoMessageBubble/CometChatSenderVideoMessageBubble";
import CometChatSenderAudioMessageBubble from "../CometChatSenderAudioMessageBubble/CometChatSenderAudioMessageBubble";
import CometChatReceiverTextMessageBubble from "../CometChatReceiverTextMessageBubble/CometChatReceiverTextMessageBubble";
import CometChatReceiverFileMessageBubble from "../CometChatReceiverFileMessageBubble/CometChatReceiverFileMessageBubble";
import CometChatReceiverImageMessageBubble from "../CometChatReceiverImageMessageBubble/CometChatReceiverImageMessageBubble";
import CometChatReceiverVideoMessageBubble from "../CometChatReceiverVideoMessageBubble/CometChatReceiverVideoMessageBubble";
import CometChatReceiverAudioMessageBubble from "../CometChatReceiverAudioMessageBubble/CometChatReceiverAudioMessageBubble";
import CometChatSenderPollMessageBubble from "../Extensions/CometChatSenderPollMessageBubble/CometChatSenderPollMessageBubble";
import CometChatReceiverPollMessageBubble from "../Extensions/CometChatReceiverPollMessageBubble/CometChatReceiverPollMessageBubble";
import CometChatSenderStickerMessageBubble from "../Extensions/CometChatSenderStickerMessageBubble/CometChatSenderStickerMessageBubble";
import CometChatReceiverStickerMessageBubble from "../Extensions/CometChatReceiverStickerMessageBubble/CometChatReceiverStickerMessageBubble";

import * as style from "./style";

import clearIcon from "./resources/close.png";

/**
 * Displays message thread.
 *
 * @displayName CometChatMessageThread
 */
export default {
  name: "CometChatMessageThread",
  mixins: [cometChatCommon, cometChatMessage],
  components: {
    CometChatMessageList,
    CometChatMessageComposer,
    CometChatSenderTextMessageBubble,
    CometChatSenderPollMessageBubble,
    CometChatSenderFileMessageBubble,
    CometChatSenderImageMessageBubble,
    CometChatSenderAudioMessageBubble,
    CometChatSenderVideoMessageBubble,
    CometChatSenderStickerMessageBubble,
    CometChatReceiverTextMessageBubble,
    CometChatReceiverFileMessageBubble,
    CometChatReceiverPollMessageBubble,
    CometChatReceiverImageMessageBubble,
    CometChatReceiverAudioMessageBubble,
    CometChatReceiverVideoMessageBubble,
    CometChatReceiverStickerMessageBubble,
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
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
    /**
     * Parent message object.
     */
    parentMessage: { ...DEFAULT_OBJECT_PROP },
    /**
     * @ignore
     */
    messageconfig: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      replyCount: 0,
      messageList: [],
      replyPreview: null,
      scrollToBottom: true,
      messageToBeEdited: null,
    };
  },
  watch: {
    /**
     * Updates state on parent message change.
     */
    parentMessage: {
      handler(newValue, oldValue) {
        if (oldValue.id !== newValue.id) {
          this.messageList = [];
          this.scrollToBottom = true;

          if (newValue.replyCount) {
            this.replyCount = newValue.replyCount;
          } else {
            this.replyCount = 0;
          }
        }
      },
    },
    deep: true,
  },
  computed: {
    /**
     * Instance of "enums" to use in Vue html template.
     */
    ENUMS() {
      return enums;
    },
    /**
     * Instance of "CometChat" to use in Vue html template.
     */
    COMET_CHAT() {
      return CometChat;
    },
    /**
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        headerName: style.headerNameStyle(),
        headerTitle: style.headerTitleStyle(),
        header: style.headerStyle(this.theme),
        wrapper: style.wrapperStyle(this.theme),
        headerDetail: style.headerDetailStyle(),
        messageReply: style.messageReplyStyle(),
        headerWrapper: style.headerWrapperStyle(),
        headerClose: style.headerCloseStyle(clearIcon),
        messageContainer: style.messageContainerStyle(),
        messageSeparator: style.messageSeparatorStyle(this.theme),
        parentMessage: style.parentMessageStyle(this.parentMessage),
      };
    },
    /**
     * Parsed reply text
     */
    replyText() {
      const count = this.replyCount;
      return `${count || "0"} ${count === 1 ? "reply" : "replies"}`;
    },
    /**
     * Computed object, made of props, for watcher.
     */
    senderRecieverMessageCommonProps() {
      return {
        item: this.item,
        type: this.type,
        theme: this.theme,
        loggedInUser: this.loggedInUser,
        parentMessageId: this.parentMessage.id,
      };
    },
  },
  methods: {
    /**
     * Handles emitted action events
     */
    actionHandler({ action, message, messages = [] }) {
      switch (action) {
        case "messageReceived":
          {
            const message = messages[0];
            if (
              message.parentMessageId &&
              message.parentMessageId === this.parentMessage.id
            ) {
              this.replyCount = this.replyCount + 1;
              this.smartReplyPreview(messages);
              this.appendMessage(messages);
            }

            this.sendListenerDataAbove(action, messages);
          }

          break;
        case "messageComposed":
          this.replyCount = this.replyCount + 1;
          this.appendMessage(messages);

          this.emitAction("threadMessageComposed", { messages });
          break;
        case "messageUpdated":
          this.updateMessages(messages);
          this.sendListenerDataAbove(action, messages);
          break;
        case "messageFetched":
          this.prependMessages(messages);
          break;
        case "messageRefreshed":
          this.messageList = [...messages];
          break;
        case "messageDeleted":
          this.removeMessages(messages);
          this.sendListenerDataAbove(action, messages);
          break;
        case "editMessage":
          this.editMessage(message);
          break;
        case "messageEdited":
          this.messageEdited(message);
          break;
        case "clearEditPreview":
          this.clearEditPreview();
          break;
        case "deleteMessage":
          this.deleteMessage(message);
          break;
        case "viewActualImage":
          this.emitAction("viewActualImage", { message });
          break;
        default:
          break;
      }
    },
    /**
     * Sends listener data to parent component
     */
    sendListenerDataAbove(action, messages) {
      const hasParent = messages.length
        ? !!(messages[0] || {}).parentMessageId
        : false;

      if (!hasParent) {
        this.emitAction("listenerData", { action, messages });
      }
    },
  },
  mounted() {
    if (this.parentMessage.replyCount) {
      this.replyCount = this.parentMessage.replyCount;
    }
  },
};
</script>
<style>
.cometchat__thread__container > .chat__list {
  min-height: 250px;
}
</style>
<style scoped>
.cometchat__thread__wrapper * {
  box-sizing: border-box;
  font-family: var(--thread-font-family);
}
</style>