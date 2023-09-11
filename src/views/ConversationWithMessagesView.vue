<template>
  <CometChatConversationsWithMessages
    :isMobileView="isMobileView"
  ></CometChatConversationsWithMessages>
</template>
<script lang="ts">
import { defineComponent, inject, onBeforeUnmount, provide, ref } from "vue";

import * as Assets from "../assets";

import {
  CometChatConversationsWithMessages,
  CometChatLocalize,
  CometChatPalette,
  CometChatTheme,
} from "@cometchat/chat-uikit-vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ChatsView",
  components: { CometChatConversationsWithMessages },
  props: {
    language: {
      type: String,
    },
  },
  setup(props, context) {
    let { theme, switchThemeMode }: any = inject("theme")!;
    let { isMobileView, switchView }: any = inject("isMobileView")!;
    const route: any = useRoute();
    onBeforeUnmount(() => {
      CometChatLocalize.init("en");
    });
    if (props.language) {
      CometChatLocalize.init(props.language);
    }
    if (route.name == "customconversationwithmessages") {
      theme = ref(
        new CometChatTheme({
          palette: new CometChatPalette({
            mode: theme.value.palette.mode,
            primary: {
              light: "#D422C2",
              dark: "#D422C2",
            },
            accent: {
              light: "#07E676",
              dark: "#B6F0D3",
            },
            accent50: {
              light: "#39f",
              dark: "#141414",
            },
            accent900: {
              light: "white",
              dark: "black",
            },
          }),
        })
      );
      provide("theme", { theme });
    }

    return { isMobileView };
  },
});
</script>
<style scoped>
.home {
  height: 100%;
}

.innerView {
  position: relative;
  justify-content: center;
  display: flex;
}

.cc-list__list::-webkit-scrollbar {
  background: transparent;
  width: 8px;
}
.cc-list__list::-webkit-scrollbar-thumb {
  background: rgb(232, 229, 229);
  border-radius: 8px;
}
</style>
