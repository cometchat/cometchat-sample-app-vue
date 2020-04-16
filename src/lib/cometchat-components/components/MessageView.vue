<template>
  <div class="cc1-chat-win-conver-wrap"
    id="messageViewWrapr"
    v-on:scroll.passive="handlePreviousMsg($event)">
    <div
      class="clearfix"
      :class="[msg.sender.uid === currentUser.uid ? 'cc1-chat-win-sndr-row' : 'cc1-chat-win-rcvr-row']"
      v-for="(msg, index) in messages"
      :key="index"
    >
      <div
        class="dateSeperatorCongtainer ccl-center"
        v-if="( index===0?printDate(msg.sentAt):printDate(msg.sentAt,messages[index-1].sentAt))"
      >
        <span class="dateSeperator">{{( index===0?printDate(msg.sentAt):printDate(msg.sentAt,messages[index-1].sentAt))}}</span>
      </div>
      <div class="cc1-chat-win-msg-block sender-msg" v-if="msg.sender.uid === currentUser.uid">
        <div class="cc1-chat-win-sndr-msg-wrap">
          <p class="chat-txt-msg" v-if="cometchat.MESSAGE_TYPE.TEXT === msg.type">{{msg.text}}</p>
          <div v-else-if="cometchat.MESSAGE_TYPE.VIDEO === msg.type" class="message-video">
            <video width="100%" height="auto" controls>
              <source :src="msg.data.url" type="audio/mp4" />
            </video>
          </div>
          <div v-else-if="cometchat.MESSAGE_TYPE.AUDIO === msg.type" class="message-audio">
            <audio controls width="100%" height="auto">
              <source :src="msg.data.url" />
            </audio>
          </div>
          <div
            v-else-if="cometchat.MESSAGE_TYPE.MEDIA === msg.type"
            class="message-media"
          >{{ msg.text? "this is text Message": msg.category }}</div>
          <div v-else-if="cometchat.MESSAGE_TYPE.FILE === msg.type" class="message-file">
            <a :href="msg.data.url" target="_blank">File message</a>
          </div>
          <div
            v-else-if="cometchat.MESSAGE_TYPE.CUSTOM === msg.type"
            class="message-text"
          >{{msg.text?"this is text Message":msg.category}}</div>
          <div v-else-if="cometchat.MESSAGE_TYPE.IMAGE == msg.type" class="message-image">
            <img :src="msg.data.url ? msg.data.url : msg.category" />
          </div>
          <div
            v-else
            class="message-text"
          >{{(msg.text?"Something Unknown CometChat can't process":"Something Unknown CometChat can't process")}}</div>
        </div>
        <div class="cc1-chat-win-msg-time-wrap">
          <span class="cc1-chat-win-timestamp">
            {{getDate(msg.sentAt)}}
  
            <span class="cc1-chat-win-tick" v-if="msg.sentAt && ! msg.deliveredAt && !msg.readAt">
              <img style="width: 15px;" src="./../assets/images/single_tick.png" alt="sent" />
            </span>
            <span class="cc1-chat-win-tick" v-if="msg.deliveredAt && !msg.readAt">
              <img style="width: 15px;" src="./../assets/images/double_tick.png" alt="sent" />
            </span>
            <span class="cc1-chat-win-tick" v-if="msg.readAt">
              <img style="width: 15px;" src="./../assets/images/double_tick_blue.png" alt="sent" />
            </span>
          </span>
        </div>
      </div>
      <div class="cc1-chat-win-msg-block reciever-msg" v-if="msg.sender.uid !== currentUser.uid">
        <div class="cc1-chat-win-rcvr-msg-wrap">
          <p class="chat-txt-msg" v-if="cometchat.MESSAGE_TYPE.TEXT === msg.type">{{msg.text}}</p>
          <div v-else-if="cometchat.MESSAGE_TYPE.VIDEO === msg.type" class="message-video">
            <video width="100%" height="auto" controls>
              <source :src="msg.data.url" type="audio/mp4" />
            </video>
          </div>
          <div v-else-if="cometchat.MESSAGE_TYPE.AUDIO === msg.type" class="message-audio">
            <audio controls width="100%" height="auto">
              <source :src="msg.data.url" />
            </audio>
          </div>
          <div
            v-else-if="cometchat.MESSAGE_TYPE.MEDIA === msg.type"
            class="message-media"
          >{{ msg.text? "this is text Message": msg.category }}</div>
          <div v-else-if="cometchat.MESSAGE_TYPE.FILE === msg.type" class="message-file">
            <a :href="msg.data.url" target="_blank">File message</a>
          </div>
          <div
            v-else-if="cometchat.MESSAGE_TYPE.CUSTOM === msg.type"
            class="message-text"
          >{{msg.text?"this is text Message":msg.category}}</div>
          <div v-else-if="cometchat.MESSAGE_TYPE.IMAGE == msg.type" class="message-image">
            <img :src="msg.data.url ? msg.data.url : msg.category" />
          </div>
          <div
            v-else
            class="message-text"
          >{{(msg.text?"Something Unknown CometChat can't process":"Something Unknown CometChat can't process")}}</div>
        </div>

        <div class="cc1-chat-win-msg-time-wrap">
          <span class="cc1-chat-win-timestamp">
            {{getDate(msg.sentAt)}}
            <!-- <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
              <path fill="#4FC3F7" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
            </svg>-->
          </span>
        </div>
      </div>
    </div>

    <Loader v-if="loading" />

  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import Loader from "./Loader";

export default {
  name: "MessageView",
  props:['currentUser'],
  components: {
    Loader
  },
  data() {
    return {
      userData: {},
      messageRequest: [],
      messages: [],
      currentScrollPossition: 0,
      scrollTrigger: false,
      cometchat: CometChat,
      loading: false,
      messageRequestBuilder: function(uType, uid, limit) {
        var messagesRequest = "";
        if (uType == "user") {
          messagesRequest = new CometChat.MessagesRequestBuilder()
            .setUID(uid)
            .setLimit(limit)
            .build();
        } else {
          messagesRequest = new CometChat.MessagesRequestBuilder()
            .setGUID(uid)
            .setLimit(limit)
            .build();
        }

        return messagesRequest;
      },

      attachListener(callback) {
        const listenerID = 'UNIQUE_LISTENER_ID';
        CometChat.addMessageListener( 
            listenerID,
            new CometChat.MessageListener({
                onTextMessageReceived: (textMessage) => {
                    // console.log('Text message received successfully', textMessage);
                    this.checkAndSendToCallBack(textMessage, callback);
                    // Handle text message
                },
                onMediaMessageReceived: (mediaMessage) => {
                    // console.log('Media message received successfully', mediaMessage);
                    // Handle media message
                    this.checkAndSendToCallBack(mediaMessage, callback);
                },
                onCustomMessageReceived: (customMessage) => {

                    // console.log('Custom message received successfully', customMessage);
                    // Handle custom message
                    this.checkAndSendToCallBack(customMessage, callback);
                },
                onMessagesDelivered: messageDelivered => {
                    // console.log('Custom message messageDelivered successfully', messageDelivered);
                    this.checkAndSendToCallBack(messageDelivered, callback, true);
                },
                onMessagesRead: messageRead => {
                    // console.log('Custom message messageRead successfully', messageRead);
                    this.checkAndSendToCallBack(messageRead, callback, true);
                },
                onTypingEnded: typingIndicator => {
                  console.log('typingIndicator', typingIndicator);

                }
            })
        );
    },

    checkAndSendToCallBack(message, callback, isReceipt = false) {
      if (!isReceipt) {
        const msg = message;
        if (msg.getReceiverType() === 'user') {
          if (this.userData.uid === msg.getSender().getUid()) {
            callback(msg);
          }
        } else {
            if (this.userData.guid === msg.getReceiverId()) {
              callback(msg);
            }
        }
      } else {
        const msgReceipt = message;
        if (msgReceipt.getReceiverType() === 'user') {
            if (this.userData.uid === msgReceipt.getSender().getUid()) {
              callback(msgReceipt, true);
            }
        } else {
            if (this.userData.guid === msgReceipt.getReceiver()) {
              callback(msgReceipt, true);
            }
        }
      }
    },

    markMessageAsRead(message) {
      if (!(message.getReadAt() || message.getReadByMeAt())) {
        if (message.getReceiverType() === 'user') {
          CometChat.markAsRead(message.getId().toString(), message.getSender().getUid(), message.getReceiverType());
        } else {
          CometChat.markAsRead(message.getId().toString(), message.getReceiverId(), message.getReceiverType());
        }
      }
    }
    };
  },
  // props:['userData'],
  mounted() {
    this.$root.$on("selectedUser", data => {
        this.messageWindowRefresh(data);
    });

    this.$root.$on("messageSent", msg => {
      console.log("change something");
      this.messages.push(msg);
      this.scrollToBottom();
      // this.checkListner();
      // this.messageScrollWrpr.scrollTop = this.messageScrollWrpr.scrollHeight;
    });

    

  },

  created() {
    this.attachListener((message, isReceipt) => {
      if(!isReceipt){
        // this.messages=[...this.messages,message];


        // const message = message;
      // const currentscrollHeight = this.tref.nativeElement.scrollHeight;

      // this.messages = this.messages.filter((msg) => {
      //   return msg['id'] !== message['id'];
      // });

      this.messages=[...this.messages,message];

      // this.messages.push(message);
      this.markMessageAsRead(message);
      } else {
        // console.log('this is messages objects', this.messages);
        const messageReceipt = message;
        if (messageReceipt.getReceiverType() === 'user') {
          let messages=this.messages.map((msgObject) => {
            if (!msgObject['deliveredAt'] && (messageReceipt.RECEIPT_TYPE.DELIVERY_RECEIPT === messageReceipt.getReceiptType() && messageReceipt.getSender().getUid() === this.userData.uid)) {
              msgObject['deliveredAt'] = parseInt(messageReceipt.getDeliveredAt().toString());
            }
            if (!msgObject['readAt'] && (messageReceipt.RECEIPT_TYPE.READ_RECEIPT === messageReceipt.getReceiptType() && messageReceipt.getSender().getUid() === this.userData.uid)) {
              msgObject['readAt'] = parseInt(messageReceipt.getReadAt().toString());
            }
            return msgObject;
          });
            this.messages=messages;
        } else {
          //TODO update if receiver type is group;
        }
      }

    });
      

  },
  updated: function() {
    this.messageScrollWrpr = document.getElementById("messageViewWrapr");

    // this.scrollToBottom();

    // if (!this.scrollTrigger) {

    this.messageScrollWrpr.scrollTop = this.messageScrollWrpr.scrollHeight;

    setTimeout(() => {
      // this.messageScrollWrpr.scrollTop = this.messageScrollWrpr.scrollHeight - this.currentScrollPossition;
      this.messageScrollWrpr.scrollTop = this.messageScrollWrpr.scrollHeight;
    }, 1000);
    // } else {
    // console.log('call once---77777');

    // //   setTimeout(() => {
    //     this.scrollToBottom();
    // //   }, 500);
    // }
  },
  methods: {
    messageWindowRefresh(data) {
      this.loading = true;
      this.userData = data;
      this.messages = [];
      
      // this.currentHeight = 0;

      if (this.userData && this.userData.uid) {
        this.messageRequest = this.messageRequestBuilder("user", this.userData.uid, 30);

        this.messageRequest.fetchPrevious().then(
          messages => {
            this.messages = [...messages, ...this.messages];
            this.loading = false;            
            this.scrollToBottom();
          },
          err => {
            console.log(err);
          }
        );
      } else if (this.userData && this.userData.guid) {
        this.messageRequest = this.messageRequestBuilder("group", this.userData.guid, 30);

        this.messageRequest.fetchPrevious().then(
          messages => {
            this.messages = [...this.messages, ...messages];
            this.loading = false;
            this.scrollToBottom();

          },
          err => {
            console.log(err);
          }
        );
      }

      // return false;
    },

    getDate(datetime) {
      let date = new Date(datetime * 1000);

      // console.log(date.toLocaleTimeString().split(':'))

      return date.toLocaleTimeString();
      // return date.toLocaleTimeString().split(':')[0] + ':' + date.toLocaleTimeString().split(':')[1] ;

      // var date = new Date(datetime * 1000);
      // var hours = date.getHours();
      // var minutes = date.getMinutes();
      // // var seconds = date.getSeconds();
      // return ("0"+hours).slice(-2) +":"+ ("0"+minutes).slice(-2);
    },

    handlePreviousMsg(event) {
      this.scrollTrigger = true;

      if (event.target.scrollTop === 0 && this.messages.length > 0) {
        this.currentScrollPossition = this.messageScrollWrpr.scrollHeight;
        this.messageRequest.fetchPrevious().then(
          messages => {
            if (messages.length > 0)
              this.messages = [...messages, ...this.messages];
            // console.log(this.messages);
            this.scrollTrigger = false;
          },
          err => {
            console.log(err);
          }
        );
      }
    },

    scrollToBottom() {
      // this.messageScrollWrpr.scrollTop = this.messageScrollWrpr.scrollHeight + this.messageScrollWrpr.offsetHeight;

      // if (!this.scrollTrigger) {
      //     this.messageScrollWrpr.scrollTop = this.messageScrollWrpr.scrollHeight - this.currentScrollPossition;
      // } else {
      
      // }


      setTimeout(() => {
        this.messageScrollWrpr.scrollTop = this.messageScrollWrpr.scrollHeight + this.messageScrollWrpr.offsetHeight;
      },100)


    },

    printDate(time1, time2) {
      if (time2) {
        if (new Date(time1 * 1000).getDate() - new Date(time2 * 1000).getDate()) {
          return new Date(time1 * 1000).toLocaleDateString();
        }
      } else {
        return new Date(time1 * 1000).toLocaleDateString();
      }
      return undefined;
    },

    checkListner() {
      if (this.userData && this.userData.uid) {
        this.group = undefined;
        this.refreshMessageList = '';
        this.messages = [];
        // console.log('message list component is getting called+++');
      } else if (this.userData && this.userData.guid) {
        this.user = undefined;
        this.refreshMessageList = '';
        this.messages = [];
      } else {
        return;
      } 
      
    }
  }
};
</script>

<style scoped>
.sender-msg .cc1-chat-win-msg-time-wrap {
  text-align: right;
}

.ccl-center {
  text-align: center;
  margin: 10px 0;
}

.dateSeperator {
  background-color: rgba(210, 213, 215, 0.92);
  border-radius: 7.5px;
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
  padding: 5px 12px 6px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(206, 165, 165, 0.4);
  display: inline-block;
}

.message-file a {
  text-decoration: underline;
}

audio {
  max-width: 100%;
}

</style>
