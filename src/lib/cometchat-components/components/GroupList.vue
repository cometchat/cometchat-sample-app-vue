<template>
  <div>
    <!-- <div class="ccl-left-panel-srch-wrap"> -->
    <div class="ccl-left-panel-head-wrap">
      <div class="ccl-left-panel-srch-inpt-wrap">
        <input autocomplete="off" class="ccl-left-panel-srch font-15 ccl-secondary-color" placeholder="Search" type="text" maxlength="200" @input="onSearchChange($event)" />
        <input id="searchButton" type="button" class="search-btn" />
      </div>
    </div>

    <div v-if="grousList.length==0" class="cometchat-message-container">
      <p>
      {{messageToDisplay}}
      </p>
    </div>
    
    <div class="chat-ppl-list-ext-wrap scroll-container" @scroll="handleGroupScroll($event)" v-else-if="grousList.length !=0">
      <div class="chat-ppl-list-wrap" v-for="(groupRow, index) in grousList" :key="index">
        <div class="chat-ppl-listitem clearfix" v-on:click="currentGroup(groupRow)">
          <Avatar :item="groupRow" />
          <div class="chat-ppl-listitem-dtls">
            <span class="chat-ppl-listitem-name">{{groupRow.name}}</span>
            <p class="chat-ppl-listitem-txt ccl-secondary-color">{{groupRow.owner}}</p>
          </div>
        </div>         
      </div>
    </div>
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import Avatar from "./Avatar";

export const STRING_CONSTS = {
  STRING_MESSAGES: {
    LOADING_MESSSAGE: 'Loading...',
    SEARCH_LOADING: 'Searching...',
    ERROR_LOADING_USERS: 'Error in loading',
    ERROR_COMETCHAT_LOGIN: 'Loag in error, reload',
    ERROR_NO_USERS_FOUND: 'No users found',
    EMPTY_STRING: '',
    SINGLE_SPACE: ' ',
  }
};

export default {
  name: "GroupList",
  components: {
    Avatar
  },
  data() {
    return {
      grousList: [],
      groupRequest: '',
      messageToDisplay: '',
      callGroup(searchKey) {
        if (searchKey) {
          this.groupRequest = new CometChat.GroupsRequestBuilder().setLimit(30).setSearchKeyword(searchKey).build();
        } else {
          this.groupRequest = new CometChat.GroupsRequestBuilder().setLimit(30).build();
        }
        return this.groupRequest;
      },
      
      groupFetchnext() {
        return this.groupRequest.fetchNext();
      },


    }
  },
  methods: {
    currentGroup(data) {
      this.$root.$emit('selectedUser', data);
    },
    getGroupList(data) {
      this.callGroup(data).fetchNext().then(groups => {
        this.grousList = [...this.grousList, ...groups]
      }, 
      error => {
        console.log(error);
      });
    },

    handleGroupScroll(elem) {
      if ((elem.target.offsetHeight + elem.target.scrollTop) >= (elem.target.scrollHeight - 20)) {
        this.groupFetchnext().then((group) => {
          this.grousList = [...this.grousList, ...group];
        }, error => {
          console.log(error)
        });
      }
    },

    onSearchChange(event){
      this.grousList = [];
      if (this.searchStarted) {
        clearTimeout(this.searchStarted);
      }
      if (event.target.value.trim() !== STRING_CONSTS.STRING_MESSAGES.EMPTY_STRING) {
        this.searchStarted = setTimeout(() => {
        this.messageToDisplay = STRING_CONSTS.STRING_MESSAGES.SEARCH_LOADING;
        this.getGroupList(event.target.value);
        }, 400);
      } else if (event.target.value.trim() === STRING_CONSTS.STRING_MESSAGES.EMPTY_STRING && event.data === null) {
        event.target.value = STRING_CONSTS.STRING_MESSAGES.EMPTY_STRING;
        this.searchStarted = setTimeout(() => {
          this.getGroupList();
        }, 400);
      } else if (event.target.value.trim() === STRING_CONSTS.STRING_MESSAGES.EMPTY_STRING && event.data === STRING_CONSTS.STRING_MESSAGES.SINGLE_SPACE) {
          event.target.value = STRING_CONSTS.STRING_MESSAGES.EMPTY_STRING;
      }
    },

  },
  created() {
    this.getGroupList();
  }
};
</script>

<style scoped>
.ccl-secondary-color {
  color: rgba(20, 20, 20, 0.6);
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
.ccl-left-panel {
  width: 280px;
  border-right: 1px solid #eaeaea;
  height: 100vh;
  position: relative;
}
.ccl-left-panel-head-wrap,
.ccl-right-panel-head-wrap {
  padding: 20px 16px;
  position: relative;
}
.ccl-left-panel-head-ttl,
.ccl-right-panel-head-ttl {
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}
.ccl-left-panel-head-edit-link {
  position: absolute;
  right: 14px;
  top: 23px;
  display: block;
  width: 20px;
  height: 20px;
  background: url(./../assets/images/svg/edit-blue-icon.svg) center center
    no-repeat;
}
.ccl-left-panel-srch-wrap {
  padding: 0 16px 18px;
  border-bottom: 1px solid #fbfbfb;
}
.ccl-left-panel-srch-inpt-wrap {
  position: relative;
}
.ccl-left-panel-srch {
  display: block;
  width: 100%;
  border: 0;
  box-shadow: rgba(20, 20, 20, 0.04) 0 0 0 1px inset;
  border-radius: 8px;
  background-color: rgba(20, 20, 20, 0.04);
  letter-spacing: -0.1px;
  line-height: 20px;
  padding: 6px 8px 6px 30px;
}
.search-btn {
  width: 14px;
  height: 14px;
  display: block;
  position: absolute;
  left: 9px;
  top: 9px;
  background: url(./../assets/images/svg/search-grey-icon.svg) center center
    no-repeat;
}
.chat-ppl-list-ext-wrap {
  height: calc(100vh - 164px);
  overflow-y: auto;
}
.chat-ppl-listitem {
  padding: 13px 16px 0;
  position: relative;
  margin-top: -1px;
  cursor: pointer;
  display: flex;
}
.chat-ppl-thumbnail-wrap {
  display: inline-block;
  width: 31px;
  height: 31px;
  margin-right: 7px;
}
.grp-chat-ppl-thumbnail-wrap,
.cc1-grp-chat-win-user-thumb {
  position: relative;
}
.chat-ppl-thumbnail-wrap.grp-chat-ppl-thumbnail-wrap img,
.cc1-chat-win-user-thumb.cc1-grp-chat-win-user-thumb img {
  width: 24px;
  position: absolute;
  display: inline-block;
}
.chat-ppl-thumbnail-wrap.grp-chat-ppl-thumbnail-wrap img:first-child,
.cc1-chat-win-user-thumb.cc1-grp-chat-win-user-thumb img:first-child {
  top: 0;
  left: 0;
}
.chat-ppl-thumbnail-wrap.grp-chat-ppl-thumbnail-wrap img:nth-child(2),
.cc1-chat-win-user-thumb.cc1-grp-chat-win-user-thumb img:nth-child(2) {
  bottom: 0;
  right: 0;
}
.chat-ppl-listitem-dtls {
  display: inline-block;
  flex: 1 1 0;
  padding-bottom: 14px;
  border-bottom: 1px solid #f7f7f7;
}
.chat-ppl-listitem-name {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.1px;
  display: block;
  max-width: 147px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chat-ppl-listitem-txt {
  margin: 0;
  font-size: 13px;
  max-width: 176px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.1px;
  line-height: 20px;
}
.chat-ppl-listitem-time {
  font-size: 12px;
  letter-spacing: -0.1px;
  text-transform: uppercase;
  display: block;
  position: absolute;
  right: 16px;
  top: 15px;
}
.chat-ppl-listitem-pin {
  display: block;
  width: 16px;
  height: 17px;
  background: url(./../assets/images/svg/chat-pin-grey-icon.svg) center center
    no-repeat;
  position: absolute;
  right: 16px;
  top: 33px;
}
.chat-ppl-thumbnail-wrap img,
.cc1-chat-win-user-thumb img {
  display: block;
  border-radius: 18px;
  overflow: hidden;
  width: 36px;
}
.chat-ppl-listitem-msg-cnt {
  display: block;
  font-size: 12px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #39f;
  color: #fff;
  letter-spacing: -0.1px;
  text-align: center;
  font-weight: 600;
  position: absolute;
  right: 16px;
  top: 33px;
}
.ccl-left-panel-footer-wrap {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1;
}
/* .ccl-left-panel-nav-listitem {
  width: 25%;
  float: left;
  text-align: center;
} */
.ccl-left-panel-nav-link {
  display: inherit;
  padding: 32px 20px;
}
.ccl-left-panel-nav-link.people {
  background: url(./../assets/images/svg/people-grey-icon.svg) no-repeat center;
  background-size: 18px 19px;
}
.ccl-left-panel-nav-link.call {
  background: url(./../assets/images/svg/call-grey-icon.svg) no-repeat center;
  background-size: 18px 19px;
}
.ccl-left-panel-nav-link.chat {
  background: url(./../assets/images/svg/chat-grey-icon.svg) no-repeat center;
  background-size: 20px 21px;
}
.ccl-left-panel-nav-link.grp-chat {
  background: url(./../assets/images/svg/group-chat-grey-icon.svg) no-repeat
    center;
  background-size: 20px 21px;
}
.ccl-left-panel-nav-link.more {
  background: url(./../assets/images/svg/more-grey-icon.svg) no-repeat center;
  background-size: 20px 21px;
}
.ccl-left-panel-nav-link.people.active {
  background: url(./../assets/images/svg/people-blue-icon.svg) no-repeat center;
  background-size: 18px 19px;
}
.ccl-left-panel-nav-link.chat.active {
  background: url(./../assets/images/svg/chat-blue-icon.svg) no-repeat center;
  background-size: 20px 21px;
}
.ccl-left-panel-nav-link.grp-chat.active {
  background: url(./../assets/images/svg/group-chat-blue-icon.svg) no-repeat
    center;
  background-size: 20px 21px;
}
.ccl-left-panel-nav-link.more.active {
  background: url(./../assets/images/svg/more-blue-icon.svg) no-repeat center;
  background-size: 20px 21px;
}
.ccl-left-panel-nav-link.call.active {
  background: url(./../assets/images/svg/call-blue-icon.svg) no-repeat center;
  background-size: 18px 19px;
}
.dark-theme {
  background-color: #141414;
  color: #fff;
}
.dark-theme .ccl-secondary-color {
  color: rgba(255, 255, 255, 0.6);
}
.dark-theme .ccl-left-panel-srch {
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: rgba(255, 255, 255, 0.04) 0 0 0 1px inset;
  color: #cccbcb;
}
.dark-theme .search-btn {
  background: url(./../assets/images/svg/search-white-icon.svg) center center
    no-repeat;
}
.dark-theme .ccl-left-panel-srch-wrap {
  border-bottom: none;
}
.dark-theme .chat-ppl-listitem-dtls {
  border-bottom: 1px solid #484848;
}
.dark-theme .ccl-left-panel {
  border-right: 1px solid #484848;
}
.dark-theme .chat-ppl-listitem-pin {
  background: url(./../assets/images/svg/chat-pin-light-grey-icon.svg) center
    center no-repeat;
}
.dark-theme .ccl-left-panel-footer-wrap {
  background-color: #141414;
}
.dark-theme .ccl-left-panel-nav-link.people {
  background: url(./../assets/images/svg/people-light-grey-icon.svg) no-repeat
    center;
}
.dark-theme .ccl-left-panel-nav-link.call {
  background: url(./../assets/images/svg/call-light-grey-icon.svg) no-repeat
    center;
}
.dark-theme .ccl-left-panel-nav-link.chat {
  background: url(./../assets/images/svg/chat-light-grey-icon.svg) no-repeat
    center;
}
.dark-theme .ccl-left-panel-nav-link.grp-chat {
  background: url(./../assets/images/svg/group-chat-light-grey-icon.svg)
    no-repeat center;
}
.dark-theme .ccl-left-panel-nav-link.more {
  background: url(./../assets/images/svg/more-light-grey-icon.svg) no-repeat
    center;
}
.dark-theme .ccl-left-panel-nav-link.people.active {
  background: url(./../assets/images/svg/people-blue-icon.svg) no-repeat center;
  background-size: 18px 19px;
}
.dark-theme .ccl-left-panel-nav-link.chat.active {
  background: url(./../assets/images/svg/chat-blue-icon.svg) no-repeat center;
  background-size: 20px 21px;
}
.dark-theme .ccl-left-panel-nav-link.grp-chat.active {
  background: url(./../assets/images/svg/group-chat-blue-icon.svg) no-repeat
    center;
  background-size: 20px 21px;
}
.dark-theme .ccl-left-panel-nav-link.more.active {
  background: url(./../assets/images/svg/more-blue-icon.svg) no-repeat center;
  background-size: 20px 21px;
}
.dark-theme .ccl-left-panel-nav-link.call.active {
  background: url(./../assets/images/svg/call-blue-icon.svg) no-repeat center;
  background-size: 18px 19px;
}
.dark-theme .ccl-left-panel-nav-link.grp-chat.active {
  background: url(./../assets/images/svg/group-chat-blue-icon.svg) center center /
    20px 21px no-repeat;
}

/* @media (min-width : 320px) and (max-width : 767px) {
  .ccl-left-panel-nav-listitem { width:25%;}
} */
</style>
