<template>
  <CometChatCallLogsWithDetails
    :is-mobile-view="isMobileView"
  ></CometChatCallLogsWithDetails>
</template>
<script lang="ts">
import { defineComponent, inject, onBeforeUnmount } from "vue";

import {
  CometChatCallLogsWithDetails,
  CometChatLocalize,
} from "@cometchat/chat-uikit-vue";

export default defineComponent({
  name: "CallLogsWithDetailsView",
  components: { CometChatCallLogsWithDetails },
  props: {
    language: {
      type: String,
    },
  },
  setup() {
    let { isMobileView }: { isMobileView: boolean } = inject("isMobileView")!;
    onBeforeUnmount(() => {
      CometChatLocalize.init("en");
    });

    return { isMobileView };
  },
});
</script>
