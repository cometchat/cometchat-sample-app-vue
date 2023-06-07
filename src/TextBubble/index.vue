<template>
  <cometchat-backdrop>
    <div class="video__container" :style="computedStyles.wrapperStyle()">
      <div class="header">
        <span class="header-title" :style="computedStyles.titleStyle()"
          >Text Bubble</span
        >
        <div
          class="close__icon"
          :style="computedStyles.closeIconStyle()"
          @click="onClose()"
        ></div>
      </div>
      <div class="description" :style="computedStyles.cardDescriptionStyle()">
        CometChatTextBubble component displays a text message.
      </div>
      <div class="receiver-text">
        <CometChatTextBubble
          :text="'heyyyyy'"
          :textStyle="computedStyles.receiverBubbleStyles()"
        >
        </CometChatTextBubble>
      </div>
      <div class="sender-text">
        <CometChatTextBubble
          :text="'hello'"
          :textStyle="computedStyles.senderBubbleStyles()"
        >
        </CometChatTextBubble>
      </div>
    </div>
  </cometchat-backdrop>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";

import {
  CometChatTheme,
  Close2xIcon,
  fontHelper,
  CometChatTextBubble,
} from "@cometchat/chat-uikit-vue";

import ""@cometchat/uikit-elements";

export default defineComponent({
  name: "TextBubble",
  emits: ["close-text-bubble"],
  components: { CometChatTextBubble },

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );
    let closeIconURL: string = Close2xIcon;

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode ? getStyles() : {};
    });

    let senderBubbleStyle = ref({
      borderRadius: "8px",
      background: theme.value.palette.getPrimary(),
      textFont: fontHelper(theme.value.typography.text2),
      textColor: theme.value.palette.getAccent("dark"),
    });
    let receiverBubbleStyle = ref({
      borderRadius: "8px",
      background: theme.value.palette.getAccent200(),
      textFont: fontHelper(theme.value.typography.text2),
      textColor: theme.value.palette.getAccent(),
    });

    const onClose = () => {
      context.emit("close-text-bubble", {});
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
        senderBubbleStyles: () => {
          return senderBubbleStyle.value;
        },
        receiverBubbleStyles: () => {
          return receiverBubbleStyle.value;
        },
      };
    };

    return {
      computedStyles,
      onClose,
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

.video {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sender-text {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.receiver-text {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;
}
.video__container {
  height: fit-content;
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
  padding-bottom: 24px;
}
</style>
