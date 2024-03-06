<template>
  <div class="signup__wrapper" :style="styles.loginWrapperStyle()">
    <div class="signup__page">
      <div class="header__section" :style="styles.headerSectionStyle()">
        <div class="header__title" :style="styles.headerTitleStyle()">
          comet<b>chat</b>
        </div>
        <div class="release-tag" :style="styles.headerSubtitleStyle()">
          4.0.0
        </div>
      </div>
      <div class="content__section">
        <div class="left__content">
          <div class="content__title" :style="styles.titleStyle()">Sign Up</div>
          <div class="signup__container" :style="styles.containerStyle()">
            <div class="signup__field">
              <div class="uid__field">
                <label for="uid" :style="styles.loginMessageStyle()">UID</label>
                <input
                  type="text"
                  placeholder="Enter UID Here"
                  :style="styles.inputStyle()"
                  name="uid"
                  :disabled="generateUID"
                  v-model="enteredUid"
                />
              </div>
              <div class="name__field">
                <label for="name" :style="styles.loginMessageStyle()"
                  >Name</label
                >
                <input
                  type="text"
                  placeholder="Enter Name here"
                  :style="styles.inputStyle()"
                  name="name"
                  v-model="enteredName"
                />
              </div>
              <div class="uid__generator">
                <label
                  :style="styles.loginMessageStyle()"
                  class="checkbox__container"
                  >By clicking on this checkbox, UID will be generated
                  automatically.
                  <input type="checkbox" @change="toggleGenerateUID($event)" />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div
                class="error__text"
                :style="styles.errorTextStyle()"
                v-if="error"
              >
                {{ error }}
              </div>
            </div>
            <div class="signup__section">
              <button
                class="signup__button"
                :style="styles.signupButtonStyle()"
                @click="signUp(enteredUid, enteredName)"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div class="right__content" :style="styles.sectionImageStyle()"></div>
      </div>
      <div class="footer__section">
        <footer :style="styles.footerStyle()">2022 &copy; CometChat</footer>
      </div>
    </div>
  </div>
  <div class="spinner__wheel" v-if="inProgress">
    <div class="spinner__content">
      <img
        class="spinner__wheel_img"
        style="top: -45px; position: relative"
        :src="CometChatLogo"
      />
      <cometchat-icon
        :URL="SpinnerSvg"
        style="top: -45px; position: relative"
      ></cometchat-icon>
    </div>
  </div>
</template>

<script lang="ts">
/*es-lint disabled*/

import { defineComponent, inject, ref } from "vue";
import "@cometchat/uikit-elements";
import { fontHelper } from "@cometchat/uikit-resources";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { useRouter } from "vue-router";

import {
  LoginSignupBackgroundImage,
  SpinnerSvg,
  CometChatLogo,
} from "../assets";
import { CometChatUIKit } from "@cometchat/chat-uikit-vue";

export default defineComponent({
  name: "SignupComponent",
  components: {},

  setup() {
    let { theme }: any = inject("theme");
    const router = useRouter();

    let enteredUid!: string;
    let enteredName!: string;

    let inProgress = ref(false);

    const signUp = async (uid: string, name: string) => {
      var UID = "";

      if (generateUID.value) {
        let trimmedUID: string = name.trim();
        let generatedUID: string = trimmedUID.replace(" ", "");
        UID = generatedUID + Math.round(+new Date() / 1000);
      } else {
        UID = uid;
      }

      let user = new CometChat.User(UID);
      user.setName(name);

      inProgress.value = true;
      // eslint-disable-next-line
      //@ts-ignore
      await CometChatUIKit.createUser(user).then(
        (user) => {
          console.log("user created", user);
        },
        (error) => {
          console.log("error", error);
        }
      );

      // eslint-disable-next-line
      //@ts-ignore
      await CometChatUIKit.login(UID).then(
        (user) => {
          inProgress.value = false;
          router.push({ path: "/home" });
          console.log("Login Successful:", { user });
        },
        (error) => {
          console.log("Login failed with exception:", { error });
        }
      );
    };
    let generateUID = ref(false);
    let error = "";
    const toggleGenerateUID = (event: any) => {
      error = "";
      if (event.target?.checked) {
        generateUID.value = true;
      } else {
        generateUID.value = false;
      }
    };

    const styles: any = {
      loginWrapperStyle: () => {
        return {
          background: theme.value.palette.getAccent100(),
        };
      },
      errorTextStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle2),
          color: theme.value.palette.getError(),
        };
      },
      headerTitleStyle: () => {
        return {
          font: fontHelper(theme.value.typography.name),
          color: theme.value.palette.getAccent("light"),
        };
      },
      headerSectionStyle: () => {
        return {
          borderBottom: `1px solid ${theme.value.palette.getAccent100()}`,
        };
      },
      headerSubtitleStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle2),
          color: theme.value.palette.getAccent400("light"),
        };
      },
      titleStyle: () => {
        return {
          font: fontHelper(theme.value.typography.heading),
          color: theme.value.palette.getAccent("light"),
        };
      },
      subtitleStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle2),
          color: theme.value.palette.getAccent600(),
        };
      },
      containerStyle: () => {
        return {
          background: theme.value.palette.getBackground(),
          boxShadow: `${theme.value.palette.getAccent400()} 0px 0px 5px`,
        };
      },
      usernameStyle: () => {
        return {
          font: fontHelper(theme.value.typography.title2),
          color: theme.value.palette.getAccent("light"),
        };
      },
      useruidStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle2),
          color: theme.value.palette.getAccent600("light"),
        };
      },
      userDetailsStyle: () => {
        return {
          background: theme.value.palette.getSecondary(),
        };
      },
      loginMessageStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle2),
          color: theme.value.palette.getAccent600(),
        };
      },
      inputStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle2),
          color: theme.value.palette.getAccent600(),
          border: `1px solid ${theme.value.palette.getAccent100()}`,
        };
      },
      footerStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle2),
          color: theme.value.palette.getAccent500(),
        };
      },
      signupButtonStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle1),
          color: theme.value.palette.getAccent("dark"),
          backgroundColor: theme.value.palette.getPrimary(),
        };
      },
      sectionImageStyle: () => {
        return {
          height: "500px",
          background: `url(${LoginSignupBackgroundImage}) center center no-repeat`,
          backgroundSize: "contain",
        };
      },
    };
    return {
      theme,
      signUp,
      enteredUid,
      enteredName,
      router,
      styles,
      toggleGenerateUID,
      generateUID,
      error,
      CometChatLogo,
      SpinnerSvg,
      inProgress,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signup__wrapper {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}

button {
  cursor: pointer;
}
.signup__page {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 80%;
  margin: auto;
  padding: 0 8px;
}

.signup__page .header__section {
  padding: 8px 0;
  flex-basis: 6%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.signup__page .content__section {
  flex-basis: 75%;
  display: flex;
  padding: 8px 0;
  width: 100%;
  justify-content: space-between;
}

.signup__page .content__section .content__title {
  margin: 8px 0 16px 0;
}

.signup__page .content__section .left__content {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.signup__page .content__section .left__content .signup__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin-top: 8px;
  padding: 8px 8px 24px 8px;
  border-radius: 8px;
}

.signup__page .content__section .left__content .signup__container .uid__field {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .uid__field
  label {
  padding: 8px;
}

.signup__page .content__section .left__content .signup__container .name__field {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .name__field
  label {
  padding: 8px;
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .uid__generator {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 12px 0;
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .sample__users {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .signup__header {
  margin-left: 16px;
}

.signup__page .content__section .left__content .signup__container .cards {
  cursor: pointer;
  display: flex;
  border-radius: 8px;
  padding: 8px;
  align-items: center;
  justify-content: flex-start;
  margin: 8px 4px;
  min-width: 180px;
  max-width: 260px;
  flex-basis: 45%;
  flex-shrink: 1;
  flex-grow: 1;
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .signup__field {
  display: flex;
  flex-direction: column;
  padding: 8px;
  justify-content: space-evenly;
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .signup__field
  input {
  height: 42px;
  border-radius: 12px;
  padding: 8px;
  background: transparent;
  outline: none;
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .signup__field
  input::placeholder {
  color: rgb(169, 169, 169);
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .signup__section {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .signup__section
  button {
  padding: 4px;
}

.signup__page
  .content__section
  .left__content
  .signup__container
  .signup__section
  .signup__button {
  height: 38px;
  width: 100%;
  border-radius: 8px;
  border: none;
}

.signup__page .content__section .right__content {
  margin-left: 2px;
  height: 500px;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.signup__page .footer__section {
  flex-basis: 6%;
  margin-bottom: 8px;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 100%;
}

/* checkbox style........................................................................ */
.checkbox__container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox__container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  background-color: #eee;
  border-radius: 4px;
}
/* On mouse-over, add a grey background color */
.checkbox__container:hover input ~ .checkmark {
  background-color: #ccc;
}
/* When the checkbox is checked, add a blue background */
.checkbox__container input:checked ~ .checkmark {
  background-color: #2196f3;
}
/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox__container input:checked ~ .checkmark:after {
  display: block;
}
/* Style the checkmark/indicator */
.checkbox__container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.error__text {
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -15px;
  position: relative;
  padding: 0 12px;
}

.spinner__wheel {
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  z-index: 10;
  justify-content: center;
  top: 0;
}

.spinner__wheel::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.spinner__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 25px;
  background: white;
  height: 200px;
  width: 300px;
  border-radius: 8px;
  padding-bottom: 10px;
}

.spinner__wheel_img {
  height: 55px;
  width: 55px;
}

@media (min-width: 320px) and (max-width: 800px) {
  .left__content {
    width: 100% !important;
    height: 100% !important;
  }
  .right__content {
    display: none !important;
    width: 0% !important;
  }
  .signup__page {
    width: 98% !important;
  }
}
@media (min-width: 820px) and (max-width: 1200px) {
  .signup__page {
    width: 96% !important;
  }
}

@media (min-height: 300px) and (max-height: 600px) {
  .signup__section {
    margin-top: 0px !important;
  }
  .signup__container {
    height: fit-content !important;
  }
}
</style>
