<template>
  <div :style="styles.wrapper" class="chats__wrapper">
    <div :style="styles.header">
      <div
        class="header__close"
        v-if="enableCloseMenu"
        :style="styles.headerClose"
        @click="menuCloseHandler"
      />
      <h4 :style="styles.headerTitle">{{ STRINGS.CHATS }}</h4>
    </div>
    <div v-if="conversationList.length === 0" :style="styles.msg">
      <p :style="styles.msgText">
        {{ decoratorMessage }}
      </p>
    </div>
    <div
      ref="conversationListRef"
      :style="styles.list"
      v-else-if="conversationList.length != 0"
      @scroll="conversationScrollHandler($event)"
    >
      <div v-for="(conversation, i) in conversationList" :key="i">
        <comet-chat-conversation-list-item
          :config="config"
          :theme="themeValue"
          :conversationKey="i"
          :conversation="conversation"
          :loggedInUser="loggedInUser"
          :selectedConversation="selectedConversation"
          @click="conversationClickHandler"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import { CometChatManager } from "../../../util/controller";
import { ConversationListManager } from "./controller";

import { SvgAvatar } from "../../../util/svgavatar";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { propertyCheck, cometChatCommon } from "../../../mixins/";
import { theme } from "../../../resources/theme";
import * as enums from "../../../util/enums.js";

import CometChatConversationListItem from "../CometChatConversationListItem/CometChatConversationListItem";

import { incomingOtherMessageAlert } from "../../../resources/audio/";

import navigateIcon from "./resources/navigate.png";

import * as style from "./style";

let conversationListManager;

/**
 * Displays a list of conversation.
 *
 * @displayName CometChatConversationList
 */
export default {
  name: "CometChatConversationList",
  mixins: [propertyCheck, cometChatCommon],
  components: {
    CometChatConversationListItem,
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
     * @ignore
     */
    config: { ...DEFAULT_OBJECT_PROP },
    /**
     * The last message object in conversation.
     */
    lastMessage: { ...DEFAULT_OBJECT_PROP },
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
    /**
     * The message marked to be read.
     */
    messageToMarkRead: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      conversationList: [],
      selectedConversation: null,
      decoratorMessage: COMETCHAT_CONSTANTS.LOADING_MESSSAGE,
    };
  },
  watch: {
    /**
     * One true watcher that updates state on props update.
     */
    propsWatcher: {
      handler(_, prevProps) {
        const previousItem = JSON.stringify(prevProps.item);
        const currentItem = JSON.stringify(this.item);

        if (previousItem !== currentItem) {
          if (Object.keys(this.item).length === 0) {
            this.$nextTick(() => {
              if (this.$refs.conversationListRef) {
                this.$refs.conversationListRef.scrollTop = 0;
              }

              this.selectedConversation = {};
            });
          } else {
            const conversationlist = [...this.conversationList];
            const conversationObj = conversationlist.find((c) => {
              if (
                (c.conversationType === this.type &&
                  this.type === "user" &&
                  c.conversationWith.uid === this.item.uid) ||
                (c.conversationType === this.type &&
                  this.type === "group" &&
                  c.conversationWith.guid === this.item.guid)
              ) {
                return c;
              }

              return false;
            });

            if (conversationObj) {
              let conversationKey = conversationlist.indexOf(conversationObj);
              let newConversationObj = {
                ...conversationObj,
                unreadMessageCount: 0,
              };

              conversationlist.splice(conversationKey, 1, newConversationObj);

              this.conversationList = conversationlist;
              this.selectedConversation = newConversationObj;
            }
          }
        }

        if (
          prevProps.item &&
          Object.keys(prevProps.item).length &&
          prevProps.item.uid === this.item.uid &&
          prevProps.item.blockedByMe !== this.item.blockedByMe
        ) {
          let conversationlist = [...this.conversationList];

          let convKey = conversationlist.findIndex(
            (c) =>
              c.conversationType === "user" &&
              c.conversationWith.uid === this.item.uid
          );
          if (convKey > -1) {
            conversationlist.splice(convKey, 1);

            this.conversationList = conversationlist;
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
          const conversationlist = [...this.conversationList];
          const groupToUpdate = this.groupToUpdate;

          const convKey = conversationlist.findIndex(
            (c) =>
              c.conversationType === "group" &&
              c.conversationWith.guid === groupToUpdate.guid
          );
          if (convKey > -1) {
            const convObj = conversationlist[convKey];

            let convWithObj = { ...convObj.conversationWith };

            let newConvWithObj = {
              ...convWithObj,
              scope: groupToUpdate["scope"],
              membersCount: groupToUpdate["membersCount"],
            };
            let newConvObj = { ...convObj, conversationWith: newConvWithObj };

            conversationlist.splice(convKey, 1, newConvObj);

            this.conversationList = conversationlist;
          }
        }

        if (
          prevProps.groupToLeave &&
          prevProps.groupToLeave.guid !== this.groupToLeave.guid
        ) {
          const conversationlist = [...this.conversationList];
          const groupToLeave = this.groupToLeave;

          const convKey = conversationlist.findIndex(
            (c) =>
              c.conversationType === "group" &&
              c.conversationWith.guid === groupToLeave.guid
          );

          if (convKey > -1) {
            const groupObj = { ...conversationlist[convKey] };
            const membersCount = parseInt(groupToLeave["membersCount"]) - 1;

            let newgroupObj = Object.assign({}, groupObj, {
              membersCount: membersCount,
              hasJoined: false,
            });

            conversationlist.splice(convKey, 1, newgroupObj);
            this.conversationList = conversationlist;
          }
        }

        if (
          prevProps.groupToDelete &&
          prevProps.groupToDelete.guid !== this.groupToDelete.guid
        ) {
          const conversationlist = [...this.conversationList];
          const groupToDelete = this.groupToDelete;

          const convKey = conversationlist.findIndex(
            (c) =>
              c.conversationType === "group" &&
              c.conversationWith.guid === groupToDelete.guid
          );
          if (convKey > -1) {
            conversationlist.splice(convKey, 1);
            this.conversationList = conversationlist;
          }
        }

        if (prevProps.messageToMarkRead !== this.messageToMarkRead) {
          const message = this.messageToMarkRead;
          try {
            const {
              conversationKey,
              conversationObj,
              conversationList,
            } = this.makeConversation(message);

            if (conversationKey > -1) {
              let unreadMessageCount = this.makeUnreadMessageCount(
                conversationObj,
                "decrement"
              );
              let lastMessageObj = this.makeLastMessage(
                message,
                conversationObj
              );

              let newConversationObj = {
                ...conversationObj,
                lastMessage: lastMessageObj,
                unreadMessageCount: unreadMessageCount,
              };
              conversationList.splice(conversationKey, 1);
              conversationList.unshift(newConversationObj);

              this.conversationList = conversationList;
            }
          } catch (error) {
            this.logError("Error in converting message to conversation", error);
          }
        }

        if (prevProps.lastMessage !== this.lastMessage) {
          const lastMessage = this.lastMessage;
          const conversationList = [...this.conversationList];
          const conversationKey = conversationList.findIndex(
            (c) => c.conversationId === lastMessage.conversationId
          );

          if (conversationKey > -1) {
            const conversationObj = conversationList[conversationKey];
            let newConversationObj = {
              ...conversationObj,
              lastMessage: lastMessage,
            };

            conversationList.splice(conversationKey, 1);
            conversationList.unshift(newConversationObj);

            this.conversationList = conversationList;
          }
        }
      },
      deep: true,
    },
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
        msg: style.chatsMsgStyle(),
        list: style.chatsListStyle(),
        wrapper: style.chatsWrapperStyle(),
        header: style.chatsHeaderStyle(this.themeValue),
        msgText: style.chatsMsgTxtStyle(this.themeValue),
        headerClose: style.chatsHeaderCloseStyle(navigateIcon),
        headerTitle: style.chatsHeaderTitleStyle(this.enableCloseMenu),
      };
    },
    /**
     * Computed object, made of props, for watcher.
     */
    propsWatcher() {
      return {
        item: this.item,
        lastMessage: this.lastMessage,
        groupToLeave: this.groupToLeave,
        groupToUpdate: this.groupToUpdate,
        groupToDelete: this.groupToDelete,
        messageToMarkRead: this.messageToMarkRead,
      };
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
     * Handles menu close click
     */
    menuCloseHandler() {
      this.emitAction("closeMenuClicked");
    },
    /**
     * Handles conversation item click
     */
    conversationClickHandler({ item, type }) {
      this.emitAction("item-click", { item, type });
    },
    /**
     * Handles conversation list scroll
     */
    conversationScrollHandler(elem) {
      try {
        if (
          elem.target.offsetHeight + elem.target.scrollTop >=
          elem.target.scrollHeight - 20
        ) {
          this.getConversations();
        }
      } catch (error) {
        this.logError(
          "[CometChatConversationList] conversations scroll error",
          error
        );
      }
    },
    /**
     * Gets all conversations
     */
    async getConversations(clear = false) {
      try {
        const user = await new CometChatManager().getLoggedInUser();
        this.loggedInUser = user;

        if (!conversationListManager) {
          this.createManager();
          this.attachListeners();
        }

        const conversations = await conversationListManager.fetchNextConversation();

        if (conversations.length === 0) {
          this.decoratorMessage = COMETCHAT_CONSTANTS.NO_CHATS_FOUND;
        }

        conversations.forEach((conversation) => {
          if (
            conversation.conversationType === "user" &&
            !conversation.conversationWith.avatar
          ) {
            conversation.conversationWith.avatar = this.setAvatar(conversation);
          } else if (
            conversation.conversationType === "group" &&
            !conversation.conversationWith.icon
          ) {
            conversation.conversationWith.icon = this.setAvatar(conversation);
          }

          if (
            this.type &&
            this.item &&
            this.type === conversation.conversationType
          ) {
            if (
              (conversation.conversationType === "user" &&
                this.item.uid === conversation.conversationWith.uid) ||
              (conversation.conversationType === "group" &&
                this.item.guid === conversation.conversationWith.guid)
            ) {
              conversation.unreadMessageCount = 0;
            }
          }
        });

        if (clear) {
          this.conversationList = conversations;
        } else {
          this.conversationList = [...this.conversationList, ...conversations];
        }
      } catch (error) {
        this.decoratorMessage = COMETCHAT_CONSTANTS.ERROR_LOADING_CHATS;
        this.logError(
          "[CometChatConversationList] getConversations error",
          error
        );
      }
    },
    /**
     * Creates a message for conversation
     */
    makeConversation(message) {
      return new Promise((resolve, reject) => {
        CometChat.CometChatHelper.getConversationFromMessage(message)
          .then((conversation) => {
            let conversations = [...this.conversationList];

            let conversationKey = conversations.findIndex(
              (c) => c.conversationId === conversation.conversationId
            );

            let conversationObj = { ...conversation };
            if (conversationKey > -1) {
              conversationObj = { ...conversations[conversationKey] };
            }

            resolve({
              conversationKey: conversationKey,
              conversationObj: conversationObj,
              conversations: conversations,
            });
          })
          .catch((error) => reject(error));
      });
    },
    /**
     * Makes unread message count
     */
    makeUnreadMessageCount(conversation = {}, operator) {
      try {
        if (Object.keys(conversation).length === 0) {
          return 1;
        }

        let unreadMessageCount = parseInt(conversation.unreadMessageCount);

        if (
          this.selectedConversation &&
          this.selectedConversation.conversationId ===
            conversation.conversationId
        ) {
          unreadMessageCount = 0;
        } else if (
          (this.item &&
            this.hasProperty(this.item, "guid") &&
            this.hasProperty(conversation.conversationWith, "guid") &&
            this.item.guid === conversation.conversationWith.guid) ||
          (this.item &&
            this.hasProperty(this.item, "uid") &&
            this.hasProperty(conversation.conversationWith, "uid") &&
            this.item.uid === conversation.conversationWith.uid)
        ) {
          unreadMessageCount = 0;
        } else {
          if (operator && operator === "decrement") {
            unreadMessageCount = unreadMessageCount
              ? unreadMessageCount - 1
              : 0;
          } else {
            unreadMessageCount = unreadMessageCount + 1;
          }
        }

        return unreadMessageCount;
      } catch (error) {
        this.logError(
          "[CometChatConversationList] unreadMessageCount error",
          error
        );
      }
    },
    /**
     * Makes last message
     */
    makeLastMessage(message) {
      return Object.assign({}, message);
    },
    /**
     * Sets SVG avatar
     */
    setAvatar(conversation) {
      if (
        conversation.conversationType === "user" &&
        !conversation.conversationWith.avatar
      ) {
        const uid = conversation.conversationWith.uid;
        const char = conversation.conversationWith.name.charAt(0).toUpperCase();

        return SvgAvatar.getAvatar(uid, char);
      } else if (
        conversation.conversationType === "group" &&
        !conversation.conversationWith.icon
      ) {
        const guid = conversation.conversationWith.guid;
        const char = conversation.conversationWith.name.charAt(0).toUpperCase();

        return SvgAvatar.getAvatar(guid, char);
      }
    },
    /**
     * Handles update of user online/offline
     */
    updateUser(user) {
      try {
        const conversations = [...this.conversationList];

        const conversationKey = conversations.findIndex(
          (conversation) =>
            conversation.conversationType === "user" &&
            conversation.conversationWith.uid === user.uid
        );

        if (conversationKey > -1) {
          let conversation = { ...conversations[conversationKey] };
          let conversationWith = {
            ...conversation.conversationWith,
            status: user.getStatus(),
          };

          let newConversation = {
            ...conversation,
            conversationWith: conversationWith,
          };
          conversations.splice(conversationKey, 1, newConversation);
          this.conversationList = conversations;
        }
      } catch (error) {
        this.logError("[CometChatConversationList] updateUser error", error);
      }
    },
    /**
     * Updates conversation on message/call receive
     */
    async updateConversation(message, notification = true) {
      try {
        const {
          conversations,
          conversationKey,
          conversationObj,
        } = await this.makeConversation(message);

        if (conversationKey > -1) {
          let unreadMessageCount = this.makeUnreadMessageCount(conversationObj);
          let lastMessageObj = this.makeLastMessage(message, conversationObj);

          let newConversationObj = {
            ...conversationObj,
            lastMessage: lastMessageObj,
            unreadMessageCount: unreadMessageCount,
          };
          conversations.splice(conversationKey, 1);
          conversations.unshift(newConversationObj);
        } else {
          let unreadMessageCount = this.makeUnreadMessageCount();
          let lastMessageObj = this.makeLastMessage(message);

          let newConversationObj = {
            ...conversationObj,
            lastMessage: lastMessageObj,
            unreadMessageCount: unreadMessageCount,
          };
          conversations.unshift(newConversationObj);
        }

        this.conversationList = conversations;

        if (notification) {
          this.playAudio(message);
        }
      } catch (error) {
        this.logError("Error in converting message to conversation", error);
      }
    },
    /**
     * Handles message edit/delete
     */
    async conversationEditedDeleted(message) {
      try {
        const {
          conversations,
          conversationKey,
          conversationObj,
        } = await this.makeConversation(message);
        if (conversationKey > -1) {
          let lastMessageObj = conversationObj.lastMessage;

          if (lastMessageObj.id === message.id) {
            const newLastMessageObj = Object.assign(
              {},
              lastMessageObj,
              message
            );
            let newConversationObj = Object.assign({}, conversationObj, {
              lastMessage: newLastMessageObj,
            });
            conversations.splice(conversationKey, 1, newConversationObj);

            this.conversationList = conversations;
          }
        }
      } catch (error) {
        this.logError("Error in converting message to conversation", error);
      }
    },
    /**
     * Handles group member add
     */
    async updateGroupMemberAdded(message, options) {
      try {
        const {
          conversations,
          conversationKey,
          conversationObj,
        } = await this.makeConversation(message);

        if (conversationKey > -1) {
          let unreadMessageCount = this.makeUnreadMessageCount(conversationObj);
          let lastMessageObj = this.makeLastMessage(message, conversationObj);

          let conversationWithObj = { ...conversationObj.conversationWith };
          let membersCount = parseInt(conversationWithObj.membersCount) + 1;

          let newConversationWithObj = {
            ...conversationWithObj,
            membersCount: membersCount,
          };

          let newConversationObj = {
            ...conversationObj,
            lastMessage: lastMessageObj,
            unreadMessageCount: unreadMessageCount,
            conversationWith: newConversationWithObj,
          };

          conversations.splice(conversationKey, 1);
          conversations.unshift(newConversationObj);

          this.conversationList = conversations;
          this.playAudio(message);
        } else if (options && this.loggedInUser.uid === options.user.uid) {
          let avatar = this.setAvatar(conversationObj);

          let unreadMessageCount = this.makeUnreadMessageCount();
          let lastMessageObj = this.makeLastMessage(message);

          let conversationWithObj = { ...conversationObj.conversationWith };
          let membersCount = parseInt(conversationWithObj.membersCount) + 1;
          let scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT;
          let hasJoined = options.hasJoined;

          let newConversationWithObj = {
            ...conversationWithObj,
            icon: avatar,
            scope: scope,
            hasJoined: hasJoined,
            membersCount: membersCount,
          };
          let newConversationObj = {
            ...conversationObj,
            lastMessage: lastMessageObj,
            unreadMessageCount: unreadMessageCount,
            conversationWith: newConversationWithObj,
          };

          conversations.unshift(newConversationObj);

          this.conversationList = conversations;
          this.playAudio(message);
        }
      } catch (error) {
        this.logError("Error in converting message to conversation", error);
      }
    },
    /**
     * Handles group member remove
     */
    async updateGroupMemberRemoved(message, options) {
      try {
        const {
          conversations,
          conversationKey,
          conversationObj,
        } = await this.makeConversation(message);

        if (conversationKey > -1) {
          if (options && this.loggedInUser.uid === options.user.uid) {
            conversations.splice(conversationKey, 1);

            this.conversationList = conversations;
          } else {
            let unreadMessageCount = this.makeUnreadMessageCount(
              conversationObj
            );
            let lastMessageObj = this.makeLastMessage(message, conversationObj);

            let conversationWithObj = { ...conversationObj.conversationWith };
            let membersCount = parseInt(conversationWithObj.membersCount) - 1;
            let newConversationWithObj = {
              ...conversationWithObj,
              membersCount: membersCount,
            };

            let newConversationObj = {
              ...conversationObj,
              conversationWith: newConversationWithObj,
              lastMessage: lastMessageObj,
              unreadMessageCount: unreadMessageCount,
            };
            conversations.splice(conversationKey, 1);
            conversations.unshift(newConversationObj);

            this.conversationList = conversations;
            this.playAudio(message);
          }
        }
      } catch (error) {
        this.logError("Error in converting message to conversation", error);
      }
    },
    /**
     * Handles group member scope change
     */
    async updateGroupMemberScopeChanged(message, options) {
      try {
        const {
          conversations,
          conversationKey,
          conversationObj,
        } = await this.makeConversation(message);

        if (conversationKey > -1) {
          let unreadMessageCount = this.makeUnreadMessageCount(conversationObj);
          let lastMessageObj = this.makeLastMessage(message, conversationObj);

          let conversationWithObj = { ...conversationObj.conversationWith };
          let membersCount = parseInt(conversationWithObj.membersCount);
          let scope = conversationWithObj.scope;

          if (options && this.loggedInUser.uid === options.user.uid) {
            scope = options.scope;
          }

          let newConversationWithObj = {
            ...conversationWithObj,
            membersCount: membersCount,
            scope: scope,
          };
          let newConversationObj = {
            ...conversationObj,
            lastMessage: lastMessageObj,
            conversationWith: newConversationWithObj,
            unreadMessageCount: unreadMessageCount,
          };

          conversations.splice(conversationKey, 1);
          conversations.unshift(newConversationObj);

          this.conversationList = conversations;
          this.playAudio(message);
        }
      } catch (error) {
        this.logError("Error in converting message to conversation", error);
      }
    },
    /**
     * Handles group memer add/unban
     */
    async updateGroupMemberChanged(message, options, operator) {
      try {
        const {
          conversations,
          conversationKey,
          conversationObj,
        } = await this.makeConversation(message);

        if (conversationKey > -1) {
          if (options && this.loggedInUser.uid !== options.user.uid) {
            let unreadMessageCount = this.makeUnreadMessageCount(
              conversationObj
            );
            let lastMessageObj = this.makeLastMessage(message, conversationObj);

            let conversationWithObj = { ...conversationObj.conversationWith };
            let membersCount = parseInt(conversationWithObj.membersCount);
            if (operator === "increment") {
              membersCount += 1;
            }

            let newConversationWithObj = {
              ...conversationWithObj,
              membersCount: membersCount,
            };
            let newConversationObj = {
              ...conversationObj,
              lastMessage: lastMessageObj,
              conversationWith: newConversationWithObj,
              unreadMessageCount: unreadMessageCount,
            };

            conversations.splice(conversationKey, 1);
            conversations.unshift(newConversationObj);

            this.conversationList = conversations;
            this.playAudio(message);
          }
        }
      } catch (error) {
        this.logError("Error in converting message to conversation", error);
      }
    },
    /**
     * Handles listeners for conversation
     */
    conversationsUpdateHandler(key, item, message, options) {
      this.logInfo("CometChatConversationList: conversationsUpdateHandler", {
        key,
        item,
        message,
        options,
      });
      switch (key) {
        case enums.USER_ONLINE:
        case enums.USER_OFFLINE:
          this.updateUser(item);
          break;
        case enums.TEXT_MESSAGE_RECEIVED:
        case enums.MEDIA_MESSAGE_RECEIVED:
        case enums.CUSTOM_MESSAGE_RECEIVED:
          this.updateConversation(message);
          break;
        case enums.MESSAGE_EDITED:
        case enums.MESSAGE_DELETED:
          this.conversationEditedDeleted(message);
          break;
        case enums.INCOMING_CALL_RECEIVED:
        case enums.INCOMING_CALL_CANCELLED:
          this.updateConversation(message, false);
          break;
        case enums.GROUP_MEMBER_ADDED:
          this.updateGroupMemberAdded(message, options);
          break;
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_LEFT:
          this.updateGroupMemberRemoved(message, options);
          break;
        case enums.GROUP_MEMBER_SCOPE_CHANGED:
          this.updateGroupMemberScopeChanged(message, options);
          break;
        case enums.GROUP_MEMBER_JOINED:
          this.updateGroupMemberChanged(message, options, "increment");
          break;
        case enums.GROUP_MEMBER_UNBANNED:
          this.updateGroupMemberChanged(message, options, "");
          break;
        default:
          break;
      }
    },
    /**
     * Plays incoming message alert
     */
    playAudio(message) {
      try {
        if (
          message.category === enums.CATEGORY_ACTION &&
          message.type === enums.ACTION_TYPE_GROUPMEMBER
        ) {
          return false;
        }

        this.audio.currentTime = 0;
        this.audio.play();
      } catch (error) {
        this.logError("Error playing audio", error);
      }
    },
    createManager() {
      conversationListManager = new ConversationListManager();
    },
    attachListeners() {
      if (conversationListManager) {
        conversationListManager.attachListeners(
          this.conversationsUpdateHandler
        );
      }
    },
    removeListeners() {
      if (conversationListManager) {
        conversationListManager.removeListeners();
        conversationListManager = null;
      }
    },
  },
  beforeMount() {
    this.audio = new Audio(incomingOtherMessageAlert);

    this.createManager();

    this.getConversations();
    this.attachListeners();
  },
  beforeDestroy() {
    this.removeListeners();
  },
};
</script>
<style scoped>
.chats__wrapper * {
  box-sizing: border-box;
}
.chats__wrapper * ::-webkit-scrollbar {
  width: 8px;
  height: 4px;
}
.chats__wrapper * ::-webkit-scrollbar-track {
  background: #ffffff00;
}
.chats__wrapper * ::-webkit-scrollbar-thumb {
  background: #ccc;
}
.chats__wrapper * ::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
@media (min-width: 320px) and (max-width: 767px) {
  .header__close {
    display: block !important;
  }
}
</style>