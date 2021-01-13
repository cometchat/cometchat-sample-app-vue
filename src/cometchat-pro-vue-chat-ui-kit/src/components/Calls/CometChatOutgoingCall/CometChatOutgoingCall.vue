<template>
  <div
    v-if="callInProgress"
    ref="callScreenFrame"
    class="callscreen__wrapper"
    :style="styles.callScreenWrapper"
  >
    <div :style="styles.callScreenContainer">
      <div :style="styles.header">
        <span :style="styles.headerDuration"> calling... </span>
        <h6 :style="styles.headerName">
          {{ callInProgress && callInProgress.receiver.name }}
        </h6>
      </div>
      <div :style="styles.thumbnailWrapper">
        <div :style="styles.thumbnail">
          <template v-if="callInProgress">
            <comet-chat-avatar
              border-width="1px"
              corner-radius="50%"
              v-if="type === 'user'"
              :border-color="theme.borderColor.primary"
              :image="callInProgress.receiver.avatar"
            />
            <comet-chat-avatar
              border-width="1px"
              corner-radius="50%"
              v-else-if="type === 'group'"
              :border-color="theme.borderColor.primary"
              :image="callInProgress.receiver.icon"
            />
          </template>
        </div>
      </div>
      <div v-if="errorScreen" :style="styles.errorContainer">
        <div>{{ errorMessage }}</div>
      </div>

      <div :style="styles.headerIcon">
        <div :style="styles.iconWrapper" @click="cancelCall">
          <div :style="styles.icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import { cometChatCommon, propertyCheck } from "../../../mixins/";

import { CometChatManager } from "../../../util/controller";
import { SvgAvatar } from "../../../util/svgavatar";
import * as enums from "../../../util/enums.js";

import { CallScreenManager } from "./controller";

import { CometChatAvatar } from "../../Shared/";

import * as style from "./style";

import callIcon from "./resources/call-end-white-icon.svg";
import { outgoingCallAlert } from "../../../resources/audio/";

let outgoingAlert;
let callScreenManager;

export default {
  name: "CometChatOutgoingCall",
  mixins: [cometChatCommon, propertyCheck],
  components: { CometChatAvatar },
  props: {
    item: { ...DEFAULT_OBJECT_PROP },
    type: { ...DEFAULT_STRING_PROP },
    theme: { ...DEFAULT_OBJECT_PROP },
    incomingCall: { ...DEFAULT_OBJECT_PROP },
    outgoingCall: { ...DEFAULT_OBJECT_PROP },
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      errorScreen: false,
      errorMessage: null,
      callInProgress: null,
      outgoingCallScreen: false,
    };
  },
  watch: {
    outgoingCall: {
      handler(newValue, oldValue) {
        if (oldValue !== newValue && newValue) {
          this.playOutgoingAlert();

          let call = newValue;

          if (
            call.receiverType === "group" &&
            this.hasProperty(call.receiver, "icon") === false
          ) {
            const uid = call.receiver.guid;
            const char = call.receiver.name.charAt(0).toUpperCase();

            call.receiver.icon = SvgAvatar.getAvatar(uid, char);
          } else if (
            call.receiverType === "user" &&
            this.hasProperty(call.receiver, "avatar") === false
          ) {
            const uid = call.receiver.uid;
            const char = call.receiver.name.charAt(0).toUpperCase();

            call.receiver.avatar = SvgAvatar.getAvatar(uid, char);
          }

          this.outgoingCallScreen = true;
          this.callInProgress = call;
          this.errorScreen = false;
          this.errorMessage = null;
        }
      },
      deep: true,
    },
    incomingCall: {
      handler(newValue, oldValue) {
        if (oldValue !== newValue && newValue) {
          this.acceptCall();
        }
      },
      depp: true,
    },
  },
  computed: {
    styles() {
      return {
        header: style.headerStyle(),
        thumbnail: style.thumbnailStyle(),
        headerIcon: style.headerIconStyle(),
        headerName: style.headerNameStyle(),
        iconWrapper: style.iconWrapperStyle(),
        icon: style.iconStyle(callIcon, false),
        headerDuration: style.headerDurationStyle(),
        errorContainer: style.errorContainerStyle(),
        thumbnailWrapper: style.thumbnailWrapperStyle(),
        callScreenContainer: style.callScreenContainerStyle(),
        callScreenWrapper: style.callScreenWrapperStyle(this.theme),
      };
    },
  },
  methods: {
    callScreenUpdateHandler(key, call) {
      switch (key) {
        case enums.INCOMING_CALL_CANCELLED:
          this.callInProgress = null;
          this.outgoingCallScreen = false;
          break;
        case enums.OUTGOING_CALL_ACCEPTED:
          if (this.outgoingCallScreen === true) {
            this.pauseOutgoingAlert();

            this.outgoingCallScreen = false;
            this.callInProgress = call;
            this.startCall(call);
          }
          break;
        case enums.OUTGOING_CALL_REJECTED:
          if (call.status && call.status === CometChat.CALL_STATUS.BUSY) {
            this.errorScreen = true;
            this.errorMessage = `${call.sender.name} is on another call.`;
          } else {
            this.pauseOutgoingAlert();

            this.emitAction("outgoingCallRejected", { call });

            this.callInProgress = null;
            this.outgoingCallScreen = false;
          }
          break;
        default:
          break;
      }
    },
    async acceptCall() {
      try {
        const call = await CometChatManager.acceptCall(
          this.incomingCall.sessionId
        );

        if (
          this.hasProperty(call.receiver, "uid") &&
          this.hasProperty(call.receiver, "avatar") === false
        ) {
          const uid = call.receiver.uid;
          const char = call.receiver.name.charAt(0).toUpperCase();

          call.receiver.avatar = SvgAvatar.getAvatar(uid, char);
        } else if (
          this.hasProperty(call.receiver, "guid") &&
          this.hasProperty(call.receiver, "icon") === false
        ) {
          const guid = call.receiver.guid;
          const char = call.receiver.name.charAt(0).toUpperCase();

          call.receiver.icon = SvgAvatar.getAvatar(guid, char);
        }

        this.emitAction("acceptedIncomingCall", { call });

        this.outgoingCallScreen = false;
        this.callInProgress = call;
        this.errorScreen = false;
        this.errorMessage = null;

        this.startCall(call);
      } catch (error) {
        console.log("[CometChatOutgoingCall] acceptCall -- error", error);
        this.emitAction("callError", { error });
      }
    },

    async cancelCall() {
      this.pauseOutgoingAlert();

      try {
        const call = await CometChatManager.rejectCall(
          this.callInProgress.sessionId,
          CometChat.CALL_STATUS.CANCELLED
        );

        this.emitAction("outgoingCallCancelled", { call });
      } catch (error) {
        this.emitAction("callError", { error });
      } finally {
        this.outgoingCallScreen = false;
        this.callInProgress = null;
      }
    },
    startCall(call) {
      this.$nextTick(() => {
        const el = this.$refs.callScreenFrame;

        while (el.firstChild) {
          el.firstChild.remove();
        }

        CometChat.startCall(
          call.getSessionId(),
          el,
          new CometChat.OngoingCallListener({
            onUserJoined: (user) => {
              /* Notification received here if another user joins the call. */
              //console.log("User joined call:", enums.USER_JOINED, user);
              /* this method can be use to display message or perform any actions if someone joining the call */

              //call initiator gets the same info in outgoingcallaccpeted event
              if (
                call.callInitiator.uid !== this.loggedInUser.uid &&
                call.callInitiator.uid !== user.uid
              ) {
                this.markMessageAsRead(call);

                const callMessage = {
                  category: call.category,
                  type: call.type,
                  action: call.action,
                  status: call.status,
                  callInitiator: call.callInitiator,
                  callReceiver: call.callReceiver,
                  receiverId: call.receiverId,
                  receiverType: call.receiverType,
                  sentAt: call.sentAt,
                  sender: { ...user },
                };

                this.emitAction("userJoinedCall", { call: callMessage });
              }
            },
            onUserLeft: (user) => {
              /* Notification received here if another user left the call. */
              //console.log("User left call:", enums.USER_LEFT, user);
              /* this method can be use to display message or perform any actions if someone leaving the call */

              //call initiator gets the same info in outgoingcallaccpeted event
              if (
                call.callInitiator.uid !== this.loggedInUser.uid &&
                call.callInitiator.uid !== user.uid
              ) {
                this.markMessageAsRead(call);

                const callMessage = {
                  category: call.category,
                  type: call.type,
                  action: "left",
                  status: call.status,
                  callInitiator: call.callInitiator,
                  callReceiver: call.callReceiver,
                  receiverId: call.receiverId,
                  receiverType: call.receiverType,
                  sentAt: call.sentAt,
                  sender: { ...user },
                };

                this.emitAction("userLeftCall", { call: callMessage });
              }
            },
            onCallEnded: (endedCall) => {
              /* Notification received here if current ongoing call is ended. */
              //console.log("call ended:", enums.CALL_ENDED, call);

              this.showOutgoingScreen = false;
              this.callInProgress = null;

              this.markMessageAsRead(endedCall);

              this.emitAction("callEnded", { call: endedCall });
              /* hiding/closing the call screen can be done here. */
            },
          })
        );
      });
    },
    markMessageAsRead(message) {
      const type = message.receiverType;
      const id = type === "user" ? message.sender.uid : message.receiverId;

      if (this.hasProperty(message, "readAt") === false) {
        CometChat.markAsRead(message.id, id, type);
      }
    },
    playOutgoingAlert() {
      outgoingAlert.currentTime = 0;
      if (typeof outgoingAlert.loop == "boolean") {
        outgoingAlert.loop = true;
      } else {
        outgoingAlert.addEventListener(
          "ended",
          function () {
            this.currentTime = 0;
            this.play();
          },
          false
        );
      }
      outgoingAlert.play();
    },

    pauseOutgoingAlert() {
      outgoingAlert.pause();
    },
  },
  beforeMount() {
    outgoingAlert = new Audio(outgoingCallAlert);

    callScreenManager = new CallScreenManager();
    callScreenManager.attachListeners(this.callScreenUpdateHandler);
  },
  beforeDestroy() {
    if (callScreenManager) {
      callScreenManager.removeListeners();
      callScreenManager = null;
    }
  },
};
</script>
<style scoped>
.callscreen__wrapper {
  animation: fade-animation 250ms ease;
}
.callscreen__wrapper * {
  box-sizing: border-box;
  font-family: var(--call-screen-font-family);
}
@keyframes fade-animation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>