<template>
  <div>
    <div :style="styles.wrapper">
      <div style="margin: auto">
        <p :style="styles.title">Kitchen Sink App</p>
        <p :style="styles.subtitle">Login with one of our sample users</p>
        <div :style="styles.userWrapper">
          <div
            :key="i"
            :style="styles.userSelector"
            @click="login($event, name)"
            v-for="({ name, image }, i) in users"
          >
            <div :style="styles.avatarWrapper">
              <comet-chat-avatar :image="image" />
            </div>

            <p style="margin: auto">
              <a href="javascript:;">{{ name }}</a>
            </p>
          </div>
        </div>

        <p :style="styles.loginText">Login with UID</p>

        <input
          type="text"
          v-model="uid"
          :style="styles.input"
          placeholder="Enter your UID here"
          @keyup.enter="login($event, uid)"
        />

        <div :style="styles.loginButton" @click="login($event, uid)">Login</div>
      </div>
    </div>
    <loader v-if="showloader" />
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";
import { CometChatAvatar } from "../../cometchat-pro-vue-ui-kit/CometChatWorkspace/src";

import { COMETCHAT_CONSTANTS } from "../../CONSTS";
import Loader from "../Loader/Loader";

import * as style from "./style";

export default {
  name: "AppHome",
  components: {
    Loader,
    CometChatAvatar,
  },
  data() {
    return {
      users: [
        {
          name: "superhero1",
          image:
            "https://data-us.cometchat.io/assets/images/avatars/ironman.png",
        },
        {
          name: "superhero2",
          image:
            "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png",
        },
        {
          name: "superhero3",
          image:
            "https://data-us.cometchat.io/assets/images/avatars/spiderman.png",
        },
        {
          name: "superhero4",
          image:
            "https://data-us.cometchat.io/assets/images/avatars/wolverine.png",
        },
        {
          name: "superhero5",
          image:
            "https://data-us.cometchat.io/assets/images/avatars/cyclops.png",
        },
      ],
      showloader: false,
      uid: null,
    };
  },
  computed: {
    styles() {
      return {
        wrapper: style.wrapperStyle(),
        title: style.titleStyle(),
        subtitle: style.subtitleStyle(),
        userWrapper: style.userWrapperStyle(),
        userSelector: style.userSelectorStyle(),
        avatarWrapper: style.avatarWrapperStyle(),
        loginText: style.loginTextStyle(),
        input: style.inputStyle(),
        loginButton: style.loginButtonStyle(),
      };
    },
  },
  methods: {
    login(event, uid) {
      if (event) {
        event.preventDefault();
      }

      if (uid) {
        this.uid = uid;
      } else {
        alert("Please enter valid UID");
        return;
      }

      this.showloader = true;
      CometChat.login(this.uid, COMETCHAT_CONSTANTS.AUTH_KEY)
        .then(() => {
          location.href = "/menu";
        })
        .catch((error) => {
          console.log("Error in [login]", error);
          alert((error || {}).message || "Error in login");
        })
        .finally(() => {
          this.showloader = false;
        });
    },
  },
  created() {
    this.showloader = true;
    CometChat.getLoggedinUser().then(
      (user) => {
        if (user) {
          location.href = "/menu";
          this.uid = user.getUid();
        } else {
          this.showloader = false;
        }
      },
      (error) => {
        console.log("Error in [getLoggedinUser]", error);
        this.showloader = false;
      }
    );
  },
};
</script>