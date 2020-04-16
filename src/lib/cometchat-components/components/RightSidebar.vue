<template>
  <div class="ccl-right-panel" v-bind:style="isMenu ? 'display: block;' : 'display: none;' ">
    <a href="javascript:void(0);" class="ccl-right back-btn" v-on:click="backToCenter()">Back</a>
    <div class="ccl-dtls-panel-wrap">
      <div class="ccl-right-panel-head-wrap">
        <h4 class="ccl-right-panel-head-ttl">Details</h4>
      </div>
      <div class="ccl-dtls-panel-body">
        <div class="ccl-dtls-noti-sel-wrap">
          <input
            type="checkbox"
            id="notificationSel"
            class="css-checkbox"
            autocomplete="off"
            name="notificationSel"
          />
          <label for="notificationSel" class="ccl-semi-bold-text">Notifications</label>
        </div>
        <div class="ccl-dtls-panel-section">
          <h6 class="ccl-dtls-panel-section-head ccl-secondary-color ccl-text-uppercase">Actions</h6>
          <div class="ccl-dtls-section-list">
            <div class="ccl-dtls-section-listitem">
              <a
                href="javascript:void(0);"
                class="ccl-dtls-section-listitem-link ccl-blue-color ccl-semi-bold-text"
              >Search in Conversation</a>
            </div>
            <div class="ccl-dtls-section-listitem">
              <a
                href="javascript:void(0);"
                class="ccl-dtls-section-listitem-link ccl-blue-color ccl-semi-bold-text"
              >Create Group</a>
            </div>
          </div>
        </div>
        <div class="ccl-dtls-panel-section">
          <h6
            class="ccl-dtls-panel-section-head ccl-secondary-color ccl-text-uppercase"
          >Privacy &amp; Support</h6>
          <div class="ccl-dtls-section-list">
            <div class="ccl-dtls-section-listitem">
              <a
                href="javascript:void(0);"
                class="ccl-dtls-section-listitem-link ccl-red-color ccl-semi-bold-text"
              >Clear Chat</a>
            </div>
            <div class="ccl-dtls-section-listitem">
              <a href="javascript:void(0);" class="ccl-dtls-section-listitem-link ccl-red-color ccl-semi-bold-text"
              v-on:click="toggleBlockUser()">
                <span v-if="!blockeUser">Block User</span> 
                <span v-else-if="blockeUser">Unblock User</span>
              </a>

              <!-- <div [hidden]="blockeUser" class="ccl-dtls-section-listitem">
                <a href="javascript:void(0);" class="ccl-dtls-section-listitem-link ccl-red-color ccl-semi-bold-text" (click)=toggleBlockUser($event)>Block User</a>
              </div>
              <div [hidden]="!blockeUser" class="ccl-dtls-section-listitem">
                <a href="javascript:void(0);" class="ccl-dtls-section-listitem-link ccl-red-color ccl-semi-bold-text" (click)=toggleBlockUser($event)>Unblock User</a>
              </div> -->


            </div>
            <div class="ccl-dtls-section-listitem">
              <a
                href="javascript:void(0);"
                class="ccl-dtls-section-listitem-link ccl-red-color ccl-semi-bold-text"
              >Report</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";

export default {
  name: "RightSidebar",
  data() {
    return {
      isMenu: false,
      user: {},
      blockeUser: '',
    }
  },
  mounted() {
    this.$root.$on("menuOpen", val => {
      // console.log(val, 'menu open')
      this.isMenu = val;
    });

    this.$root.$on("selectedUser", data => {
      this.user = data;
      this.blockeUser = this.user.blockedByMe;
    });


  },
  methods: {
    toggleBlockUser() {
      // console.log(event);

      if (!this.blockeUser) {
        let usersList = [this.user.uid];
      //   console.log(event.target)
        CometChat.blockUsers(usersList).then(
          list => {
            this.blockeUser = !this.blockeUser;
            console.log("users list blocked", { list });
          },
          error => {
            console.log("Blocking user fails with error", error);
          }
        );
      } else {
        let usersList = [this.user.uid];

        CometChat.unblockUsers(usersList).then(
          list => {
            this.blockeUser = !this.blockeUser;
            console.log("users list unblocked", { list });
          },
          error => {
            console.log("unblocking user fails with error", error);
          }
        );
      }




    },

    backToCenter() {
      const el  = document.getElementById('pageWrapper');
      if (el.classList.contains("right-open")) {
        el.classList.remove("right-open");
        el.classList.add("center-open");
        this.isMenu = false;
      }      
    }


  }
};
</script>

<style scoped>
/* a{background:0 0}
img{border:0}
button,input,select,textarea{font-family:inherit;font-size:100%;margin:0}
button,input{line-height:normal}
input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0}
html{text-size-adjust:100%;font-size:10px}
body{margin:0;padding:0;font-family:Inter,sans-serif;font-size:1.4rem;box-sizing:border-box;overflow-x:hidden;background-color:#fff;color:#141414}
body *{box-sizing:border-box}
h1,h2,h3,h4,h5,h6{font-family:Inter,sans-serif;font-stretch:normal;font-weight:400}
h4,.font-22{font-size:2.2rem;line-height:27px}
h6,.font-18{font-size:1.8rem;line-height:24px}
a{text-decoration:none}
a{background-color:transparent} */
/* img{border-style:none;max-width:100%;display:inherit} */
/* button,input,select,textarea{font:inherit;margin:0} */
/* button,input{overflow:visible} */
[type="checkbox"],[type="radio"]{padding:0}
input[type="checkbox"],input[type="radio"]{display:none}
label{cursor:pointer}
a{color:inherit}
.ccl-semi-bold-text{font-weight:600}
.ccl-text-uppercase{text-transform:uppercase}
.ccl-center{text-align:center}
.ccl-secondary-color{color:rgba(20,20,20,0.6)}
.ccl-blue-color{color:#39f}
.ccl-red-color{color:#ff3b30}
.clearfix::after,.clearfix::before{content:" ";display:table}
.clearfix,.clearfix::after{clear:both}
.page-int-wrapper{display:flex;position:fixed;height:100%;width:100%}
.ccl-right-panel{float:right;border-left:1px solid #eaeaea;height:100vh;width:280px;display:none}
.ccl-left-panel-head-wrap,.ccl-right-panel-head-wrap{padding:20px 16px;position:relative}
.ccl-left-panel-head-ttl,.ccl-right-panel-head-ttl{margin:0;font-weight:700;letter-spacing:-.5px}
.ccl-dtls-panel-body{padding:16px}
.ccl-dtls-noti-sel-wrap{margin-bottom:30px}
.ccl-dtls-noti-sel-wrap input[type="checkbox"] + label,.ccl-more-noti-sel-wrap input[type="checkbox"] + label{display:block;cursor:pointer;background:url(./../assets/images/svg/checkbox-inactive.svg) right center / 16px no-repeat;font-size:15px;letter-spacing:-.1px;line-height:23px;user-select:none}
.ccl-dtls-noti-sel-wrap input[type=checkbox]:checked+label, .ccl-more-noti-sel-wrap input[type=checkbox]:checked+label {background: url(./../assets/images/svg/checkbox-blue-active.svg) no-repeat right center;background-size: 16px;}
.ccl-dtls-panel-section{margin-bottom:30px}
.ccl-dtls-panel-section-head{margin:0;font-size:12px;letter-spacing:-.1px;line-height:20px;text-transform:uppercase}
.ccl-dtls-section-listitem-link{font-size:15px;letter-spacing:-.1px;line-height:20px;padding:6px 0;display:inline-block}
.ccl-dtls-panel-media-fltr-wrap{margin-top:8px}
.ccl-dtls-panel-media-fltrs{border-radius:8px;background-color:rgba(20,20,20,0.08);width:100%;padding:2px;margin-bottom:10px}
.ccl-dtls-panel-media-fltr-btn{display:inline-block;width:33.33%;float:left;font-size:13px;font-weight:500;letter-spacing:-.1px;line-height:18px;padding:5px;position:relative}
.ccl-dtls-panel-media-fltr-btn::before{content:"";position:absolute;display:block;width:2px;height:16px;background-color:rgba(20,20,20,0.12);right:-2px;top:6px}
.ccl-dtls-panel-media-fltr-btn.active{background-color:#fff;box-shadow:rgba(20,20,20,0.04) 0 3px 1px,rgba(20,20,20,0.12) 0 3px 8px;border-radius:7px}
.ccl-dtls-panel-media-fltrs .ccl-dtls-panel-media-fltr-btn:last-child::before,.ccl-dtls-panel-media-fltr-btn.active::before{display:none}
.ccl-dtls-panel-media-type-wrap.photos .ccl-dtls-panel-media-item{display:inline-block;float:left;width:120px;border-radius:8px;overflow:hidden;margin-bottom:7px}
.ccl-dtls-panel-media-type-wrap.photos .ccl-dtls-panel-media-item:nth-child(2n+1){margin-right:7px}
.ccl-center-panel-close-link,.ccl-right-panel-close-link{position:absolute;width:32px;height:32px;border-radius:50%;top:34px;left:20px;right:initial;background:url(./../assets/images/svg/left-blue-arrow.svg) center center no-repeat rgba(20,20,20,0);display:none;z-index:1}
.dark-theme{background-color:#141414;color:#fff}
.dark-theme .ccl-secondary-color{color:rgba(255,255,255,0.6)}
.dark-theme .ccl-left-panel-call-fltrs,.dark-theme .ccl-dtls-panel-media-fltrs{background-color:rgba(255,255,255,0.1)}
.dark-theme .ccl-left-panel-call-fltr-btn.active,.dark-theme .ccl-dtls-panel-media-fltr-btn.active{background-color:#636366}

.back-btn {
  background: url('./../assets/images/svg/arrow_back_icon.svg') no-repeat;
  width: 22px;
  height: 22px;
  text-indent: 9999px;
  background-size: contain;
  display: none;
  vertical-align: middle;
  position: absolute;
  top: 22px;
  left: 20px;
  z-index: 9;
  display: none;
}

@media (min-width : 320px) and (max-width : 767px) {
  .back-btn {
    display: inline-block;
  }
}



</style>