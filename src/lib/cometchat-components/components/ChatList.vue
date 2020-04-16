<template>
<div>
  <div class="chat-ppl-list-ext-wrap scroll-container" @scroll="handleChatScroll($event)" >
    <div class="chat-ppl-list-wrap" v-for="(chatRow, index) in chatList" :key="index">
      <div class="chat-ppl-listitem clearfix" v-on:click="currentUser(chatRow, index)">
        <Avatar :item="chatRow.conversationWith" />
        <div class="chat-ppl-listitem-dtls">
          <span class="chat-ppl-listitem-name">{{chatRow.conversationWith.name}}</span>
          <p class="chat-ppl-listitem-txt ccl-secondary-color" v-if="chatRow.lastMessage">{{chatRow.lastMessage.data.text}}</p>
          <p class="chat-ppl-listitem-space" v-else-if="!chatRow.lastMessage" > &nbsp; </p>
        </div>
        <span class="chat-ppl-listitem-msg-cnt" v-if="chatRow.unreadMessageCount > 0">{{chatRow.unreadMessageCount}}</span>
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
  name: "ChatList",
  components: {
    Avatar
  },
  data() {
    return {
      chatList: [],
      chatRequest: '',
      messageToDisplay: '',
      callChatList(searchKey) {
        if (searchKey) {
          this.chatRequest = new CometChat.ConversationsRequestBuilder().setLimit(30).setSearchKeyword(searchKey).build();
        } else {
          this.chatRequest = new CometChat.ConversationsRequestBuilder().setLimit(30).build();
        }
        return this.chatRequest;
      },
      
      chatFetchNext() {
        return this.chatRequest.fetchNext();
      },

    }
  },
  methods: {
    currentUser(data, index) {
      this.$root.$emit('selectedUser', data.conversationWith);
      this.chatList[index].unreadMessageCount = 0;
    },

    getChatList(data) {
      this.callChatList(data).fetchNext().then(chat => {
        this.chatList = [...this.chatList, ...chat]
      },
      error => {
        console.log(error);
      })
    },

    handleChatScroll(element) {
      if ((element.target.offsetHeight + element.target.scrollTop) >= (element.target.scrollHeight - 20)) {
        this.chatFetchNext().then((chat) => {
          this.chatList = [...this.chatList, ...chat];
        }, error => {
          console.log(error)
        });
      }
    },

    onSearchChange(event){
      this.chatList = [];
      if (this.searchStarted) {
        clearTimeout(this.searchStarted);
      }
      if (event.target.value.trim() !== STRING_CONSTS.STRING_MESSAGES.EMPTY_STRING) {
        this.searchStarted = setTimeout(() => {
        this.messageToDisplay = STRING_CONSTS.STRING_MESSAGES.SEARCH_LOADING;
        this.getChatList(event.target.value);
        }, 400);
      } else if (event.target.value.trim() === STRING_CONSTS.STRING_MESSAGES.EMPTY_STRING && event.data === null) {
        event.target.value = STRING_CONSTS.STRING_MESSAGES.EMPTY_STRING;
        this.searchStarted = setTimeout(() => {
          this.getChatList();
        }, 400);
      } else if (event.target.value.trim() === STRING_CONSTS.STRING_MESSAGES.EMPTY_STRING && event.data === STRING_CONSTS.STRING_MESSAGES.SINGLE_SPACE) {
          event.target.value = STRING_CONSTS.STRING_MESSAGES.EMPTY_STRING;
      }
    },
  },
  created() {
    this.getChatList();
  }
};
</script>
<style scoped>
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
.chat-ppl-listitem-space {
  height: 20px;
  margin: 0;
  padding: 0;
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
.chat-ppl-listitem-more {
  display: block;
  width: 16px;
  height: 17px;
  background: url(./../assets/images/svg/more-grey-icon.svg) center center /
    16px 17px no-repeat;
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
  /* top: 33px; */
}

.chat-ppl-more-opts-tt {
  position: absolute;
  width: 130px;
  box-shadow: rgba(20, 20, 20, 0.12) 0 4px 8px, rgba(20, 20, 20, 0.08) 0 0 0 1px;
  border-radius: 8px;
  background-color: #fff;
  z-index: 1;
  right: -106px;
  bottom: -133px;
  padding: 10px 0;
  display: none;
}
.chat-ppl-more-opt-link {
  display: block;
  padding: 6px 16px;
}
.chat-ppl-more-opts-break {
  display: block;
  width: 98px;
  height: 1px;
  background-color: rgba(20, 20, 20, 0.1);
  margin: 10px auto;
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
</style>