<template>
  <div :style="computedStyles.wrapperStyle">
    <div style="height: 200px; width: 200px">
      <CometChatCallButtons
        :user="user"
        :callButtonsStyle="computedStyles.callButtonStyle"
        voiceCallIconText=""
        videoCallIconText=""
        key="callbuttons"
      ></CometChatCallButtons>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onBeforeMount, ref } from "vue";

import {
  CometChatCallButtons,
  CometChatTheme,
} from "@cometchat/chat-uikit-vue";

import ""@cometchat/uikit-elements";
import { CometChat } from "@cometchat-pro/chat";

export default defineComponent({
  name: "CallButtonsView",

  components: { CometChatCallButtons },

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode
        ? {
            callButtonStyle: getCallButtonStyle(),
            wrapperStyle: {
              backgroundColor: theme.value.palette.getBackground(),
              height: "100%",
              width: "100%",
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
            },
          }
        : {};
    });
    let user: any = ref(null);

    onBeforeMount(async () => {
      user.value = await CometChat.getUser("superhero2");
    });

    const getCallButtonStyle = () => {
      return {
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "0",
        background: theme.value.palette.getBackground(),
        buttonPadding: "8px 32px",
        buttonBackground: "RGBA(20, 20, 20, 0.04)",
        buttonBorder: "0 4px",
        buttonBorderRadius: "10px",
      };
    };

    return {
      computedStyles,
      user,
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
