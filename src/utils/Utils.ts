import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatTheme } from "@cometchat/uikit-resources";
import { ref } from "vue";

export class Utils {
  static groupForMessages: CometChat.Group;
  static theme: CometChatTheme;
}
