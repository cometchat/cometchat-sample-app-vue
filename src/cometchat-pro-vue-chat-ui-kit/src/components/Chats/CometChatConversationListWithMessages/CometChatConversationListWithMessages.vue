<template>
  <div :style="styles.root" class="cometchat__chats">
    <div :style="styles.sidebar" class="chats__sidebar">
      <comet-chat-conversation-list
        :item="item"
        :type="type"
        :theme="themeValue"
        :last-message="lastMessage"
        :group-to-leave="groupToLeave"
        :group-to-delete="groupToDelete"
        :group-to-update="groupToUpdate"
        :enable-close-menu="isItemPresent"
        :message-to-mark-read="messageToMarkRead"
        @action="actionHandler"
      />
    </div>
    <div v-if="isItemPresent" class="chats__main" :style="styles.main">
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
    <div
      v-if="viewDetailScreen"
      :style="styles.secondary"
      class="chats__secondary-view"
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
      class="chats__secondary-view"
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
import { DEFAULT_OBJECT_PROP } from "../../../resources/constants";

import { CometChatManager } from "../../../util/controller";
import { cometChatScreens } from "../../../mixins/";

import {
  CometChatMessages,
  CometChatImageViewer,
  CometChatMessageThread,
} from "../../Messages/";
import { CometChatUserDetails } from "../../Users";
import { CometChatGroupDetails } from "../../Groups";
import { CometChatIncomingCall, CometChatOutgoingCall } from "../../Calls";

import CometChatConversationList from "../CometChatConversationList/CometChatConversationList";

import { theme } from "../../../resources/theme";

import * as style from "./style";

/**
 * Displays a list of conversation with messages.
 *
 * @displayName CometChatConversationListItem
 */
export default {
  name: "CometChatConversationListWithMessages",
  mixins: [cometChatScreens],
  components: {
    CometChatImageViewer,
    CometChatIncomingCall,
    CometChatOutgoingCall,
    CometChatUserDetails,
    CometChatGroupDetails,
    CometChatMessageThread,
    CometChatConversationList,
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
      type: "",
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
        root: style.chatScreenStyle(this.themeValue),
        main: style.chatScreenMainStyle(
          this.viewThreadMessage,
          this.viewDetailScreen
        ),
        sidebar: style.chatScreenSidebarStyle(
          this.themeValue,
          this.viewSidebar
        ),
        secondary: style.chatScreenSecondaryStyle(
          this.themeValue,
          this.viewThreadMessage
        ),
      };
    },
    /**
     * Theme computed using default theme and theme coming from prop.
     */
    themeValue() {
      return Object.assign({}, theme, this.theme);
    },
  },
  methods: {
    /**
     * Handler for emitted action events
     */
    actionHandler({
      action,
      key,
      item,
      call,
      type,
      count,
      group,
      members,
      options,
      message,
      messages,
      incomingCall,
      rejectedCall,
    }) {
      switch (action) {
        case "item-click":
          this.itemClicked(item, type);
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
          this.groupUpdated(key, options);
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
          this.appendCallMessage(call);
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
          this.membersAdded(members);
          break;
        case "memberUnbanned":
          this.memberUnbanned(members);
          break;
        case "memberScopeChanged":
          this.memberScopeChanged(members);
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
  },
  beforeMount() {
    if (!Object.keys(this.item).length) {
      this.toggleSideBar();
    }

    (async () => {
      try {
        this.loggedInUser = await new CometChatManager().getLoggedInUser();
      } catch (error) {
        this.logError(
          "[CometChatConversationScreen] getLoggedInUser error",
          error
        );
      }
    })();
  },
};
</script>

<style scoped>
.cometchat__chats * {
  box-sizing: border-box;
  font-family: var(--chat-screen-font-family) !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .chats__sidebar {
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 100% !important;
    transition: all 0.3s ease-out;
    position: absolute !important;
    left: var(--cometchat-chats-sidebar-left);
    background-color: var(--cometchat-chats-sidebar-bg);
    box-shadow: var(--cometchat-chats-sidebar-box-shadow);
  }
  .chats__main {
    width: 100% !important;
  }
  .chats__secondary-view {
    top: 0;
    bottom: 0;
    z-index: 2;
    right: 0 !important;
    width: 100% !important;
    position: absolute !important;
    background-color: var(--chats-secondary-bg-color) !important;
  }
}
</style>