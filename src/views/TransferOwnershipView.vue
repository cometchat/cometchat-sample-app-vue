<template>
  <CometChatTransferOwnership
    v-if="group"
    :group="group"
  ></CometChatTransferOwnership>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";

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
  setup() {
    const group = ref<CometChat.Group>();
    onBeforeMount(async () => {
      try {
        const groupsRequest = new CometChat.GroupsRequestBuilder()
          .setLimit(1)
          .joinedOnly(true)
          .build();
        const fetchedGroups = await groupsRequest.fetchNext();
        if (fetchedGroups && fetchedGroups.length > 0) {
          group.value = fetchedGroups[0];
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
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
