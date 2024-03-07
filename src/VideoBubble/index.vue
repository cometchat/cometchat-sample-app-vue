<template>
  <cometchat-backdrop>
    <div class="video__container" :style="computedStyles.wrapperStyle()">
      <div class="header">
        <span class="title" :style="computedStyles.titleStyle()"
          >Video Bubble</span
        >
        <div
          class="close__icon"
          :style="computedStyles.closeIconStyle()"
          @click="onClose()"
        ></div>
      </div>
      <div class="description" :style="computedStyles.cardDescriptionStyle()">
        CometChatvideoBubble component displays a media message containing a
        video which is downloadable.
      </div>
      <div class="video">
        <CometChatVideoBubble
          :src="SampleVideo"
          :videoStyle="computedStyles.bubbleStyle()"
        >
        </CometChatVideoBubble>
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
  CometChatVideoBubble,
} from "@cometchat/chat-uikit-vue";
import { SampleVideo } from "../assets";

import "@cometchat/uikit-elements";

export default defineComponent({
  name: "VideoBubble",
  emits: ["close-video-bubble"],
  components: { CometChatVideoBubble },

  setup(props, context) {
    let { theme }: any = inject("theme", new CometChatTheme({}));
    let closeIconURL: string = Close2xIcon;

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode ? getStyles() : {};
    });

    const onClose = () => {
      context.emit("close-video-bubble", {});
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
        bubbleStyle: () => {
          return {
            borderRadius: "8px",
            height: "160px",
            width: "260px",
            background: theme.value.palette.getAccent200(),
          };
        },
      };
    };

    return {
      computedStyles,
      onClose,
      SampleVideo,
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

.image {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image__container {
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
