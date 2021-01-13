<template>
  <div class="cometchat__unified__navbar">
    <template v-if="tab === 'contacts'">
      <comet-chat-user-list
        :item="item"
        :type="type"
        :theme="theme"
        :enable-close-menu="enableCloseMenu"
        @action="actionHandler"
      />
    </template>
    <template v-else-if="tab === 'conversations'">
      <comet-chat-conversation-list
        :item="item"
        :type="type"
        :theme="theme"
        :last-message="lastMessage"
        :group-to-leave="groupToLeave"
        :group-to-delete="groupToDelete"
        :group-to-update="groupToUpdate"
        :enable-close-menu="enableCloseMenu"
        :message-to-mark-read="messageToMarkRead"
        @action="actionHandler"
      />
    </template>
    <template v-else-if="tab === 'groups'">
      <comet-chat-group-list
        :item="item"
        :type="type"
        :theme="theme"
        :group-to-leave="groupToLeave"
        :group-to-delete="groupToDelete"
        :group-to-update="groupToUpdate"
        :enable-close-menu="enableCloseMenu"
        @action="actionHandler"
      />
    </template>
    <template v-else-if="tab === 'info'">
      <comet-chat-user-profile :theme="theme" @action="actionHandler" />
    </template>
    <div :style="styles.footer" class="sidebar__footer">
      <div :style="styles.navbar" class="footer__navbar">
        <div :style="styles.item" @click="changeTab('conversations')">
          <span :style="styles.chatsIcon"></span>
        </div>
        <div :style="styles.item" @click="changeTab('contacts')">
          <span :style="styles.contactIcon"></span>
        </div>
        <div :style="styles.item" @click="changeTab('groups')">
          <span :style="styles.groupIcon"></span>
        </div>
        <div :style="styles.item" @click="changeTab('info')">
          <span :style="styles.moreIcon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { cometChatCommon } from "../../../mixins/";

import { CometChatConversationList } from "../../Chats/";
import { CometChatUserProfile } from "../../UserProfile/";
import { CometChatGroupList } from "../../Groups";
import { CometChatUserList } from "../../Users";

import contactGreyIcon from "./resources/contacts-grey.png";
import contactBlueIcon from "./resources/contacts-blue.png";
import moreGreyIcon from "./resources/userInfo-grey.png";
import moreBlueIcon from "./resources/userInfo-blue.png";
import groupBlueIcon from "./resources/groups-blue.png";
import groupGreyIcon from "./resources/groups-grey.png";
import chatGreyIcon from "./resources/chats-grey.png";
import chatBlueIcon from "./resources/chats-blue.png";

import * as style from "./style";

export default {
  name: "CometChatNavBar",
  mixins: [cometChatCommon],
  components: {
    CometChatConversationList,
    CometChatUserProfile,
    CometChatGroupList,
    CometChatUserList,
  },
  props: {
    tab: { ...DEFAULT_STRING_PROP },
    item: { ...DEFAULT_OBJECT_PROP },
    type: { ...DEFAULT_STRING_PROP },
    theme: { ...DEFAULT_OBJECT_PROP },
    config: { ...DEFAULT_OBJECT_PROP },
    lastMessage: { ...DEFAULT_OBJECT_PROP },
    groupToLeave: { ...DEFAULT_OBJECT_PROP },
    groupToUpdate: { ...DEFAULT_OBJECT_PROP },
    groupToDelete: { ...DEFAULT_OBJECT_PROP },
    enableCloseMenu: { ...DEFAULT_BOOLEAN_PROP },
    messageToMarkRead: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    styles() {
      return {
        item: style.itemStyle(),
        footer: style.footerStyle(),
        navbar: style.navbarStyle(),
        chatsIcon: style.itemLinkStyle(
          chatGreyIcon,
          chatBlueIcon,
          this.isChatsTabActive
        ),
        contactIcon: style.itemLinkStyle(
          contactGreyIcon,
          contactBlueIcon,
          this.isContactsTabActive
        ),
        groupIcon: style.itemLinkStyle(
          groupGreyIcon,
          groupBlueIcon,
          this.isGroupsTabActive,
          true
        ),
        moreIcon: style.itemLinkStyle(
          moreGreyIcon,
          moreBlueIcon,
          this.isMoreTabActive
        ),
      };
    },
    isChatsTabActive() {
      return this.tab === "conversations";
    },
    isContactsTabActive() {
      return this.tab === "contacts";
    },
    isGroupsTabActive() {
      return this.tab === "groups";
    },
    isMoreTabActive() {
      return this.tab === "info";
    },
  },
  methods: {
    changeTab(tab) {
      this.emitAction("tabChanged", { tab });
    },
    actionHandler({ action, ...rest }) {
      this.emitAction(action, { ...rest });
    },
  },
};
</script>
<style scoped>
.cometchat__unified__navbar {
  height: 100%;
  width: 280px;
}
.cometchat__unified__navbar .chats__wrapper,
.cometchat__unified__navbar .groups__wrapper,
.cometchat__unified__navbar .contacts__wrapper {
  height: calc(100% - 50px) !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .cometchat__unified__navbar {
    width: 100% !important;
  }
}
</style>