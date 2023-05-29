import { createApp, ref } from "vue";
import App from "./App.vue";
import getRouter from "./router";
import { COMETCHAT_CONSTANTS } from "./consts";
import CardComponent from "../src/Card/index.vue";
import { CometChatTheme, CometChatUIKit } from "@cometchat-pro/vue-ui-kit";
import { CometChatConversations } from "@cometchat-pro/vue-ui-kit";
import { UIKitSettingsBuilder } from "uikit-utils-lerna";
import { Utils } from "./utils/Utils";

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();

CometChatUIKit.init(uiKitSettings)!
  .then(() => {
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
