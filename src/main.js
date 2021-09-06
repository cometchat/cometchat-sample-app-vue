import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import {CometChat} from '@cometchat-pro/chat'
import { COMETCHAT_CONSTANTS } from './CONSTS'

// Vue.config.productionTip = false;

var appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .build();

CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(() => {
    createApp(App).use(router).mount("#app");
});