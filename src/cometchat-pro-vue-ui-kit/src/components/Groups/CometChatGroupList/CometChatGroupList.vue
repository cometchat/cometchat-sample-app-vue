<template>
  <div :style="styles.wrapper" class="groups__wrapper">
    <div :style="styles.header">
      <div
        class="header__close"
        v-if="enableCloseMenu"
        :style="styles.headerClose"
        @click="emitAction('closeMenuClicked')"
      />
      <h4 :style="styles.headerTitle">{{ STRINGS.GROUPS }}</h4>
      <div
        :style="styles.add"
        v-if="canCreateGroup"
        :title="STRINGS.CREATE_GROUP"
        @click="createGroupOpen = true"
      ></div>
    </div>
    <div :style="styles.search">
      <input
        type="text"
        autoComplete="off"
        :style="styles.searchInput"
        :placeholder="STRINGS.SEARCH"
        @input="groupSearchHandler"
      />
    </div>
    <div v-if="groupList.length === 0" :style="styles.msg">
      <p :style="styles.msgText">
        {{ decoratorMessage }}
      </p>
    </div>
    <div
      ref="groupListRef"
      :style="styles.list"
      v-else-if="groupList.length !== 0"
      @scroll="groupScrollHandler($event)"
    >
      <div v-for="(group, i) in groupList" :key="i">
        <comet-chat-group-list-item
          :group="group"
          :theme="themeValue"
          :selectedGroup="selectedGroup"
          @click="groupClickHandler"
        />
      </div>
    </div>
    <comet-chat-create-group
      :theme="themeValue"
      :open="createGroupOpen"
      @close="createGroupOpen = false"
      @action="createGroupActionHandler"
    />
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";

import { CometChatManager } from "../../../util/controller";
import { SvgAvatar } from "../../../util/svgavatar";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";
import * as enums from "../../../util/enums.js";

import { GroupListManager } from "./controller";

import CometChatCreateGroup from "../CometChatCreateGroup/CometChatCreateGroup";
import CometChatGroupListItem from "../CometChatGroupListItem/CometChatGroupListItem";

import { propertyCheck, cometChatCommon } from "../../../mixins/";

import { theme } from "../../../resources/theme";

import addIcon from "./resources/creategroup.png";
import navigateIcon from "./resources/navigate.png";
import searchIcon from "./resources/search-grey-icon.png";

import * as style from "./style";

let timeout;
let groupListManager;
let cometChatManager;

/**
 * Displays list of groups.
 *
 * @displayName CometChatGroupList
 */
export default {
  name: "CometChatGroupList",
  mixins: [propertyCheck, cometChatCommon],
  components: {
    CometChatGroupListItem,
    CometChatCreateGroup,
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
     * @ignore
     */
    config: { ...DEFAULT_OBJECT_PROP },
    /**
     * The group selected to leave.
     */
    groupToLeave: { ...DEFAULT_OBJECT_PROP },
    /**
     * The group selected to update.
     */
    groupToUpdate: { ...DEFAULT_OBJECT_PROP },
    /**
     * The group selected to delete.
     */
    groupToDelete: { ...DEFAULT_OBJECT_PROP },
    /**
     * Shows/hides the close menu button.
     */
    enableCloseMenu: { ...DEFAULT_BOOLEAN_PROP },
  },
  data() {
    return {
      searchKey: "",
      groupList: [],
      loggedInUser: {},
      selectedGroup: null,
      createGroupOpen: false,
      decoratorMessage: COMETCHAT_CONSTANTS.LOADING_MESSSAGE,
    };
  },
  computed: {
    /**
     * Theme computed using default theme and theme coming from prop.
     */
    themeValue() {
      return Object.assign({}, theme, this.theme || {});
    },
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        msg: style.groupMsgStyle(),
        list: style.groupListStyle(),
        search: style.groupSearchStyle(),
        add: style.groupAddStyle(addIcon),
        wrapper: style.groupWrapperStyle(),
        header: style.groupHeaderStyle(this.themeValue),
        msgText: style.groupMsgTxtStyle(this.themeValue),
        headerClose: style.groupHeaderCloseStyle(navigateIcon),
        headerTitle: style.groupHeaderTitleStyle(this.enableCloseMenu),
        searchInput: style.groupSearchInputStyle(this.themeValue, searchIcon),
      };
    },
    /**
     * Returns if user can create group.
     */
    canCreateGroup() {
      if (
        this.config &&
        this.hasProperty(this.config, "group-create") &&
        this.config["group-create"] === false
      ) {
        return false;
      }

      return true;
    },
    /**
     * Computed object, made of props, for watcher.
     */
    propsForWatcher() {
      return {
        item: this.item,
        groupToLeave: this.groupToLeave,
        groupToUpdate: this.groupToUpdate,
        groupToDelete: this.groupToDelete,
      };
    },
    /**
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
  },
  watch: {
    /**
     * One true watcher that updates state on props update.
     */
    propsForWatcher: {
      handler(_, prevProps) {
        const previousItem = JSON.stringify(prevProps.item);
        const currentItem = JSON.stringify(this.item);

        if (previousItem !== currentItem) {
          if (Object.keys(this.item).length === 0) {
            if (this.$refs && this.$refs.groupListRef) {
              this.$refs.groupListRef.scrollTop = 0;
            }
            this.selectedGroup = {};
          } else {
            let grouplist = [...this.groupList];

            //search for user
            let groupKey = grouplist.findIndex(
              (g) => g.guid === this.item.guid
            );
            if (groupKey > -1) {
              let groupObj = { ...grouplist[groupKey] };
              this.selectedGroup = groupObj;
            }
          }
        }

        if (
          prevProps.groupToLeave &&
          prevProps.groupToLeave.guid !== this.groupToLeave.guid
        ) {
          const groups = [...this.groupList];
          const groupKey = groups.findIndex(
            (member) => member.guid === this.groupToLeave.guid
          );

          if (groupKey > -1) {
            const groupToLeave = this.groupToLeave;
            const groupObj = { ...groups[groupKey] };
            const membersCount = parseInt(groupToLeave["membersCount"]) - 1;

            let newgroupObj = Object.assign({}, groupObj, {
              membersCount: membersCount,
              hasJoined: false,
            });

            groups.splice(groupKey, 1, newgroupObj);
            this.groupList = groups;
          }
        }

        if (
          prevProps.groupToDelete &&
          prevProps.groupToDelete.guid !== this.groupToDelete.guid
        ) {
          const groups = [...this.groupList];
          const groupKey = groups.findIndex(
            (member) => member.guid === this.groupToDelete.guid
          );
          if (groupKey > -1) {
            groups.splice(groupKey, 1);
            this.groupList = groups;
            if (groups.length === 0) {
              this.decoratorMessage = "No groups found";
            }
          }
        }

        if (
          prevProps.groupToUpdate &&
          (prevProps.groupToUpdate.guid !== this.groupToUpdate.guid ||
            (prevProps.groupToUpdate.guid === this.groupToUpdate.guid &&
              (prevProps.groupToUpdate.membersCount !==
                this.groupToUpdate.membersCount ||
                prevProps.groupToUpdate.scope !== this.groupToUpdate.scope)))
        ) {
          const groups = [...this.groupList];
          const groupToUpdate = this.groupToUpdate;

          const groupKey = groups.findIndex(
            (group) => group.guid === groupToUpdate.guid
          );
          if (groupKey > -1) {
            const groupObj = groups[groupKey];
            const newGroupObj = Object.assign({}, groupObj, groupToUpdate, {
              scope: groupToUpdate["scope"],
              membersCount: groupToUpdate["membersCount"],
            });

            groups.splice(groupKey, 1, newGroupObj);
            this.groupList = groups;
          }
        }
      },
    },
    deep: true,
  },
  methods: {
    /**
     * Handles searching in group
     */
    groupSearchHandler(e) {
      try {
        if (timeout) {
          clearTimeout(timeout);
        }

        let val = e.target.value;
        this.searchKey = val;

        timeout = setTimeout(() => {
          groupListManager = new GroupListManager(val);
          this.getGroups(true);
        }, 500);
      } catch (error) {
        this.logError("Error in searching groups", error);
      }
    },
    /**
     * Handles group creation
     */
    createGroupActionHandler({ action, group }) {
      try {
        if (action === "groupCreated") {
          this.setAvatar(group);
          const groups = [group, ...this.groupList];

          this.groupClickHandler(group);

          this.groupList = groups;
          this.createGroupOpen = false;
        }
      } catch (error) {
        this.logError("Error in creating group", error);
      }
    },
    /**
     * Handles group item click
     */
    async groupClickHandler(group) {
      try {
        if (!(this.$listeners && this.$listeners["action"])) {
          return;
        }

        if (group.hasJoined === false) {
          let password = "";
          if (group.type === CometChat.GROUP_TYPE.PASSWORD) {
            password = prompt("Enter your password");
          }
          const guid = group.guid;
          const groupType = group.type;

          try {
            const response = await CometChat.joinGroup(
              guid,
              groupType,
              password
            );
            this.logError(
              "Group joining success with response",
              response,
              "group",
              group
            );

            const groups = [...this.groupList];
            let groupKey = groups.findIndex((g) => g.guid === guid);

            if (groupKey > -1) {
              const groupObj = groups[groupKey];
              const newGroupObj = Object.assign({}, groupObj, response, {
                scope: CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT,
              });

              groups.splice(groupKey, 1, newGroupObj);

              this.groupList = groups;
              this.selectedGroup = newGroupObj;

              this.emitAction("item-click", {
                item: newGroupObj,
                type: "group",
              });
            }
          } catch (error) {
            this.logError("Group joining failed with exception:", error);
          }
        } else {
          this.selectedGroup = group;
          this.emitAction("item-click", { item: group, type: "group" });
        }
      } catch (error) {
        this.logError("Error in group item click", error);
      }
    },
    /**
     * Handles group list scroll
     */
    groupScrollHandler(elem) {
      try {
        if (
          elem.target.offsetHeight + elem.target.scrollTop >=
          elem.target.scrollHeight - 20
        ) {
          this.getGroups();
        }
      } catch (error) {
        this.logError("Error in group scroll", error);
      }
    },
    /**
     * Gets list of group
     */
    async getGroups(clear = false) {
      cometChatManager = new CometChatManager();
      try {
        const user = await cometChatManager.getLoggedInUser();
        this.loggedInUser = user;

        if (!groupListManager) {
          groupListManager = new GroupListManager(this.searchKey || "");
        }

        const groups = await groupListManager.fetchNextGroups();

        if (groups.length === 0) {
          this.decoratorMessage = "No groups found";
        }

        groups.forEach((group) => (group = this.setAvatar(group)));

        if (clear) {
          this.groupList = groups;
        } else {
          this.groupList = [...this.groupList, ...groups];
        }
      } catch (error) {
        this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR_LOADING_USERS;
        console.error("[CometChatGroupList] getGroups error", error);
      }
    },
    /**
     * Set SVG avatar
     */
    setAvatar(group) {
      if (!this.hasProperty(group, "icon")) {
        const guid = group.guid;
        const char = group.name.charAt(0).toUpperCase();
        group.icon = SvgAvatar.getAvatar(guid, char);
      }
      return group;
    },
    /**
     * Updates changed members
     */
    updateMemberChanged(group, options) {
      try {
        let groups = [...this.groupList];

        let groupKey = groups.findIndex((g) => g.guid === group.guid);

        if (groupKey > -1) {
          let groupObj = { ...groups[groupKey] };
          if (options && this.loggedInUser.uid === options.user.uid) {
            let newgroupObj = Object.assign({}, groupObj, {
              scope: options.scope,
            });

            groups.splice(groupKey, 1, newgroupObj);
            this.groupList = groups;
          }
        }
      } catch (error) {
        this.logError("Error in member change update", error);
      }
    },
    /**
     * Updates removed members
     */
    updateMemberRemoved(group, options) {
      try {
        let groups = [...this.groupList];

        let groupKey = groups.findIndex((g) => g.guid === group.guid);

        if (groupKey > -1) {
          if (options && this.loggedInUser.uid === options.user.uid) {
            let groupObj = { ...groups[groupKey] };
            let membersCount = parseInt(group.membersCount);

            let newgroupObj = Object.assign({}, groupObj, {
              membersCount: membersCount,
              hasJoined: false,
            });

            groups.splice(groupKey, 1, newgroupObj);
          } else {
            let groupObj = { ...groups[groupKey] };
            let membersCount = parseInt(group.membersCount);

            let newgroupObj = Object.assign({}, groupObj, {
              membersCount: membersCount,
            });

            groups.splice(groupKey, 1, newgroupObj);
          }
          this.groupList = groups;
        }
      } catch (error) {
        this.logError("Error in member change update", error);
      }
    },
    /**
     * Updates added members
     */
    updateMemberAdded(group, options) {
      try {
        let groups = [...this.groupList];

        let groupKey = groups.findIndex((g) => g.guid === group.guid);

        if (groupKey > -1) {
          let groupObj = { ...groups[groupKey] };

          let membersCount = parseInt(group.membersCount);

          let scope = this.hasProperty(group, "scope") ? group.scope : "";
          let hasJoined = this.hasProperty(group, "hasJoined")
            ? group.hasJoined
            : false;

          if (options && this.loggedInUser.uid === options.user.uid) {
            scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
            hasJoined = true;
          }

          let newgroupObj = Object.assign({}, groupObj, {
            membersCount: membersCount,
            hasJoined: hasJoined,
            scope: scope,
          });

          groups.splice(groupKey, 1, newgroupObj);
          this.groupList = groups;
        } else {
          let groupObj = { ...group };

          let scope = this.hasProperty(groupObj, "scope") ? groupObj.scope : {};
          let hasJoined = this.hasProperty(groupObj, "hasJoined")
            ? groupObj.hasJoined
            : false;
          let membersCount = parseInt(groupObj.membersCount);
          this.setAvatar(groupObj);

          if (options && this.loggedInUser.uid === options.user.uid) {
            scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
            hasJoined = true;
          }

          let newgroupObj = Object.assign({}, groupObj, {
            membersCount: membersCount,
            hasJoined: hasJoined,
            scope: scope,
          });

          this.groupList = [newgroupObj, ...groups];
        }
      } catch (error) {
        this.logError("Error in member add update", error);
      }
    },
    /**
     * Updates joined members
     */
    updateMemberJoined(group, options) {
      try {
        let groups = [...this.groupList];

        let groupKey = groups.findIndex((g) => g.guid === group.guid);

        if (groupKey > -1) {
          let groupObj = { ...groups[groupKey] };

          let scope = groupObj.scope;
          let membersCount = parseInt(group.membersCount);

          if (options && this.loggedInUser.uid === options.user.uid) {
            scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
          }

          let newgroupObj = Object.assign({}, groupObj, {
            membersCount: membersCount,
            scope: scope,
          });

          groups.splice(groupKey, 1, newgroupObj);
          this.groupList = groups;
        }
      } catch (error) {
        this.logError("Error in member join update", error);
      }
    },
    /**
     * Handler for group change listeners
     */
    groupsUpdateHandler(key, message, group, options) {
      this.logInfo("CometChatGroupList: groupUpdateHandler", {
        key,
        message,
        group,
        options,
      });
      switch (key) {
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
          this.updateMemberChanged(group, options);
          break;
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_LEFT:
          this.updateMemberRemoved(group, options);
          break;
        case enums.GROUP_MEMBER_ADDED:
          this.updateMemberAdded(group, options);
          break;
        case enums.GROUP_MEMBER_JOINED:
          this.updateMemberJoined(group, options);
          break;
        default:
          break;
      }
    },
    /**
     * Handles changes in group search input
     */
    onSearchChange(event) {
      try {
        this.groupList = [];
        if (this.searchStarted) {
          clearTimeout(this.searchStarted);
        }
        if (event.target.value.trim() !== COMETCHAT_CONSTANTS.EMPTY_STRING) {
          this.searchStarted = setTimeout(() => {
            this.decoratorMessage = COMETCHAT_CONSTANTS.SEARCH_LOADING;
            this.getGroupList(event.target.value);
          }, 400);
        } else if (
          event.target.value.trim() === COMETCHAT_CONSTANTS.EMPTY_STRING &&
          event.data === null
        ) {
          event.target.value = COMETCHAT_CONSTANTS.EMPTY_STRING;
          this.searchStarted = setTimeout(() => {
            this.getGroupList();
          }, 400);
        } else if (
          event.target.value.trim() === COMETCHAT_CONSTANTS.EMPTY_STRING &&
          event.data === COMETCHAT_CONSTANTS.SINGLE_SPACE
        ) {
          event.target.value = COMETCHAT_CONSTANTS.EMPTY_STRING;
        }
      } catch (error) {
        this.logError("Error in group search change", error);
      }
    },
  },
  beforeMount() {
    groupListManager = new GroupListManager();

    this.getGroups();
    groupListManager.attachListeners(this.groupsUpdateHandler);
  },
  beforeDestroy() {
    if (groupListManager) {
      groupListManager.removeListeners();
      groupListManager = null;
    }
  },
};
</script>
<style scoped>
.groups__wrapper * {
  box-sizing: border-box;
}
@media (min-width: 320px) and (max-width: 767px) {
  .header__close {
    display: block !important;
  }
}
</style>