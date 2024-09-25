<template>
  <CometChatDetails
    v-if="group && route.name == 'groupsdetails'"
    :group="group"
  ></CometChatDetails>

  <CometChatDetails
    v-if="user && route.name == 'usersdetails'"
    :user="user"
  ></CometChatDetails>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";

import { CometChatDetails } from "@cometchat/chat-uikit-vue";

import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DetailsView",
  components: { CometChatDetails },
  props: {
    language: {
      type: String,
    },
  },
  setup() {
    const group = ref<CometChat.Group>();
    const user = ref<CometChat.User>();

    const route: any = useRoute();
    onBeforeMount(async () => {
      if (route.name == "groupsdetails") {
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
      }

      if (route.name == "usersdetails") {
        try {
          const usersRequest = new CometChat.UsersRequestBuilder()
            .setLimit(1)
            .build();
          const fetchedUsers = await usersRequest.fetchNext();
          if (fetchedUsers && fetchedUsers.length > 0) {
            user.value = fetchedUsers[0];
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    });

    return { group, user, route };
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
