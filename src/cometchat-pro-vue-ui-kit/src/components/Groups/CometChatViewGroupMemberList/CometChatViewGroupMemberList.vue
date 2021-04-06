<template>
  <div>
    <comet-chat-backdrop :show="open" @click="closeModal" />
    <div :style="styles.modalWrapper" class="modal__viewmembers">
      <span title="Close" :style="styles.modalClose" @click="closeModal"></span>
      <div :style="styles.modalBody">
        <table :style="styles.modalTable">
          <caption :style="styles.tableCaption">
            {{
              STRINGS.GROUP_MEMBERS
            }}
          </caption>
          <thead>
            <tr :style="styles.modalTable.tr">
              <th :style="styles.modalTable.tr.th">{{ STRINGS.NAME }}</th>
              <th :style="styles.modalTable.tr.th" class="viemembers__scope">
                {{ STRINGS.SCOPE }}
              </th>
              <template v-if="canEdit">
                <th
                  :style="{
                    ...styles.modalTable.tr.th,
                    ...styles.actionColumn,
                  }"
                  class="viemembers__actions"
                >
                  {{ STRINGS.BAN }}
                </th>
                <th
                  :style="{
                    ...styles.modalTable.tr.th,
                    ...styles.actionColumn,
                  }"
                  class="viemembers__actions"
                >
                  {{ STRINGS.KICK }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody :style="styles.tableBody" @scroll="scrollHandler">
            <template v-for="(member, i) in membersList">
              <comet-chat-view-group-member-list-item
                :key="i"
                :item="item"
                :theme="theme"
                :member="member"
                :logged-in-user="loggedInUser"
                @action="updateMembersHandler"
              />
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_ARRAY_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { cometChatCommon, propertyCheck } from "../../../mixins/";

import { CometChatBackdrop } from "../../Shared/";
import CometChatViewGroupMemberListItem from "../CometChatViewGroupMemberListItem/CometChatViewGroupMemberListItem";

import clearIcon from "./resources/close.png";

import * as style from "./style";

/**
 * Displays list of group members.
 *
 * @displayName CometChatViewGroupMemberList
 */
export default {
  name: "CometChatViewGroupMemberList",
  mixins: [cometChatCommon, propertyCheck],
  components: {
    CometChatBackdrop,
    CometChatViewGroupMemberListItem,
  },
  props: {
    /**
     * The selected chat item object.
     */
    item: { ...DEFAULT_OBJECT_PROP },
    /**
     * Opens the modal.
     */
    open: { ...DEFAULT_BOOLEAN_PROP },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * List of all members.
     */
    membersList: { ...DEFAULT_ARRAY_PROP },
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
        modalBody: style.modalBodyCtyle(),
        tableBody: style.tableBodyStyle(),
        tableCaption: style.tableCaptionStyle(),
        actionColumn: style.actionColumnStyle(),
        modalClose: style.modalCloseStyle(clearIcon),
        modalTable: style.modalTableStyle(this.theme),
        modalWrapper: style.modalWrapperStyle(this.theme, this.open),
      };
    },
    /**
     * Returns if user can edit scope(ban/kick) members.
     */
    canEdit() {
      let flag = false;

      if (this.item.scope !== CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
        flag = true;
      }

      return flag;
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
     * Closes modal
     */
    closeModal() {
      this.emitEvent("close");
    },
    /**
     * Handler for group member list scroll
     */
    scrollHandler(e) {
      try {
        const bottom =
          Math.round(
            e.currentTarget.scrollHeight - e.currentTarget.scrollTop
          ) === Math.round(e.currentTarget.clientHeight);

        if (bottom) {
          this.emitAction("fetchGroupMembers");
        }
      } catch (error) {
        this.logError("Error in group member scroll ", error);
      }
    },
    /**
     * Handler for emitted action events
     */
    updateMembersHandler({ action, member, scope }) {
      switch (action) {
        case "ban":
          this.banMember(member);
          break;
        case "kick":
          this.kickMember(member);
          break;
        case "changeScope":
          this.changeScope(member, scope);
          break;
        default:
          break;
      }
    },
    /**
     * Bans a member
     */
    async banMember(memberToBan) {
      try {
        const guid = this.item.guid;

        const response = await CometChat.banGroupMember(guid, memberToBan.uid);

        if (response) {
          this.emitAction("removeGroupParticipants", { member: memberToBan });
        }
      } catch (error) {
        this.logError("banGroupMember failed with error: ", error);
      }
    },
    /**
     * Kicks a member
     */
    async kickMember(memberToKick) {
      try {
        const guid = this.item.guid;
        const response = await CometChat.kickGroupMember(
          guid,
          memberToKick.uid
        );

        if (response) {
          this.emitAction("removeGroupParticipants", { member: memberToKick });
        }
      } catch (error) {
        this.logError("kickGroupMember failed with error: ", error);
      }
    },
    /**
     * Changes scope of a member
     */
    async changeScope(member, scope = "participant") {
      try {
        const guid = this.item.guid;

        const response = await CometChat.updateGroupMemberScope(
          guid,
          member.uid,
          scope
        );

        if (response) {
          const updatedMember = Object.assign({}, member, { scope: scope });
          this.emitAction("updateGroupParticipants", { member: updatedMember });
        }
      } catch (error) {
        this.logError("updateGroupMemberScope failed with error: ", error);
      }
    },
  },
};
</script>
<style scoped>
@media (min-width: 320px) and (max-width: 767px) {
  .modal__viewmembers {
    width: 100% !important;
    height: 100% !important;
  }
  .viemembers__scope {
    width: 170px;
  }
  .viemembers__actions {
    width: 55px !important;
  }
}
</style>