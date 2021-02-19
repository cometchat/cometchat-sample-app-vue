<template>
  <div>
    <comet-chat-backdrop :show="open" @click="emitEvent('close')" />
    <div :style="styles.modalWrapper" class="cometchat__modal__banmembers">
      <span :style="styles.modalClose" @click="emitEvent('close')"></span>
      <div :style="styles.modalBody">
        <table :style="styles.modalTable">
          <caption :style="styles.tableCaption">
            {{
              STRINGS.BANNED_MEMBERS
            }}
          </caption>
          <thead>
            <tr :style="styles.modalTable.tr">
              <th :style="styles.modalTable.th">Name</th>
              <th
                :style="{ ...styles.modalTable.th, ...styles.roleColumn }"
                class="tablehead__rolecolumn"
              >
                {{ STRINGS.SCOPE }}
              </th>
              <th :style="{ ...styles.modalTable.th, ...styles.actionColumn }">
                {{ STRINGS.UNBAN }}
              </th>
            </tr>
          </thead>
          <caption
            :style="styles.contactMsg"
            v-if="bannedMembersList.length === 0"
          >
            <p :style="styles.contactMsgTxt">{{ decoratorMessage }}</p>
          </caption>
          <tbody :style="styles.tableBody" @scroll="scrollHandler">
            <template v-for="(member, i) in bannedMembersList">
              <comet-chat-ban-group-member-list-item
                :key="i"
                :item="item"
                :theme="theme"
                :member="member"
                :logged-in-user="loggedInUser"
                @action="memberUpdateHandler"
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

import { cometChatCommon } from "../../../mixins/";

import { CometChatBackdrop } from "../../Shared/";
import CometChatBanGroupMemberListItem from "../CometChatBanGroupMemberListItem/CometChatBanGroupMemberListItem";

import * as style from "./style";

import clearIcon from "./resources/close.png";

/**
 * Displays list of banned group members.
 *
 * @displayName CometChatBanGroupMemberList
 */
export default {
  name: "CometChatBanGroupMemberList",
  mixins: [cometChatCommon],
  components: {
    CometChatBackdrop,
    CometChatBanGroupMemberListItem,
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
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
    /**
     * List of banned group members.
     */
    bannedMembersList: { ...DEFAULT_ARRAY_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        tableBody: style.tableBodyStyle(),
        modalBody: style.modalBodyStyle(),
        contactMsg: style.contactMsgStyle(),
        roleColumn: style.roleColumnStyle(),
        actionColumn: style.actionColumnStyle(),
        tableCaption: style.tableCaptionStyle(),
        modalClose: style.modalCloseStyle(clearIcon),
        modalTable: style.modalTableStyle(this.theme),
        contactMsgTxt: style.contactMsgTxtStyle(this.theme),
        modalWrapper: style.modalWrapperStyle(this.theme, this.open),
      };
    },
    /**
     * Computed decorator message.
     */
    decoratorMessage() {
      return this.bannedMembersList.length === 0
        ? COMETCHAT_CONSTANTS.NO_BANNED_MEMBERS_FOUND
        : COMETCHAT_CONSTANTS.LOADING_MESSSAGE;
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
     * Unbans a member
     */
    async unbanMember(memberToUnBan) {
      try {
        const guid = this.item.guid;
        const response = await CometChat.unbanGroupMember(
          guid,
          memberToUnBan.uid
        );

        if (response) {
          this.emitAction("unbanGroupMembers", { members: [memberToUnBan] });
        }
      } catch (error) {
        this.logError("Group member banning failed with error", error);
      }
    },
    /**
     * Handles action emitted by list item
     */
    memberUpdateHandler({ action, member }) {
      switch (action) {
        case "unBan":
          this.unbanMember(member);
          break;
        default:
          break;
      }
    },
    /**
     * Handles list scroll
     */
    scrollHandler(e) {
      try {
        const bottom =
          Math.round(
            e.currentTarget.scrollHeight - e.currentTarget.scrollTop
          ) === Math.round(e.currentTarget.clientHeight);

        if (bottom) {
          this.emitAction("fetchBannedMembers");
        }
      } catch (error) {
        this.logError("Error in scroll", error);
      }
    },
  },
};
</script>
<style scoped>
@media (min-width: 320px) and (max-width: 767px) {
  .cometchat__modal__banmembers {
    width: 100% !important;
    height: 100% !important;
  }
  .tablehead__rolecolumn {
    width: 115px !important;
  }
}
</style>