<template>
  <LoginSignupParentView
    subHeader="Sign Up"
    :innerView="{ componentName: 'SingupComponent' }"
  ></LoginSignupParentView>
</template>

<script lang="ts">
/*es-lint disabled*/

import { defineComponent } from "vue";
import LoginSignupParentView from "./LoginSignupParentView.vue";

import "my-cstom-package-lit";

export default defineComponent({
  name: "SignupView",
  components: { LoginSignupParentView },
  props: {},

  setup(props) {
    let logoURL = "/assets/logo.png";
    return { logoURL };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
