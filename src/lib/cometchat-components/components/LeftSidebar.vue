<template>
  <div class="ccl-left-panel">
    <SidebarHeader :active-tab="activeTab" />
    <UserList v-if="activeTab=='contacts'" />
    <CallList v-else-if="activeTab=='call'" />
    <ChatList v-else-if="activeTab=='chat'" />
    <GroupList v-else-if="activeTab=='groups'" />
    <MoreList v-else />
    <div class="ccl-left-panel-footer-wrap">
      <Nav @activeTab="currentTab" />
    </div>
  </div>
</template>

<script>
// import { CometChat } from "@cometchat-pro/chat";
import SidebarHeader from "./SidebarHeader";
import Nav from "./NavComponent";
import UserList from "./UserList";
import ChatList from "./ChatList";
import CallList from "./CallList";
import GroupList from "./GroupList";
import MoreList from "./MoreList";

export default {
  name: "LeftSidebar",
  components: {
    SidebarHeader,
    Nav,
    UserList,
    CallList,
    GroupList,
    MoreList,
    ChatList
  },
  data() {
    return {
      activeTab: "contacts",
    };
  },
  methods: {
    currentTab (value) {
      this.activeTab = value;
    },
  },
};
</script>

<style>

.ccl-semi-bold-text{font-weight:600}
.ccl-secondary-color{color:rgba(20,20,20,0.6)}
.clearfix::after,.clearfix::before{content:" ";display:table}
.clearfix,.clearfix::after{clear:both}
.page-int-wrapper{display:flex;position:fixed;height:100%;width:100%}
.ccl-left-panel{width:280px;border-right:1px solid #eaeaea;height:100vh;position:relative}
.ccl-left-panel-head-wrap,.ccl-right-panel-head-wrap{padding:20px 16px;position:relative}
.ccl-left-panel-head-ttl,.ccl-right-panel-head-ttl{margin:0;font-weight:700;letter-spacing:-.5px}
.ccl-left-panel-srch-wrap{padding:0 16px 18px;border-bottom:1px solid #fbfbfb}
.ccl-left-panel-srch-inpt-wrap{position:relative}
.ccl-left-panel-srch{display:block;width:100%;border:0;box-shadow:rgba(20,20,20,0.04) 0 0 0 1px inset;border-radius:8px;background-color:rgba(20,20,20,0.04);letter-spacing:-.1px;line-height:20px;padding:6px 8px 6px 30px}
.search-btn{width:14px;height:14px;display:block;position:absolute;left:9px;top:9px;background:url(./../assets/images/svg/search-grey-icon.svg) center center no-repeat}
.ccl-left-panel-footer-wrap{position:absolute;width:100%;left:0;bottom:0;background-color:#fff;z-index:1}
.ccl-left-panel-nav-listitem{width:25%;float:left;text-align:center}
.ccl-left-panel-nav-link{display:inherit;padding:32px 20px}
.ccl-left-panel-nav-link.people{background:url(./../assets/images/svg/people-grey-icon.svg) no-repeat center;background-size:18px 19px}
.ccl-left-panel-nav-link.call{background:url(./../assets/images/svg/call-grey-icon.svg) no-repeat center;background-size:18px 19px}
.ccl-left-panel-nav-link.chat{background:url(./../assets/images/svg/chat-grey-icon.svg) no-repeat center;background-size:20px 21px}
.ccl-left-panel-nav-link.grp-chat{background:url(./../assets/images/svg/group-chat-grey-icon.svg) no-repeat center;background-size:20px 21px}
.ccl-left-panel-nav-link.more{background:url(./../assets/images/svg/more-grey-icon.svg) no-repeat center;background-size:20px 21px}
.ccl-left-panel-nav-link.people.active{background:url(./../assets/images/svg/people-blue-icon.svg) no-repeat center;background-size:18px 19px}
.ccl-left-panel-nav-link.chat.active{background:url(./../assets/images/svg/chat-blue-icon.svg) no-repeat center;background-size:20px 21px}
.ccl-left-panel-nav-link.grp-chat.active{background:url(./../assets/images/svg/group-chat-blue-icon.svg) no-repeat center;background-size:20px 21px}
.ccl-left-panel-nav-link.more.active{background:url(./../assets/images/svg/more-blue-icon.svg) no-repeat center;background-size:20px 21px}
.ccl-left-panel-nav-link.call.active{background:url(./../assets/images/svg/call-blue-icon.svg) no-repeat center;background-size:18px 19px}
/* .chat-contact-list-ext-wrap{padding:16px;} */
.scroll-container{height: calc(100vh - 170px); overflow-y: scroll;}
.chat-contact-listitem-thum{display:inline-block;width:31px; height: 31px; vertical-align:middle;margin-right:8px}
.chat-contact-listitem-thum img{width:28px;height:28px;border-radius:50%;overflow:hidden;display:inherit}
.chat-contact-listitem-name{
  display:inline-block;vertical-align:middle;width:205px;position:relative;letter-spacing:-.1px;line-height:22px
}
.chat-contact-listitem-name::before{content:"";display:block;width:100%;height:1px;background-color:rgba(20,20,20,0.1);position:absolute;left:0;bottom:-18px}
.chat-contact-listitem{padding:12px 0}
.dark-theme{background-color:#141414;color:#fff}
.dark-theme .ccl-secondary-color{color:rgba(255,255,255,0.6)}
.dark-theme .ccl-left-panel-srch{background-color:rgba(255,255,255,0.08);box-shadow:rgba(255,255,255,0.04) 0 0 0 1px inset;color:#cccbcb}
.dark-theme .search-btn{background:url(./../assets/images/svg/search-white-icon.svg) center center no-repeat}
.dark-theme .ccl-left-panel-srch-wrap{border-bottom:none}
.dark-theme .ccl-left-panel{border-right:1px solid #484848}
.dark-theme .ccl-left-panel-footer-wrap{background-color:#141414}
.dark-theme .ccl-left-panel-nav-link.people{background:url(./../assets/images/svg/people-light-grey-icon.svg) no-repeat center}
.dark-theme .ccl-left-panel-nav-link.call{background:url(./../assets/images/svg/call-light-grey-icon.svg) no-repeat center}
.dark-theme .ccl-left-panel-nav-link.chat{background:url(./../assets/images/svg/chat-light-grey-icon.svg) no-repeat center}
.dark-theme .ccl-left-panel-nav-link.grp-chat{background:url(./../assets/images/svg/group-chat-light-grey-icon.svg) no-repeat center}
.dark-theme .ccl-left-panel-nav-link.more{background:url(./../assets/images/svg/more-light-grey-icon.svg) no-repeat center}
.dark-theme .ccl-left-panel-nav-link.people.active{background:url(./../assets/images/svg/people-blue-icon.svg) no-repeat center;background-size:18px 19px}
.dark-theme .ccl-left-panel-nav-link.chat.active{background:url(./../assets/images/svg/chat-blue-icon.svg) no-repeat center;background-size:20px 21px}
.dark-theme .ccl-left-panel-nav-link.grp-chat.active{background:url(./../assets/images/svg/group-chat-blue-icon.svg) no-repeat center;background-size:20px 21px}
.dark-theme .ccl-left-panel-nav-link.more.active{background:url(./../assets/images/svg/more-blue-icon.svg) no-repeat center;background-size:20px 21px}
.dark-theme .ccl-left-panel-nav-link.call.active{background:url(./../assets/images/svg/call-blue-icon.svg) no-repeat center;background-size:18px 19px}
.dark-theme .chat-contact-listitem-name::before{background-color:rgba(255,255,255,0.1)}
.contact-list-wrpr:hover {background-color: #f8f8f8;}
.cometchat-message-container {height: 50%; overflow: hidden; max-width: 100%; display: flex;}
.cometchat-message-container p {margin: auto; color: #14141488; font-size: 24px; font-weight: 600;}

@media (min-width : 768px) and (max-width : 1023px) {
.ccl-right-panel{position:fixed;top:0;right:0;z-index:9;background-color:#fff;box-shadow:0 4px 8px rgba(20,20,20,0.12),0 0 0 1px rgba(20,20,20,0.08)}
.dark-theme .ccl-right-panel{background-color:#141414;}
}

@media (min-width : 320px) and (max-width : 767px) {
.ccl-left-panel{width:100%;z-index:1;border-right: 0;}
.ccl-left-panel-head-ttl{text-align:center}
.ccl-right-panel-head-ttl{ text-align: center;margin-top: 15px;}
.chat-ppl-more-opts-tt{right:13px;bottom:-135px}
.ccl-center-panel{display:none;flex:none;position: fixed;width:100%;height:100vh;z-index:2;background-color:#fff;}
.dark-theme .ccl-center-panel{background-color:#141414;}
.ccl-left-panel-in-call-wrap{width:90%}
.popup-box{width:100%;height:100vh;border-radius:0}
.popup-close{top:16px;left:20px;right:initial;background:rgba(20,20,20,0.0) url(./../assets/images/svg/left-blue-arrow.svg) no-repeat center}
.ccl-more-center-panel-opts-wrap,.ccl-call-center-panel-details-wrap{width:90%}
.ccl-center-panel-close-link,.ccl-right-panel-close-link{display:block}
.ccl-right-panel{display:none;position:absolute;width:100%;height:100vh;z-index:3;background-color:#fff}
.dark-theme .ccl-right-panel{background-color:#141414;}
.ccl-dtls-panel-media-type-wrap.photos .ccl-dtls-panel-media-item{width: 167px;}
.ccl-call-ong-max-ctablock{padding: 10px 15px 22px;}
.video-call .ccl-call-ong-max-thumb-wrap,.audio-call .ccl-call-ong-max-thumb-wrap{width: 100%;}
.video-call .ccl-call-ong-max-thumb{width: 80%;/* height: 216px; */left: 0;margin: 0 auto;}
.ccl-call-ong-max-wrap.video-call .ccl-call-ong-max-thumb img {z-index: -1;}
.ccl-video-call-ong-caller-thumb{width: 100px;height: 77px;top: 100px;right: initial;bottom: 100px;left: 15px;}
.cc1-chat-win-inpt-ext-wrap,.ccl-left-panel-footer-wrap,.ccl-left-panel-ong-call-wrap{position: fixed;}
.cc1-chat-win-header{padding-left: 45px;}
.video-group-call .ccl-call-ong-max-thumb2{height: 70%;left: 0px;}
.video-group-call .ccl-call-ong-max-thumb{right: -70px;}
.audio-call .ccl-call-ong-max-thumb{height: 75%;}
.audio-call.audio-group-call .ccl-call-ong-max-thumb{height: 60%;width: 60%;left: 29px;}
.ccl-call-ong-minimize-link{ left: 35px;}

.chat-contact-listitem-name {
  display: inline-block;
  vertical-align: middle;
  /* width: 300px; */
  position: relative;
  letter-spacing: -.1px;
  line-height: 22px;
}
.chat-contact-list-apla-ftlr {
  position: absolute;
  top: 0;
}
}

</style>