<template>
  <ul
    v-if="canShowTooltip"
    class="message__actions"
    :style="styles.messageAction"
  >
    <li :style="styles.actionGroup">
      <button
        type="button"
        :style="styles.groupButtonReact"
        :data-title="STRINGS.ADD_REACTION"
        @mouseenter="toggleTooltip($event, true)"
        @mouseleave="toggleTooltip($event, false)"
        @click="emitAction('reactToMessage', { message })"
      />
    </li>
    <li :style="styles.actionGroup">
      <button
        type="button"
        v-if="canShowThread"
        :style="styles.groupButtonReply"
        :data-title="
          message.replyCount ? STRINGS.REPLY_TO_THREAD : STRINGS.REPLY_IN_THREAD
        "
        @mouseenter="toggleTooltip($event, true)"
        @mouseleave="toggleTooltip($event, false)"
        @click="emitAction('viewMessageThread', { message })"
      />
    </li>
    <li :style="styles.actionGroup">
      <button
        type="button"
        v-if="canShowEdit"
        :style="styles.groupButtonEdit"
        :data-title="STRINGS.EDIT_MESSAGE"
        @mouseenter="toggleTooltip($event, true)"
        @mouseleave="toggleTooltip($event, false)"
        @click="emitAction('editMessage', { message })"
      />
    </li>
    <li :style="styles.actionGroup">
      <button
        type="button"
        v-if="canShowDelete"
        :style="styles.groupButtonDelete"
        :data-title="STRINGS.DELETE_MESSAGE"
        @mouseenter="toggleTooltip($event, true)"
        @mouseleave="toggleTooltip($event, false)"
        @click="emitAction('deleteMessage', { message })"
      />
    </li>
  </ul>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  STRING_MESSAGES,
  DEFAULT_OBJECT_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { cometChatCommon, propertyCheck, tooltip } from "../../../mixins/";

import deleteIcon from "./resources/deletemessage.png";
import reactIcon from "./resources/add-reaction.svg";
import replyIcon from "./resources/startThread.png";
import editIcon from "./resources/edit.png";

import * as style from "./style";

export default {
  name: "CometChatMessageActions",
  mixins: [propertyCheck, cometChatCommon, tooltip],
  props: {
    theme: { ...DEFAULT_OBJECT_PROP },
    message: { ...DEFAULT_OBJECT_PROP },
    isGroup: { ...DEFAULT_BOOLEAN_PROP },
    widgetconfig: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    styles() {
      return {
        actionGroup: style.actionGroupStyle(),
        groupButtonEdit: style.groupButtonStyle(editIcon, "edit"),
        groupButtonReply: style.groupButtonStyle(replyIcon, "reply"),
        groupButtonReact: style.groupButtonStyle(reactIcon, "react"),
        groupButtonDelete: style.groupButtonStyle(deleteIcon, "delete"),
        messageAction: style.messageActionStyle(
          this.message,
          this.theme,
          this.isGroup
        ),
      };
    },
    STRINGS() {
      return STRING_MESSAGES;
    },
    canShowThread() {
      let flag = true;

      if (this.message.parentMessageId) {
        flag = false;
      }

      return flag;
    },
    canShowEdit() {
      let flag = true;

      if (
        this.message.messageFrom === "receiver" ||
        this.message.type !== CometChat.MESSAGE_TYPE.TEXT
      ) {
        flag = false;
      }

      return flag;
    },
    canShowDelete() {
      let flag = true;

      if (this.message.messageFrom === "receiver") {
        flag = false;
      }

      return flag;
    },
    canShowTooltip() {
      return !this.canShowThread && !this.canShowEdit && !this.canShowDelete
        ? false
        : true;
    },
  },
};
</script>