<template>
  <tr :style="styles.tableRow">
    <td
      :style="styles.tableColumn"
      @mouseenter="toggleTooltip($event, true)"
      @mouseleave="toggleTooltip($event, false)"
    >
      <div :style="styles.avatar" class="member__list__avatar">
        <comet-chat-avatar
          border-width="1px"
          corner-radius="18px"
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
      <div :style="styles.name" class="member__list__name">
        {{ displayName }}
      </div>
    </td>
    <td class="member__list__scope__column">
      <div :style="styles.scopeWrapper">
        <template v-if="showChangeScope && canChangeScope">
          <select
            :default-value="member.scope"
            :style="styles.scopeSelection"
            @change="scopeChangeHandler"
          >
            <option :value="COMET_CHAT.GROUP_MEMBER_SCOPE.PARTICIPANT">
              {{ roles[COMET_CHAT.GROUP_MEMBER_SCOPE.PARTICIPANT] }}
            </option>
            <option :value="COMET_CHAT.GROUP_MEMBER_SCOPE.MODERATOR">
              {{ roles[COMET_CHAT.GROUP_MEMBER_SCOPE.MODERATOR] }}
            </option>
            <option
              v-if="!isNotAdmin"
              :value="COMET_CHAT.GROUP_MEMBER_SCOPE.ADMIN"
            >
              {{ roles[COMET_CHAT.GROUP_MEMBER_SCOPE.ADMIN] }}
            </option>
          </select>
          <div>
            <img
              :src="icons.done"
              :alt="STRINGS.CHANGE_SCOPE"
              :style="styles.scopeWrapper.img"
              @click="updateMemberScope"
            />
            <img
              :src="icons.clear"
              :alt="STRINGS.CHANGE_SCOPE"
              :style="{
                ...styles.scopeWrapper.img,
                ...styles.scopeWrapper.clear,
              }"
              @click="changeScopeView(false)"
            />
          </div>
        </template>
        <template v-else>
          <span :style="styles.role">
            {{ scopeName }}
          </span>

          <img
            :src="icons.scope"
            v-if="canChangeScope"
            :style="styles.scopeImage"
            :alt="STRINGS.CHANGE_SCOPE"
            @click="changeScopeView(true)"
          />
        </template>
      </div>
    </td>
    <template v-if="canEdit">
      <td :style="styles.actionColumn" class="member__list__action__column">
        <span>
          <img
            :src="icons.ban"
            :alt="STRINGS.BAN"
            v-if="canViewAction"
            :style="styles.actionColumn.img"
            @click="emitAction('ban', { member })"
        /></span>
      </td>
      <td :style="styles.actionColumn" class="member__list__action__column">
        <span>
          <img
            :src="icons.kick"
            :alt="STRINGS.KICK"
            v-if="canViewAction"
            :style="{ ...styles.actionColumn.img, ...styles.actionColumn.kick }"
            @click="emitAction('kick', { member })"
        /></span>
      </td>
    </template>
  </tr>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import { tooltip, propertyCheck, cometChatCommon } from "../../../mixins/";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import * as style from "./style";

import clearIcon from "./resources/close.png";
import kickIcon from "./resources/delete.png";
import scopeIcon from "./resources/edit.png";
import doneIcon from "./resources/done.png";
import banIcon from "./resources/block.png";

/**
 * List item for group member list.
 *
 * @displayName CometChatViewGroupMemberListItem
 */

export default {
  name: "CometChatViewGroupMemberListItem",
  mixins: [tooltip, propertyCheck, cometChatCommon],
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
     * Member item.
     */
    member: { ...DEFAULT_OBJECT_PROP },
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      roles: {},
      scope: "participant",
      showChangeScope: false,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        role: style.roleStyle(),
        scopeImage: style.scopeImageStyle(),
        tableColumn: style.tableColumnStyle(),
        actionColumn: style.actionColumnStyle(),
        scopeWrapper: style.scopeWrapperStyle(),
        tableRow: style.tableRowStyle(this.theme),
        name: style.nameStyle(this.isParticipant),
        scopeSelection: style.scopeSelectionStyle(),
        avatar: style.avatarStyle(this.isParticipant),
      };
    },
    /**
     * Computed scope name.
     */
    scopeName() {
      return this.isOwner
        ? COMETCHAT_CONSTANTS.OWNER
        : this.roles[this.member.scope];
    },
    /**
     * Computed display name.
     */
    displayName() {
      return this.isCurrentUser ? COMETCHAT_CONSTANTS.YOU : this.member.name;
    },
    /**
     * Returns if current member is owner.
     */
    isOwner() {
      return this.item.owner === this.member.uid;
    },
    /**
     * Returns if current member is current user.
     */
    isCurrentUser() {
      return this.loggedInUser.uid === this.member.uid;
    },
    /**
     * Returns if current member is moderator.
     */
    isModerator() {
      return (
        this.item.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR &&
        (this.member.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN ||
          this.member.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR)
      );
    },
    /**
     * Returns if current member is admin but not owner.
     */
    isAdminButNotOwner() {
      return (
        this.item.owner !== this.loggedInUser.uid &&
        this.item.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN &&
        this.member.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN
      );
    },
    /**
     * Returns if current member is not admin.
     */
    isNotAdmin() {
      return (
        this.item.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR &&
        this.member.scope === CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
      );
    },
    /**
     * Returns if current member is participant.
     */
    isParticipant() {
      return this.item.scope === CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
    },
    /**
     * Returns if current member can view actions.
     */
    canViewAction() {
      return !(
        this.isOwner ||
        this.isCurrentUser ||
        this.isModerator ||
        this.isAdminButNotOwner
      );
    },
    /**
     * Returns if current member can change scope.
     */
    canChangeScope() {
      return !(
        this.isOwner ||
        this.isCurrentUser ||
        this.isModerator ||
        this.isAdminButNotOwner ||
        this.isParticipant
      );
    },

    /**
     * Returns if current member can edit(ban/kick).
     */
    canEdit() {
      return this.isParticipant ? false : true;
    },
    /**
     * Icon images.
     */
    icons() {
      return {
        ban: banIcon,
        kick: kickIcon,
        done: doneIcon,
        scope: scopeIcon,
        clear: clearIcon,
      };
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
  },
  methods: {
    /**
     * Updates scope
     */
    scopeChangeHandler(event) {
      this.scope = event.target.value;
    },
    /**
     * Emits changeScope event
     */
    updateMemberScope() {
      this.emitAction("changeScope", {
        member: this.member,
        scope: this.scope,
      });
      this.changeScopeView(false);
    },
    /**
     * Toggles scope icon view
     */
    changeScopeView(value) {
      this.showChangeScope = value;
    },
  },
  beforeMount() {
    this.roles[CometChat.GROUP_MEMBER_SCOPE.ADMIN] =
      COMETCHAT_CONSTANTS.ADMINISTRATOR;
    this.roles[CometChat.GROUP_MEMBER_SCOPE.MODERATOR] =
      COMETCHAT_CONSTANTS.MODERATOR;
    this.roles[CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT] =
      COMETCHAT_CONSTANTS.PARTICIPANT;
  },
};
</script>
<style scoped>
@media (min-width: 320px) and (max-width: 767px) {
  .member__list__avatar {
    display: var(--members-avatar-display) !important;
  }
  .member__list__name {
    width: var(--members-name-width) !important;
  }
  .member__list__scope__column {
    width: 180px !important;
  }
  .member__list__action__column {
    width: 54px !important;
  }
}
</style>