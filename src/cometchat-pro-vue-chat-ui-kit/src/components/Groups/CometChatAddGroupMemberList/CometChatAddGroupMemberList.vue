<template>
  <div>
    <comet-chat-backdrop :show="open" @click="emitEvent('close')" />
    <div :style="styles.modalWrapper" class="cometchat__add__members__wrapper">
      <span
        title="Close"
        :style="styles.modalClose"
        @click="emitEvent('close')"
      ></span>
      <div :style="styles.modalBody">
        <table :style="styles.modalTable">
          <caption :style="styles.tableCaption">
            {{
              STRINGS.CONTACTS
            }}
          </caption>
          <caption :style="styles.tableSearch">
            <input
              type="text"
              autoComplete="off"
              placeholder="Search"
              :style="styles.searchInput"
              @input="searchUsers"
            />
          </caption>
          <caption v-if="filteredList.length === 0" :style="styles.contactMsg">
            <p :style="styles.contactMsgTxt">
              {{ decoratorMessage }}
            </p>
          </caption>
          <tbody
            :style="styles.tableBody"
            class="cometchat__add__members__table"
            @scoll="scrollHandler"
          >
            <template v-for="(user, i) in filteredList">
              <comet-chat-add-group-member-list-item
                :key="i"
                :user="user"
                :theme="theme"
                :members="membersList"
                :logged-in-user="loggedInUser"
                @change="membersUpdated"
              />
            </template>
          </tbody>
          <tfoot>
            <tr :style="styles.tableFoot.tr">
              <td colSpan="2" :style="styles.tableFoot.td">
                <button :style="styles.tableFoot.button" @click="updateMembers">
                  {{ membersAdding ? STRINGS.ADDING_MESSSAGE : STRINGS.ADD }}
                </button>
              </td>
            </tr>
          </tfoot>
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

import { cometChatCommon } from "../../../mixins/";

import { CometChatManager } from "../../../util/controller";
import { SvgAvatar } from "../../../util/svgavatar";
import { AddMembersManager } from "./controller";

import CometChatAddGroupMemberListItem from "../CometChatAddGroupMemberListItem/CometChatAddGroupMemberListItem";
import { CometChatBackdrop } from "../../Shared";

import * as style from "./style";

import searchIcon from "./resources/search-grey-icon.png";
import clearIcon from "./resources/close.png";

let timeout;
let friendsOnly;
let addMembersManager;

export default {
  name: "CometChatAddGroupMemberList",
  mixins: [cometChatCommon],
  components: {
    CometChatBackdrop,
    CometChatAddGroupMemberListItem,
  },
  props: {
    open: { ...DEFAULT_BOOLEAN_PROP },
    item: { ...DEFAULT_OBJECT_PROP },
    theme: { ...DEFAULT_OBJECT_PROP },
    membersList: { ...DEFAULT_ARRAY_PROP },
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
    bannedMembersList: { ...DEFAULT_ARRAY_PROP },
  },
  data() {
    return {
      userList: [],
      membersToAdd: [],
      filteredList: [],
      membersAdding: false,
      decoratorMessage: STRING_MESSAGES.LOADING_MESSSAGE,
    };
  },
  computed: {
    styles() {
      return {
        modalBody: style.modalBodyCtyle(),
        modalTable: style.modalTableStyle(),
        contactMsg: style.contactMsgStyle(),
        tableSearch: style.tableSearchStyle(),
        tableCaption: style.tableCaptionStyle(),
        tableBody: style.tableBodyStyle(this.theme),
        tableFoot: style.tableFootStyle(this.theme),
        modalClose: style.modalCloseStyle(clearIcon),
        contactMsgTxt: style.contactMsgTxtStyle(this.theme),
        searchInput: style.searchInputStyle(this.theme, searchIcon),
        modalWrapper: style.modalWrapperStyle(this.theme, this.open),
      };
    },
    STRINGS() {
      return STRING_MESSAGES;
    },
  },
  methods: {
    userUpdateHandler(user) {
      console.log("CometChatAddGroupMemberList: userUpdateHandler", user);
      let userlist = [...this.userList];

      let userKey = userlist.findIndex((u) => u.uid === user.uid);

      if (userKey > -1) {
        let userObj = userlist[userKey];
        let newUserObj = Object.assign({}, userObj, user);
        userlist.splice(userKey, 1, newUserObj);

        this.userList = userlist;
      }
    },
    scrollHandler(e) {
      const bottom =
        Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop) ===
        Math.round(e.currentTarget.clientHeight);
      if (bottom) {
        this.getUsers();
      }
    },
    searchUsers(event) {
      if (timeout) {
        clearTimeout(timeout);
      }

      let val = event.target.value;
      timeout = setTimeout(() => {
        addMembersManager = new AddMembersManager(friendsOnly, val);

        this.userList = [];
        this.membersToAdd = [];
        this.membersToRemove = [];

        this.getUsers(true);
      }, 500);
    },
    async getUsers(search = false) {
      try {
        await new CometChatManager().getLoggedInUser();

        const userList = await addMembersManager.fetchNextUsers();

        userList.forEach((user) => (user = this.setAvatar(user)));

        const filteredUserList = userList.filter((user) => {
          const found = this.membersList.find(
            (member) => user.uid === member.uid
          );
          const foundbanned = this.bannedMembersList.find(
            (member) => user.uid === member.uid
          );
          if (found || foundbanned) {
            return false;
          }
          return true;
        });

        if (filteredUserList.length === 0) {
          this.decoratorMessage = STRING_MESSAGES.ERROR_NO_USERS_FOUND;
        }

        if (search) {
          this.userList = [...userList];
          this.filteredList = [...filteredUserList];
        } else {
          this.userList = [...this.userList, ...userList];
          this.filteredList = [...this.filteredList, ...filteredUserList];
        }
      } catch (error) {
        this.decoratorMessage = STRING_MESSAGES.ERROR;
        console.error(
          "[CometChatAddGroupMemberList] getUsers fetchNext error",
          error
        );
      }
    },
    setAvatar(user) {
      if (!user.getAvatar()) {
        const uid = user.getUid();
        const char = user.getName().charAt(0).toUpperCase();
        user.setAvatar(SvgAvatar.getAvatar(uid, char));
      }
    },
    membersUpdated({ user, value }) {
      if (value) {
        const members = [...this.membersToAdd];
        members.push(user);

        this.membersToAdd = [...members];
      } else {
        const membersToAdd = [...this.membersToAdd];
        const index = membersToAdd.findIndex(
          (member) => member.uid === user.uid
        );
        if (index > -1) {
          membersToAdd.splice(index, 1);

          this.membersToAdd = [...membersToAdd];
        }
      }
    },
    async updateMembers() {
      const guid = this.item.guid;
      const membersList = [];

      this.membersToAdd.forEach((newmember) => {
        const index = this.membersList.findIndex(
          (member) => member.uid === newmember.uid
        );
        if (index === -1) {
          const newMember = new CometChat.GroupMember(
            newmember.uid,
            CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
          );
          membersList.push(newMember);

          newmember["type"] = "add";
        }
      });

      if (membersList.length) {
        const membersToAdd = [];
        this.membersAdding = true;

        try {
          const response = await CometChat.addMembersToGroup(
            guid,
            membersList,
            []
          );

          if (Object.keys(response).length) {
            for (const member in response) {
              if (response[member] === "success") {
                const found = this.userList.find((user) => user.uid === member);
                found["scope"] = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
                membersToAdd.push(found);
              }
            }
            this.emitAction("addGroupParticipants", { members: membersToAdd });
          }
          this.emitEvent("close");
        } catch (error) {
          console.log("addMembersToGroup failed with exception:", error);
        } finally {
          this.membersAdding = false;
        }
      }
    },
  },
  beforeMount() {
    if (this.friendsOnly) {
      friendsOnly = this.friendsOnly;
    }

    addMembersManager = new AddMembersManager(this.friendsOnly);

    this.getUsers();
    addMembersManager.attachListeners(this.userUpdateHandler);
  },
  beforeDestroy() {
    if (addMembersManager) {
      addMembersManager.removeListeners();
      addMembersManager = null;
    }
  },
};
</script>
<style scoped>
@media (min-width: 320px) and (max-width: 767px) {
  .cometchat__add__members__wrapper {
    width: 100% !important;
    height: 100% !important;
  }
  .cometchat__add__members__table {
    height: 100% !important;
  }
}
</style>