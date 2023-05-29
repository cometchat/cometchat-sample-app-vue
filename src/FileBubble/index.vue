<template>
  <cometchat-backdrop>
    <div class="file__container" :style="computedStyles.wrapperStyle()">
      <div class="header">
        <span class="header-title" :style="computedStyles.titleStyle()"
          >File Bubble</span
        >
        <div
          class="close__icon"
          :style="computedStyles.closeIconStyle()"
          @click="onClose()"
        ></div>
      </div>
      <div class="description" :style="computedStyles.cardDescriptionStyle()">
        CometChatFileBubble displays a media message containing a file.
      </div>
      <div class="file">
        <CometChatFileBubble
          :fileStyle="computedStyles.bubbleStyle()"
          :fileURL="SampleFile"
          title="File Bubble"
          subtitle="Shared File"
          :downloadIconURL="DownloadIcon"
        >
        </CometChatFileBubble>
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
  CometChatFileBubble,
  DownloadIcon,
} from "@cometchat-pro/vue-ui-kit";
import { SampleFile } from "../assets";

import "my-cstom-package-lit";

export default defineComponent({
  name: "FileBubble",
  emits: ["close-file-bubble"],
  components: { CometChatFileBubble },

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );
    let closeIconURL: string = Close2xIcon;
    let fileUrl = "/assets/sample.pdf";

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode ? getStyles() : {};
    });

    const onClose = () => {
      context.emit("close-file-bubble", {});
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
            height: "fit-content",
            width: "220px",
            background: theme.value.palette.getAccent200(),
            titleFont: fontHelper(theme.value.typography.subtitle1),
            titleColor: theme.value.palette.getAccent600(),
            subtitleFont: fontHelper(theme.value.typography.subtitle2),
            subtitleColor: theme.value.palette.getAccent600(),
            iconTint: "rgb(51, 153, 255)",
          };
        },
      };
    };

    return {
      computedStyles,
      onClose,
      SampleFile,
      fileUrl,
      DownloadIcon,
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

.file {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file__container {
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
}
</style>
