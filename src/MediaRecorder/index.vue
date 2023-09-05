<template>
  <cometchat-backdrop>
    <div class="recorder__container" :style="computedStyles.wrapperStyle()">
      <div class="header">
        <span class="header-title" :style="computedStyles.titleStyle()"
          >Media Recorder</span
        >
        <div
          class="close__icon"
          :style="computedStyles.closeIconStyle()"
          @click="onClose()"
        ></div>
      </div>
      <div class="description" :style="computedStyles.cardDescriptionStyle()">
        CometChat Media Recorder is a UI Kit component that allows you to record
        audio and video messages. It is a fully customizable component that can
        be used to record audio/video applications.
      </div>
      <br />
      <div class="recorder">
        <cometchat-media-recorder
          :mediaPlayerStyle="computedStyles.bubbleStyle()"
          :startIconURL="MicIcon"
          :closeIconURL="Close2xIcon"
          :stopIconURL="StopIcon"
          :submitButtonIconURL="SendIcon"
          startIconText=""
          stopIconText=""
          submitButtonIconText=""
        />
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
  MediaRecorderStyle,
  MicIcon,
  StopIcon,
  SendIcon,
} from "@cometchat/chat-uikit-vue";

import "@cometchat/uikit-elements";

export default defineComponent({
  name: "MediaRecorderView",
  emits: ["close-media-recorder"],
  components: {},
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
      context.emit("close-media-recorder", {});
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
          return new MediaRecorderStyle({
            height: "100px",
            width: "250px",
            background: theme.value.palette.getBackground(),
            border: `1px solid ${theme.value.palette.getAccent200()}`,
            borderRadius: "8px",
            closeIconTint: theme.value.palette.getAccent600(),
            submitIconTint: theme.value.palette.getAccent600(),
            startIconTint: theme.value.palette.getError(),
            stopIconTint: theme.value.palette.getError(),
          });
        },
      };
    };

    return {
      computedStyles,
      onClose,
      MediaRecorderStyle,
      Close2xIcon,
      MicIcon,
      StopIcon,
      SendIcon,
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

.recorder {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.recorder__container {
  height: fit-content;
  width: 360px;
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
