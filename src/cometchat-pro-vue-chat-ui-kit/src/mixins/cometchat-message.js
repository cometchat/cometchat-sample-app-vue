import { CometChat } from "@cometchat-pro/chat";

import cometChatCommon from "./cometchat-common";
import propertyCheck from "./property-check";

export default {
  mixins: [propertyCheck, cometChatCommon],
  computed: {
    linkPreviewData() {
      if (this.hasProperty(this.parsedMessage, "metadata")) {
        const metadata = this.parsedMessage.metadata;
        const injectedObject = metadata["@injected"];
        if (injectedObject && this.hasProperty(injectedObject, "extensions")) {
          const extensionsObject = injectedObject["extensions"];
          if (
            extensionsObject &&
            this.hasProperty(extensionsObject, "link-preview")
          ) {
            const linkPreviewObject = extensionsObject["link-preview"];
            if (
              linkPreviewObject &&
              this.hasProperty(linkPreviewObject, "links") &&
              linkPreviewObject["links"].length
            ) {
              const linkObject = linkPreviewObject["links"][0];

              const pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
              const linkText = linkObject["url"].match(pattern)
                ? "View on Youtube"
                : "Visit";

              return { linkObject, linkText };
            }
          }
        }
      }
      return null;
    },
    showVariation() {
      if (
        this.widgetsettings &&
        this.hasProperty(this.widgetsettings, "main") &&
        this.hasProperty(
          this.widgetsettings.main,
          "show_emojis_in_larger_size"
        ) &&
        this.widgetsettings.main["show_emojis_in_larger_size"] === false
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    smartReplyPreview(messages) {
      const message = messages[0];

      if (this.hasProperty(message, "metadata")) {
        const metadata = message.metadata;
        if (this.hasProperty(metadata, "@injected")) {
          const injectedObject = metadata["@injected"];
          if (this.hasProperty(injectedObject, "extensions")) {
            const extensionsObject = injectedObject["extensions"];
            if (this.hasProperty(extensionsObject, "smart-reply")) {
              const smartReply = extensionsObject["smart-reply"];
              if (this.hasProperty(smartReply, "error") === false) {
                this.replyPreview = message;
              } else {
                this.replyPreview = null;
              }
            }
          }
        }
      }
    },
    async deleteMessage(message) {
      const messageId = message.id;
      try {
        const deletedMessage = await CometChat.deleteMessage(messageId);

        this.removeMessages([deletedMessage]);

        this.findMessage(message, (messageKey, messageList) => {
          if (messageList.length - messageKey === 1 && !message.replyCount) {
            this.emitAction("lastMessageDeleted", {
              messages: [deletedMessage],
            });
          }

          this.emitAction("messageDeleted", { message: deletedMessage });
        });
      } catch (error) {
        console.log("Message delete failed with error:", error);
      }
    },
    messageEdited(message) {
      this.findMessage(message, (messageKey, messageList) => {
        const messageObj = messageList[messageKey];

        const newMessageObj = { ...messageObj, ...message };

        messageList.splice(messageKey, 1, newMessageObj);
        this.updateMessages(messageList);

        if (messageList.length - messageKey === 1 && !message.replyCount) {
          this.emitAction("lastMessageEdited", { messages: [newMessageObj] });
        }

        this.emitAction("messageEdited", { message: newMessageObj });
      });
    },
    removeMessages(messages) {
      const deletedMessage = messages[0];
      this.findMessage(deletedMessage, (messageKey, messageList) => {
        let messageObj = { ...messageList[messageKey] };
        let newMessageObj = Object.assign({}, messageObj, deletedMessage);

        messageList.splice(messageKey, 1, newMessageObj);

        this.messageList = messageList;
        this.scrollToBottom = false;
      });
    },
    appendMessage(newMessages = []) {
      if (
        this.messageList &&
        newMessages.length &&
        this.messageList.length &&
        newMessages[newMessages.length - 1].id ===
          this.messageList[this.messageList.length - 1].id
      ) {
        return;
      }

      this.scrollToBottom = true;
      let messages = [...this.messageList];
      this.messageList = messages.concat(newMessages);
    },
    prependMessages(messages) {
      this.scrollToBottom = false;
      this.messageList = [...messages, ...this.messageList];
    },
    updateMessages(messages) {
      this.scrollToBottom = false;
      this.messageList = [...messages];
    },
    editMessage(message) {
      this.messageToBeEdited = message;
    },
    clearEditPreview() {
      this.messageToBeEdited = null;
    },
    findMessage(message, callback) {
      const messageList = [...this.messageList];

      let messageKey = messageList.findIndex((m) => m.id === message.id);

      if (messageKey > -1) {
        callback(messageKey, messageList);
      }
    },
  },
};
