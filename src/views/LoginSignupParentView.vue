<template>
  <div style="height: 100%">
    <component v-if="innerView" :is="innerView!.componentName!"> </component>
  </div>

  <!-- <div
    style="
      height: 100%;
      background: #e3dddd;
      /* align-items: center; */

      /* 'align-items':center ; */
    "
  >
    <img
      :src="Assets.CometChatLogo"
      style="
        position: relative;
        top: 150px;
        height: 120px;
        width: 120px;
        margin-left: auto;
        margin-right: auto;
        display: block;
      "
    />
    <h1
      style="
        position: relative;
        width: 100%;
        top: 125px;
        color: grey;
        /* display: block; */
        text-align: center;
      "
    >
      CometChat
    </h1>
    <h1
      :style="{
        position: 'relative',
        top: '105px',
        color: theme.palette.getPrimary(),
        'text-align': 'center',
      }"
    >
      {{ subHeader ?? "Login To Sample App" }}
    </h1>
    <div
      style="
        top: 100px;
        height: 340px;
        width: 750px;
        background: white;
        margin-left: auto;
        margin-right: auto;
        border-radius: 15px;
        position: relative;
        text-align: center;
      "
    >
      <component v-if="innerView" :is="innerView!.componentName!"> </component>
    </div>
    <p
      :style="{
        top: '200px',

        position: 'relative',
        'text-align': 'center',
      }"
    >
      2022 CometChat inc.
    </p>
  </div> -->
</template>

<script lang="ts">
/*es-lint disabled*/

import { defineComponent, PropType } from "vue";
import "@cometchat/uikit-elements";
import LoginComponent from "../Login/index.vue";
import SingupComponent from "../Signup/index.vue";
import { CometChatTheme } from "@cometchat/uikit-resources";
import * as Assets from "../assets";

export default defineComponent({
  name: "LoginSignupParentView",
  components: { LoginComponent, SingupComponent },
  props: {
    // eslint-disable-next-line
    innerView: { type: Object as PropType<ViewType> },
    subHeader: { type: String },
  },

  setup(props) {
    let theme: CometChatTheme = new CometChatTheme({});

    return { theme, Assets };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
