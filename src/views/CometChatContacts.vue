<template>
  <CometChatContacts title="Contacts"></CometChatContacts>
</template>
<script lang="ts">
import { defineComponent, inject, onBeforeUnmount } from "vue";

import {
  CometChatContacts,
  CometChatLocalize,
} from "@cometchat/chat-uikit-vue";

export default defineComponent({
  name: "ChatsView",
  components: { CometChatContacts },
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
