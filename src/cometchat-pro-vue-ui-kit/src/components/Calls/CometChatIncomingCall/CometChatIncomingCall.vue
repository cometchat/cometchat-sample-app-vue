<template>
  <div
    v-if="incomingCall"
    class="callalert__wrapper"
    :style="styles.incomingCallWrapper"
  >
    <div :style="styles.callContainer">
      <div :style="styles.headerWrapper">
        <div :style="styles.callDetail">
          <div :style="styles.name">
            {{ incomingCall.sender.name }}
          </div>
          <div :style="styles.callType">
            <template v-if="incomingCall.type === 'video'">
              <img :src="icons.video" :alt="STRINGS.INCOMING_VIDEO_CALL" />
              <span :style="styles.callType.span">
                {{ STRINGS.INCOMING_VIDEO_CALL }}
              </span>
            </template>
            <template v-else>
              <img :src="icons.audio" :alt="STRINGS.INCOMING_AUDIO_CALL" />
              <span :style="styles.callType.span">
                {{ STRINGS.INCOMING_AUDIO_CALL }}
              </span>
            </template>
          </div>
        </div>
        <div :style="styles.thumbnail">
          <comet-chat-avatar
            corner-radius="50%"
            :image="incomingCall.sender.avatar"
          />
        </div>
      </div>
      <div :style="styles.headerButton">
        <button :style="styles.declineButton" @click="rejectCall">
          {{ STRINGS.DECLINE }}
        </button>
        <button :style="styles.acceptButton" @click="acceptCall">
          {{ STRINGS.ACCEPT }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import { propertyCheck, cometChatCommon } from "../../../mixins/";

import { CometChatManager } from "../../../util/controller";
import { SvgAvatar } from "../../../util/svgavatar";
import * as enums from "../../../util/enums.js";

import { CometChatAvatar } from "../../Shared/";

import { CallAlertManager } from "./controller";

import * as style from "./style";

import audioCallIcon from "./resources/incomingaudiocall.png";
import videoCallIcon from "./resources/incomingvideocall.png";

import { incomingCallAlert } from "../../../resources/audio/";

let incomingAlert;
let callAlertManager;

/**
 * Displays the incoming call alert.
 *
 * @displayName CometChatIncomingCall
 */
export default {
  name: "CometChatIncomingCall",
  mixins: [propertyCheck, cometChatCommon],
  components: { CometChatAvatar },
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * The call object that is in progress.
     */
    callInProgress: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      incomingCall: null,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        name: style.nameStyle(),
        callType: style.callTypeStyle(),
        thumbnail: style.thumbnailStyle(),
        callDetail: style.callDetailStyle(),
        headerButton: style.headerButtonStyle(),
        callContainer: style.callContainerStyle(),
        headerWrapper: style.headerWrapperStyle(),
        acceptButton: style.buttonStyle(this.theme, true),
        declineButton: style.buttonStyle(this.theme, false),
        incomingCallWrapper: style.incomingCallWrapperStyle(this.theme),
      };
    },
    /**
     * Imported icon images.
     */
    icons() {
      return {
        audio: audioCallIcon,
        video: videoCallIcon,
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
     * Plays the incoming alert tone
     */
    playIncomingAlert() {
      try {
        incomingAlert.currentTime = 0;
        if (typeof incomingAlert.loop == "boolean") {
          incomingAlert.loop = true;
        } else {
          incomingAlert.addEventListener(
            "ended",
            function () {
              this.currentTime = 0;
              this.play();
            },
            false
          );
        }
        incomingAlert.play();
      } catch (error) {
        this.logError("Error playing incoming alert", error);
      }
    },
    /**
     * Pauses the incoming call alert
     */
    pauseIncomingAlert() {
      try {
        incomingAlert.pause();
      } catch (error) {
        this.logError("Error pausing incoming alert", error);
      }
    },
    /**
     * Marks a message as read
     */
    markMessageAsRead(message) {
      try {
        // const receiverType = message.receiverType;
        // const receiverId =
        //   receiverType === CometChat.RECEIVER_TYPE.USER
        //     ? message.sender.uid
        //     : message.receiverId;

        if (this.hasProperty(message, "readAt") === false) {
          CometChat.markAsRead(message);
        }
      } catch (error) {
        this.logError("Error marking message as read", error);
      }
    },
    /**
     * Function to recieve incoming call
     */
    async incomingCallReceived(incomingCall) {
      const activeCall = CometChat.getActiveCall();

      if (activeCall) {
        try {
          const rejectedCall = await CometChat.rejectCall(
            incomingCall.sessionId,
            CometChat.CALL_STATUS.BUSY
          );

          this.markMessageAsRead(incomingCall);
          this.emitAction("rejectedIncomingCall", {
            incomingCall,
            rejectedCall,
          });
        } catch (error) {
          this.emitAction("callError", { error });
          this.logError("Call rejection failed with error:", error);
        }
      } else if (this.incomingCall === null) {
        try {
          this.playIncomingAlert();

          if (incomingCall.sender.avatar === false) {
            const uid = incomingCall.sender.uid;
            const char = incomingCall.sender.name.charAt(0).toUpperCase();

            incomingCall.sender.avatar = SvgAvatar.getAvatar(uid, char);
          }

          this.incomingCall = incomingCall;
        } catch (error) {
          this.logError("Call rejection failed with error:", error);
        }
      }
    },
    /**
     * Function to cancel incoming call
     */
    incomingCallCancelled() {
      try {
        this.pauseIncomingAlert();
        this.incomingCall = null;
      } catch (error) {
        this.logError("Call cancel failed with error:", error);
      }
    },
    /**
     * Function to reject incoming call
     */
    async rejectCall() {
      this.pauseIncomingAlert();

      try {
        const rejectedCall = await CometChatManager.rejectCall(
          this.incomingCall.sessionId,
          CometChat.CALL_STATUS.REJECTED
        );

        this.emitAction("rejectedIncomingCall", {
          incomingCall: this.incomingCall,
          rejectedCall,
        });
      } catch (error) {
        this.emitAction("callError", { error });
      } finally {
        this.incomingCall = null;
      }
    },
    /**
     * Function to accept call
     */
    acceptCall() {
      try {
        this.pauseIncomingAlert();
        this.emitAction("acceptIncomingCall", {
          incomingCall: this.incomingCall,
        });

        setTimeout(() => {
          this.incomingCall = null;
        }, 100);
      } catch (error) {
        this.logError("Call accept failed with error:", error);
      }
    },
    /**
     * This function handles the call listeners
     */
    callScreenUpdateHandler(key, call) {
      switch (key) {
        case enums.INCOMING_CALL_RECEIVED:
          this.incomingCallReceived(call);
          break;
        case enums.INCOMING_CALL_CANCELLED:
          this.incomingCallCancelled();
          break;
        default:
          break;
      }
    },
  },
  beforeMount() {
    incomingAlert = new Audio(incomingCallAlert);

    callAlertManager = new CallAlertManager();
    callAlertManager.attachListeners(this.callScreenUpdateHandler);
  },
  beforeDestroy() {
    if (callAlertManager) {
      callAlertManager.removeListeners();
      callAlertManager = null;
    }
  },
};
</script>

<style scoped>
.callalert__wrapper {
  animation: slideDown 250ms ease;
}
.callalert__wrapper * {
  box-sizing: border-box !important;
  font-family: var(--call-alert-font-family) !important;
}
@keyframes slideDown {
  0% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>