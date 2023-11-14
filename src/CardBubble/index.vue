<template>
  <cometchat-backdrop>
    <div class="card__container" :style="computedStyles.wrapperStyle()">
      <div class="header">
        <span class="header-title" :style="computedStyles.titleStyle()"
          >Card Bubble</span
        >
        <div
          class="close__icon"
          :style="computedStyles.closeIconStyle()"
          @click="onClose()"
        ></div>
      </div>
      <div class="description" :style="computedStyles.cardDescriptionStyle()">
        The CometChatCardBubble component is used to display a card within a
        chat bubble. To learn more about this component tap here.
      </div>
      <div class="card">
        <CometChatCardBubble
          :message="getCardMessage()"
          :cardBubbleStyle="getCardMessageBubbleStyle()"
        >
        </CometChatCardBubble>
      </div>
    </div>
  </cometchat-backdrop>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";

import {
  CometChatTheme,
  Close2xIcon,
  fontHelper,
  CardMessage,
  CometChatCardBubble,
  CardBubbleStyle,
} from "@cometchat/chat-uikit-vue";

import "@cometchat/uikit-elements";

export default defineComponent({
  name: "cardBubble",
  emits: ["close-card-bubble"],
  components: { CometChatCardBubble },

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );
    let closeIconURL: string = Close2xIcon;

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode ? getStyles() : {};
    });

    const onClose = () => {
      context.emit("close-card-bubble", {});
    };

    const getStyles = () => {
      return {
        closeIconStyle: () => {
          return {
            WebkitMask: `url(${closeIconURL}) center center no-repeat`,
            background: theme.value.palette.getAccent600(),
          };
        },
        titleStyle: () => {
          return {
            font: fontHelper(theme.value.typography.title2),
            color: theme.value.palette.getAccent(),
          };
        },
        wrapperStyle: () => {
          return {
            background: theme.value.palette.getBackground(),
            boxShadow: `${theme.value.palette.getAccent400()} 0px 0px 3px`,
          };
        },
        cardDescriptionStyle: () => {
          return {
            font: fontHelper(theme.value.typography.subtitle2),
            color: theme.value.palette.getAccent600(),
          };
        },
      };
    };

    function getCardMessageBubbleStyle() {
      const buttonStyle = {
        height: "40px",
        width: "100%",
        background: "transparent",
        border: `none`,
        borderRadius: "0px",
        buttonTextFont: fontHelper(theme.value.typography.subtitle2),
        buttonTextColor: `${theme.value.palette.getPrimary()}`,
        justifyContent: "center",
      };

      return new CardBubbleStyle({
        background: "transparent",
        border: `1px solid ${theme.value.palette.getAccent100()}`,
        borderRadius: "8px",
        height: "fit-content",
        width: "300px",
        imageHeight: "auto",
        imageWidth: "100%",
        imageRadius: "8px",
        imageBackgroundColor: "transparent",
        descriptionFontColor: theme.value.palette.getAccent(),
        descriptionFont: fontHelper(theme.value.typography.subtitle2),
        buttonStyle: buttonStyle,
        dividerTintColor: theme.value.palette.getAccent100(),
        wrapperBackground: theme.value.palette.getBackground(),
        wrapperBorderRadius: "8px",
        wrapperPadding: "2px",
        disabledButtonColor: theme.value.palette.getAccent600(),
      });
    }

    function getCardMessage() {
      const json = {
        id: "1978",
        muid: "1697641596",
        conversationId: "nakul_user_rohit",
        sender: "nakul",
        receiverType: "user",
        receiver: "rohit",
        category: "interactive",
        type: "card",
        data: {
          entities: {
            sender: {
              entity: {
                uid: "nakul",
                name: "Nakul",
                role: "default",
                status: "available",
                lastActiveAt: 1697636600,
              },
              entityType: "user",
            },
            receiver: {
              entity: {
                uid: "rohit",
                name: "Rohit",
                role: "default",
                status: "available",
                lastActiveAt: 1696508846,
                conversationId: "nakul_user_rohit",
              },
              entityType: "user",
            },
          },
          resource:
            "REACT_NATIVE-4_0_0-2d83fe8e-a47e-444c-bbbf-c5d68afc030a-1697640527366",
          interactionGoal: {
            type: "none",
            elementIds: [],
          },
          interactiveData: {
            text: "Introducing our latest product, the Super Widget 5000! With its advanced features and sleek design, this widget is sure to revolutionize the industry. Don't miss out on the opportunity to experience the future of widgets. Order yours today!",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/en/e/e1/Thomas_D._Baird_%28low-resolution%29.jpg",
            cardActions: [
              {
                action: {
                  url: "https://api.example.com/register",
                  actionType: "urlNavigation",
                },
                elementId: "submitButton1",
                buttonText: "Order Now",
                elementType: "button",
                disableAfterInteracted: true,
              },
              {
                action: {
                  url: "https://api.example.com/register",
                  actionType: "urlNavigation",
                },
                elementId: "submitButton2",
                buttonText: "Register Now",
                elementType: "button",
                disableAfterInteracted: true,
              },
              {
                action: {
                  url: "https://api.example.com/register",
                  actionType: "urlNavigation",
                },
                elementId: "submitButton3",
                buttonText: "Login Now",
                elementType: "button",
                disableAfterInteracted: true,
              },
            ],
            interactableElementIds: [
              "submitButton1",
              "submitButton2",
              "submitButton3",
            ],
          },
          allowSenderInteraction: true,
        },
        sentAt: 1697641596,
        deliveredAt: 1697641596,
        readAt: 1697708285,
        updatedAt: 1697708285,
      };

      const cardMessage = CardMessage.fromJSON(json);

      return cardMessage;
    }
    return {
      computedStyles,
      onClose,
      getCardMessage,
      getCardMessageBubbleStyle,
    };
  },
});
</script>
<style scoped>
.close__icon {
  height: 30px;
  width: 30px;
  cursor: pointer;
}

.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.header-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__container {
  height: fit-content;
  max-height: 80%;
  width: 320px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  position: absolute;
  z-index: 10;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  overflow: scroll;
}
</style>
