<template>
  <div class="user-view__wrapper">
    <div v-if="route.name == 'CometChatUsers'" class="cc__users">
      <div class="cc__users-child">
        <CometChatUsers :list="users"></CometChatUsers>
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
import { CometChat } from "@cometchat-pro/chat";
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
  setup(props) {
    const router = useRouter();
    const route: any = useRoute();
    let { isMobileView, switchView }: any = inject("isMobileView")!;

    let currentUser = ref();
    let users = ref();

    var limit = 30;
    var usersRequest = new CometChat.UsersRequestBuilder()
      .setLimit(limit)
      .build();

    usersRequest.fetchNext().then(
      (userList) => {
        users.value = userList;
        currentUser.value = userList[0];
      },
      (error) => {
        console.log("User list fetching failed with error:", error);
      }
    );
    onBeforeMount(async () => {
      currentUser.value = await CometChat.getUser("superhero2");
    });

    return { router, route, users, currentUser, isMobileView };
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
