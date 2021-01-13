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
    itemClicked(item, type) {
      this.toggleSideBar();

      this.item = { ...item };
      if (type) {
        this.type = type;
      }
      this.closeThreadMessages();
    },
    async blockUser() {
      let usersList = [this.item.uid];

      try {
        await CometChatManager.blockUsers(usersList);

        this.item = { ...this.item, blockedByMe: true };
      } catch (error) {
        console.log("Blocking user fails with error", error);
      }
    },
    async unblockUser() {
      let usersList = [this.item.uid];

      try {
        await CometChatManager.unblockUsers(usersList);

        this.item = { ...this.item, blockedByMe: false };
      } catch (error) {
        console.log("Blocking user fails with error", error);
      }
    },

    async audioCall() {
      let receiverId, receiverType;

      if (this.type === "user") {
        receiverId = this.item.uid;
        receiverType = CometChat.RECEIVER_TYPE.USER;
      } else if (this.type === "group") {
        receiverId = this.item.guid;
        receiverType = CometChat.RECEIVER_TYPE.GROUP;
      }

      try {
        const call = await CometChatManager.call(
          receiverId,
          receiverType,
          CometChat.CALL_TYPE.AUDIO
        );

        this.appendCallMessage(call);
        this.outgoingCall = call;
      } catch (error) {
        console.log("Call initialization failed with exception:", error);
      }
    },
    async videoCall() {
      let receiverId, receiverType;
      if (this.type === "user") {
        receiverId = this.item.uid;
        receiverType = CometChat.RECEIVER_TYPE.USER;
      } else if (this.type === "group") {
        receiverId = this.item.guid;
        receiverType = CometChat.RECEIVER_TYPE.GROUP;
      }

      try {
        const call = await CometChatManager.call(
          receiverId,
          receiverType,
          CometChat.CALL_TYPE.VIDEO
        );

        this.appendCallMessage(call);
        this.outgoingCall = call;
      } catch (error) {
        console.log("Call initialization failed with exception:", error);
      }
    },
    async acceptIncomingCall(call) {
      this.incomingCall = call;

      const type = call.receiverType;

      try {
        const conversation = await CometChat.CometChatHelper.getConversationFromMessage(
          call
        );

        this.itemClicked(conversation.conversationWith, type);
      } catch (error) {
        console.log("error while fetching a conversation", error);
      }
    },
    rejectedIncomingCall(incomingCallMessage, rejectedCallMessage) {
      let receiverType = incomingCallMessage.receiverType;
      let receiverId =
        receiverType === "user"
          ? incomingCallMessage.sender.uid
          : incomingCallMessage.receiverId;

      //marking the incoming call message as read
      if (this.hasProperty(incomingCallMessage, "readAt") === false) {
        CometChat.markAsRead(incomingCallMessage.id, receiverId, receiverType);
      }

      //updating unreadcount in chats list
      this.messageToMarkRead = incomingCallMessage;

      receiverType = rejectedCallMessage.receiverType;
      receiverId = rejectedCallMessage.receiverId;

      if (
        (this.type === "group" &&
          receiverType === "group" &&
          receiverId === this.item.guid) ||
        (this.type === "user" &&
          receiverType === "user" &&
          receiverId === this.item.uid)
      ) {
        this.appendCallMessage(rejectedCallMessage);
      }
    },
    onThreadMessageComposed(composedMessage) {
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
    },
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
    deleteGroup(group) {
      this.groupToDelete = { ...group };

      this.toggleSideBar();
      this.resetForGroup();
    },
    leaveGroup(group) {
      this.groupToLeave = { ...group };

      this.toggleSideBar();
      this.resetForGroup();
    },
    updateLastMessage(message) {
      this.lastMessage = { ...message };
    },
    updateThreadMessage(message) {
      if (this.viewThreadMessage && this.threadMessageParent) {
        if (this.threadMessageParent.id === message.id) {
          this.threadMessageParent = Object.assign(
            {},
            this.threadMessageParent,
            message
          );
        }
      }
    },
    updateMembersCount(count) {
      const group = Object.assign({}, this.item, { membersCount: count });

      this.item = { ...group };
      this.groupToUpdate = { ...group };
    },
    membersAdded(members) {
      const messageList = [];

      members.forEach((eachMember, message) => {
        messageList.push(
          this.getMessageObj(
            `${this.loggedInUser.name} added ${eachMember.name}`,
            message
          )
        );
      });

      this.groupMessages = [...messageList];
    },
    memberUnbanned(members, message) {
      const messageList = [];

      members.forEach((eachMember) => {
        messageList.push(
          this.getMessageObj(
            `${this.loggedInUser.name} unbanned ${eachMember.name}`,
            message
          )
        );
      });

      this.groupMessages = [...messageList];
    },
    memberScopeChanged(members, message) {
      const messageList = [];

      members.forEach((eachMember) => {
        messageList.push(
          this.getMessageObj(
            `${this.loggedInUser.name} made ${eachMember.name} ${eachMember.scope}`,
            message
          )
        );
      });

      this.groupMessages = [...messageList];
    },
    getMessageObj(message, messageObj) {
      return {
        message,
        id: this.uid(),
        category: "action",
        sentAt: (new Date() / 1000) | 0,
        type: enums.ACTION_TYPE_GROUPMEMBER,
        ...(messageObj || {}),
      };
    },
    resetForGroup() {
      this.item = {};
      this.type = "group";
      this.viewDetailScreen = false;
    },
    callInitiated(message) {
      this.appendCallMessage(message);
    },
    outgoingCallEnded(message) {
      this.outgoingCall = null;
      this.incomingCall = null;
      this.appendCallMessage(message);
    },
    viewMessageThread(parentMessage) {
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
    setImageView(message) {
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
