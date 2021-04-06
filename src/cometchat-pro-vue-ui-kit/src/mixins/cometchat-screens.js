import { CometChat } from "@cometchat-pro/chat";

import { CometChatManager } from "../util/controller";

import cometChatCommon from "../mixins/cometchat-common";
import propertyCheck from "../mixins/property-check";

import * as enums from "../util/enums";

export default {
  mixins: [propertyCheck, cometChatCommon],
  computed: {
    isItemPresent() {
      return !!Object.keys(this.item).length;
    },
  },
  methods: {
    /**
     * Handler for list item click
     * @param {*} item
     * @param {*} type
     */
    itemClicked(item, type) {
      this.toggleSideBar();

      this.item = { ...item };
      if (type) {
        this.type = type;
      }
      this.closeThreadMessages();
    },
    /**
     * Blocks a user
     */
    async blockUser() {
      let usersList = [this.item.uid];

      try {
        await CometChatManager.blockUsers(usersList);

        this.item = { ...this.item, blockedByMe: true };
      } catch (error) {
        this.logError("Blocking user fails with error", error);
      }
    },
    /**
     * Unblocks a user
     */
    async unblockUser() {
      let usersList = [this.item.uid];

      try {
        await CometChatManager.unblockUsers(usersList);

        this.item = { ...this.item, blockedByMe: false };
      } catch (error) {
        this.logError("Blocking user fails with error", error);
      }
    },
    /**
     * Starts an audio call
     */
    async audioCall() {
      try {
        let receiverId, receiverType;

        if (this.type === "user") {
          receiverId = this.item.uid;
          receiverType = CometChat.RECEIVER_TYPE.USER;
        } else if (this.type === "group") {
          receiverId = this.item.guid;
          receiverType = CometChat.RECEIVER_TYPE.GROUP;
        }

        const call = await CometChatManager.call(
          receiverId,
          receiverType,
          CometChat.CALL_TYPE.AUDIO
        );

        this.appendCallMessage(call);
        this.outgoingCall = call;
      } catch (error) {
        this.logError("Call initialization failed with exception:", error);
      }
    },
    /**
     * Starts a video call
     */
    async videoCall() {
      try {
        let receiverId, receiverType;

        if (this.type === "user") {
          receiverId = this.item.uid;
          receiverType = CometChat.RECEIVER_TYPE.USER;
        } else if (this.type === "group") {
          receiverId = this.item.guid;
          receiverType = CometChat.RECEIVER_TYPE.GROUP;
        }

        const call = await CometChatManager.call(
          receiverId,
          receiverType,
          CometChat.CALL_TYPE.VIDEO
        );

        this.appendCallMessage(call);
        this.outgoingCall = call;
      } catch (error) {
        this.logError("Call initialization failed with exception:", error);
      }
    },
    /**
     * Accepts an incoming call
     * @param {*} call
     */
    async acceptIncomingCall(call) {
      try {
        this.incomingCall = call;

        const type = call.receiverType;

        const conversation = await CometChat.CometChatHelper.getConversationFromMessage(
          call
        );

        this.itemClicked(conversation.conversationWith, type);
      } catch (error) {
        this.logError("error while fetching a conversation", error);
      }
    },
    /**
     * Rejects incoming call
     * @param {*} incomingCallMessage
     * @param {*} rejectedCallMessage
     */
    rejectedIncomingCall(incomingCallMessage, rejectedCallMessage) {
      try {
        let receiverType = incomingCallMessage.receiverType;
        let receiverId =
          receiverType === "user"
            ? incomingCallMessage.sender.uid
            : incomingCallMessage.receiverId;

        if (this.hasProperty(incomingCallMessage, "readAt") === false) {
          CometChat.markAsRead(incomingCallMessage);
        }

        this.messageToMarkRead = incomingCallMessage;

        receiverType = rejectedCallMessage.receiverType;
        receiverId = rejectedCallMessage.receiverId;

        if (
          (this.type === "group" &&
            receiverType === CometChat.RECEIVER_TYPE.GROUP &&
            receiverId === this.item.guid) ||
          (this.type === "user" &&
            receiverType === CometChat.RECEIVER_TYPE.USER &&
            receiverId === this.item.uid)
        ) {
          this.appendCallMessage(rejectedCallMessage);
        }
      } catch (error) {
        console.log("Reject incoming call failed with error:", error);
      }
    },
    /**
     * Compose thread message
     * @param {*} composedMessage
     */
    onThreadMessageComposed(composedMessage) {
      try {
        if (this.type !== this.threadMessageType) {
          return false;
        }

        if (
          (this.threadMessageType === "group" &&
            this.item.guid !== this.threadMessageItem.guid) ||
          (this.threadMessageType === "user" &&
            this.item.uid !== this.threadMessageItem.uid)
        ) {
          return false;
        }

        const message = { ...composedMessage };
        this.composedThreadMessage = message;
      } catch (error) {
        console.log("Thread message compose failed with error:", error);
      }
    },
    /**
     * Updates selected group
     * @param {*} key
     * @param {*} options
     */
    groupUpdated(key, options) {
      this.groupMessages = [];

      try {
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
      } catch (error) {
        console.log("Group update failed with error:", error);
      }
    },
    /**
     * Marks group for delete
     * @param {*} group
     */
    deleteGroup(group = {}) {
      this.groupToDelete = { ...group };

      this.toggleSideBar();
      this.resetForGroup();
    },
    /**
     * Marks group for leave
     * @param {*} group
     */
    leaveGroup(group = {}) {
      this.groupToLeave = { ...group };

      this.toggleSideBar();
      this.resetForGroup();
    },
    /**
     * Updates last message
     * @param {*} message
     */
    updateLastMessage(message = {}) {
      this.lastMessage = { ...message };
    },
    /**
     * Updates thread message
     * @param {*} message
     */
    updateThreadMessage(message) {
      try {
        if (this.viewThreadMessage && this.threadMessageParent) {
          if (this.threadMessageParent.id === message.id) {
            this.threadMessageParent = Object.assign(
              {},
              this.threadMessageParent,
              message
            );
          }
        }
      } catch (error) {
        console.log("Update thread message failed with error:", error);
      }
    },
    /**
     * Updates count of members
     * @param {*} count
     */
    updateMembersCount(count) {
      const group = Object.assign({}, this.item, { membersCount: count });

      this.item = { ...group };
      this.groupToUpdate = { ...group };
    },
    /**
     * Adds add members messages to list of messages
     */
    membersAdded(members = []) {
      const messageList = [];

      try {
        members.forEach((eachMember, message) => {
          messageList.push(
            this.getMessageObj(
              `${this.loggedInUser.name} added ${eachMember.name}`,
              message
            )
          );
        });

        this.groupMessages = [...messageList];
      } catch (error) {
        console.log("Members add failed with error:", error);
      }
    },
    /**
     * Adds unbanned messages to messages list
     * @param {*} members
     * @param {*} message
     */
    memberUnbanned(members = [], message = {}) {
      const messageList = [];

      try {
        members.forEach((eachMember) => {
          messageList.push(
            this.getMessageObj(
              `${this.loggedInUser.name} unbanned ${eachMember.name}`,
              message
            )
          );
        });

        this.groupMessages = [...messageList];
      } catch (error) {
        console.log("Members unban failed with error:", error);
      }
    },
    /**
     * Adds scope change messages to messages list
     * @param {*} members
     * @param {*} message
     */
    memberScopeChanged(members = [], message = {}) {
      const messageList = [];

      try {
        members.forEach((eachMember) => {
          messageList.push(
            this.getMessageObj(
              `${this.loggedInUser.name} made ${eachMember.name} ${eachMember.scope}`,
              message
            )
          );
        });

        this.groupMessages = [...messageList];
      } catch (error) {
        console.log("Members scope change failed with error:", error);
      }
    },
    /**
     * Gets a new combined message object
     * @param {*} message
     * @param {*} messageObj
     */
    getMessageObj(message = {}, messageObj = {}) {
      return {
        message,
        id: this.uid(),
        category: "action",
        sentAt: (new Date() / 1000) | 0,
        type: enums.ACTION_TYPE_GROUPMEMBER,
        ...(messageObj || {}),
      };
    },
    /**
     * Resets group
     */
    resetForGroup() {
      this.item = {};
      this.type = "group";
      this.viewDetailScreen = false;
    },
    callInitiated(message = {}) {
      this.appendCallMessage(message);
    },
    outgoingCallEnded(message = {}) {
      this.outgoingCall = null;
      this.incomingCall = null;
      this.appendCallMessage(message);
    },
    viewMessageThread(parentMessage = {}) {
      const message = { ...parentMessage };
      const threaditem = { ...this.item };

      this.viewThreadMessage = true;
      this.threadMessageParent = message;
      this.threadMessageItem = threaditem;
      this.threadMessageType = this.type;
      this.viewDetailScreen = false;
    },
    appendCallMessage(call) {
      this.callMessage = call;
    },
    closeThreadMessages() {
      this.viewDetailScreen = false;
      this.viewThreadMessage = false;
    },
    setImageView(message = {}) {
      this.imageView = message;
    },
    toggleSideBar() {
      this.viewSidebar = !this.viewSidebar;
    },
    toggleDetailView() {
      this.viewDetailScreen = !this.viewDetailScreen;
      this.viewThreadMessage = false;
    },
  },
};
