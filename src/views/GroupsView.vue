<template>
  <CometChatGroupMembers
    v-if="group && route.name == 'groupmembers'"
    :group="group"
  ></CometChatGroupMembers>
  <CometChatBannedMembers
    v-if="group && route.name == 'bannedmembers'"
    :group="group"
  ></CometChatBannedMembers>
  <CometChatAddMembers
    v-if="group && route.name == 'addmembers'"
    :group="group"
  ></CometChatAddMembers>
  <CometChatGroupsWithMessages
    :isMobileView="isMobileView"
  ></CometChatGroupsWithMessages>
</template>
<script lang="ts">
import { defineComponent, inject, onBeforeMount, ref } from "vue";

import { CometChatGroupMembers } from "@cometchat/chat-uikit-vue";
import { CometChatBannedMembers } from "@cometchat/chat-uikit-vue";
import {
  CometChatAddMembers,
  CometChatGroupsWithMessages,
} from "@cometchat/chat-uikit-vue";

import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "GroupsView",
  components: {
    CometChatGroupMembers,
    CometChatBannedMembers,
    CometChatAddMembers,
    CometChatGroupsWithMessages,
  },
  props: {
    language: {
      type: String,
    },
  },
  setup() {
    let { isMobileView }: any = inject("isMobileView")!;
    const route: any = useRoute();
    let group: any = ref(null);
    onBeforeMount(async () => {
      group.value = await CometChat.getGroup("supergroup");
    });

    return { group, route, isMobileView };
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
