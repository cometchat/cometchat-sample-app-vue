<template>
  <div :style="styles.wrapper" class="contacts__wrapper">
    <div :style="styles.header">
      <div
        class="header__close"
        v-if="enableCloseMenu"
        :style="styles.headerClose"
        @click="emitAction('closeMenuClicked')"
      ></div>
      <h4 :style="styles.headerTitle">{{ STRINGS.USERS }}</h4>
    </div>
    <div :style="styles.search">
      <input
        type="text"
        autocomplete="off"
        :style="styles.searchInput"
        :placeholder="STRINGS.SEARCH"
        @input="userSearchHandler"
      />
    </div>
    <div v-if="userList.length === 0" :style="styles.msg">
      <p :style="styles.msgText">
        {{ decoratorMessage }}
      </p>
    </div>
    <div
      ref="userListRef"
      :style="styles.list"
      v-else-if="userList.length != 0"
      @scroll="userScrollHandler($event)"
    >
      <div v-for="(user, i) in userList" :key="i">
        <div :style="styles.alphabet">
          {{ getAlphabet(user) }}
        </div>
        <comet-chat-user-list-item
          :user="user"
          :theme="themeValue"
          :selected-user="selectedUser"
          @click="userClickHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { CometChatManager } from "../../../util/controller";
import { SvgAvatar } from "../../../util/svgavatar";
import { UserListManager } from "./controller";

import { theme } from "../../../resources/theme";

import { propertyCheck, cometChatCommon } from "../../../mixins/";

import searchIcon from "./resources/search-grey-icon.svg";
import navigateIcon from "./resources/navigate.png";

import CometChatUserListItem from "../CometChatUserListItem/CometChatUserListItem";

import * as style from "./style";

let timeout;
let friendsOnly;
let userListManager;
let currentLetter = "";

/**
 * Displays list of users.
 *
 * @displayName CometChatUserList
 */
export default {
  name: "CometChatUserList",
  mixins: [propertyCheck, cometChatCommon],
  components: {
    CometChatUserListItem,
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
     * Flag for friends only filter.
     */
    friendsOnly: { ...DEFAULT_BOOLEAN_PROP },
    /**
     * Shows/hides the close menu button.
     */
    enableCloseMenu: { ...DEFAULT_BOOLEAN_PROP },
  },
  data() {
    return {
      userList: [],
      usersRequest: "",
      selectedUser: {},
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
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
    /**
     * Computed styles for the component.
     */

    styles() {
      return {
        msg: style.contactMsgStyle(),
        list: style.contactListStyle(),
        search: style.contactSearchStyle(),
        wrapper: style.contactWrapperStyle(),
        alphabet: style.contactAlphabetStyle(),
        header: style.contactHeaderStyle(this.themeValue),
        msgText: style.contactMsgTxtStyle(this.themeValue),
        headerClose: style.contactHeaderCloseStyle(navigateIcon),
        headerTitle: style.contactHeaderTitleStyle(this.enableCloseMenu),
        searchInput: style.contactSearchInputStyle(this.themeValue, searchIcon),
      };
    },
  },
  watch: {
    /**
     * Updates local state on change of item.
     */
    item: {
      handler(newItem, oldItem) {
        const previousItem = JSON.stringify(oldItem);
        const currentItem = JSON.stringify(newItem);

        if (previousItem !== currentItem) {
          if (Object.keys(newItem).length === 0) {
            this.$nextTick(() => {
              if (this.$refs.userListRef) {
                this.$refs.userListRef.scrollTop = 0;
              }
            });
            this.selectedUser = {};
          } else {
            let userList = [...this.userList];

            let userKey = userList.findIndex((u) => u.uid === newItem.uid);
            if (userKey > -1) {
              let userObj = { ...userList[userKey] };
              this.selectedUser = userObj;
            }
          }
        }

        if (
          oldItem &&
          Object.keys(oldItem).length &&
          oldItem.uid === newItem.uid &&
          oldItem.blockedByMe !== newItem.blockedByMe
        ) {
          let userList = [...this.userList];

          let userKey = userList.findIndex((u) => u.uid === newItem.uid);
          if (userKey > -1) {
            let userObj = { ...userList[userKey] };
            let newUserObj = Object.assign({}, userObj, {
              blockedByMe: newItem.blockedByMe,
            });
            userList.splice(userKey, 1, newUserObj);

            this.userList = userList;
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Handles user search
     */
    userSearchHandler(e) {
      if (timeout) {
        clearTimeout(timeout);
      }

      let val = e.target.value;
      timeout = setTimeout(() => {
        userListManager = new UserListManager(friendsOnly, val);
        this.getUsers(true);
      }, 500);
    },
    /**
     * Handles click on user
     */
    userClickHandler(user) {
      this.emitAction("item-click", { item: user, type: "user" });
    },
    /**
     * Parses and return alphabet for list
     */
    getAlphabet(user) {
      const chr = user.name[0].toUpperCase();
      if (chr !== currentLetter) {
        currentLetter = chr;
        return chr;
      } else {
        return null;
      }
    },
    /**
     * Handles user list scroll
     */
    userScrollHandler(elem) {
      if (
        elem.target.offsetHeight + elem.target.scrollTop >=
        elem.target.scrollHeight - 20
      ) {
        this.getUsers();
      }
    },
    /**
     * Gets list of users
     */
    async getUsers(clear = false) {
      const cometChatManager = new CometChatManager();

      try {
        await cometChatManager.getLoggedInUser();

        if (!userListManager) {
          userListManager = new UserListManager(friendsOnly);
        }

        const users = await userListManager.fetchNextUsers();

        if (users.length === 0) {
          this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR_NO_USERS_FOUND;
        }

        users.forEach((user) => (user = this.setAvatar(user)));

        if (clear) {
          this.userList = users;
        } else {
          this.userList = [...this.userList, ...users];
        }
      } catch (error) {
        this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR_LOADING_USERS;
        console.error("[CometChatUserList] getUsers fetchNext error", error);
      }
    },
    /**
     * Sets SVG avatar
     */
    setAvatar(user) {
      if (!user.getAvatar()) {
        const uid = user.getUid();
        const char = user.getName().charAt(0).toUpperCase();
        user.setAvatar(SvgAvatar.getAvatar(uid, char));
      }
    },
    /**
     * Handles listener events
     */
    usersUpdateHandler(user) {
      this.logInfo("CometChatUserList :usersUpdateHandler", { user });
      let users = [...this.userlist];

      let userKey = users.findIndex((u) => u.uid === user.uid);

      if (userKey > -1) {
        let userObj = { ...users[userKey] };
        let newUserObj = { ...userObj, ...user };
        users.splice(userKey, 1, newUserObj);

        this.userlist = users;
      }
    },
  },
  beforeMount() {
    friendsOnly = this.friendsOnly;

    userListManager = new UserListManager(friendsOnly);

    this.getUsers();
    userListManager.attachListeners(this.usersUpdateHandler);
  },
  beforeDestroy() {
    if (userListManager) {
      userListManager.removeListeners();
      userListManager = null;
    }
  },
};
</script>
<style scoped>
.contacts__wrapper * {
  box-sizing: border-box;
}
@media (min-width: 320px) and (max-width: 767px) {
  .header__close {
    display: block !important;
  }
}
</style>