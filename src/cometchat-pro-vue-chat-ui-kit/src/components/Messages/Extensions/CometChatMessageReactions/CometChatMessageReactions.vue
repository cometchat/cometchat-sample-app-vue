<template>
  <div ref="emojiPickerRef" :style="styles.wrapper">
    <div
      :title="STRINGS.ADD_REACTION"
      :style="styles.addReactionStyle"
      class="cometchat__message__reaction"
      v-if="messageReactions.length && messageFrom === 'sender'"
    >
      <button
        type="button"
        :style="styles.emojiButton"
        @click="toggleEmojiPicker"
      >
        <span :style="styles.emojiButton.span"></span>
      </button>
    </div>
    <div
      :key="i"
      :title="title"
      :style="reactionStyle"
      class="cometchat__message__reaction"
      v-for="({ name, title, count, reactionStyle }, i) in messageReactions"
    >
      <emoji
        :size="16"
        :emoji="name"
        set="twitter"
        :data="emojiIndex"
        @click="sendReaction"
      />
      <span :style="styles.reactionCount">
        {{ count }}
      </span>
    </div>
    <div
      :title="STRINGS.ADD_REACTION"
      :style="styles.addReactionStyle"
      class="cometchat__message__reaction"
      v-if="messageReactions.length && messageFrom !== 'sender'"
    >
      <button
        type="button"
        :style="styles.emojiButton"
        @click="toggleEmojiPicker"
      >
        <span :style="styles.emojiButton.span"></span>
      </button>
    </div>
    <div
      ref="reactionPicker"
      v-if="showEmojiPicker"
      :style="styles.emojiPicker"
      class="regular__reaction__picker"
    >
      <picker
        set="twitter"
        emoji="point_up"
        :data="emojiIndex"
        :title="STRINGS.PICK_YOUR_EMOJI"
        @select="emojiClicked"
      />
    </div>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";
import data from "emoji-mart-vue-fast/data/all.json";
import { Emoji, Picker, EmojiIndex } from "emoji-mart-vue-fast";

import "emoji-mart-vue-fast/css/emoji-mart.css";

import {
  STRING_MESSAGES,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../../resources/constants";
import { getExtensionsDataFromMessage } from "../../../../util/common";

import * as style from "./style";

import reactIcon from "./resources/add-reaction.svg";

export default {
  name: "CometChatMessageReactions",
  components: {
    Emoji,
    Picker,
  },
  props: {
    theme: { ...DEFAULT_OBJECT_PROP },
    message: { ...DEFAULT_OBJECT_PROP },
    messageFrom: { ...DEFAULT_STRING_PROP },
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      bottomPos: 0,
      showEmojiPicker: false,
      emojiIndex: new EmojiIndex(data),
    };
  },
  computed: {
    styles() {
      return {
        emojiButton: style.emojiButtonStyle(reactIcon),
        wrapper: style.emojiWrapperStyle(this.messageFrom),
        reactionCount: style.reactionCountStyle(this.theme),
        emojiPicker: style.emojiPickerStyle(
          this.messageFrom,
          this.bottomPos,
          this.messageReactions.length
        ),
        addReactionStyle: style.messageReactionsStyle(this.theme, {}, {}),
      };
    },
    STRINGS() {
      return STRING_MESSAGES;
    },
    reactions() {
      return getExtensionsDataFromMessage(this.message, "reactions");
    },
    messageReactions() {
      return Object.keys(this.reactions || {}).map((key) => {
        const reactionData = this.reactions[key];
        const reactionCount = Object.keys(reactionData).length;

        if (!reactionCount) {
          return;
        }

        let userList = [];
        let reactionTitle = "";

        for (const user in reactionData) {
          userList.push(reactionData[user]["name"]);
        }

        if (userList.length) {
          reactionTitle = userList.join(", ");
          reactionTitle = reactionTitle.concat(" reacted");
        }

        return {
          title: reactionTitle,
          count: reactionCount,
          name: key.replaceAll(":", ""),
          reactionStyle: style.messageReactionsStyle(
            this.theme,
            reactionData,
            this.loggedInUser
          ),
        };
      });
    },
  },
  watch: {
    showEmojiPicker(newValue) {
      if (newValue) {
        this.positionPicker();
      } else {
        this.bottomPos = 0;
      }
    },
  },
  methods: {
    emojiClicked(emoji) {
      this.sendReaction(emoji);
    },
    positionPicker() {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.reactionPicker) {
          const node = this.$refs.reactionPicker;

          const { y } = node.getBoundingClientRect();

          if (y < 64) {
            this.bottomPos -= 24;
            this.positionPicker();
          }
        }
      });
    },
    toggleEmojiPicker() {
      if (!this.showEmojiPicker) {
        document.addEventListener("click", this.handleOutsideClick, false);
      } else {
        document.removeEventListener("click", this.handleOutsideClick, false);
      }

      this.showEmojiPicker = !this.showEmojiPicker;
    },
    handleOutsideClick(event) {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.emojiPickerRef) {
          const node = this.$refs.emojiPickerRef;
          const data = event.target.getAttribute("data-title");

          if (
            node.contains(event.target) ||
            data === this.STRINGS.ADD_REACTION
          ) {
            return;
          }

          this.toggleEmojiPicker();
        }
      });
    },
    async sendReaction(emoji) {
      try {
        if (this.showEmojiPicker) {
          this.toggleEmojiPicker();
        }

        await CometChat.callExtension("reactions", "POST", "v1/react", {
          msgId: this.message.id,
          emoji: emoji.colons,
        });
      } catch (error) {
        console.log("Message react failed with error:", error);
      }
    },
  },
};
</script>
<style>
.regular__reaction__picker
  > .emoji-mart
  > .emoji-mart-bar
  > .emoji-mart-preview
  > .emoji-mart-preview-data {
  right: unset !important;
  text-align: left;
}
</style>
<style scoped>
.cometchat__message__reaction:hover {
  border: var(--reaction-hover-border) !important;
}
</style>