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
import { defineComponent, inject, onBeforeMount, ref } from "vue";

import { CometChatDetails } from "@cometchat/chat-uikit-vue";

import { CometChat } from "@cometchat-pro/chat";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DetailsView",
  components: { CometChatDetails },
  props: {
    language: {
      type: String,
    },
  },
  setup(props, context) {
    let { theme, switchThemeMode }: any = inject("theme")!;
    let group: any = ref(null);
    let user: any = ref(null);

    const route: any = useRoute();
    onBeforeMount(async () => {
      if (route.name == "groupsdetails") {
        group.value = await CometChat.getGroup("supergroup");
      }

      if (route.name == "usersdetails") {
        user.value = await CometChat.getUser("superhero2");
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
