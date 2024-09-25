<template>
  <div class="user-view__wrapper">
    <div v-if="route.name == 'CometChatUsers'" class="cc__users">
      <div class="cc__users-child">
        <CometChatUsers></CometChatUsers>
      </div>
    </div>
    <div
      v-if="route.name == 'CometChatUsersWithMessages'"
      class="cc__user-with-messages"
    >
      <div class="cc__user-with-messages-child">
        <CometChatUsersWithMessages
          :isMobileView="isMobileView"
        ></CometChatUsersWithMessages>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { defineComponent, inject, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  CometChatUsers,
  CometChatUsersWithMessages,
} from "@cometchat/chat-uikit-vue";

export default defineComponent({
  name: "UsersView",
  components: {
    CometChatUsers,
    CometChatUsersWithMessages,
  },
  props: {},
  setup() {
    const router = useRouter();
    const route: any = useRoute();
    let { isMobileView }: any = inject("isMobileView");
    return { router, route, isMobileView };
  },
});
</script>
<style scoped>
.user-view__wrapper {
  height: 100%;
  width: 100%;
}

.cc__user-with-messages-child {
  height: 100vh;
}

.cc__users-child {
  height: 100vh;
}
</style>
