<template>
  <div :style="sharedStyle.section">
    <h6 :style="sharedStyle.sectionHeader">{{ STRINGS.SHARED_MEDIA }}</h6>
    <div :style="sharedStyle.sectionContent" data-id="sharedmedia">
      <div :style="sharedStyle.mediaBtn">
        <span
          class="sharedmedia__button"
          :style="sharedStyle.imageButton"
          @click="mediaClickHandler('image')"
        >
          {{ STRINGS.PHOTOS }}
        </span>
        <span
          class="sharedmedia__button"
          :style="sharedStyle.videoButton"
          @click="mediaClickHandler('video')"
        >
          {{ STRINGS.VIDEOS }}
        </span>
        <span
          class="sharedmedia__button"
          :style="sharedStyle.fileButton"
          @click="mediaClickHandler('file')"
        >
          {{ STRINGS.DOCUMENT }}
        </span>
      </div>
      <div
        ref="messageContainer"
        :style="sharedStyle.mediaItem"
        @scroll="scrollHandler"
      >
        <template v-if="loading">
          <div :style="sharedStyle.message">{{ STRINGS.LOADING_MESSSAGE }}</div>
        </template>
        <template v-if="messageList.length">
          <template v-for="(message, key) in messageList">
            <div
              :key="key"
              :id="message.id"
              :style="sharedStyle.imageItem"
              v-if="messageType === 'image' && message.data.url"
            >
              <img
                :style="sharedStyle.imageItem.image"
                :alt="STRINGS.MEDIA_ITEM"
                :src="message.data.url"
              />
            </div>
            <div
              :key="key"
              :id="message.id"
              :style="sharedStyle.videoItem"
              v-if="messageType === 'video' && message.data.url"
            >
              <video
                :style="sharedStyle.videoItem.video"
                :src="message.data.url"
              />
            </div>
            <div
              :key="key"
              :id="message.id"
              :style="sharedStyle.fileItem"
              v-if="messageType === 'file' && message.data.attachments"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                class="sharedmedia__button__anchor"
                :style="sharedStyle.fileItem.anchor"
                :href="message.data.attachments[0].url"
                >{{ message.data.attachments[0].name }}</a
              >
            </div>
          </template>
        </template>
        <template v-else>
          <div v-if="!loading" :style="sharedStyle.message">
            {{ STRINGS.ERROR_NO_RECORDS }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import {
  STRING_MESSAGES,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import { CometChatManager } from "../../../util/controller";
import { SharedMediaManager } from "./controller";

import * as enums from "../../../util/enums.js";

import * as style from "./style";

import fileIcon from "./resources/file-blue.svg";

let sharedMediaManager;

export default {
  name: "CometChatSharedMediaView",
  props: {
    item: { ...DEFAULT_OBJECT_PROP },
    type: { ...DEFAULT_STRING_PROP },
    theme: { ...DEFAULT_OBJECT_PROP },
    containerHeight: { ...DEFAULT_STRING_PROP },
  },
  data() {
    return {
      messageType: "image",
      messageList: [],
      loading: false,
    };
  },
  watch: {
    messageType: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.messageList = [];
          this.refreshManager();
        }
      },
    },
  },
  computed: {
    sharedStyle() {
      return {
        mediaBtn: style.mediaBtnStyle(),
        mediaItem: style.mediaItemStyle(),
        message: style.messageStyle(this.theme),
        sectionContent: style.sectionContentStyle(),
        section: style.sectionStyle(this.containerHeight),
        sectionHeader: style.sectionHeaderStyle(this.theme),
        fileButton: style.buttonStyle(this.messageType, "file"),
        imageButton: style.buttonStyle(this.messageType, "image"),
        videoButton: style.buttonStyle(this.messageType, "video"),
        imageItem: style.itemStyle(this.messageType, this.theme, fileIcon),
        videoItem: style.itemStyle(this.messageType, this.theme, fileIcon),
        fileItem: style.itemStyle(this.messageType, this.theme, fileIcon),
      };
    },
    STRINGS() {
      return STRING_MESSAGES;
    },
  },
  methods: {
    messageUpdateHandler(key, message) {
      console.log("CometChatSharedMediaView :messageUpdateHandler", {
        key,
        message,
      });
      switch (key) {
        case enums.MESSAGE_DELETED:
          this.messageDeleted(message);
          break;
        case enums.MEDIA_MESSAGE_RECEIVED:
          this.messageReceived(message);
          break;
        default:
          break;
      }
    },
    messageDeleted(deletedMessage) {
      const messageType = deletedMessage.data.type;

      if (
        this.type === "group" &&
        deletedMessage.getReceiverType() === "group" &&
        deletedMessage.getReceiver().guid === this.item.guid &&
        messageType === this.messageType
      ) {
        const messageList = [...this.messageList];
        const filteredMessages = messageList.filter(
          (message) => message.id !== deletedMessage.id
        );

        this.messageList = filteredMessages;
        this.scrollToBottom = false;
      }
    },
    messageReceived(message) {
      const messageType = message.data.type;

      if (
        this.type === "group" &&
        message.getReceiverType() === "group" &&
        message.getReceiver().guid === this.item.guid &&
        messageType === this.state.messageType
      ) {
        let messages = [...this.state.messageList];
        messages = messages.concat(message);

        this.messageList = messages;
        this.scrollToBottom = false;
      }
    },
    async getMessages(scrollToBottom = false) {
      if (this.loading) {
        return;
      }

      try {
        this.loading = true;
        const user = await new CometChatManager().getLoggedInUser();

        this.loggedInUser = user;

        if (!sharedMediaManager) {
          this.createManager();
          this.attachListenerToManager();
        }

        const messages = await sharedMediaManager.fetchPreviousMessages();

        this.messageList = [...messages, ...this.messageList];

        if (scrollToBottom) {
          this.scrollToBottom();
        }
      } catch (error) {
        console.error(
          "[CometChatSharedMediaView] getMessages fetchPrevious error",
          error
        );
      } finally {
        this.loading = false;
      }
    },
    scrollHandler(e) {
      const top = Math.round(e.target.scrollTop) === 0;
      if (top && this.messageList.length) {
        this.getMessages();
      }
    },
    mediaClickHandler(type) {
      if (this.loading) {
        return;
      }

      this.messageType = type;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.messageContainer) {
          this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
        }
      });
    },
    createManager() {
      sharedMediaManager = new SharedMediaManager(
        this.item,
        this.type,
        this.messageType
      );
    },
    removeManager() {
      if (sharedMediaManager) {
        sharedMediaManager.removeListeners();
        sharedMediaManager = null;
      }
    },
    attachListenerToManager() {
      sharedMediaManager.attachListeners(this.messageUpdateHandler);
    },
    refreshManager() {
      this.removeManager();
      this.createManager();

      this.getMessages(true);

      this.attachListenerToManager();
    },
  },
  beforeMount() {
    this.refreshManager();
  },
  beforeDestroy() {
    this.removeManager();
  },
};
</script>
<style scoped>
.sharedmedia__button:last-of-type::before {
  display: none;
}
.sharedmedia__button::before {
  content: "";
  top: 6px;
  width: 2px;
  right: -2px;
  height: 16px;
  position: absolute;
  display: var(--button-before-display);
  background-color: rgba(20, 20, 20, 0.12);
}
.sharedmedia__button__anchor:hover,
.sharedmedia__button__anchor:visited {
  color: var(--file-hover-color);
}
</style>