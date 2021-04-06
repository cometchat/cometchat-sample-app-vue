<template>
  <div :style="styles.root" class="chat__list">
    <div v-if="messages.length === 0" :style="styles.decoratorMsg">
      <p :style="styles.decoratorMsgText">{{ decoratorMessage }}</p>
    </div>
    <div
      v-else
      ref="messagesEnd"
      :style="styles.wrapper"
      @scroll="scrollHandler"
    >
      <div v-if="messagesLoading" :style="styles.loadingMsgText">
        {{ STRINGS.LOADING_MESSSAGE }}
      </div>
      <template v-for="(message, i) in computedMessages">
        <div
          :key="uid(i)"
          v-if="message.messageSentDate"
          :style="styles.msgDateContainer"
        >
          <span :style="styles.msgDate">
            {{ message.messageSentDate }}
          </span>
        </div>
        <template v-if="message.category === 'call'">
          <comet-chat-action-message-bubble
            :key="uid(i)"
            :theme="theme"
            :message="message"
            :logged-in-user="loggedInUser"
          />
        </template>
        <template v-else-if="message.category === 'message'">
          <template v-if="loggedInUser.uid === message.sender.uid">
            <template v-if="hasProperty(message, 'deletedAt')">
              <comet-chat-delete-message-bubble
                :key="uid(i)"
                :item="item"
                :type="type"
                :theme="theme"
                :message="message"
                message-from="sender"
              />
            </template>
            <template v-else>
              <template
                v-if="
                  message.type === COMET_CHAT.MESSAGE_TYPE.TEXT && message.text
                "
              >
                <comet-chat-sender-text-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
              <template
                v-else-if="
                  message.type === COMET_CHAT.MESSAGE_TYPE.IMAGE &&
                  message.data.url
                "
              >
                <comet-chat-sender-image-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
              <template
                v-else-if="
                  message.type === COMET_CHAT.MESSAGE_TYPE.FILE &&
                  message.data.attachments
                "
              >
                <comet-chat-sender-file-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
              <template
                v-else-if="
                  message.type === COMET_CHAT.MESSAGE_TYPE.VIDEO &&
                  message.data.url
                "
              >
                <comet-chat-sender-video-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
              <template
                v-else-if="
                  message.type === COMET_CHAT.MESSAGE_TYPE.AUDIO &&
                  message.data.url
                "
              >
                <comet-chat-sender-audio-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
            </template>
          </template>
          <template v-else>
            <template v-if="hasProperty(message, 'deletedAt')">
              <comet-chat-delete-message-bubble
                :key="uid(i)"
                :item="item"
                :type="type"
                :theme="theme"
                :message="message"
                message-from="receiver"
              />
            </template>
            <template v-else>
              <template
                v-if="
                  message.type === COMET_CHAT.MESSAGE_TYPE.TEXT && message.text
                "
              >
                <comet-chat-receiver-text-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
              <template
                v-else-if="
                  message.type === COMET_CHAT.MESSAGE_TYPE.IMAGE &&
                  message.data.url
                "
              >
                <comet-chat-receiver-image-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
              <template
                v-else-if="
                  message.type === COMET_CHAT.MESSAGE_TYPE.FILE &&
                  message.data.attachments
                "
              >
                <comet-chat-receiver-file-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
              <template
                v-else-if="
                  message.type === COMET_CHAT.MESSAGE_TYPE.VIDEO &&
                  message.data.url
                "
              >
                <comet-chat-receiver-video-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
              <template
                v-else-if="
                  message.type === COMET_CHAT.MESSAGE_TYPE.AUDIO &&
                  message.data.url
                "
              >
                <comet-chat-receiver-audio-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
            </template>
          </template>
        </template>
        <template v-else-if="message.category === 'custom'">
          <template v-if="loggedInUser.uid === message.sender.uid">
            <template v-if="hasProperty(message, 'deletedAt')">
              <comet-chat-delete-message-bubble
                :key="uid(i)"
                :item="item"
                :type="type"
                :theme="theme"
                :message="message"
                message-from="sender"
              />
            </template>
            <template v-else>
              <template v-if="message.type === ENUMS.CUSTOM_TYPE_POLL">
                <comet-chat-sender-poll-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
              <template v-else-if="message.type === ENUMS.CUSTOM_TYPE_STICKER">
                <comet-chat-sender-sticker-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
            </template>
          </template>
          <template v-else>
            <template v-if="hasProperty(message, 'deletedAt')">
              <comet-chat-delete-message-bubble
                :key="uid(i)"
                :item="item"
                :type="type"
                :theme="theme"
                :message="message"
                message-from="receiver"
              />
            </template>
            <template v-else>
              <template v-if="message.type === ENUMS.CUSTOM_TYPE_POLL">
                <comet-chat-receiver-poll-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
              <template v-if="message.type === ENUMS.CUSTOM_TYPE_STICKER">
                <comet-chat-receiver-sticker-message-bubble
                  :key="uid(i)"
                  :message="message"
                  @action="actionHandler"
                  v-bind="senderRecieverMessageCommonProps"
                />
              </template>
            </template>
          </template>
        </template>
        <template
          v-else-if="message.category === 'action' && canShowMessage(message)"
        >
          <div :style="styles.actionMsg" :key="uid(i)">
            <p :style="styles.actionMsgText">{{ message.message }}</p>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_ARRAY_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { cometChatCommon, propertyCheck } from "../../../mixins/";
import { CometChatManager } from "../../../util/controller";
import { MessageListManager } from "./controller";
import * as enums from "../../../util/enums.js";

import CometChatActionMessageBubble from "../CometChatActionMessageBubble/CometChatActionMessageBubble";
import CometChatDeleteMessageBubble from "../CometChatDeleteMessageBubble/CometChatDeleteMessageBubble";
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

let cometChatManager;

import * as style from "./style";

/**
 * Displays list of messages.
 *
 * @displayName CometChatMessageList
 */
export default {
  name: "CometChatMessageList",
  mixins: [propertyCheck, cometChatCommon],
  components: {
    CometChatActionMessageBubble,
    CometChatDeleteMessageBubble,
    CometChatSenderTextMessageBubble,
    CometChatSenderFileMessageBubble,
    CometChatSenderPollMessageBubble,
    CometChatSenderImageMessageBubble,
    CometChatSenderVideoMessageBubble,
    CometChatSenderAudioMessageBubble,
    CometChatReceiverTextMessageBubble,
    CometChatReceiverFileMessageBubble,
    CometChatReceiverPollMessageBubble,
    CometChatReceiverImageMessageBubble,
    CometChatReceiverVideoMessageBubble,
    CometChatReceiverAudioMessageBubble,
    CometChatSenderStickerMessageBubble,
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
     * List of messages
     */
    messages: { ...DEFAULT_ARRAY_PROP },
    /**
     * Current logged in user.
     */ loggedInUser: { ...DEFAULT_OBJECT_PROP },
    /**
     * Whether to scroll to bottom.
     */
    scrollToBottom: { ...DEFAULT_BOOLEAN_PROP },
    /**
     * Id of parent for a message.
     */
    parentMessageId: { ...DEFAULT_STRING_PROP },
  },
  data() {
    return {
      lastScrollTop: 0,
      messagesLoading: true,
      messageListManager: null,
      decoratorMessage: "Loading...",
    };
  },
  watch: {
    /**
     * One true watcher that updates state on props update.
     */
    propsWatcher: {
      handler(_, { item, messages, parentMessageId }) {
        const previousMessages = JSON.stringify(this.messages);
        const currentMessages = JSON.stringify(messages);

        if (this.type === "user" && item.uid !== this.item.uid) {
          this.refresh();
        } else if (this.type === "group" && item.guid !== this.item.guid) {
          this.refresh();
        } else if (this.parentMessageId !== parentMessageId) {
          this.refresh();
        } else if (previousMessages !== currentMessages) {
          if (this.scrollToBottom) {
            this.scrollListToBottom();
          } else {
            this.scrollListToPosition();
          }
        }
      },
      deep: true,
    },
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
     * Computed object, made of props, for watcher.
     */
    propsWatcher() {
      return {
        item: this.item,
        messages: this.messages,
        parentMessageId: this.parentMessageId,
      };
    },
    /**
     * Computed styles for the component.
     */ styles() {
      return {
        wrapper: style.listWrapperStyle(),
        root: style.chatListStyle(this.theme),
        actionMsg: style.actionMessageStyle(),
        msgDate: style.messageDateStyle(this.theme),
        decoratorMsg: style.decoratorMessageStyle(),
        actionMsgText: style.actionMessageTextStyle(),
        msgDateContainer: style.messageDateContainerStyle(),
        loadingMsgText: style.loadingMessageTextStyle(this.theme),
        decoratorMsgText: style.decoratorMessageTextStyle(this.theme),
      };
    },
    /**
     * Parsed message list with sent date information.
     */
    computedMessages() {
      let cDate = null;
      return this.messages.map((message) => {
        const messageSentDate = new Date(
          message.sentAt * 1000
        ).toLocaleDateString();

        if (cDate !== messageSentDate) {
          message.messageSentDate = messageSentDate;
        }
        cDate = messageSentDate;
        return message;
      });
    },
    /**
     * Common props object for all the used components.
     */
    senderRecieverMessageCommonProps() {
      return {
        item: this.item,
        type: this.type,
        theme: this.theme,
        loggedInUser: this.loggedInUser,
      };
    },
  },
  methods: {
    /**
     * Handles emitted action events
     */
    actionHandler({ action, message }) {
      this.emitAction(action, { message });
    },
    /**
     * Handles listener events
     */
    messageUpdateHandler(key, message, group, options) {
      this.logInfo("CometChatMessageList :messageUpdateHandler", {
        key,
        message,
        group,
        options,
      });
      switch (key) {
        case enums.MESSAGE_DELETED:
          this.messageDeleted(message);
          break;
        case enums.MESSAGE_EDITED:
          this.messageEdited(message);
          break;
        case enums.MESSAGE_DELIVERED:
        case enums.MESSAGE_READ:
          this.messageReadAndDelivered(message);
          break;
        case enums.TEXT_MESSAGE_RECEIVED:
        case enums.MEDIA_MESSAGE_RECEIVED:
          this.messageReceived(message);
          break;
        case enums.CUSTOM_MESSAGE_RECEIVED:
          this.customMessageReceived(message);
          break;
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
        case enums.GROUP_MEMBER_JOINED:
        case enums.GROUP_MEMBER_LEFT:
        case enums.GROUP_MEMBER_ADDED:
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_UNBANNED:
          this.groupUpdated(key, message, group, options);
          break;
        case enums.INCOMING_CALL_RECEIVED:
        case enums.INCOMING_CALL_CANCELLED:
        case enums.OUTGOING_CALL_ACCEPTED:
        case enums.OUTGOING_CALL_REJECTED:
          this.callUpdated(message);
          break;
        default:
          break;
      }
    },
    /**
     * Handles mesaage list scroll
     */
    scrollHandler(e) {
      this.$nextTick(() => {
        try {
          const scrollTop = e.currentTarget.scrollTop;
          this.lastScrollTop = this.$refs.messagesEnd.scrollHeight - scrollTop;

          const top = Math.round(scrollTop) === 0;
          if (top && this.messages.length) {
            this.getMessages();
          }
        } catch (error) {
          this.logError("Error in scrolling", error);
        }
      });
    },
    /**
     * Emits group updated event
     */
    groupUpdated(key, message, group, options) {
      if (
        this.type === "group" &&
        message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
        message.getReceiver().guid === this.item.guid
      ) {
        // if(!message.getReadAt()) {
        //   CometChat.markAsRead(message);
        // }

        this.emitAction("groupUpdated", { message, key, group, options });
      }
    },
    /**
     * Updates call read status
     */
    callUpdated(message) {
      try {
        if (
          this.type === "group" &&
          message.getReceiverId() === this.item.guid &&
          message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP
        ) {
          if (!message.getReadAt()) {
            CometChat.markAsRead(message);
          }

          this.emitAction("callUpdated", { message });
        } else if (
          this.type === "user" &&
          message.getSender().uid === this.item.uid &&
          message.getReceiverType() === CometChat.RECEIVER_TYPE.USER
        ) {
          if (!message.getReadAt()) {
            CometChat.markAsRead(message);
          }

          this.emitAction("callUpdated", { message });
        }
      } catch (error) {
        this.logError("Error in call update", error);
      }
    },
    /**
     * Emits message delete event
     */
    messageDeleted(message) {
      if (
        (this.type === "group" &&
          message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
          message.getReceiver().guid === this.item.guid) ||
        (this.type === "user" &&
          message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
          message.getSender().uid === this.item.uid)
      ) {
        this.emitAction("messageDeleted", { messages: [message] });
      }
    },
    /**
     * Edits message
     */
    messageEdited(message) {
      const messageList = [...this.messages];

      const updateEditedMessage = (message) => {
        let messageKey = messageList.findIndex((m) => m.id === message.id);

        if (messageKey > -1) {
          const messageObj = messageList[messageKey];
          const newMessageObj = Object.assign({}, messageObj, message);

          messageList.splice(messageKey, 1, newMessageObj);
          this.emitAction("messageUpdated", { messages: messageList });

          this.emitAction("gotEditedMessage", {
            message: newMessageObj,
          });
        }
      };

      if (
        this.type === "group" &&
        message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
        message.getReceiver().guid === this.item.guid
      ) {
        updateEditedMessage(message);
      } else if (
        this.type === "user" &&
        message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
        this.loggedInUser.uid === message.getReceiverId() &&
        message.getSender().uid === this.item.uid
      ) {
        updateEditedMessage(message);
      } else if (
        this.type === "user" &&
        message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
        this.loggedInUser.uid === message.getSender().uid &&
        message.getReceiverId() === this.item.uid
      ) {
        updateEditedMessage(message);
      }
    },
    /**
     * Updates message read state
     */
    messageReceived(message) {
      if (
        this.type === "group" &&
        message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
        message.getReceiverId() === this.item.guid
      ) {
        if (!message.getReadAt()) {
          CometChat.markAsRead(message);
        }

        this.emitAction("messageReceived", { messages: [message] });
      } else if (
        this.type === "user" &&
        message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
        message.getSender().uid === this.item.uid
      ) {
        if (!message.getReadAt()) {
          CometChat.markAsRead(message);
        }

        this.emitAction("messageReceived", { messages: [message] });
      }
    },
    /**
     * Updates state for custom message
     */
    customMessageReceived(message) {
      if (
        this.type === "group" &&
        message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
        message.getReceiverId() === this.item.guid
      ) {
        if (!message.getReadAt()) {
          CometChat.markAsRead(message);
        }

        if (this.hasProperty(message, "metadata")) {
          this.emitAction("customMessageReceived", { messages: [message] });
        } else if (message.type === enums.CUSTOM_TYPE_STICKER) {
          this.emitAction("customMessageReceived", { messages: [message] });
        } else if (message.type === enums.CUSTOM_TYPE_POLL) {
          //customdata (poll extension) does not have metadata

          const newMessage = this.addMetadataToCustomData(message);
          this.emitAction("customMessageReceived", { messages: [newMessage] });
        }
      } else if (
        this.type === "user" &&
        message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
        message.getSender().uid === this.item.uid
      ) {
        if (!message.getReadAt()) {
          CometChat.markAsRead(message);
        }

        if (this.hasProperty(message, "metadata")) {
          this.emitAction("customMessageReceived", { messages: [message] });
        } else if (message.type === enums.CUSTOM_TYPE_STICKER) {
          this.emitAction("customMessageReceived", { messages: [message] });
        } else if (message.type === enums.CUSTOM_TYPE_POLL) {
          //customdata (poll extension) does not have metadata

          const newMessage = this.addMetadataToCustomData(message);
          this.emitAction("customMessageReceived", { messages: [newMessage] });
        }
      }
    },
    /**
     * Adds metadata prop to given message
     */
    addMetadataToCustomData(message) {
      const customData = message.data.customData;
      const options = customData.options;

      const resultOptions = {};
      for (const option in options) {
        resultOptions[option] = {
          text: options[option],
          count: 0,
        };
      }

      const polls = {
        id: message.id,
        options: options,
        results: {
          total: 0,
          options: resultOptions,
          question: customData.question,
        },
        question: customData.question,
      };

      return {
        ...message,
        metadata: { "@injected": { extensions: { polls: polls } } },
      };
    },
    /**
     * Sets message read and delivery status
     */
    messageReadAndDelivered(message) {
      if (
        message.getReceiverType() === CometChat.RECEIVER_TYPE.USER &&
        message.getSender().getUid() === this.item.uid &&
        message.getReceiver() === this.loggedInUser.uid
      ) {
        let messageList = [...this.messages];
        if (message.getReceiptType() === "delivery") {
          let msg = messageList.find((m) => m.id === message.messageId);

          if (msg) {
            msg["deliveredAt"] = message.getDeliveredAt();

            this.emitAction("messageUpdated", { messages: [...messageList] });
          }
        } else if (message.getReceiptType() === "read") {
          let msg = messageList.find((m) => m.id === message.messageId);

          if (msg) {
            msg["readAt"] = message.getReadAt();

            this.emitAction("messageUpdated", { messages: [...messageList] });
          }
        }
      } else if (
        message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP &&
        message.getReceiver().guid === this.item.guid
      ) {
        // TODO group message recieve
        //not implemented
      }
    },
    /**
     * Gets list of messages
     */
    async getMessages(scrollListToBottom = false, refresh = false) {
      const actionMessages = [];
      this.messagesLoading = true;
      this.decoratorMessage = "Loading...";

      if (!cometChatManager) {
        cometChatManager = new CometChatManager();
      }

      try {
        const user = await cometChatManager.getLoggedInUser();

        if (!this.messageListManager) {
          this.createMessageListManager();
        }

        const messages = await this.messageListManager.fetchPreviousMessages();

        if (messages.length === 0) {
          this.decoratorMessage = COMETCHAT_CONSTANTS.NO_MESSAGES_FOUND;
        } else {
          this.decoratorMessage = "";
        }

        messages.forEach((message) => {
          if (
            message.category === CometChat.CATEGORY_ACTION &&
            message.sender.uid === "app_system"
          ) {
            actionMessages.push(message);
          }

          //if the sender of the message is not the loggedin user, mark it as read.
          if (
            message.getSender().getUid() !== user.getUid() &&
            !message.getReadAt()
          ) {
            if (message.getReceiverType() === CometChat.RECEIVER_TYPE.USER) {
              CometChat.markAsRead(message);
            } else if (
              message.getReceiverType() === CometChat.RECEIVER_TYPE.GROUP
            ) {
              CometChat.markAsRead(message);
            }
          }
          this.emitAction("messageRead", { message });
        });

        let actionGenerated = "messageFetched";
        if (scrollListToBottom === true) {
          actionGenerated = "messageFetchedAgain";
        } else if (refresh === true) {
          actionGenerated = "messageRefreshed";
        }

        this.emitAction(actionGenerated, { messages });

        // TODO look into this
        // ++times;

        // if (
        //   (times === 1 && actionMessages.length > 5) ||
        //   (times > 1 && actionMessages.length === 30)
        // ) {
        //   this.emitAction( { action: "messageFetched", messages });
        //   this.getMessages(true);
        // } else {
        //   lastScrollTop = this.$refs.messagesEnd.scrollHeight;
        //   this.emitAction( { action: actionGenerated, messages });
        // }
      } catch (error) {
        this.logError(
          "[CometChatMessageList] getMessages getLoggedInUser error",
          error
        );
        this.decoratorMessage = "Error";
      } finally {
        this.messagesLoading = false;
      }
    },
    /**
     * Returns if can show message
     */
    canShowMessage(message) {
      if (message.category === "action") {
        let canShow = false;
        if (message.message) {
          canShow = true;
        }
        return canShow;
      } else {
        return true;
      }
    },
    /**
     * Refreshes component state
     */
    refresh() {
      this.removeMessageListeners();

      this.createMessageListManager();

      this.getMessages(false, true);
      this.attachMessageListeners();
    },
    createMessageListManager() {
      if (this.parentMessageId) {
        this.messageListManager = new MessageListManager(
          this.item,
          this.type,
          this.parentMessageId
        );
      } else {
        this.messageListManager = new MessageListManager(this.item, this.type);
      }
    },
    attachMessageListeners() {
      if (this.messageListManager) {
        this.messageListManager.attachListeners(this.messageUpdateHandler);
      }
    },
    removeMessageListeners() {
      if (this.messageListManager) {
        this.messageListManager.removeListeners();
      }
      this.messageListManager = null;
    },
    scrollListToPosition() {
      this.scrollListToBottom(this.lastScrollTop);
    },
    scrollListToBottom(scrollHeight = 0) {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.messagesEnd) {
          this.$refs.messagesEnd.scrollTop =
            this.$refs.messagesEnd.scrollHeight - scrollHeight;
        }
      });
    },
  },
  beforeMount() {
    this.refresh();
  },
  beforeDestroy() {
    this.removeMessageListeners();
  },
};
</script>