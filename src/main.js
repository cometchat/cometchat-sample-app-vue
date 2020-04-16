import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { CometChat } from "@cometchat-pro/chat";
import {COMETCHAT_CONSTANTS} from './CONSTS';

Vue.config.productionTip = false;

var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();

CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(()=>{

  Vue.use(VueRouter);
  const router = new VueRouter({routes});
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');

})



// let init : function() {
//     this.loading = true;
//     let params = new URLSearchParams(location.search); 

//     return new Promise((res,rej)=>{
//       var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(COMETCHAT_CONSTANTS.REGION).build();
//       //initialize cometchat manager
//       CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting).then(()=>{
//         CometChat.login(params.get('uid'), COMETCHAT_CONSTANTS.API_KEY).then((user)=>{
//           console.log('current log : ', user);
//           this.currentUser = user;
//           this.isLoggedin = true;
//           this.loading = false;

//           res(user);
//         },error=>{
//           location.href = '/';
//           rej(error);
//         });
//       })
//     });
    

//   },


