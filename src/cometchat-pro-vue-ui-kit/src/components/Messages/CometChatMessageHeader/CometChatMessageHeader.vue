<template>
  <div :style="styles.root">
    <div :style="styles.detail">
      <div
        class="cometchat_sidebar_btn"
        :style="styles.sidebarBtn"
        @click="emitAction('menuClicked')"
      ></div>
      <div :style="styles.thumbnail">
        <comet-chat-avatar
          border-width="1px"
          corner-radius="18px"
          :image="avatarImage"
          :border-color="theme.borderColor.primary"
        />
        <comet-chat-user-presence
          border-width="1px"
          corner-radius="50%"
          :status="presence"
          v-if="type === 'user'"
          :border-color="theme.borderColor.primary"
        />
      </div>
      <div :style="styles.user" class="cometchat__message__header__user">
        <h6
          :style="styles.name"
          @mouseenter="toggleTooltip($event, true)"
          @mouseleave="toggleTooltip($event, false)"
        >
          {{ item.name }}
        </h6>
        <span
          :style="styles.status"
          @mouseenter="toggleTooltip($event, true)"
          @mouseleave="toggleTooltip($event, false)"
        >
          {{ status }}
        </span>
      </div>
    </div>
    <div :style="styles.optionWrapper">
      <span
        v-if="canShowAudioCall"
        class="cometchat_chat_option"
        :style="styles.audioCallOption"
        @click="emitAction('audioCall')"
      ></span>
      <span
        v-if="canShowVideoCall"
        class="cometchat_chat_option"
        :style="styles.videoCallOption"
        @click="emitAction('videoCall')"
      ></span>
      <span
        class="cometchat_chat_option"
        :style="styles.detailPaneOption"
        @click="emitAction('viewDetail')"
      ></span>
    </div>
  </div>
</template>

<script>
import dateFormat from "dateformat";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_STRING_PROP,
  DEFAULT_OBJECT_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { cometChatCommon, propertyCheck, tooltip } from "../../../mixins/";
import { MessageHeaderManager } from "./controller";
import { SvgAvatar } from "../../../util/svgavatar";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import * as enums from "../../../util/enums.js";

import menuIcon from "./resources/menuicon.png";
import audioCallIcon from "./resources/audio.png";
import videoCallIcon from "./resources/video.png";
import detailPaneIcon from "./resources/detailpane.png";

import * as style from "./style";

let messageHeaderManager;

/**
 * Displays message info in header.
 *
 * @displayName CometChatMessageHeader
 */
export default {
  name: "CometChatMessageHeader",
  mixins: [tooltip, propertyCheck, cometChatCommon],
  components: {
    CometChatAvatar,
    CometChatUserPresence,
  },
  props: {
    /**
     * The selected chat item object.
     */
    item: { ...DEFAULT_OBJECT_PROP },
    /**
     * Type of chat item.
     */
    type: { ...DEFAULT_STRING_PROP },
    /**
     * Theme of the UI.
     */

    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * Whether to show sidebar.
     */
    sidebar: { ...DEFAULT_BOOLEAN_PROP },
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      status: "",
      presence: "offline",
    };
  },
  watch: {
    item: {
      /**
       * Watches item to update status message for group.
       */
      handler(newValue, oldValue) {
        if (messageHeaderManager) {
          messageHeaderManager.removeListeners();
        }
        messageHeaderManager = new MessageHeaderManager();
        messageHeaderManager.attachListeners(this.updateHeaderHandler);

        if (this.type === "user" && oldValue.uid !== newValue.uid) {
          this.setStatusForUser();
        } else if (
          this.type === "group" &&
          (newValue.guid !== oldValue.guid ||
            (newValue.guid === oldValue.guid &&
              newValue.membersCount !== oldValue.membersCount))
        ) {
          this.setStatusForGroup();
        }
      },
      deep: true,
    },
  },
  computed: {
    /**
     * Icons computed from file images.
     */
    styles() {
      return {
        name: style.chatNameStyle(),
        user: style.chatUserStyle(),
        detail: style.chatDetailStyle(),
        thumbnail: style.chatThumbnailStyle(),
        root: style.chatHeaderStyle(this.theme),
        optionWrapper: style.chatOptionWrapStyle(),
        sidebarBtn: style.chatSideBarBtnStyle(menuIcon, this.sidebar),
        audioCallOption: style.chatOptionStyle(audioCallIcon, "audio"),
        videoCallOption: style.chatOptionStyle(videoCallIcon, "video"),
        detailPaneOption: style.chatOptionStyle(detailPaneIcon, "detail"),
        status: style.chatStatusStyle(
          this.theme,
          this.presence,
          this.status,
          this.type
        ),
      };
    },
    /**
     * Computed avatar image
     */
    avatarImage() {
      const isUser = this.type === "user";
      let avatar = isUser ? this.item.avatar : this.item.icon;
      if (!avatar) {
        if (!isUser) {
          avatar = SvgAvatar.getAvatar(
            this.item.uid,
            this.item.name.charAt(0).toUpperCase()
          );
        } else {
          avatar = SvgAvatar.getAvatar(
            this.item.guid,
            this.item.name.charAt(0).toUpperCase()
          );
        }
      }
      return avatar;
    },
    /**
     * Returns if item is blocked by current user.
     */
    isBlockedByMe() {
      return this.item.blockedByMe;
    },
    /**
     * Returns if audio call icon can be shown.
     */
    canShowAudioCall() {
      return this.isBlockedByMe ? false : true;
    },
    /**
     * Returns if video call icon can be shown.
     */
    canShowVideoCall() {
      return this.isBlockedByMe ? false : true;
    },
  },
  methods: {
    /**
     * Sets status message for user
     */
    setStatusForUser() {
      let status = this.item.status;
      const presence = this.item.status === "online" ? "online" : "offline";

      if (this.item.status === "offline" && this.item.lastActiveAt) {
        status =
          COMETCHAT_CONSTANTS.LAST_ACTIVE_AT +
          dateFormat(this.item.lastActiveAt * 1000, "d mmmm yyyy, h:MM TT");
      } else if (this.item.status === "offline") {
        status = "offline";
      }

      this.status = status;
      this.presence = presence;
    },
    /**
     * Sets status message for group
     */
    setStatusForGroup() {
      this.status = `${this.item.membersCount} members`;
    },
    /**
     * Handles listener events
     */
    updateHeaderHandler(key, item, groupUser) {
      this.logInfo("CometChatMessageHeader: updateHeaderHandler", {
        key,
        item,
        groupUser,
      });
      switch (key) {
        case enums.USER_ONLINE:
        case enums.USER_OFFLINE: {
          if (this.type === "user" && this.item.uid === item.uid) {
            this.status = item.status;
            this.presence = item.status;
          }
          break;
        }
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_LEFT:
          if (
            this.type === "group" &&
            this.item.guid === item.guid &&
            this.loggedInUser.uid !== groupUser.uid
          ) {
            let membersCount = parseInt(item.membersCount);
            const status = `${membersCount} members`;

            this.status = status;
          }
          break;
        case enums.GROUP_MEMBER_JOINED:
          if (this.type === "group" && this.item.guid === item.guid) {
            let membersCount = parseInt(item.membersCount);
            const status = `${membersCount} members`;

            this.status = status;
          }
          break;
        case enums.GROUP_MEMBER_ADDED:
          if (this.type === "group" && this.item.guid === item.guid) {
            let membersCount = parseInt(item.membersCount);
            const status = `${membersCount} members`;

            this.status = status;
          }
          break;
        case enums.TYPING_STARTED: {
          if (
            this.type === "group" &&
            this.type === item.receiverType &&
            this.item.guid === item.receiverId
          ) {
            this.status = `${item.sender.name} ${COMETCHAT_CONSTANTS.IS_TYPING}`;
          } else if (
            this.type === "user" &&
            this.type === item.receiverType &&
            this.item.uid === item.sender.uid
          ) {
            this.status = COMETCHAT_CONSTANTS.TYPING;
          }

          this.emitAction("showReaction", { reaction: item });
          break;
        }
        case enums.TYPING_ENDED: {
          if (
            this.type === "group" &&
            this.type === item.receiverType &&
            this.item.guid === item.receiverId
          ) {
            this.setStatusForGroup();
          } else if (
            this.type === "user" &&
            this.type === item.receiverType &&
            this.item.uid === item.sender.uid
          ) {
            if (this.presence === "online") {
              this.status = "online";
              this.presence = "online";
            } else {
              this.setStatusForUser();
            }
          }

          this.emitAction("stopReaction", { reaction: item });
          break;
        }
        default:
          break;
      }
    },
  },
  beforeMount() {
    messageHeaderManager = new MessageHeaderManager();
    messageHeaderManager.attachListeners(this.updateHeaderHandler);

    if (this.type === "user") {
      this.setStatusForUser();
    } else {
      this.setStatusForGroup();
    }
  },
  beforeDestroy() {
    if (this.messageHeaderManager) {
      this.messageHeaderManager.removeListeners();
      this.messageHeaderManager = null;
    }
  },
};
</script>
<style scoped>
.cometchat_chat_option:first-of-type {
  margin-left: 0 !important;
}
.cometchat_chat_option:last-of-type {
  margin-right: 0 !important;
}
@media (min-width: 320px) and (max-width: 767px) {
  .cometchat_sidebar_btn {
    display: block !important;
  }
  .cometchat__message__header__user {
    width: calc(100% - 80px) !important;
  }
}
</style>