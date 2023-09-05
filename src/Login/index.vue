<template>
  <div class="login__wrapper" :style="styles.loginWrapperStyle()">
    <div class="login__page">
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
          <div class="content__title" :style="styles.titleStyle()">
            Login to Your <br />
            Account
          </div>
          <div class="login__container" :style="styles.containerStyle()">
            <div class="sample__login">
              <span class="login__header" :style="styles.subtitleStyle()">
                Using our sample users
              </span>
              <div class="sample__users">
                <div
                  class="cards"
                  v-for="(user, i) in usersArray"
                  :key="i"
                  :style="styles.userDetailsStyle()"
                  @click="signIn(user.uid)"
                >
                  <div class="avatar">
                    <cometchat-avatar
                      :name="user.name"
                      :image="user.avatar"
                      :style="avatarStyle"
                    >
                    </cometchat-avatar>
                  </div>
                  <div class="user__details">
                    <div class="user__name" :style="styles.usernameStyle()">
                      {{ user.name }}
                    </div>
                    <div class="user__uid" :style="styles.useruidStyle()">
                      {{ user.uid }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="error__text"
              :style="styles.errorTextStyle()"
              v-if="error"
            >
              {{ error }}
            </div>
            <div class="login__field" :style="styles.borderStyle()">
              <span class="login__message" :style="styles.loginMessageStyle()">
                Or else continue with login using UID</span
              >
              <input
                type="text"
                id="lname"
                name="lname"
                placeholder="Enter UID Here"
                v-model="enteredUid"
                :style="styles.inputStyle()"
              />
              <button
                :style="styles.buttonStyle()"
                class="login__button"
                @click="
                  () =>
                    !enableLoginIdFieldRef
                      ? onSignInUsingLoginIdClicked()
                      : enableLoginIdFieldRef && createUser
                      ? signIn(enteredUid, true, enteredName)
                      : signIn(enteredUid)
                "
              >
                Login
              </button>
            </div>
            <div class="signup__section">
              <div class="signup__text" :style="styles.subtitleStyle()">
                Don't have an account?
              </div>
              <button
                class="signup__button"
                :style="styles.signupButtonStyle()"
                @click="onCreateUserClick"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div class="right__content" :style="styles.sectionImageStyle()"></div>
      </div>
    </div>
  </div>
  <div class="footer__section" :style="styles.footerStyle()">
    <footer>2022 &copy; CometChat</footer>
  </div>
  <!-- loading banner -->
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
import { COMETCHAT_CONSTANTS } from "../consts";
import { useRouter } from "vue-router";
import { AvatarStyle } from "@cometchat/uikit-elements";
import {
  LoginSignupBackgroundImage,
  SpinnerSvg,
  CometChatLogo,
} from "../assets";
import { CometChatUIKit } from "@cometchat/chat-uikit-vue";
let buttonImage = "assets/button-opc.png";

export default defineComponent({
  name: "LoginComponent",
  components: {},

  setup(props) {
    const router = useRouter();
    let { theme, switchThemeMode }: any = inject("theme")!;
    let enableLoginIdFieldRef = ref(true);
    let createUser = ref(false);
    let error = ref(false);
    let enteredUid!: string;
    let enteredName!: string;
    let inProgress = ref(false);

    let some = {
      "background-color": "black",
      color: "white",
      top: "60px",
      position: "relative",
      margin: "5px",
      height: "70px",
      width: "177px",
      "border-radius": "10px",
      buttonIconTint: "transparent",
      iconBackground: "transparent",
    };

    let avatarStyle: AvatarStyle = {
      height: "32px",
      width: "32px",
      backgroundColor: "white",
      borderRadius: "24px",
    };
    function setAvatarStyle() {
      let defaultStyle: AvatarStyle = new AvatarStyle({
        borderRadius: "24px",
        width: "36px",
        height: "36px",
        border: "none",
        backgroundColor: theme.value.palette.getAccent700(),
        nameTextColor: theme.value.palette.getAccent900(),
        backgroundSize: "cover",
        nameTextFont: fontHelper(theme.value.typography.subtitle1),
        outerViewBorderSpacing: "",
      });
      avatarStyle = { ...defaultStyle, ...avatarStyle };
    }
    setAvatarStyle();
    let style = {
      buttonTextFont: fontHelper(theme.value.typography.subtitle2),
      buttonTextColor: theme.value.palette.getPrimary()
        ? theme.value.palette.getError()
        : theme.value.palette.getAccent600(),
      borderRadius: "10px",
      border: theme.value.palette.getPrimary()
        ? `1px solid RGBA(255, 59, 48, 0.2)`
        : `1px solid ${theme.value.palette.getAccent900()}`,
      buttonIconTint: theme.value.palette.getPrimary()
        ? theme.value.palette.getError()
        : theme.value.palette.getAccent600(),
      background: "transparent",
      iconBackground: "transparent",
      padding: "2px 12px 2px 0",
      gap: "0",
      height: "25px",
      justifyContent: "center",
    };

    const signIn = async (uid: string, newUser = false, userName?: string) => {
      if (newUser) {
        let user = new CometChat.User(uid);

        user.setName(userName!);
        inProgress.value = true;
        await CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY).then(
          (user) => {
            console.log("user created", user);
          },
          (error) => {
            console.log("error", error);
          }
        );
      }

      inProgress.value = true;
      if (CometChatUIKit && CometChatUIKit.login) {
        // eslint-disable-next-line
        //@ts-ignore
        await CometChatUIKit.login(uid!).then(
          (user) => {
            inProgress.value = false;

            console.log("Login Successful:", { user });
            router.push({ path: "/home" });
          },
          (error) => {
            inProgress.value = false;

            console.log("Login failed with exception:", { error });
          }
        );
      }
    };

    const onSignInUsingLoginIdClicked = () => {
      enableLoginIdFieldRef.value = true;
    };

    const onCreateUserClick = () => {
      router.push({ path: "/signup" });
    };

    const usersArray = [
      {
        name: "Iron Man",
        UID: "SUPERHERO1",
        uid: "superhero1",
        avatar:
          "https://data-us.cometchat.io/assets/images/avatars/ironman.png",
      },
      {
        name: "Captain America",
        UID: "SUPERHERO2",
        uid: "superhero2",
        avatar:
          "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png",
      },
      {
        name: "Spiderman",
        UID: "SUPERHERO3",
        uid: "superhero3",
        avatar:
          "https://data-us.cometchat.io/assets/images/avatars/spiderman.png",
      },
      {
        name: "Wolvorine",
        UID: "SUPERHERO4",
        uid: "superhero4",
        avatar:
          "https://data-us.cometchat.io/assets/images/avatars/wolverine.png",
      },
    ];

    const styles: any = {
      loginWrapperStyle: () => {
        return {
          height: "95%",
          background: theme.value.palette.getAccent100(),
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
          display: "flex",
          justifyContent: "space-between",
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
      borderStyle: () => {
        return {
          borderBottom: `1px solid ${theme.value.palette.getAccent100()}`,
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
          font: fontHelper(theme.value.typography.name),
          color: theme.value.palette.getAccent(),
        };
      },
      errorTextStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle2),
          color: theme.value.palette.getError(),
        };
      },
      useruidStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle2),
          color: theme.value.palette.getAccent600(),
        };
      },
      userDetailsStyle: () => {
        return {
          background: theme.value.palette.getAccent100(),
          backgroundImage: `url(${buttonImage})`,
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
          background: theme.value.palette.getAccent100(),
        };
      },
      buttonStyle: () => {
        return {
          font: fontHelper(theme.value.typography.subtitle1),
          color: theme.value.palette.getAccent("dark"),
          backgroundColor: theme.value.palette.getPrimary(),
          backgroundImage: `url(${buttonImage})`,
        };
      },
      signupButtonStyle: () => {
        return {
          font: fontHelper(theme.value.typography.title2),
          color: theme.value.palette.getAccent600(),
          backgroundColor: "transparent",
          border: `1px solid ${theme.value.palette.getAccent100()}`,
          borderRadius: "4px",
        };
      },
      sectionImageStyle: () => {
        return {
          background: `url(${LoginSignupBackgroundImage}) center center no-repeat`,
          backgroundSize: "contain",
        };
      },
    };
    return {
      usersArray,
      theme,
      style,
      onSignInUsingLoginIdClicked,
      enableLoginIdFieldRef,
      signIn,
      enteredUid,
      onCreateUserClick,
      createUser,
      enteredName,
      styles,
      avatarStyle,
      error,
      inProgress,
      SpinnerSvg,
      CometChatLogo,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login__wrapper {
  height: 95%;
  width: 100%;
  overflow-y: auto;
}

.login__page {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 80%;
  margin: auto;
  padding: 0 8px;
}

.login__page .header__section {
  padding: 10px 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.login__page .content__section {
  display: flex;
  padding: 8px 0;
  width: 100%;
  justify-content: space-between;
}

.login__page .content__section .left__content {
  height: 100%;
  width: 50%;
  border: 1px solid red transparent;
}

.login__page .content__section .left__content .login__container {
  height: 100%;
  width: 100%;
  margin-top: 8px;
  padding: 24px 8px;
  border-radius: 8px;
}

.login__page .content__section .left__content .login__container .sample__users {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
}

.login__page .content__section .left__content .login__container .login__header {
  margin-left: 16px;
}

.login__page .content__section .left__content .login__container .cards {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  padding: 8px;
  align-items: center;
  justify-content: flex-start;
  margin: 8px 4px;
  flex-basis: 45%;
}

.login__page
  .content__section
  .left__content
  .login__container
  .cards
  .user__details {
  margin-left: 8px;
}

.login__page .content__section .left__content .login__container .login__field {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 12px;
  height: 190px;
  justify-content: space-evenly;
}

.login__page
  .content__section
  .left__content
  .login__container
  .login__field
  input {
  height: 42px;
  border-radius: 12px;
  padding: 8px;
  background: transparent;
  outline: none;
}

.login__page
  .content__section
  .left__content
  .login__container
  .login__field
  input::placeholder {
  color: rgb(169, 169, 169);
}

.login__page
  .content__section
  .left__content
  .login__container
  .login__field
  .login__button {
  height: 38px;
  width: 100%;
  border-radius: 8px;
  border: none;
}

.login__page
  .content__section
  .left__content
  .login__container
  .signup__section {
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.login__page
  .content__section
  .left__content
  .login__container
  .signup__section
  button {
  padding: 4px;
  margin-top: 16px;
}

.login__page .content__section .right__content {
  height: 500px;
  width: 50%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 1;
  border: 1px solid springgreen transparent;
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

button {
  cursor: pointer;
}
.footer__section {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 100%;
  height: 5%;
}
.error__text {
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -15px;
  position: relative;
  padding: 0 12px;
}

@media (min-width: 320px) and (max-width: 820px) {
  .left__content {
    width: 100% !important;
    height: 100% !important;
  }
  .right__content {
    display: none !important;
    width: 0% !important;
  }
  .login__wrapper {
    height: max-content !important;
  }
  .footer__section {
    position: initial !important;
  }
  .login__page {
    width: 98% !important;
  }
  .signup__section {
    margin-top: 20px !important;
  }
}
@media (min-width: 820px) and (max-width: 1200px) {
  .login__page {
    width: 96% !important;
  }
}
@media (min-height: 300px) and (max-height: 600px) {
  .signup__section {
    margin-top: 4px !important;
    padding-top: 2px;
  }
  .signup__button {
    margin-top: 4px !important;
  }
  .login__container {
    height: fit-content !important;
    padding: 8px !important;
  }
  .login__field {
    margin-top: 0px !important;
    height: 150px !important;
  }
}
@media (min-height: 600px) and (max-height: 685px) {
  .content__section {
    height: 75% !important;
  }
  .login__container {
    height: 100% !important;
  }
  .signup__section {
    margin-top: 5px !important;
  }
  .left__content {
    height: fit-content !important;
  }
  .login__field {
    margin-top: 0px !important;
  }
}
</style>
