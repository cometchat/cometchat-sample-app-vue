<template>
  <CometChatCallLogs></CometChatCallLogs>
</template>
<script lang="ts">
import { defineComponent, inject, onBeforeUnmount } from "vue";

import {
  CometChatCallLogs,
  CometChatLocalize,
} from "@cometchat/chat-uikit-vue";

export default defineComponent({
  name: "CallLogsView",
  components: { CometChatCallLogs },
  props: {
    language: {
      type: String,
    },
  },
  setup() {
    let isMobileView =
      inject<{ isMobileView: boolean }>("isMobileView")?.isMobileView ?? false;
    onBeforeUnmount(() => {
      CometChatLocalize.init("en");
    });

    return { isMobileView };
  },
});
</script>
