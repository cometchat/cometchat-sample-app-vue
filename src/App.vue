<template>
  <Suspense>
    <div :style="computedStyle">
      <router-view />
    </div>
  </Suspense>
  <CometChatIncomingCall />
</template>
<script lang="ts">
import { CometChatIncomingCall } from "@cometchat/chat-uikit-vue";
import { computed, defineComponent, inject, onBeforeMount } from "vue";

export default defineComponent({
  components: {
    CometChatIncomingCall,
  },
  setup() {
    let { theme }: any = inject("theme");
    let { switchView }: any = inject("isMobileView");
    onBeforeMount(() => {
      window.addEventListener("resize", switchView);
    });
    let computedStyle = computed(() => {
      return theme.value.palette.mode
        ? {
            height: "100%",
            width: "100%",
            backgroundColor: theme.value.palette.getBackground(),
          }
        : { height: "100%", width: "100%" };
    });
    return { computedStyle };
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;

  /* color: #2c3e50; */
  height: 100%;
}

html {
  height: 100%;
}

body {
  height: 100%;
  overflow: hidden;
  margin: 0px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
