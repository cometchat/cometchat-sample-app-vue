<template>
  <div class="ccl-center-panel ccl-chat-center-panel">
    <a href="javascript:void(0);" class="ccl-center-panel-close-link"></a>

    <!-- <MessageHeader v-if="userData.uid || userData.guid" :userData="userData" /> -->
    <MessageHeader />
    <MessageView :currentUser="currentUser" />
    <MessageFooter />

    <!-- <div v-else class="cometchat-logo"><img src="https://www.cometchat.com/wp-content/uploads/2018/03/Logo-C-White.png" /></div> -->


  </div>
</template>

<script>
import MessageHeader from './MessageHeader';
import MessageView from './MessageView';
import MessageFooter from './MessageFooter';

export default {
  name: "MessageContainer",
  props:['currentUser'],
  components: {
    MessageHeader,
    MessageView,
    MessageFooter
  },
  data() {
    return {
      userData: {},
    }
  },
  mounted() {
    this.$root.$on("selectedUser", data => {
      this.userData = data;
    });
  },

};
</script>

<style>
.ccl-secondary-color {
  color: rgba(20, 20, 20, 0.6);
}
.ccl-blue-color {
  color: #39f;
}
.clearfix::after,
.clearfix::before {
  content: " ";
  display: table;
}
.clearfix,
.clearfix::after {
  clear: both;
}
.page-int-wrapper {
  display: flex;
  position: fixed;
  height: 100%;
  width: 100%;
}
.ccl-center-panel {
  height: 100vh;
  position: relative;
  padding-top: 71px;
  padding-bottom: 70px;
  flex: 1 1 0;
  width: calc(100% - 280px);
}
.chat-ppl-thumbnail-wrap img,
.cc1-chat-win-user-thumb img {
  display: block;
  border-radius: 18px;
  overflow: hidden;
  width: 36px;
}
.cc1-chat-win-header {
  padding: 14px 16px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1;
}
.cc1-chat-win-user {
  display: inline-block;
  float: left;
}
.cc1-chat-win-user-thumb,
.cc1-left-panel-user-thumb {
  display: inline-block;
  width: 36px;
  height: 36px;
  margin-right: 10px;
  vertical-align: middle;
  border-radius: 24px;
  overflow: hidden;
}
.cc1-chat-win-user-name-wrap,
.cc1-left-panel-user-name-wrap {
  display: inline-block;
  vertical-align: middle;
}
.cc1-chat-win-user-name,
.cc1-left-panel-user-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.1px;
  line-height: 22px;
}
.cc1-chat-win-con-opt-wrap {
  display: inline-block;
  float: right;
  padding: 8px 0;
}
.cc1-chat-win-user-status,
.cc1-left-panel-user-status {
  font-size: 13px;
  letter-spacing: -0.1px;
  line-height: 20px;
}
.cc1-chat-win-con-opt {
  display: inline-block;
  width: 20px;
  height: 20px;
  padding: 2px;
  margin-left: 20px;
}
.cc1-chat-win-con-opt.call {
  background: url(./../assets/images/svg/call-blue-icon.svg) center center
    no-repeat;
}
.cc1-chat-win-con-opt.video-call {
  background: url(./../assets/images/svg/video-call-blue-icon.svg) center center
    no-repeat;
}
.cc1-chat-win-con-opt.details {
  background: url(./../assets/images/svg/details-pane-blue-icon.svg) center
    center no-repeat;
}
.cc1-chat-win-conver-wrap {
  padding: 5px 16px;
  height: calc(100vh - 132px);
  overflow-y: auto;
  background-color: #fff;
  z-index: 1;
  position: relative;
}
.cc1-chat-win-rcvr-msg-wrap {
  display: inline-block;
  border-radius: 12px;
  background-color: rgba(248, 248, 248, 0.92);
  padding: 8px 12px;
  word-break: break-all;
}
.chat-txt-msg {
  font-size: 15px;
  margin: 0;
  letter-spacing: -0.1px;
  line-height: 20px;
}
.cc1-chat-win-rcvr-row {
  margin-bottom: 16px;
}
.cc1-chat-win-msg-block {
  display: inline-block;
  position: relative;
  max-width: 70%;
}

.cc1-chat-win-rcvr-row .cc1-chat-win-msg-block {
  float: left;
}

.cc1-chat-win-sndr-row .cc1-chat-win-msg-block {
  float: right;
}

.cc1-chat-win-sndr-row {
  /* text-align: right; */
  margin-bottom: 16px;
}
.cc1-chat-win-sndr-msg-wrap {
  display: inline-block;
  border-radius: 12px;
  background-color: rgba(51, 153, 255, 0.92);
  color: #fff;
  padding: 8px 12px;
  word-break: break-all;
}
.cc1-chat-win-timestamp {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: -0.1px;
  line-height: 12px;
  text-transform: uppercase;
  margin-top: 5px;
}
.cc1-chat-win-rcvr-row .cc1-chat-win-timestamp {
  margin-left: 5px;
}
.cc1-chat-win-msg-like-cnt {
  display: inline-block;
  float: right;
  background-color: #fff;
  border-radius: 9px;
  font-size: 11px;
  letter-spacing: -0.1px;
  line-height: 12px;
  box-shadow: rgba(20, 20, 20, 0.08) 0 2px 6px, rgba(20, 20, 20, 0.04) 0 1px 1px,
    rgba(20, 20, 20, 0.04) 0 0 0 1px;
  padding: 5px;
  text-align: right;
  margin-top: 3px;
}
.cc1-chat-win-sndr-row .cc1-chat-win-timestamp {
  margin-right: 5px;
}
.cc1-chat-win-sndr-row .cc1-chat-win-timestamp svg {
  margin-left: 3px;
  display: inline-block;
  vertical-align: bottom;
}
.cc1-chat-win-reply-for-msg {
  letter-spacing: -0.1px;
  line-height: 20px;
  font-size: 15px;
  position: relative;
  padding-left: 8px;
  margin-bottom: 7px;
}
.cc1-chat-win-reply-for-msg::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 96%;
  background-color: rgba(20, 20, 20, 0.11);
  border-radius: 2px;
}
.cc1-chat-win-location-wrap {
  width: 308px;
  height: 146px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(248, 248, 248, 0.92);
}
.cc1-chat-win-location-dtls {
  position: absolute;
  display: block;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 10px 16px;
}
.cc1-chat-win-location-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.1px;
  line-height: 20px;
}
.cc1-chat-win-location-txt {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: -0.1px;
  line-height: 20px;
}
.cc1-chat-win-inpt-ext-wrap {
  padding: 14px 0;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1;
}
.cc1-chat-win-inpt-int-wrap {
  display: flex;
}
.cc1-chat-win-inpt-attach {
  width: 60px;
  text-align: center;
}
.cc1-chat-win-inpt-wrap {
  flex: 1 1 0;
  position: relative;
}
.cc1-chat-win-inpt-send {
  width: 60px;
  text-align: center;
}
.cc1-chat-win-inpt-attach a,
.cc1-chat-win-inpt-send a {
  padding: 3px;
  margin-top: 7px;
  display: inline-block;
}
/* .cc1-chat-win-inpt-send-btn img,
.cc1-chat-win-inpt-voice-btn img {
  display: none;
} */
/* .cc1-chat-win-inpt-send-btn {
  width: 20px;
  height: 18px;
  background: url(./../assets/images/svg/send-blue-icon.svg) center center
    no-repeat;
}
.cc1-chat-win-inpt-voice-btn {
  width: 14px;
  height: 19px;
  background: url(./../assets/images/svg/voice-record-grey-icon.svg) center
    center no-repeat;
} */
/* .cc1-chat-win-inpt-attach a img {
  display: none;
} */
/* .cc1-chat-win-inpt-attach a {
  width: 20px;
  height: 20px;
  background: url(./../assets/images/svg/rounded-plus-grey-icon.svg) center
    center no-repeat;
} */
a.cc1-chat-win-inpt-voice-btn {
  margin-top: 5px;
}
.cc1-chat-win-inpt-box {
  display: block;
  width: 100%;
  border: 0;
  box-shadow: rgba(20, 20, 20, 0.04) 0 0 0 1px inset;
  border-radius: 8px;
  background-color: rgba(20, 20, 20, 0.04);
  letter-spacing: -0.1px;
  line-height: 20px;
  padding: 6px 36px 6px 12px;
}
.smile-button {
  width: 20px;
  height: 20px;
  display: block;
  position: absolute;
  right: 9px;
  top: 6px;
  background: url(./../assets/images/svg/smilie-grey-icon.svg) center center
    no-repeat;
}
.cc1-chat-win-inpt-rply-for-wrap {
  position: relative;
  padding: 0 14px 0 28px;
  margin-bottom: 14px;
}
.cc1-chat-win-inpt-rply-for-wrap::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 14px;
  width: 3px;
  height: 96%;
  background-color: rgba(20, 20, 20, 0.11);
  border-radius: 2px;
}
.cc1-chat-win-inpt-rply-ttl {
  display: block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.1px;
  line-height: 16px;
  color: #969696;
}
.cc1-chat-win-inpt-rply-for-msg {
  margin: 0;
  font-size: 13px;
  letter-spacing: -0.1px;
  line-height: 18px;
}
.cc1-chat-win-inpt-rply-for-close {
  position: absolute;
  width: 20px;
  height: 20px;
  display: block;
  background: url(./../assets/images/svg/cross-grey-icon.svg) center center /
    10px no-repeat;
  top: 7px;
  right: 17px;
}
.cc1-chat-win-inpt-sug-wrap {
  width: 100%;
  position: absolute;
  padding: 14px;
  left: 0;
  top: -62px;
  z-index: 1;
  text-align: center;
}
.cc1-chat-win-inpt-sug-msg {
  box-shadow: rgba(20, 20, 20, 0.08) 0 2px 6px, rgba(20, 20, 20, 0.04) 0 1px 1px,
    rgba(20, 20, 20, 0.04) 0 0 0 1px;
  border-radius: 18px;
  background-color: #fff;
  display: inline-block;
  padding: 8px 12px;
  margin: 0 6px;
}
.cc1-chat-win-stik-popup {
  position: absolute;
  right: 44px;
  bottom: 62px;
  width: 280px;
  height: 286px;
  box-shadow: rgba(20, 20, 20, 0.2) 0 16px 32px,
    rgba(20, 20, 20, 0.04) 0 0 0 1px;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  z-index: 1;
}
.cc1-chat-win-stik-type-list {
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.92);
  border-bottom: 1px solid #fdfcfc;
}
.cc1-chat-win-stik-typ {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 7px;
}
.cc1-chat-win-stik-typ.search {
  background: url(./../assets/images/svg/search-grey-icon.svg) center center /
    17px 18px no-repeat;
}
.cc1-chat-win-stik-typ.recent {
  background: url(./../assets/images/svg/recent-grey-icon.svg) center center /
    21px 18px no-repeat;
  position: relative;
  margin-right: 22px;
}
.cc1-chat-win-stik-typ.cheese {
  background: url(./../assets/images/svg/cheese-sector-grey-icon.svg) center
    center / 17px 19px no-repeat;
}
.cc1-chat-win-stik-typ.cube {
  background: url(./../assets/images/svg/cube-grey-icon.svg) center center /
    18px 18px no-repeat;
}
.cc1-chat-win-stik-typ.umbrella {
  background: url(./../assets/images/svg/umbrella-grey-icon.svg) center center /
    18px 18px no-repeat;
}
.cc1-chat-win-stik-typ.add {
  background: url(./../assets/images/svg/plus-grey-icon.svg) center center /
    20px no-repeat;
}
.cc1-chat-win-stik-typ.cheese.active {
  background: url(./../assets/images/svg/cheese-sector-blue-icon.svg) center
    center / 17px 19px no-repeat;
}
.cc1-chat-win-stik-typ.recent::before {
  content: "";
  position: absolute;
  display: block;
  width: 1px;
  height: 20px;
  background-color: rgba(20, 20, 20, 0.1);
  top: 0;
  right: -17px;
}
.cc1-chat-win-stik-type-wrap {
  padding: 0 7px;
  height: 238px;
}
.cc1-chat-win-stik-item {
  display: inline-block;
  width: 78px;
  height: 80px;
  margin: 3px;
  float: left;
}
.ccl-chat-center-panel {
  position: relative;
}
.ccl-center-panel-close-link,
.ccl-right-panel-close-link {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  top: 34px;
  left: 20px;
  right: initial;
  background: url(./../assets/images/svg/left-blue-arrow.svg) center center
    no-repeat rgba(20, 20, 20, 0);
  display: none;
  z-index: 1;
}
.dark-theme {
  background-color: #141414;
  color: #fff;
}
.dark-theme .ccl-secondary-color {
  color: rgba(255, 255, 255, 0.6);
}
.dark-theme .cc1-chat-win-header,
.dark-theme .cc1-chat-win-conver-wrap,
.dark-theme .cc1-chat-win-inpt-ext-wrap {
  background-color: #141414;
}
.dark-theme .cc1-chat-win-rcvr-msg-wrap,
.dark-theme .cc1-chat-win-location-wrap {
  background-color: rgba(51, 51, 51, 0.92);
}
.dark-theme .cc1-chat-win-location-txt,
.dark-theme .cc1-chat-win-timestamp,
.dark-theme .cc1-chat-win-inpt-rply-for-msg {
  color: rgba(255, 255, 255, 0.6);
}
.dark-theme .cc1-chat-win-msg-like-cnt {
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(51, 51, 51, 0.92);
}
.dark-theme .cc1-chat-win-inpt-rply-for-wrap::before {
  background-color: rgba(255, 255, 255, 0.12);
}
.dark-theme .cc1-chat-win-inpt-box {
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: rgba(255, 255, 255, 0.04) 0 0 0 1px inset;
  color: #fff;
}
.dark-theme .smile-button {
  background: url(./../assets/images/svg/smilie-light-grey-icon.svg) center
    center no-repeat;
}
.dark-theme .cc1-chat-win-inpt-attach a {
  background: url(./../assets/images/svg/rounded-plus-light-grey-icon.svg)
    center center no-repeat;
}
.dark-theme .cc1-chat-win-inpt-rply-for-close {
  background: url(./../assets/images/svg/cross-light-grey-icon.svg) center
    center no-repeat;
}
.dark-theme .cc1-chat-win-inpt-sug-msg {
  background-color: #424242;
}
.dark-theme .cc1-chat-win-stik-popup,
.dark-theme .cc1-chat-win-stik-type-list {
  background-color: rgba(51, 51, 51, 0.92);
  border-bottom: none;
}
.dark-theme .cc1-chat-win-stik-typ.search {
  background: url(./../assets/images/svg/search-white-icon.svg) center center /
    17px 18px no-repeat;
}
.dark-theme .cc1-chat-win-stik-typ.recent {
  background: url(./../assets/images/svg/recent-light-grey-icon.svg) center
    center / 21px 18px no-repeat;
}
.dark-theme .cc1-chat-win-stik-typ.cheese {
  background: url(./../assets/images/svg/cheese-sector-light-grey-icon.svg)
    center center / 17px 19px no-repeat;
}
.dark-theme .cc1-chat-win-stik-typ.cube {
  background: url(./../assets/images/svg/cube-light-grey-icon.svg) center center /
    18px 18px no-repeat;
}
.dark-theme .cc1-chat-win-stik-typ.umbrella {
  background: url(./../assets/images/svg/umbrella-light-grey-icon.svg) center
    center / 18px 18px no-repeat;
}
.dark-theme .cc1-chat-win-stik-typ.add {
  background: url(./../assets/images/svg/plus-light-grey-icon.svg) center center /
    20px no-repeat;
}
.dark-theme .cc1-chat-win-stik-typ.cheese.active {
  background: url(./../assets/images/svg/cheese-sector-blue-icon.svg) center
    center / 17px 19px no-repeat;
}
.dark-theme .cc1-chat-win-stik-typ.recent::before {
  background-color: rgba(255, 255, 255, 0.1);
}
.dark-theme .cc1-chat-win-inpt-voice-btn {
  background: url(./../assets/images/svg/voice-record-light-grey-icon.svg)
    center center no-repeat;
}

.cometchat-logo {
  width: 200px;
  margin: 0 auto;
}

@media (min-width : 320px) and (max-width : 767px) {
  .cc1-chat-win-inpt-ext-wrap {
    bottom: 60px;
  }
  .cc1-chat-win-conver-wrap {
    height: calc(100vh - 185px);
  }
}


</style>
