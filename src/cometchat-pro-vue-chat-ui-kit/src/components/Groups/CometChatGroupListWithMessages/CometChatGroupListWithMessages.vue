<template>
  <div :style="styles.root" class="cometchat__groups">
    <div :style="styles.sidebar" class="groups__sidebar">
      <comet-chat-group-list
        :item="item"
        :type="type"
        :theme="themeValue"
        :group-to-leave="groupToLeave"
        :group-to-delete="groupToDelete"
        :group-to-update="groupToUpdate"
        :enable-close-menu="isItemPresent"
        @action="actionHandler"
      />
    </div>
    <div v-if="isItemPresent" class="groups__main" :style="styles.main">
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
      class="groups__secondary-view"
    >
      <comet-chat-group-details
        :item="item"
        :type="type"
        :theme="themeValue"
        @action="actionHandler"
      />
    </div>
    <div
      v-if="viewThreadMessage"
      :style="styles.secondary"
      class="groups__secondary-view"
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

import { propertyCheck, cometChatScreens } from "../../../mixins/";
import { CometChatManager } from "../../../util/controller";
import * as enums from "../../../util/enums.js";

import {
  CometChatMessages,
  CometChatImageViewer,
  CometChatMessageThread,
} from "../../Messages/";

import { CometChatOutgoingCall, CometChatIncomingCall } from "../../Calls";

import CometChatGroupDetails from "../CometChatGroupDetails/CometChatGroupDetails";
import CometChatGroupList from "../CometChatGroupList/CometChatGroupList";

import { theme } from "../../../resources/theme";

import * as style from "./style";

/**
 * Displays list of group with messages.
 *
 * @displayName CometChatGroupListWithMessages
 */
export default {
  name: "CometChatGroupListWithMessages",
  mixins: [propertyCheck, cometChatScreens],
  components: {
    CometChatImageViewer,
    CometChatIncomingCall,
    CometChatGroupList,
    CometChatOutgoingCall,
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
      type: "group",
      tab: "groups",
      imageView: null,
      callMessage: {},
      groupMessages: [],
      groupToLeave: {},
      groupToDelete: {},
      groupToUpdate: {},
      darkTheme: false,
      incomingCall: null,
      outgoingCall: null,
      viewSidebar: false,
      loggedInUser: null,
      threadMessageItem: {},
      actionFromListener: {},
      threadMessageParent: {},
      threadMessageYype: null,
      viewDetailScreen: false,
      viewThreadMessage: false,
      composedThreadMessage: {},
    };
  },
  computed: {
    /**
     * Theme computed using default theme and theme coming from prop.
     */
    themeValue() {
      return Object.assign({}, theme, this.theme);
    },
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        root: style.groupScreenStyle(this.themeValue),
        sidebar: style.groupScreenSidebarStyle(
          this.themeValue,
          this.viewSidebar
        ),
        main: style.groupScreenMainStyle(
          this.viewThreadMessage,
          this.viewDetailScreen
        ),
        secondary: style.groupScreenSecondaryStyle(
          this.themeValue,
          this.viewThreadMessage
        ),
      };
    },
  },
  methods: {
    /**
     * Handler for emitted action events
     */
    actionHandler({
      action,
      key,
      type,
      call,
      item,
      count,
      group,
      message,
      members,
      options,
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
        case "menuClicked":
          this.toggleSideBar();
          this.item = {};
          break;
        case "closeMenuClicked":
          this.toggleSideBar();
          break;
        case "viewDetail":
        case "closeDetailClicked":
          this.toggleDetailView();
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
     * Updates group
     */
    groupUpdated(key, options) {
      this.groupMessages = [];

      switch (key) {
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_KICKED: {
          if (options.user.uid === this.loggedInUser.uid) {
            this.item = {};
            this.type = "group";
            this.viewDetailScreen = false;
          }
          break;
        }
        case enums.GROUP_MEMBER_SCOPE_CHANGED: {
          if (options.user.uid === this.loggedInUser.uid) {
            const newObj = Object.assign({}, this.item, {
              scope: options["scope"],
            });

            this.item = newObj;
            this.type = "group";
            this.viewDetailScreen = false;
          }
          break;
        }
        default:
          break;
      }
    },
    /**
     * Deletes group
     */
    deleteGroup(group) {
      this.groupToDelete = group;

      this.resetGroup();
    },
    /**
     * Leaves group
     */
    leaveGroup(group) {
      this.groupToLeave = group;

      this.resetGroup();
    },
    /**
     * Reset group
     */
    resetGroup() {
      this.item = {};
      this.type = "group";
      this.viewDetailScreen = false;
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
          "[CometChatUserListWithMessages] getLoggedInUser error",
          error
        );
      }
    })();
  },
};
</script>
<style scoped>
.cometchat__groups * {
  box-sizing: border-box;
  font-family: var(--cometchat-font-family) !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .groups__sidebar {
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 100% !important;
    transition: all 0.3s ease-out;
    position: absolute !important;
    left: var(--cometchat-groups-sidebar-left);
    background-color: var(--cometchat-groups-sidebar-bg);
    box-shadow: var(--cometchat-groups-sidebar-box-shadow);
  }
  .groups__main {
    width: 100% !important;
  }
  .groups__secondary-view {
    top: 0;
    bottom: 0;
    z-index: 2;
    right: 0 !important;
    width: 100% !important;
    position: absolute !important;
    background-color: var(--groups-secondary-bg-color) !important;
  }
}
</style>