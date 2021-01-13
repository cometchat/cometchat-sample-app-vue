<template>
  <tr :style="styles.tableRow" class="banmembers__table__row">
    <td
      :style="styles.tableRow.td"
      @mouseenter="toggleTooltip($event, true)"
      @mouseleave="toggleTooltip($event, false)"
    >
      <div :style="styles.avatar">
        <comet-chat-avatar
          border-width="1px"
          corner-radius="50%"
          :image="member.avatar"
          :border-color="theme.borderColor.primary"
        />
        <comet-chat-user-presence
          border-width="1px"
          corner-radius="50%"
          :status="member.status"
          :border-color="theme.borderColor.primary"
        />
      </div>
      <div :style="styles.name">{{ member.name }}</div>
    </td>
    <td :style="{ ...styles.tableRow.td, ...styles.role }">
      {{ roles[member.scope] }}
    </td>
    <td :style="{ ...styles.tableRow.td, ...styles.action }">
      <img
        v-if="canUnBan"
        :src="unbanImage"
        :alt="STRINGS.UNBAN"
        :style="styles.action.img"
        @click="emitAction('unBan', { member })"
      />
    </td>
  </tr>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  STRING_MESSAGES,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import { cometChatCommon, tooltip } from "../../../mixins/";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import * as style from "./style";

import unban from "./resources/block.png";

export default {
  name: "CometChatBanGroupMemberListItem",
  mixins: [tooltip, cometChatCommon],
  components: {
    CometChatAvatar,
    CometChatUserPresence,
  },
  props: {
    item: { ...DEFAULT_OBJECT_PROP },
    theme: { ...DEFAULT_OBJECT_PROP },
    member: { ...DEFAULT_OBJECT_PROP },
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    styles() {
      return {
        name: style.nameStyle(),
        role: style.roleStyle(),
        action: style.actionStyle(),
        avatar: style.avatarStyle(),
        tableRow: style.tableRowStyle(this.theme),
      };
    },
    STRINGS() {
      return STRING_MESSAGES;
    },
    unbanImage() {
      return unban;
    },
    roles() {
      return {
        [CometChat.GROUP_MEMBER_SCOPE.ADMIN]: STRING_MESSAGES.ADMINISTRATOR,
        [CometChat.GROUP_MEMBER_SCOPE.MODERATOR]: STRING_MESSAGES.MODERATOR,
        [CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT]: STRING_MESSAGES.PARTICIPANT,
      };
    },
    canUnBan() {
      let unBan = true;

      if (
        this.item.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR &&
        (this.member.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN ||
          this.member.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR)
      ) {
        unBan = false;
      }

      if (
        this.item.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN &&
        this.member.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN
      ) {
        if (this.item.owner !== this.loggedInUser.uid) {
          unBan = false;
        }
      }

      return unBan;
    },
  },
};
</script>