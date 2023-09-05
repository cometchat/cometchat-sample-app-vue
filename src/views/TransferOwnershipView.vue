<template>
  <CometChatTransferOwnership :group="group"></CometChatTransferOwnership>
</template>
<script lang="ts">
import { defineComponent, inject, onBeforeMount, ref } from "vue";

import * as Assets from "../assets";

import { CometChatTransferOwnership } from "@cometchat/chat-uikit-vue";

import { CometChat } from "@cometchat/chat-sdk-javascript";

export default defineComponent({
  name: "TransferOwnershipView",
  components: { CometChatTransferOwnership },
  props: {
    language: {
      type: String,
    },
  },
  setup(props, context) {
    let { theme, switchThemeMode }: any = inject("theme")!;
    let group: any = ref(null);
    onBeforeMount(async () => {
      group.value = await CometChat.getGroup("supergroup");
    });

    return { group };
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
