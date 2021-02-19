<template>
  <div :style="styles.message">
    <p :style="styles.messageTxt">{{ messageText }}</p>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import * as style from "./style";

/**
 * Message bubble for action messages.
 *
 * @displayName CometChatActionMessageBubble
 */
export default {
  name: "CometChatActionMessageBubble",
  props: {
    /**
     * The message object.
     */
    message: { ...DEFAULT_OBJECT_PROP },
    /**
     * Current logged in user.
     */
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Computed styles for the bubble.
     */
    styles() {
      return {
        message: style.callMessageStyle(),
        messageTxt: style.callMessageTxtStyle(),
      };
    },
    /**
     * The computed message text to display.
     */
    messageText() {
      const call = this.message;
      const loggedInUser = this.loggedInUser;

      let message = null;
      switch (call.status) {
        case CometChat.CALL_STATUS.INITIATED: {
          message = COMETCHAT_CONSTANTS.CALL_INITIATED;
          if (call.type === CometChat.CALL_TYPE.AUDIO) {
            if (call.receiverType === CometChat.RECEIVER_TYPE.USER) {
              message =
                call.callInitiator.uid === loggedInUser.uid
                  ? COMETCHAT_CONSTANTS.OUTGOING_AUDIO_CALL
                  : COMETCHAT_CONSTANTS.INCOMING_AUDIO_CALL;
            } else if (call.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
              if (call.action === CometChat.CALL_STATUS.INITIATED) {
                message =
                  call.callInitiator.uid === loggedInUser.uid
                    ? COMETCHAT_CONSTANTS.OUTGOING_AUDIO_CALL
                    : COMETCHAT_CONSTANTS.INCOMING_AUDIO_CALL;
              } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
                message =
                  call.sender.uid === loggedInUser.uid
                    ? COMETCHAT_CONSTANTS.CALL_REJECTED
                    : `${call.sender.name} ${COMETCHAT_CONSTANTS.REJECTED_CALL}`;
              }
            }
          } else if (call.type === CometChat.CALL_TYPE.VIDEO) {
            if (call.receiverType === CometChat.RECEIVER_TYPE.USER) {
              message =
                call.callInitiator.uid === loggedInUser.uid
                  ? COMETCHAT_CONSTANTS.OUTGOING_VIDEO_CALL
                  : COMETCHAT_CONSTANTS.INCOMING_VIDEO_CALL;
            } else if (call.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
              if (call.action === CometChat.CALL_STATUS.INITIATED) {
                message =
                  call.callInitiator.uid === loggedInUser.uid
                    ? COMETCHAT_CONSTANTS.OUTGOING_VIDEO_CALL
                    : COMETCHAT_CONSTANTS.INCOMING_VIDEO_CALL;
              } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
                message =
                  call.sender.uid === loggedInUser.uid
                    ? COMETCHAT_CONSTANTS.CALL_REJECTED
                    : `${call.sender.name} ${COMETCHAT_CONSTANTS.REJECTED_CALL}`;
              }
            }
          }
          break;
        }
        case CometChat.CALL_STATUS.ONGOING: {
          if (call.receiverType === CometChat.RECEIVER_TYPE.USER) {
            message = COMETCHAT_CONSTANTS.CALL_ACCEPTED;
          } else if (call.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
            if (call.action === CometChat.CALL_STATUS.ONGOING) {
              message =
                call.sender.uid === loggedInUser.uid
                  ? COMETCHAT_CONSTANTS.CALL_ACCEPTED
                  : `${call.sender.name} ${COMETCHAT_CONSTANTS.JOINED}`;
            } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
              message =
                call.sender.uid === loggedInUser.uid
                  ? COMETCHAT_CONSTANTS.CALL_REJECTED
                  : `${call.sender.name} ${COMETCHAT_CONSTANTS.REJECTED_CALL}`;
            } else if (call.action === "left") {
              message =
                call.sender.uid === loggedInUser.uid
                  ? `${COMETCHAT_CONSTANTS.YOU} ${COMETCHAT_CONSTANTS.LEFT_THE_CALL}`
                  : `${call.sender.name} ${COMETCHAT_CONSTANTS.LEFT_THE_CALL}`;
            }
          }

          break;
        }
        case CometChat.CALL_STATUS.UNANSWERED: {
          message = COMETCHAT_CONSTANTS.CALL_UNANSWERED;
          if (
            call.type === CometChat.CALL_TYPE.AUDIO &&
            (call.receiverType === CometChat.RECEIVER_TYPE.USER ||
              call.receiverType === CometChat.RECEIVER_TYPE.GROUP)
          ) {
            message =
              call.callInitiator.uid === loggedInUser.uid
                ? COMETCHAT_CONSTANTS.UNANSWERED_AUDIO_CALL
                : COMETCHAT_CONSTANTS.MISSED_AUDIO_CALL;
          } else if (
            call.type === CometChat.CALL_TYPE.VIDEO &&
            (call.receiverType === CometChat.RECEIVER_TYPE.USER ||
              call.receiverType === CometChat.RECEIVER_TYPE.GROUP)
          ) {
            message =
              call.callInitiator.uid === loggedInUser.uid
                ? COMETCHAT_CONSTANTS.UNANSWERED_VIDEO_CALL
                : COMETCHAT_CONSTANTS.MISSED_VIDEO_CALL;
          }
          break;
        }
        case CometChat.CALL_STATUS.REJECTED:
          message = COMETCHAT_CONSTANTS.CALL_REJECTED;
          break;
        case CometChat.CALL_STATUS.CANCELLED:
          message = COMETCHAT_CONSTANTS.CALL_CANCELLED;
          break;
        case CometChat.CALL_STATUS.ENDED:
          message = COMETCHAT_CONSTANTS.CALL_ENDED;
          break;
        case CometChat.CALL_STATUS.BUSY:
          message = COMETCHAT_CONSTANTS.CALL_BUSY;
          break;
        default:
          break;
      }
      return message;
    },
  },
};
</script>