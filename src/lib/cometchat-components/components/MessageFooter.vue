<template>
    <div class="cc1-chat-win-inpt-ext-wrap">
      <div class="cc1-chat-win-inpt-int-wrap" v-if="user.uid || group.guid" >
        <div class="cc1-chat-win-inpt-attach">
          <a href="javascript:;" v-for="(item, index) in listItems" :key="index" v-on:click="onItemClick($event,item)" :title="item.title">
            <img :src="require('./../assets/images/svg/' + item.icon)" alt="..." />
          </a>
          <input @change="onMediInputChange($event)" id="image-input"
          accept="image/*" type='file' name="name" style="display: none;" />
          <input id="video-input" @change="onMediInputChange($event)"
            accept="video/*" type='file' name="name" style="display: none;" />
          <input id="file-input" @change="onMediInputChange($event)" type='file'
            name="name" style="display: none;" />
          <input id="audio-input" type='file' accept="audio/*"
            @change="onMediInputChange($event)" name="name" style="display: none;" /> 
        </div>


        <!--START-->
        <div v-if="filesInput||imageInput||audioInput||videoInput" class="cometchat-image-viewer-container">
          <div class="media-wrap-container">
            <img v-if="imageInput" :src="imageInput" class="cometchat-image-viewer-image">
            <audio controls v-else-if="audioInput" class="cometchat-image-viewer-image">
              <source :src="audioInput">
            </audio>
            <video controls v-else-if=videoInput class="cometchat-image-viewer-image">
              <source :src="videoInput">
            </video>
            <div class="media-desc-container" v-if="fileName || fileSize">
              <div v-if="fileName" class="file-desc">{{fileName}}</div>
              <div v-if="fileSize" class="file-desc">{{fileSize}}</div>
            </div>
            <a href="javascript:;" v-on:click="sendImageMessage($event)" class="media-send-button">Send File</a>
          </div>
        </div>
        <!--END-->



        <!-- msg composer -->
        <div class="cc1-chat-win-inpt-wrap">
          <input
            autocomplete="off"
            name="chatMsg"
            class="cc1-chat-win-inpt-box font-15"
            id="chatMsg"
            placeholder="Type Message"
            type="text"
            v-on:keydown="onchangeDetect($event)"            
          />
          <input id="smileButton" type="button" class="smile-button" />
        </div>


        <div class="cc1-chat-win-inpt-send">
          <a href="javascript:void(0);" class="cc1-chat-win-inpt-send-btn" style="display:none;">
            <img src="./../assets/images/svg/send-blue-icon.svg" />
          </a>
          <a href="javascript:void(0);" class="cc1-chat-win-inpt-voice-btn">
            <img src="./../assets/images/svg/voice-record-frey-icon.svg" />
          </a>
        </div>
      </div>
    </div>
</template>

<script>
import { CometChat } from '@cometchat-pro/chat';

export default {
    name: "MessageFooter",
    data() {
      return {
        inputmessage: '',
        user: '',
        group: '',
        // currentUser: '',
        listItems: [{ title: 'Image', id: 'image', icon: 'image_icon.svg' }, { title: 'File', id: 'file', icon: 'attach_file_icon.svg'}, { title: 'Audio', id: 'audio', icon: 'audiotrack_icon.svg'}, { title: 'Video', id: 'video', icon: 'video_icon.svg' }, { title: 'Location', id: 'location', icon: 'location_on_icon.svg'}],
        filesInput: null,
        imageInput: null,
        audioInput: null,
        videoInput: null,
        updatedMessagesList: ''

      }
    },
    mounted() {
      this.$root.$on("selectedUser", data => {
        this.currentUser = data;
          if(data.uid) {
            this.user = data;
          } else if(data.guid) {
            this.group = data;
          }
      });
    },
    methods: {
      onchangeDetect(ev) {
        // console.log(ev.target.value);

        if (ev.keyCode === 13 && ev.shiftKey) {
          console.log(' I am shift enter', ev.srcElement.innerText);
        } else if (ev.keyCode === 13) {
          ev.preventDefault();
          let receiverID;

          let receiverType;
          if (this.group) {
            receiverID = this.group.guid;
            receiverType = CometChat.RECEIVER_TYPE.GROUP;
          } else {
            receiverID = this.user.uid;
            receiverType = CometChat.RECEIVER_TYPE.USER;
          }
          const messageText = ev.target.value.toString();

          const textMessage = new CometChat.TextMessage(
            receiverID,
            messageText,
            receiverType
          );
           ev.target.value = '';
          CometChat.sendMessage(textMessage).then(
            (message) => {
              // console.log('Message sent successfully:', message);
              if (this.onMessageSent) {
                this.onMessageSent(message);
              }
              // if (this.onAction) {
              //   this.onAction('message_sent', message);
              // }

              // this.$root.$emit('messageSent', message);


            },
            error => {
              console.log('Message sending failed with error:', error);
            }
          );
          return false;
        }






      },

      onItemClick(event, item) {
        console.log('item clicked here on conversation page==',event, item);
        this.inputType = item.id;
        switch (item.id) {
          case 'file': {
            document.getElementById('file-input').click();
            break;
          }
          case 'image': {
            document.getElementById('image-input').click();
            break;
          }
          case 'video': {
            document.getElementById('video-input').click();
            break;
          }
          case 'audio': {
            document.getElementById('audio-input').click();
            break;
          }
          case 'location': {
            document.getElementById('file-input').click();
            break;
          }
        }

      },

      onMediInputChange(event) {
        console.log('file ', event);

        const reader = new FileReader();

        reader.onload = (e) => {
          switch (event.target.id) {
            case 'video-input': {
              this.videoInput = e.target.result;
              break;
            }
            case 'image-input': {
              this.imageInput = e.target.result;
              break;
            }
            case 'audio-input': {
              this.audioInput = e.target.result;
              break;
            }
            case 'file-input': {
              // this.filesInput = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
              this.filesInput = e.target.result;
              break;
            }
          }

        };

        console.log(this.fileName = event.target.files[0]);
        this.fileName = event.target.files[0].name;
        this.fileSize = event.target.files[0].size / 1000 + 'kb';
        reader.readAsDataURL(event.target.files[0]);

      },



      sendImageMessage(event) {
        console.log('done event', event);

        let input;
        let messageType;
        let receiverID;
        let receiverType;

        if (this.imageInput) {
          input = document.getElementById('image-input');
          messageType = CometChat.MESSAGE_TYPE.IMAGE;
        } else if (this.filesInput) {
          input = document.getElementById('file-input');
          messageType = CometChat.MESSAGE_TYPE.FILE;
        } else if (this.audioInput) {
          messageType = CometChat.MESSAGE_TYPE.AUDIO;
          input = document.getElementById('audio-input');
        } else if (this.videoInput) {
          messageType = CometChat.MESSAGE_TYPE.VIDEO;
          input = document.getElementById('video-input');
        }
        // input = document.getElementById('image-input');
        

        if (this.user) {
          receiverID = this.user.uid;
          receiverType = CometChat.RECEIVER_TYPE.USER;

        }

        else if (this.group) {
          receiverID = this.group.guid;
          receiverType = CometChat.RECEIVER_TYPE.GROUP;
        }

        const mediaMessage = new CometChat.MediaMessage(
          receiverID,
          input.files[0],
          messageType,
          receiverType
        );

        console.log(mediaMessage);

        CometChat.sendMediaMessage(mediaMessage).then(
          message => {
            console.log('Media message sent successfully', message);
            this.onMessageSent(message);            
            input.value = null;
            this.imageInput = undefined;
            this.audioInput = undefined;
            this.filesInput = undefined;
            this.videoInput = undefined;
            this.showOptionMenu = false;

          },
          error => {
            console.log('Media message sending failed with error', error);
            // Handle exception.
          }
        );
      },


      onMessageSent(message) {
        // this.updatedMessagesList = JSON.stringify([message]);
        // console.log('sent msg call', this.updatedMessagesList);
        this.$root.$emit('messageSent', message);

      }



      


    }
}
</script>
<style scoped>
.cc1-chat-win-inpt-attach {
  width: 300px;
}
.cometchat-image-viewer-container {
  z-index: 3;
  /* display: none; */
  padding-top: 100px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}
.media-wrap-container {
  text-align: center;
  max-width: 30%;
  margin: 0 auto;
  position: relative;
  animation: animatetop 0.4s;
  /* box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19); */
  /* background-color: #fff; */
}

.media-wrap-container img {
  max-width: 100%;
  margin: 0 auto;
}

.media-send-button{
  background-color: #0008ff;
  color: #fff;
  display: inline-block;
  padding: 10px 15px;
  margin: 34px auto 5px;
}

/* .file-desc {
  text-align: center;
  color: #fff;
} */

.media-desc-container {
  /* background-color: #fff; */
  color: #fff;
}

@media (min-width : 320px) and (max-width : 767px) {
  .cc1-chat-win-inpt-attach {
    width: 150px;
  }
}

</style>