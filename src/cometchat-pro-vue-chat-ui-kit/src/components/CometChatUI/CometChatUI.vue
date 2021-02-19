<template>
  <div :style="styles.root" class="cometchat__unified">
    <div :style="styles.sidebar" class="unified__sidebar">
      <comet-chat-nav-bar
        :tab="tab"
        :item="item"
        :type="type"
        :theme="themeValue"
        :last-message="lastMessage"
        :group-to-leave="groupToLeave"
        :group-to-update="groupToUpdate"
        :group-to-delete="groupToDelete"
        :enable-close-menu="isItemPresent"
        :message-to-mark-read="messageToMarkRead"
        @action="actionHandler"
      />
    </div>
    <div v-if="isItemPresent" class="unified__main" :style="styles.main">
      <comet-chat-messages
        :tab="tab"
        :item="item"
        :type="type"
        :theme="themeValue"
        :call-message="callMessage"
        :logged-in-user="loggedInUser"
        :group-messages="groupMessages"
        :action-from-listener="actionFromListener"
        :composed-thread-message="composedThreadMessage"
        @action="actionHandler"
      />
    </div>
    <div v-else :style="styles.placeholder">
      {{ placeholderMessage }}
    </div>
    <div
      v-if="viewDetailScreen"
      :style="styles.secondary"
      class="unified__secondary"
    >
      <comet-chat-user-details
        :item="item"
        :type="type"
        :theme="themeValue"
        v-if="type === 'user'"
        @action="actionHandler"
      />
      <comet-chat-group-details
        :item="item"
        :type="type"
        :theme="themeValue"
        v-else-if="type === 'group'"
        @action="actionHandler"
      />
    </div>
    <div
      v-if="viewThreadMessage"
      :style="styles.secondary"
      class="unified__secondary"
    >
      <comet-chat-message-thread
        :tab="tab"
        :theme="themeValue"
        :item="threadMessageItem"
        :type="threadMessageType"
        :logged-in-user="loggedInUser"
        :parent-message="threadMessageParent"
        @action="actionHandler"
      />
    </div>
    <comet-chat-incoming-call :theme="themeValue" @action="actionHandler" />
    <comet-chat-outgoing-call
      :item="item"
      :type="type"
      :theme="themeValue"
      :incoming-call="incomingCall"
      :outgoing-call="outgoingCall"
      :logged-in-user="loggedInUser"
      @action="actionHandler"
    />
    <comet-chat-image-viewer
      :open="true"
      v-if="imageView"
      :message="imageView"
      @action="actionHandler"
    />
  </div>
</template>
<script>
import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
} from "../../resources/constants";

import { cometChatScreens } from "../../mixins/";
import { CometChatManager } from "../../util/controller";

import {
  CometChatMessages,
  CometChatImageViewer,
  CometChatMessageThread,
} from "../Messages/";
import { CometChatUserDetails } from "../Users";
import { CometChatGroupDetails } from "../Groups";
import { CometChatIncomingCall, CometChatOutgoingCall } from "../Calls";

import CometChatNavBar from "./CometChatNavBar/CometChatNavBar";

import { theme } from "../../resources/theme";

import * as style from "./style";

/**
 * Displays a fully working chat application.
 *
 * @displayName CometChatUI
 */
export default {
  name: "CometChatUI",
  mixins: [cometChatScreens],
  components: {
    CometChatNavBar,
    CometChatImageViewer,
    CometChatIncomingCall,
    CometChatOutgoingCall,
    CometChatUserDetails,
    CometChatGroupDetails,
    CometChatMessageThread,
    CometChatMessages,
  },
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      item: {},
      type: "user",
      imageView: null,
      darkTheme: false,
      lastMessage: {},
      callMessage: {},
      groupToLeave: {},
      groupToDelete: {},
      groupToUpdate: {},
      groupMessages: [],
      viewSidebar: false,
      incomingCall: null,
      outgoingCall: null,
      loggedInUser: null,
      tab: "conversations",
      messageToMarkRead: {},
      threadMessageItem: {},
      actionFromListener: {},
      viewDetailScreen: false,
      threadMessageType: null,
      threadMessageParent: {},
      viewThreadMessage: false,
      composedThreadMessage: {},
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        main: style.unifiedMainStyle(
          this.viewThreadMessage,
          this.viewDetailScreen
        ),
        secondary: style.unifiedSecondaryStyle(
          this.themeValue,
          this.viewThreadMessage
        ),
        root: style.unifiedStyle(this.themeValue),
        placeholder: style.unifiedPlaceholderStyle(this.themeValue),
        sidebar: style.unifiedSidebarStyle(this.themeValue, this.viewSidebar),
      };
    },
    /**
     * Theme computed using default theme and theme coming from prop.
     */

    themeValue() {
      return Object.assign({}, theme, this.theme);
    },
    /**
     * Placeholder message when chat item is not selected.
     */
    placeholderMessage() {
      return this.STRINGS[
        this.tab === "info"
          ? "NO_TAB_SELECTED_MESSAGE"
          : "NO_ITEM_SELECTED_MESSAGE"
      ];
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
     * Handler for emitted action events
     */
    actionHandler({
      action,
      tab,
      item,
      call,
      type,
      count,
      group,
      members,
      message,
      messages,
      incomingCall,
      rejectedCall,
    }) {
      switch (action) {
        case "item-click":
          this.itemClicked(item, type);
          break;
        case "tabChanged":
          this.item = {};
          this.changeTab(tab);
          break;
        case "blockUser":
          this.blockUser();
          break;
        case "unblockUser":
          this.unblockUser();
          break;
        case "audioCall":
          this.audioCall();
          break;
        case "videoCall":
          this.videoCall();
          break;
        case "viewDetail":
        case "closeDetailClicked":
          this.toggleDetailView();
          break;
        case "menuClicked":
          this.item = {};
          this.toggleSideBar();
          break;
        case "closeMenuClicked":
          this.toggleSideBar();
          break;
        case "groupUpdated":
          this.groupUpdated(item, count);
          break;
        case "groupDeleted":
          this.deleteGroup(group);
          break;
        case "leftGroup":
          this.leaveGroup(group);
          break;
        case "membersUpdated":
          this.updateMembersCount(count);
          break;
        case "viewMessageThread":
          this.viewMessageThread(message);
          break;
        case "closeThreadClicked":
          this.closeThreadMessages();
          break;
        case "threadMessageComposed":
          this.onThreadMessageComposed(messages);
          this.updateLastMessage(messages[0]);
          break;
        case "acceptIncomingCall":
          this.acceptIncomingCall(incomingCall);
          break;
        case "acceptedIncomingCall":
          this.callInitiated(call);
          break;
        case "rejectedIncomingCall":
          this.rejectedIncomingCall(incomingCall, rejectedCall);
          break;
        case "outgoingCallRejected":
        case "outgoingCallCancelled":
        case "callEnded":
          this.outgoingCallEnded(call);
          break;
        case "userJoinedCall":
        case "userLeftCall":
          this.appendCallMessage(call);
          break;
        case "viewActualImage":
          this.setImageView(message);
          break;
        case "closeActualImage":
          this.setImageView(null);
          break;
        case "membersAdded":
          this.membersAdded(members, message);
          break;
        case "memberUnbanned":
          this.memberUnbanned(members, message);
          break;
        case "memberScopeChanged":
          this.memberScopeChanged(members, message);
          break;
        case "messageDeleted":
          this.closeThreadMessages();
          break;
        case "messageComposed":
        case "lastMessageEdited":
        case "lastMessageDeleted":
          this.updateLastMessage(messages[0]);
          break;
        case "messageEdited":
          this.updateThreadMessage(message);
          break;
        case "listenerData":
          this.actionFromListener = { action: action, messages: [...messages] };
          break;
        default:
          break;
      }
    },
    /**
     * Changes tab
     */
    changeTab(tab) {
      this.tab = tab;
      this.imageView = null;
      this.viewDetailScreen = false;
      this.viewThreadMessage = false;
    },
  },
  beforeMount() {
    if (!Object.keys(this.item).length) {
      this.toggleSideBar();
    }

    (async () => {
      try {
        this.loggedInUser = await new CometChatManager().getLoggedInUser();
      } catch (error) {
        this.logError("[CometChatUnified] getLoggedInUser error", error);
      }
    })();
  },
};
</script>
<style scoped>
.cometchat__unified {
  box-sizing: border-box !important;
  font-family: var(--cometchat-unified-font-family) !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .unified__sidebar {
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 100% !important;
    position: absolute !important;
    transition: all 0.3s ease-out;
    left: var(--cometchat-unified-sidebar-left);
    background-color: var(--cometchat-unified-sidebar-bg-color);
    box-shadow: var(--cometchat-unified-sidebar-box-shadow, none);
  }
  .unified__main {
    width: 100% !important;
  }
  .unified__secondary {
    top: 0;
    bottom: 0;
    z-index: 2;
    right: 0 !important;
    width: 100% !important;
    position: absolute !important;
    background-color: var(--cometchat-unified-sidebar-bg-color);
  }
}
</style>