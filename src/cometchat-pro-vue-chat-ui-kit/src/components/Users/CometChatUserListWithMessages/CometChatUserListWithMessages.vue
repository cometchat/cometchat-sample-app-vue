<template>
  <div :style="styles.root" class="cometchat__contacts">
    <div :style="styles.sidebar" class="contacts__sidebar">
      <comet-chat-user-list
        :item="item"
        :type="type"
        :theme="themeValue"
        :enable-close-menu="isItemPresent"
        @action="actionHandler"
      />
    </div>
    <div v-if="isItemPresent" :style="styles.main" class="contacts__main">
      <comet-chat-messages
        :tab="tab"
        :item="item"
        :type="type"
        :theme="themeValue"
        :call-message="callMessage"
        :logged-in-user="loggedInUser"
        :action-from-listener="actionFromListener"
        :composed-thread-message="composedThreadMessage"
        @action="actionHandler"
      />
    </div>
    <div
      v-if="viewDetailScreen"
      :style="styles.secondary"
      class="contacts__secondary-view"
    >
      <comet-chat-user-details
        :item="item"
        :type="type"
        :theme="themeValue"
        @action="actionHandler"
      />
    </div>
    <div
      v-if="viewThreadMessage"
      :style="styles.secondary"
      class="contacts__secondary-view"
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

import { cometChatScreens, propertyCheck } from "../../../mixins/";
import { CometChatManager } from "../../../util/controller";

import {
  CometChatMessages,
  CometChatImageViewer,
  CometChatMessageThread,
} from "../../Messages";
import { CometChatIncomingCall, CometChatOutgoingCall } from "../../Calls/";

import CometChatUserList from "../CometChatUserList/CometChatUserList";
import CometChatUserDetails from "../CometChatUserDetails/CometChatUserDetails";

import { theme } from "../../../resources/theme";

import * as style from "./style";

/**
 * Displays list of user with messages.
 *
 * @displayName CometChatUserListWithMessages
 */
export default {
  name: "CometChatUserListWithMessages",
  mixins: [propertyCheck, cometChatScreens],
  components: {
    CometChatUserList,
    CometChatMessages,
    CometChatImageViewer,
    CometChatUserDetails,
    CometChatIncomingCall,
    CometChatOutgoingCall,
    CometChatMessageThread,
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
      tab: "contacts",
      callMessage: {},
      imageView: null,
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
        root: style.userScreenStyle(this.themeValue),
        sidebar: style.userScreenSidebarStyle(
          this.themeValue,
          this.viewSidebar
        ),
        main: style.userScreenMainStyle(
          this.viewThreadMessage,
          this.viewDetailScreen
        ),
        secondary: style.userScreenSecondaryStyle(
          this.themeValue,
          this.viewThreadMessage
        ),
      };
    },
  },
  methods: {
    /**
     * Handles emitted action events
     */
    actionHandler({
      action,
      type,
      item,
      call,
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
          this.toggleSideBar();
          this.item = {};
          break;
        case "closeMenuClicked":
          this.toggleSideBar();
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
.cometchat__contacts * {
  box-sizing: border-box;
  font-family: var(--cometchat-font-family) !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .contacts__sidebar {
    top: 0;
    bottom: 0;
    z-index: 2;
    width: 100% !important;
    transition: all 0.3s ease-out;
    position: absolute !important;
    left: var(--cometchat-contacts-sidebar-left);
    background-color: var(--cometchat-contacts-sidebar-bg);
    box-shadow: var(--cometchat-contacts-sidebar-box-shadow);
  }
  .contacts__main {
    width: 100% !important;
  }
  .contacts__secondary-view {
    top: 0;
    bottom: 0;
    z-index: 2;
    right: 0 !important;
    width: 100% !important;
    position: absolute !important;
    background-color: var(--contacts-secondary-bg-color) !important;
  }
}
</style>