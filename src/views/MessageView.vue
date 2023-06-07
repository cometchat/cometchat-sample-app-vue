<template>
  <div class="message-view_wrapper">
    <div v-if="route.name == 'message'" class="cc__messages">
      <div class="cc__messages-child">
        <CometChatMessages :group="currentGroup"></CometChatMessages>
      </div>
    </div>
    <div v-if="route.name == 'messageheader'" class="cc__message-header">
      <div class="cc__message-header-child">
        <CometChatMessageHeader :group="currentGroup"></CometChatMessageHeader>
      </div>
    </div>
    <div v-if="route.name == 'CometChatMessageList'" class="cc__message-list">
      <div class="cc__message-list-child">
        <CometChatMessageList :group="currentGroup"></CometChatMessageList>
      </div>
    </div>
    <div
      v-if="route.name == 'CometChatMessageComposer'"
      class="cc__message-composer"
    >
      <div class="cc__message-composer-child">
        <CometChatMessageComposer
          :group="currentGroup"
        ></CometChatMessageComposer>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { CometChat } from "@cometchat-pro/chat";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  CometChatMessages,
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatMessageComposer,
} from "@cometchat/chat-uikit-vue";

export default defineComponent({
  name: "MessagesView",
  components: {
    CometChatMessages,
    CometChatMessageHeader,
    CometChatMessageList,
    CometChatMessageComposer,
  },
  props: {},
  setup(props) {
    const router = useRouter();
    const route: any = useRoute();
    let currentGroup = ref();
    let currentUser = ref();
    let users = ref();

    var GUID = "supergroup";
    CometChat.getGroup(GUID).then(
      (group) => {
        currentGroup.value = group;
      },
      (error) => {
        console.log("Group details fetching failed with exception:", error);
      }
    );

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
      currentGroup.value = await CometChat.getGroup("supergroup");
    });

    return { router, route, currentGroup, users, currentUser };
  },
});
</script>
<style scoped>
.message-view_wrapper {
  height: 100%;
  width: 100%;
  border: 3px solid red transparent;
}
.cc__messages {
  width: 100%;

  border: 3px solid red transparent;
}
.cc__messages-child {
  margin-top: -20px;
  height: 100vh;
  border: 3px solid red transparent;
}
.cc__message-header {
  height: 100vh;

  border: 5px solid blue transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cc__message-header-child {
  width: 500px;
}
.cc__message-composer {
  height: 100vh;

  border: 5px solid blue transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cc__message-composer-child {
  width: 100%;
}

.cc__message-list {
  height: 100vh;
  border: 3px solid blue transparent;
  overflow-x: hidden;
}
.cc__message-list::-webkit-scrollbar {
  background: transparent;
  width: 8px;
}
.cc__message-list::-webkit-scrollbar-thumb {
  background: rgb(232, 229, 229);
  border-radius: 8px;
}
</style>
