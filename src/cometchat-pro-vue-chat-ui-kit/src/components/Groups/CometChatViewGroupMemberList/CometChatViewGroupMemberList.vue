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
  STRING_MESSAGES,
  DEFAULT_ARRAY_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { cometChatCommon, propertyCheck } from "../../../mixins/";

import { CometChatBackdrop } from "../../Shared/";
import CometChatViewGroupMemberListItem from "../CometChatViewGroupMemberListItem/CometChatViewGroupMemberListItem";

import clearIcon from "./resources/close.png";

import * as style from "./style";

export default {
  name: "CometChatViewGroupMemberList",
  mixins: [cometChatCommon, propertyCheck],
  components: {
    CometChatBackdrop,
    CometChatViewGroupMemberListItem,
  },
  props: {
    item: { ...DEFAULT_OBJECT_PROP },
    open: { ...DEFAULT_BOOLEAN_PROP },
    theme: { ...DEFAULT_OBJECT_PROP },
    membersList: { ...DEFAULT_ARRAY_PROP },
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
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
    canEdit() {
      let flag = false;

      if (this.item.scope !== CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
        flag = true;
      }

      return flag;
    },
    STRINGS() {
      return STRING_MESSAGES;
    },
  },
  methods: {
    closeModal() {
      this.emitEvent("close");
    },
    scrollHandler(e) {
      const bottom =
        Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
        Math.round(e.currentTarget.clientHeight);

      if (bottom) {
        this.emitAction("fetchGroupMembers");
      }
    },
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
    async banMember(memberToBan) {
      try {
        const guid = this.item.guid;

        const response = await CometChat.banGroupMember(guid, memberToBan.uid);

        if (response) {
          this.emitAction("removeGroupParticipants", { member: memberToBan });
        }
      } catch (error) {
        console.log("banGroupMember failed with error: ", error);
      }
    },
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
        console.log("kickGroupMember failed with error: ", error);
      }
    },
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
        console.log("updateGroupMemberScope failed with error: ", error);
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