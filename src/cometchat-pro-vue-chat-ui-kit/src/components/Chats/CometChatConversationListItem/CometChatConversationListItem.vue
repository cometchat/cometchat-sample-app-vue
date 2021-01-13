<template>
  <div class="chat__item--hover" :style="styles.list" @click="itemClickHandler">
    <div :style="styles.thumbnail">
      <comet-chat-avatar
        border-width="1px"
        corner-radius="18px"
        :image="getAvatar()"
        :border-color="theme.borderColor.primary"
      />
      <comet-chat-user-presence
        border-width="1px"
        corner-radius="50%"
        :border-color="theme.borderColor.primary"
        :status="conversation.conversationWith.status"
        v-if="conversation.conversationType === 'user'"
      />
    </div>
    <div :style="styles.detail">
      <div :style="styles.row">
        <div
          :style="styles.name"
          @mouseenter="toggleTooltip($event, true)"
          @mouseleave="toggleTooltip($event, false)"
        >
          {{ conversation.conversationWith.name }}
        </div>
        <span
          :style="styles.lastMsgTime"
          class="item__details__timestamp"
          v-if="conversation.lastMessage"
          >{{ getLastMessageTime() }}</span
        >
      </div>
      <div :style="styles.row">
        <div
          :style="styles.lastMsg"
          @mouseenter="toggleTooltip($event, true)"
          @mouseleave="toggleTooltip($event, false)"
        >
          {{ getLastMessage() }}
        </div>
        <comet-chat-badge-count
          :theme="theme"
          :count="conversation.unreadMessageCount"
        />
      </div>
    </div>
  </div>
</template>
<script>
import dateFormat from "dateformat";
import { CometChat } from "@cometchat-pro/chat";

import {
  STRING_MESSAGES,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import { cometChatCommon, propertyCheck, tooltip } from "../../../mixins/";
import * as enums from "../../../util/enums.js";

import {
  CometChatAvatar,
  CometChatBadgeCount,
  CometChatUserPresence,
} from "../../Shared/";

import * as style from "./style";

export default {
  name: "CometChatConversationListItem",
  mixins: [tooltip, propertyCheck, cometChatCommon],
  components: {
    CometChatAvatar,
    CometChatBadgeCount,
    CometChatUserPresence,
  },
  props: {
    theme: { ...DEFAULT_OBJECT_PROP },
    config: { ...DEFAULT_OBJECT_PROP },
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
    conversation: { ...DEFAULT_OBJECT_PROP },
    selectedConversation: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    styles() {
      return {
        list: style.listItem(
          this.theme,
          this.conversation,
          this.selectedConversation
        ),
        row: style.itemRowStyle(),
        name: style.itemNameStyle(),
        detail: style.itemDetailStyle(),
        thumbnail: style.itemThumbnailStyle(),
        lastMsg: style.itemLastMsgStyle(this.theme),
        lastMsgTime: style.itemLastMsgTimeStyle(this.theme),
      };
    },
  },
  methods: {
    itemClickHandler() {
      this.emitEvent("click", {
        item: this.conversation.conversationWith,
        type: this.conversation.conversationType,
      });
    },
    getAvatar() {
      let avatar;
      if (this.conversation.conversationType === "user") {
        avatar = this.conversation.conversationWith.avatar;
      } else if (this.conversation.conversationType === "group") {
        avatar = this.conversation.conversationWith.icon;
      }
      return avatar;
    },
    getLastMessageTime() {
      if (!this.conversation) {
        return false;
      }

      if (this.hasProperty(this.conversation, "lastMessage") === false) {
        return false;
      }

      if (this.hasProperty(this.conversation.lastMessage, "sentAt") === false) {
        return false;
      }

      let timestamp = null;

      const messageTimestamp = new Date(
        this.conversation.lastMessage.sentAt * 1000
      );
      const currentTimestamp = Date.now();

      const diffTimestamp = currentTimestamp - messageTimestamp;

      if (diffTimestamp < 24 * 60 * 60 * 1000) {
        timestamp = dateFormat(messageTimestamp, "shortTime");
      } else if (diffTimestamp < 48 * 60 * 60 * 1000) {
        timestamp = STRING_MESSAGES.YESTERDAY;
      } else if (diffTimestamp < 7 * 24 * 60 * 60 * 1000) {
        timestamp = dateFormat(messageTimestamp, "dddd");
      } else {
        timestamp = dateFormat(messageTimestamp, "dd/mm/yyyy");
      }

      return timestamp;
    },
    getLastMessage() {
      if (!this.conversation.lastMessage) return "";

      const lastMessage = this.conversation.lastMessage;

      let message = null;
      if (this.hasProperty(lastMessage, "deletedAt")) {
        message =
          this.loggedInUser.uid === lastMessage.sender.uid
            ? STRING_MESSAGES.YOU_DELETED_THIS_MESSAGE
            : STRING_MESSAGES.THIS_MESSAGE_DELETED;
      } else {
        switch (lastMessage.category) {
          case "message":
            message = this.getMessage(lastMessage);
            break;
          case "call":
            message = this.getCallMessage(lastMessage);
            break;
          case "action":
            message = lastMessage.message;
            break;
          case "custom":
            message = this.getCustomMessage(lastMessage);
            break;
          default:
            break;
        }
      }
      return message;
    },
    getMessage(lastMessage) {
      let message = "";
      switch (lastMessage.type) {
        case CometChat.MESSAGE_TYPE.TEXT:
          message = lastMessage.text;
          break;
        case CometChat.MESSAGE_TYPE.MEDIA:
          message = STRING_MESSAGES.MEDIA_MESSAGE;
          break;
        case CometChat.MESSAGE_TYPE.IMAGE:
          message = STRING_MESSAGES.MESSAGE_IMAGE;
          break;
        case CometChat.MESSAGE_TYPE.FILE:
          message = STRING_MESSAGES.MESSAGE_FILE;
          break;
        case CometChat.MESSAGE_TYPE.VIDEO:
          message = STRING_MESSAGES.MESSAGE_VIDEO;
          break;
        case CometChat.MESSAGE_TYPE.AUDIO:
          message = STRING_MESSAGES.MESSAGE_AUDIO;
          break;
        case CometChat.MESSAGE_TYPE.CUSTOM:
          message = STRING_MESSAGES.CUSTOM_MESSAGE;
          break;
        default:
          break;
      }

      return message;
    },
    getCallMessage(lastMessage) {
      let message = "";
      const type = lastMessage.type;

      switch (type) {
        case CometChat.MESSAGE_TYPE.VIDEO:
          message = STRING_MESSAGES.VIDEO_CALL;
          break;
        case CometChat.MESSAGE_TYPE.AUDIO:
          message = STRING_MESSAGES.AUDIO_CALL;
          break;
        default:
          break;
      }

      return message;
    },
    getCustomMessage(lastMessage) {
      let message = "";
      switch (lastMessage.type) {
        case enums.CUSTOM_TYPE_POLL:
          message = STRING_MESSAGES.CUSTOM_MESSAGE_POLL;
          break;
        case enums.CUSTOM_TYPE_STICKER:
          message = STRING_MESSAGES.CUSTOM_MESSAGE_STICKER;
          break;
        case enums.CUSTOM_TYPE_DOCUMENT:
          message = STRING_MESSAGES.CUSTOM_MESSAGE_DOCUMENT;
          break;
        default:
          break;
      }

      return message;
    },
  },
};
</script>
<style scoped>
.chat__item--hover:hover {
  background-color: var(--chat-item-bg-color-hover);
}
</style>