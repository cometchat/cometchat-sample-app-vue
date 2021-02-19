import dateFormat from "dateformat";

import { SvgAvatar } from "../util/svgavatar";
import { COMETCHAT_CONSTANTS } from "../resources/constants";

export default {
  computed: {
    commonProps() {
      return {
        theme: this.theme,
        message: this.parsedMessage,
      };
    },
    parsedMessage() {
      if (this.isGroup && this.messageFrom !== "sender") {
        if (!this.message.sender.avatar) {
          const uid = this.message.sender.getUid();
          const char = this.message.sender.getName().charAt(0).toUpperCase();

          this.message.sender.setAvatar(SvgAvatar.getAvatar(uid, char));
        }
      }

      const message = Object.assign({}, this.message, {
        messageFrom: this.messageFrom,
      });

      return message;
    },
    messageTime() {
      return dateFormat(this.parsedMessage.sentAt * 1000, "shortTime");
    },
    isGroup() {
      return this.message.receiverType === "group";
    },
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
  },
  methods: {
    /**
     * Handles emitted action events
     * @param {*} event
     */
    actionHandler(event) {
      switch (event.action) {
        case "reactToMessage":
          this.$nextTick(() => {
            if (this.$refs && this.$refs.reactionRef) {
              this.$refs.reactionRef.toggleEmojiPicker();
            }
          });
          break;
        default:
          break;
      }

      this.emitAction(event.action, { message: event.message });
    },
    /**
     * Positions tooltip accurately by reading DOM
     */
    positionTooltip() {
      try {
        this.$nextTick(() => {
          const elem = this.$refs.messageBubbleWrapperRef;

          if (elem && elem.children) {
            const [ul, message] = elem.children;

            if (ul && message) {
              const { width: ulWidth } = ul.getBoundingClientRect();
              const { width: messageWidth } = message.getBoundingClientRect();

              const setPosition = (left, right) => {
                ul.style.left = left;
                ul.style.right = right;
              };

              const isMessageBigger = messageWidth > ulWidth;
              const isSender = this.messageFrom === "sender";

              if (isMessageBigger) {
                isSender ? setPosition("16px", "") : setPosition("", "16px");
              } else {
                isSender
                  ? setPosition("", "16px")
                  : setPosition(this.isGroup ? "62px" : "16px", "");
              }
            }
          }
        });
      } catch (error) {
        console.log("tooltip positioning failed with exception:", error);
      }
    },
  },
  mounted() {
    this.positionTooltip();
  },
};
