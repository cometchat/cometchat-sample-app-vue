import "@cometchat/chat-uikit-vue/dist/style.css";

import { CometChatTheme, CometChatUIKit } from "@cometchat/chat-uikit-vue";
import { createApp, ref } from "vue";

import App from "./App.vue";
import { AppConstants } from "./AppConstants";
import CardComponent from "../src/Card/index.vue";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatConversations } from "@cometchat/chat-uikit-vue";
import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import { Utils } from "./utils/Utils";
import getRouter from "./router";
import { metaInfo } from "./metaInfo";

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(AppConstants.APP_ID)
  .setRegion(AppConstants.REGION)
  .setAuthKey(AppConstants.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();

CometChatUIKit.init(uiKitSettings)
  ?.then(() => {
    try {
      CometChat.setDemoMetaInfo(metaInfo);
    } catch (err) {
      console.log("error while setting meta info", err);
    }
    const app = createApp(App);
    app.component("CometChatConversations", CometChatConversations);
    //global registration of vue component
    //this can now be passed as a dynamic component to any other component
    app.component("CardComponent", CardComponent);

    const theme: any = ref(new CometChatTheme({}));
    const isMobileView: any = ref(false);

    function switchView() {
      console.log("CHECK RESIZE: ", isMobileView.value);
      if (window.innerWidth >= 320 && window.innerWidth <= 760) {
        console.log("IS MOBILE TRUE");
        isMobileView.value = true;
      } else {
        console.log("IS MOBILE FALSE");
        isMobileView.value = false;
      }
    }

    function switchThemeMode() {
      if (theme.value.palette.mode == "dark") {
        theme.value.palette.setMode("light");
      } else {
        theme.value.palette.setMode("dark");
      }
    }
    switchView();
    app.provide("theme", { theme, switchThemeMode });
    app.provide("isMobileView", { isMobileView, switchView });
    Utils.theme = theme.value;

    const router = getRouter();
    app.use(router).mount("#app");
  })
  .catch((err) => console.error(err));
