<template>
  <div :style="styles.message">
    <p :style="styles.messageTxt">{{ messageText }}</p>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import {
  STRING_MESSAGES,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import * as style from "./style";

export default {
  name: "CometChatActionMessageBubble",
  props: {
    message: { ...DEFAULT_OBJECT_PROP },
    loggedInUser: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    styles() {
      return {
        message: style.callMessageStyle(),
        messageTxt: style.callMessageTxtStyle(),
      };
    },
    messageText() {
      const call = this.message;
      const loggedInUser = this.loggedInUser;

      let message = null;
      switch (call.status) {
        case CometChat.CALL_STATUS.INITIATED: {
          message = STRING_MESSAGES.CALL_INITIATED;
          if (call.type === "audio") {
            if (call.receiverType === "user") {
              message =
                call.callInitiator.uid === loggedInUser.uid
                  ? STRING_MESSAGES.OUTGOING_AUDIO_CALL
                  : STRING_MESSAGES.INCOMING_AUDIO_CALL;
            } else if (call.receiverType === "group") {
              if (call.action === CometChat.CALL_STATUS.INITIATED) {
                message =
                  call.callInitiator.uid === loggedInUser.uid
                    ? STRING_MESSAGES.OUTGOING_AUDIO_CALL
                    : STRING_MESSAGES.INCOMING_AUDIO_CALL;
              } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
                message =
                  call.sender.uid === loggedInUser.uid
                    ? STRING_MESSAGES.CALL_REJECTED
                    : `${call.sender.name} ${STRING_MESSAGES.REJECTED_CALL}`;
              }
            }
          } else if (call.type === "video") {
            if (call.receiverType === "user") {
              message =
                call.callInitiator.uid === loggedInUser.uid
                  ? STRING_MESSAGES.OUTGOING_VIDEO_CALL
                  : STRING_MESSAGES.INCOMING_VIDEO_CALL;
            } else if (call.receiverType === "group") {
              if (call.action === CometChat.CALL_STATUS.INITIATED) {
                message =
                  call.callInitiator.uid === loggedInUser.uid
                    ? STRING_MESSAGES.OUTGOING_VIDEO_CALL
                    : STRING_MESSAGES.INCOMING_VIDEO_CALL;
              } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
                message =
                  call.sender.uid === loggedInUser.uid
                    ? STRING_MESSAGES.CALL_REJECTED
                    : `${call.sender.name} ${STRING_MESSAGES.REJECTED_CALL}`;
              }
            }
          }
          break;
        }
        case CometChat.CALL_STATUS.ONGOING: {
          if (call.receiverType === "user") {
            message = STRING_MESSAGES.CALL_ACCEPTED;
          } else if (call.receiverType === "group") {
            if (call.action === CometChat.CALL_STATUS.ONGOING) {
              message =
                call.sender.uid === loggedInUser.uid
                  ? STRING_MESSAGES.CALL_ACCEPTED
                  : `${call.sender.name} joined`;
            } else if (call.action === CometChat.CALL_STATUS.REJECTED) {
              message =
                call.sender.uid === loggedInUser.uid
                  ? STRING_MESSAGES.CALL_REJECTED
                  : `${call.sender.name} ${STRING_MESSAGES.REJECTED_CALL}`;
            } else if (call.action === "left") {
              message =
                call.sender.uid === loggedInUser.uid
                  ? `You ${STRING_MESSAGES.LEFT_THE_CALL}`
                  : `${call.sender.name} ${STRING_MESSAGES.LEFT_THE_CALL}`;
            }
          }

          break;
        }
        case CometChat.CALL_STATUS.UNANSWERED: {
          message = STRING_MESSAGES.CALL_UNANSWERED;
          if (
            call.type === "audio" &&
            (call.receiverType === "user" || call.receiverType === "group")
          ) {
            message =
              call.callInitiator.uid === loggedInUser.uid
                ? STRING_MESSAGES.UNANSWERED_AUDIO_CALL
                : STRING_MESSAGES.MISSED_AUDIO_CALL;
          } else if (
            call.type === "video" &&
            (call.receiverType === "user" || call.receiverType === "group")
          ) {
            message =
              call.callInitiator.uid === loggedInUser.uid
                ? STRING_MESSAGES.UNANSWERED_VIDEO_CALL
                : STRING_MESSAGES.MISSED_VIDEO_CALL;
          }
          break;
        }
        case CometChat.CALL_STATUS.REJECTED:
          message = STRING_MESSAGES.CALL_REJECTED;
          break;
        case CometChat.CALL_STATUS.CANCELLED:
          message = STRING_MESSAGES.CALL_CANCELLED;
          break;
        case CometChat.CALL_STATUS.ENDED:
          message = STRING_MESSAGES.CALL_ENDED;
          break;
        case CometChat.CALL_STATUS.BUSY:
          message = STRING_MESSAGES.CALL_BUSY;
          break;
        default:
          break;
      }
      return message;
    },
  },
};
</script>