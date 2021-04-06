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
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import { cometChatCommon, tooltip } from "../../../mixins/";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import * as style from "./style";

import unban from "./resources/block.png";

/**
 * List item for ban group member list.
 *
 * @displayName CometChatBanGroupMemberListItem
 */
export default {
  name: "CometChatBanGroupMemberListItem",
  mixins: [tooltip, cometChatCommon],
  components: {
    CometChatAvatar,
    CometChatUserPresence,
  },
  props: {
    /**
     * The selected chat item object.
     */
    item: { ...DEFAULT_OBJECT_PROP },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * Member object.
     */
    member: { ...DEFAULT_OBJECT_PROP },
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        name: style.nameStyle(),
        role: style.roleStyle(),
        action: style.actionStyle(),
        avatar: style.avatarStyle(),
        tableRow: style.tableRowStyle(this.theme),
      };
    },
    /**
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
    /**
     * Unban icon image.
     */
    unbanImage() {
      return unban;
    },
    /**
     * Computed member roles.
     */
    roles() {
      return {
        [CometChat.GROUP_MEMBER_SCOPE.ADMIN]: COMETCHAT_CONSTANTS.ADMINISTRATOR,
        [CometChat.GROUP_MEMBER_SCOPE.MODERATOR]: COMETCHAT_CONSTANTS.MODERATOR,
        [CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT]:
          COMETCHAT_CONSTANTS.PARTICIPANT,
      };
    },
    /**
     * Computes if can unban.
     */
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