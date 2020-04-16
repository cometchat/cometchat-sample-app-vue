<template>
  <div  class="scroll-container">
    <div class="ccl-left-panel-head-wrap">
      <h4 class="ccl-left-panel-head-ttl">Calls</h4>
      <a href="javascript:void(0);" class="ccl-left-panel-head-edit-link" style="display: none;"></a>
      <a
        href="javascript:void(0);"
        class="ccl-left-panel-head-done-link ccl-blue-color ccl-semi-bold-text"
        style="display: block;"
      >Done</a>
    </div>
    <div class="ccl-left-panel-call-fltr-wrap">
      <div class="ccl-left-panel-call-fltrs clearfix">
        <a href="javascript:void(0);" class="ccl-left-panel-call-fltr-btn ccl-center active">All</a>
        <a href="javascript:void(0);" class="ccl-left-panel-call-fltr-btn ccl-center">Missed</a>
      </div>
    </div>
    <div class="chat-ppl-list-ext-wrap call-ppl-list-ext-wrap">
      <div class="chat-ppl-list-wrap">
        <div class="chat-ppl-listitem clearfix">
          <div class="chat-ppl-thumbnail-wrap">
            <img src="./../assets/images/people-1_2x.jpg" />
          </div>
          <div class="chat-ppl-listitem-dtls">
            <span class="chat-ppl-listitem-name">Gladys Kanyinda</span>
            <p class="chat-ppl-listitem-txt ccl-secondary-color incoming">Incoming Audio</p>
          </div>
          <a href="javascript:void(0);" class="del-call-link" style="display: block"></a>
        </div>
        <div class="chat-ppl-listitem clearfix">
          <div class="chat-ppl-thumbnail-wrap">
            <img src="./../assets/images/people-2_2.jpg" />
          </div>
          <div class="chat-ppl-listitem-dtls">
            <span class="chat-ppl-listitem-name">Ashish Asharaful</span>
            <p class="chat-ppl-listitem-txt ccl-secondary-color video-incoming">Incoming Video</p>
          </div>
          <a href="javascript:void(0);" class="del-call-link" style="display: block"></a>
        </div>
        <div class="chat-ppl-listitem clearfix">
          <div class="chat-ppl-thumbnail-wrap">
            <img src="./../assets/images/people-1_2x.jpg" />
          </div>
          <div class="chat-ppl-listitem-dtls">
            <span class="chat-ppl-listitem-name">Gladys Kanyinda</span>
            <p class="chat-ppl-listitem-txt ccl-secondary-color outgoing">Outgoing Audio</p>
          </div>
          <a href="javascript:void(0);" class="del-call-link" style="display: block"></a>
        </div>
        <div class="chat-ppl-listitem clearfix">
          <div class="chat-ppl-thumbnail-wrap">
            <img src="./../assets/images/people-2_2.jpg" />
          </div>
          <div class="chat-ppl-listitem-dtls">
            <span class="chat-ppl-listitem-name">Gladys Kanyinda</span>
            <p class="chat-ppl-listitem-txt ccl-secondary-color missed">Missed Audio</p>
          </div>
          <a href="javascript:void(0);" class="del-call-link" style="display: block"></a>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "CallList"
};
</script>

<style scoped>
.ccl-semi-bold-text{font-weight:600}
.ccl-center{text-align:center}
.ccl-secondary-color{color:rgba(20,20,20,0.6)}
.ccl-blue-color{color:#39f}
.clearfix::after,.clearfix::before{content:" ";display:table}
.clearfix,.clearfix::after{clear:both}
.page-int-wrapper{display:flex;position:fixed;height:100%;width:100%}
.ccl-left-panel{width:280px;border-right:1px solid #eaeaea;height:100vh;position:relative}
.ccl-left-panel-head-wrap,.ccl-right-panel-head-wrap{padding:20px 16px;position:relative}
.ccl-left-panel-head-ttl,.ccl-right-panel-head-ttl{margin:0;font-weight:700;letter-spacing:-.5px}
.ccl-left-panel-head-edit-link{position:absolute;right:14px;top:23px;display:block;width:20px;height:20px;background:url(./../assets/images/svg/edit-blue-icon.svg) center center no-repeat}
.ccl-left-panel-head-done-link{position:absolute;right:14px;top:20px;font-size:15px;padding:3px}
.chat-ppl-list-ext-wrap{height:calc(100vh - 164px);overflow-y:auto}
.chat-ppl-listitem{padding:13px 16px 0;position:relative;margin-top:-1px;cursor:pointer;display:flex}
.chat-ppl-thumbnail-wrap{display:inline-block;width:36px;height:36px;margin-right:7px}
.chat-ppl-listitem-dtls{display:inline-block;flex:1 1 0;padding-bottom:14px;border-bottom:1px solid #f7f7f7}
.chat-ppl-listitem-name{font-size:15px;font-weight:600;letter-spacing:-.1px;display:block;max-width:147px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.chat-ppl-listitem-txt{margin:0;font-size:13px;max-width:176px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;letter-spacing:-.1px;line-height:20px}
.chat-ppl-thumbnail-wrap img,.cc1-chat-win-user-thumb img{display:block;border-radius:18px;overflow:hidden;width:36px}
.ccl-left-panel-footer-wrap{position:absolute;width:100%;left:0;bottom:0;background-color:#fff;z-index:1}
/* .ccl-left-panel-nav-listitem{width:25%;float:left;text-align:center} */
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
.ccl-left-panel-call-fltr-wrap{padding:8px 16px 18px}
.ccl-left-panel-call-fltrs{border-radius:8px;background-color:rgba(20,20,20,0.08);width:100%;padding:2px}
.ccl-left-panel-call-fltr-btn{display:inline-block;width:50%;float:left;font-size:13px;font-weight:500;letter-spacing:-.1px;line-height:18px;padding:5px}
.ccl-left-panel-call-fltr-btn.active{background-color:#fff;box-shadow:rgba(20,20,20,0.04) 0 3px 1px,rgba(20,20,20,0.12) 0 3px 8px;border-radius:7px}
.call-ppl-list-ext-wrap .chat-ppl-listitem-txt{padding-left:23px}
.call-ppl-list-ext-wrap .chat-ppl-listitem-txt.incoming{background:url(./../assets/images/svg/incoming-call-grey-icon.svg) left center no-repeat}
.call-ppl-list-ext-wrap .chat-ppl-listitem-txt.video-incoming{background:url(./../assets/images/svg/incoming-call-video-grey-icon.svg) left center no-repeat}
.call-ppl-list-ext-wrap .chat-ppl-listitem-txt.outgoing{background:url(./../assets/images/svg/outgoing-call-grey-icon.svg) left center no-repeat}
.call-ppl-list-ext-wrap .chat-ppl-listitem-txt.missed{background:url(./../assets/images/svg/missed-call-grey-icon.svg) left center no-repeat}
.call-ppl-list-ext-wrap .del-call-link{width:14px;height:18px;background:url(./../assets/images/svg/delete-grey-icon.svg) center center no-repeat;position:absolute;right:16px;top:25px;display:none}
.dark-theme{background-color:#141414;color:#fff}
.dark-theme .ccl-secondary-color{color:rgba(255,255,255,0.6)}
.dark-theme .chat-ppl-listitem-dtls{border-bottom:1px solid #484848}
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
.dark-theme .ccl-left-panel-call-fltrs,.dark-theme .ccl-dtls-panel-media-fltrs{background-color:rgba(255,255,255,0.1)}
.dark-theme .ccl-left-panel-call-fltr-btn.active,.dark-theme .ccl-dtls-panel-media-fltr-btn.active{background-color:#636366}
.dark-theme .call-ppl-list-ext-wrap .chat-ppl-listitem-txt.incoming{background:url(./../assets/images/svg/incoming-call-light-grey-icon.svg) left center no-repeat}
.dark-theme .call-ppl-list-ext-wrap .del-call-link{background:url(./../assets/images/svg/delete-light-grey-icon.svg) center center no-repeat}
.dark-theme .call-ppl-list-ext-wrap .chat-ppl-listitem-txt.video-incoming{background:url(./../assets/images/svg/incoming-call-video-light-grey-icon.svg) left center no-repeat}
.dark-theme .call-ppl-list-ext-wrap .chat-ppl-listitem-txt.outgoing{background:url(./../assets/images/svg/outgoing-call-light-grey-icon.svg) left center no-repeat}
.dark-theme .call-ppl-list-ext-wrap .chat-ppl-listitem-txt.missed{background:url(./../assets/images/svg/missed-call-light-grey-icon.svg) left center no-repeat}
/* @media (min-width : 320px) and (max-width : 767px) {
  .ccl-left-panel-nav-listitem { width:25%;}
} */
</style