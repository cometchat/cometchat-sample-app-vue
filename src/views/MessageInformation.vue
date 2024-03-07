<template>
  <cometchat-backdrop>
    <CometChatMessageInformation
      :message="getStaticMessage()"
      :template="getTextTemplate()"
      :message-information-style="getMessageInformationStyle()"
    ></CometChatMessageInformation>
  </cometchat-backdrop>
</template>
<script lang="ts">
import { defineComponent, inject, onBeforeUnmount } from "vue";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import {
  CometChatMessageInformation,
  CometChatLocalize,
  CometChatUIKit,
} from "@cometchat/chat-uikit-vue";

export default defineComponent({
  name: "ChatsView",
  components: { CometChatMessageInformation },
  props: {
    language: {
      type: String,
    },
  },
  setup() {
    let { theme }: any = inject("theme");
    let isMobileView =
      inject<{ isMobileView: boolean }>("isMobileView")?.isMobileView ?? false;

    onBeforeUnmount(() => {
      CometChatLocalize.init("en");
    });

    function getStaticMessage() {
      const receiverGUID = "group1";
      const messageText = "Hey Jack, I am fine. How about you?";

      const textMessage = new CometChat.TextMessage(
        receiverGUID,
        messageText,
        CometChat.RECEIVER_TYPE.GROUP
      );
      textMessage.setId(1);

      return textMessage;
    }

    // Function to return text object template from getDataSource
    function getTextTemplate() {
      return CometChatUIKit.getDataSource().getTextMessageTemplate(theme.value);
    }

    // Function to return message information style
    function getMessageInformationStyle() {
      return {
        height: "600px",
        width: "500px",
      };
    }

    return {
      isMobileView,
      getStaticMessage,
      getTextTemplate,
      getMessageInformationStyle,
    };
  },
});
</script>
