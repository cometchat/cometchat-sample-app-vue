import { CometChat } from "@cometchat-pro/chat";

import { COMETCHAT_CONSTANTS } from "../resources/constants";
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
                ? COMETCHAT_CONSTANTS.VIEW_ON_YOUTUBE
                : COMETCHAT_CONSTANTS.VIEW;

              return { linkObject, linkText };
            }
          }
        }
      }
      return null;
    },
    showVariation() {
      return true;
    },
  },
  methods: {
    /**
     * Gets the smart reply preview data
     * @param {*} messages
     */
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
    /**
     * Deletes a message
     */
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
        this.logError("Message delete failed with error:", error);
      }
    },
    /**
     * Edits a message
     */
    messageEdited(message) {
      try {
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
      } catch (error) {
        console.log("Message edit failed with error:", error);
      }
    },
    /**
     * Removes a list of messages
     */
    removeMessages(messages) {
      try {
        const deletedMessage = messages[0];
        this.findMessage(deletedMessage, (messageKey, messageList) => {
          let messageObj = { ...messageList[messageKey] };
          let newMessageObj = Object.assign({}, messageObj, deletedMessage);

          messageList.splice(messageKey, 1, newMessageObj);

          this.messageList = messageList;
          this.scrollToBottom = false;
        });
      } catch (error) {
        console.log("Message remove failed with error:", error);
      }
    },
    /**
     * Appends a message to the message list
     */
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
    /**
     * Prepends a message to the message list
     * @param {*} messages
     */
    prependMessages(messages = []) {
      this.scrollToBottom = false;
      this.messageList = [...messages, ...(this.messageList || [])];
    },
    /**
     * Updates entire message list
     * @param {*} messages
     */
    updateMessages(messages = []) {
      this.scrollToBottom = false;
      this.messageList = [...messages];
    },
    /**
     * Updates message to edit
     * @param {*} message
     */
    editMessage(message = []) {
      this.messageToBeEdited = message;
    },
    /**
     * Clear edit preview
     */
    clearEditPreview() {
      this.messageToBeEdited = null;
    },
    /**
     * Helper function to find a message
     * @param {*} message message to be found
     * @param {*} callback function to call when message is found
     */
    findMessage(message, callback) {
      const messageList = [...this.messageList];

      let messageKey = messageList.findIndex((m) => m.id === message.id);

      if (messageKey > -1) {
        callback(messageKey, messageList);
      }
    },
  },
};
