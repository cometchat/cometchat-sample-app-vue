<template>
  <LoginSignupParentView
    :innerView="{ componentName: 'LoginComponent' }"
  ></LoginSignupParentView>
</template>

<script lang="ts">
/*es-lint disabled*/

import { defineComponent } from "vue";
import LoginSignupParentView from "./LoginSignupParentView.vue";

import "@cometchat/uikit-elements";

export default defineComponent({
  name: "LoginView",
  components: { LoginSignupParentView },
  props: {},

  setup() {
    let logoURL = "/assets/logo.png";
    return { logoURL };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
