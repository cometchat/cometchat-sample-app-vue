<template>
  <div :style="styles.root">
    <div :style="styles.header">
      <div
        :style="styles.headerClose"
        class="cometchat__header__close"
        @click="emitAction('closeDetailClicked')"
      ></div>
      <h4 :style="styles.headerTitle">{{ STRINGS.DETAILS }}</h4>
    </div>
    <div :style="styles.detailPane">
      <div :style="styles.section">
        <h6 :style="styles.sectionHeader">{{ STRINGS.MEMBERS }}</h6>
        <div
          :style="styles.sectionContent"
          class="cometchat__detailpane__section__content"
        >
          <div :style="styles.contentItem">
            <div :style="styles.itemLink" @click="viewMember = true">
              {{ STRINGS.VIEW_MEMBERS }}
            </div>
          </div>
          <div :style="styles.contentItem" v-if="showAddMembersBtn">
            <div :style="styles.itemLink" @click="addMember = true">
              {{ STRINGS.ADD_MEMBERS }}
            </div>
          </div>
          <div :style="styles.contentItem" v-if="showBannedMembersBtn">
            <div :style="styles.itemLink" @click="banMember = true">
              {{ STRINGS.BANNED_MEMBERS }}
            </div>
          </div>
        </div>
      </div>
      <div :style="styles.section">
        <h6 :style="styles.sectionHeader">{{ STRINGS.OPTIONS }}</h6>
        <div
          :style="styles.sectionContent"
          class="cometchat__detailpane__section__content"
        >
          <div :style="styles.contentItem" v-if="showLeaveGroupBtn">
            <span :style="styles.itemLink" @click="leaveGroup">
              {{ STRINGS.LEAVE_GROUP }}
            </span>
          </div>
          <div :style="styles.contentItem" v-if="showDeleteGroupBtn">
            <span :style="styles.redItemLink" @click="deleteGroup">
              {{ STRINGS.DELETE_AND_EXIT }}
            </span>
          </div>
        </div>
      </div>
      <comet-chat-shared-media-view
        :item="item"
        :type="type"
        :theme="theme"
        container-height="225px"
      />
    </div>
    <comet-chat-view-group-member-list
      :item="item"
      :theme="theme"
      v-if="viewMember"
      :open="viewMember"
      :members-list="membersList"
      :logged-in-user="loggedInUser"
      @close="viewMember = false"
      @action="membersActionHandler"
    />
    <comet-chat-add-group-member-list
      :item="item"
      :theme="theme"
      v-if="addMember"
      :open="addMember"
      :members-list="membersList"
      :logged-in-user="loggedInUser"
      :banned-members-list="bannedMembersList"
      @close="addMember = false"
      @action="membersActionHandler"
    />
    <comet-chat-ban-group-member-list
      :item="item"
      :theme="theme"
      v-if="banMember"
      :open="banMember"
      :logged-in-user="loggedInUser"
      :banned-members-list="bannedMembersList"
      @close="banMember = false"
      @action="membersActionHandler"
    />
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import { propertyCheck, cometChatCommon } from "../../../mixins/";
import { CometChatManager } from "../../../util/controller";
import { SvgAvatar } from "../../../util/svgavatar";
import * as enums from "../../../util/enums.js";

import { GroupDetailManager } from "./controller";

import { CometChatSharedMediaView } from "../../Shared/";

import CometChatViewGroupMemberList from "../CometChatViewGroupMemberList/CometChatViewGroupMemberList";
import CometChatAddGroupMemberList from "../CometChatAddGroupMemberList/CometChatAddGroupMemberList";
import CometChatBanGroupMemberList from "../CometChatBanGroupMemberList/CometChatBanGroupMemberList";

import navigateIcon from "./resources/navigate.png";

import * as style from "./style";

let groupDetailManager;

/**
 * Shows group details.
 *
 * @displayName CometChatGroupDetails
 */
export default {
  name: "CometChatGroupDetails",
  mixins: [propertyCheck, cometChatCommon],
  components: {
    CometChatSharedMediaView,
    CometChatAddGroupMemberList,
    CometChatBanGroupMemberList,
    CometChatViewGroupMemberList,
  },
  props: {
    /**
     * The selected chat item object.
     */
    item: { ...DEFAULT_OBJECT_PROP },
    /**
     * The type of chat item.
     */
    type: { ...DEFAULT_STRING_PROP },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      user: {},
      membersList: [],
      loggedInUser: {},
      addMember: false,
      banMember: false,
      viewMember: false,
      moderatorsList: [],
      addModerator: false,
      bannedMembersList: [],
      administratorsList: [],
      addAdministrator: false,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        section: style.sectionStyle(),
        root: style.detailStyle(this.theme),
        detailPane: style.detailPaneStyle(),
        header: style.headerStyle(this.theme),
        contentItem: style.contentItemStyle(),
        headerTitle: style.headerTitleStyle(),
        sectionContent: style.sectionContentStyle(),
        itemLink: style.itemLinkStyle(this.theme, false),
        headerClose: style.headerCloseStyle(navigateIcon),
        redItemLink: style.itemLinkStyle(this.theme, true),
        sectionHeader: style.sectionHeaderStyle(this.theme),
      };
    },
    /**
     * Local string constants.
     */ STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
    /**
     * Returns if current user is group owner.
     */
    isOwner() {
      return this.item.owner === this.loggedInUser.uid;
    },
    /**
     * Returns if current user is group admin.
     */
    isAdmin() {
      return this.item.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN;
    },
    /**
     * Returns if current user is group participant.
     */
    isParticipant() {
      return this.item.scope === CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
    },
    /**
     * Shows add members button.
     */
    showAddMembersBtn() {
      return this.isAdmin;
    },
    /**
     * Shows leave group button.
     */
    showLeaveGroupBtn() {
      return !this.isOwner;
    },
    /**
     * Shows delete group button.
     */
    showDeleteGroupBtn() {
      return this.isAdmin;
    },
    /**
     * Shows banned members button.
     */
    showBannedMembersBtn() {
      return !this.isParticipant;
    },
  },
  methods: {
    /**
     * Handles group listener events
     */
    groupUpdateHandler(key, message, group, options) {
      this.logInfo("CometChatGroupDetails: groupUpdateHandler", {
        key,
        message,
        group,
        options,
      });
      if (this.item.guid !== group.guid) {
        return false;
      }

      const isActionFromHere = message.actionBy.uid === this.loggedInUser.uid;

      switch (key) {
        case enums.USER_ONLINE:
        case enums.USER_OFFLINE:
          this.groupMemberUpdated(options.user);
          break;
        case enums.GROUP_MEMBER_ADDED:
        case enums.GROUP_MEMBER_JOINED:
          {
            const member = options.user;
            this.setAvatar(member);

            const updatedMember = Object.assign({}, member, {
              scope: CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
            });

            this.addParticipants([updatedMember], message, isActionFromHere);
          }
          break;
        case enums.GROUP_MEMBER_LEFT:
        case enums.GROUP_MEMBER_KICKED:
          {
            const member = options.user;
            this.removeParticipants(member, true);
          }
          break;
        case enums.GROUP_MEMBER_BANNED:
          {
            const member = this.getMember(options.user);
            this.logError(member);
            if (member) {
              this.setAvatar(member);
              this.banMembers([member]);
              this.removeParticipants(member, true);
            }
          }
          break;
        case enums.GROUP_MEMBER_UNBANNED:
          {
            const member = options.user;
            this.unbanMembers([member], message, isActionFromHere);
          }
          break;
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
          {
            const member = options.user;
            const updatedMember = Object.assign({}, member, {
              scope: options["scope"],
            });
            this.updateParticipants(updatedMember, message);
          }
          break;
        default:
          break;
      }
    },
    /**
     * Handles emitted action events
     */
    membersActionHandler({ action, member, members }) {
      switch (action) {
        case "banGroupMembers":
          this.banMembers(members);
          break;
        case "unbanGroupMembers":
          this.unbanMembers(members);
          break;
        case "addGroupParticipants":
          this.addParticipants(members);
          break;
        case "removeGroupParticipants":
          this.removeParticipants(member);
          break;
        case "updateGroupParticipants":
          this.updateParticipants(member);
          break;
        case "fetchGroupMembers":
          this.getGroupMembers();
          break;
        case "fetchBannedMembers":
          this.getBannedGroupMembers();
          break;
        default:
          break;
      }
    },
    /**
     * Gets a given member
     */
    getMember(member) {
      return this.membersList.find((m) => m.uid === member.uid);
    },
    /**
     * Updates group members
     */
    groupMemberUpdated(member) {
      try {
        let memberlist = [...this.membersList];
        let memberKey = memberlist.findIndex((m) => m.uid === member.uid);
        if (memberKey > -1) {
          let memberObj = memberlist[memberKey];
          let newMemberObj = Object.assign({}, memberObj, member);
          memberlist.splice(memberKey, 1, newMemberObj);

          this.membersList = memberlist;
        }

        let bannedmemberlist = [...this.bannedMembersList];
        let bannedMemberKey = bannedmemberlist.findIndex(
          (m) => m.uid === member.uid
        );
        if (bannedMemberKey > -1) {
          let bannedMemberObj = bannedmemberlist[bannedMemberKey];
          let newBannedMemberObj = Object.assign({}, bannedMemberObj, member);
          bannedmemberlist.splice(bannedMemberKey, 1, newBannedMemberObj);

          this.bannedMembersList = bannedmemberlist;
        }
      } catch (error) {
        this.logError("Error updating group member", error);
      }
    },
    /**
     * Adds new members to banned list
     */
    banMembers(members = []) {
      this.bannedMembersList = [...this.bannedMembersList, ...members];
    },
    /**
     * Removes members from banned list
     */
    unbanMembers(members, message, triggerUpdate = true) {
      try {
        const bannedMembers = [...this.bannedMembersList];
        const unbannedMembers = [];

        const filteredBannedMembers = bannedMembers.filter((bannedmember) => {
          const found = members.find(
            (member) => bannedmember.uid === member.uid
          );
          if (found) {
            unbannedMembers.push(found);
            return false;
          }
          return true;
        });

        if (triggerUpdate) {
          this.emitAction("memberUnbanned", {
            members: unbannedMembers,
            message,
          });
        }

        this.bannedMembersList = filteredBannedMembers;
      } catch (error) {
        this.logError("Error unbanning group members", error);
      }
    },
    /**
     * Adds new participants to group
     */
    addParticipants(members, message, isActionFromHere = true) {
      try {
        const memberlist = [...this.membersList, ...members];

        this.membersList = memberlist;

        if (isActionFromHere) {
          this.emitAction("membersAdded", { members, message });
        }

        this.emitAction("membersUpdated", {
          item: this.item,
          count: memberlist.length,
        });
      } catch (error) {
        this.logError("Error adding participants to group", error);
      }
    },
    /**
     * Removes participants from group
     */
    removeParticipants(member, triggerUpdate = true) {
      try {
        const groupmembers = [...this.membersList];
        const filteredMembers = groupmembers.filter((groupmember) => {
          if (groupmember && groupmember.uid === member.uid) {
            return false;
          }
          return true;
        });

        this.membersList = filteredMembers;

        if (triggerUpdate) {
          this.emitAction("membersUpdated", {
            item: this.item,
            count: filteredMembers.length,
          });
        }
      } catch (error) {
        this.logError("Error removing participants from group", error);
      }
    },
    /**
     * Update participants of group
     */
    updateParticipants(updatedMember, message) {
      try {
        const memberlist = [...this.membersList];

        const memberKey = memberlist.findIndex(
          (member) => member.uid === updatedMember.uid
        );
        if (memberKey > -1) {
          const memberObj = memberlist[memberKey];
          const newMemberObj = Object.assign({}, memberObj, updatedMember, {
            scope: updatedMember["scope"],
          });

          memberlist.splice(memberKey, 1, newMemberObj);

          this.emitAction("memberScopeChanged", {
            members: [newMemberObj],
            message,
          });

          this.membersList = memberlist;
        }
      } catch (error) {
        this.logError("Error updating participants of group", error);
      }
    },
    /**
     * Deletes the current selected group
     */
    async deleteGroup() {
      try {
        const guid = this.item.guid;

        await CometChat.deleteGroup(guid);

        this.emitAction("groupDeleted", { group: this.item });
      } catch (error) {
        this.logError("Group delete failed with exception:", error);
      }
    },
    /**
     * Leaves the current selected group
     */
    async leaveGroup() {
      try {
        const guid = this.item.guid;

        await CometChat.leaveGroup(guid);

        this.emitAction("leftGroup", { group: this.item });
      } catch (error) {
        this.logError("Group leaving failed with exception:", error);
      }
    },
    /**
     * Gets group member list
     */
    async getGroupMembers() {
      try {
        const administratorslist = [];
        const moderatorslist = [];

        this.doubleCheckManager();

        const groupMembers = await groupDetailManager.fetchNextGroupMembers();

        groupMembers.forEach((member) => {
          this.setAvatar(member);

          if (member.scope === CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
            administratorslist.push(member);
          }

          if (member.scope === CometChat.GROUP_MEMBER_SCOPE.MODERATOR) {
            moderatorslist.push(member);
          }
        });

        this.membersList = [...this.membersList, ...groupMembers];
        this.administratorsList = [
          ...this.administratorsList,
          ...administratorslist,
        ];
        this.moderatorsList = [...this.moderatorsList, ...moderatorslist];
      } catch (error) {
        console.error(
          "[CometChatGroupDetails] getGroupMembers fetchNextGroupMembers error",
          error
        );
      }
    },
    /**
     * Get banned members list
     */
    async getBannedGroupMembers() {
      if (this.item.scope === CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
        return false;
      }

      try {
        this.doubleCheckManager();

        const bannedMembers = await groupDetailManager.fetchNextBannedGroupMembers();

        bannedMembers.forEach((member) => this.setAvatar(member));

        this.bannedMembersList = [...this.bannedMembersList, ...bannedMembers];
      } catch (error) {
        console.error(
          "[CometChatGroupDetails] getGroupMembers fetchNextGroupMembers error",
          error
        );
      }
    },
    setAvatar(member) {
      if (!member.avatar) {
        const uid = member.uid;
        const char = member.name.charAt(0).toUpperCase();

        member.avatar = SvgAvatar.getAvatar(uid, char);
      }
    },
    doubleCheckManager() {
      if (!groupDetailManager) {
        this.createManager();
        this.attachListeners();
      }
    },
    createManager() {
      groupDetailManager = new GroupDetailManager(this.item.guid);
    },
    attachListeners() {
      if (groupDetailManager) {
        groupDetailManager.attachListeners(this.groupUpdateHandler);
      }
    },
    removeManager() {
      if (groupDetailManager) {
        groupDetailManager.removeListeners();
        groupDetailManager = null;
      }
    },
  },
  beforeMount() {
    this.membersList = [];
    this.moderatorsList = [];
    this.bannedMembersList = [];
    this.administratorsList = [];

    groupDetailManager = new GroupDetailManager(this.item.guid);

    this.getGroupMembers();
    this.getBannedGroupMembers();
    groupDetailManager.attachListeners(this.groupUpdateHandler);

    (async () => {
      try {
        this.loggedInUser = await new CometChatManager().getLoggedInUser();
      } catch (error) {
        this.logError("[CometChatGroupDetails] getLoggedInUser error", error);
      }
    })();
  },
  beforeDestroy() {
    this.removeManager();
  },
};
</script>
<style scoped>
.cometchat__detailpane__section__content:not(:last-of-type) {
  margin-bottom: 16px !important;
}
.cometchat__detailpane__content__item:first-of-type {
  padding-top: 0px !important;
}
.cometchat__detailpane__content__item:last-of-type {
  padding-bottom: 0px !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .cometchat__header__close {
    display: block !important;
  }
}
</style>