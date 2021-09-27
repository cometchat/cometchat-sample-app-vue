import {
  CometChatUI,
  CometChatUserList,
  CometChatGroupList,
  CometChatConversationList,
  CometChatUserListWithMessages,
  CometChatGroupListWithMessages,
  CometChatConversationListWithMessages,
} from "../cometchat-pro-vue-ui-kit/CometChatWorkspace/src";
import { AppHome, AppNavigation } from "../components/";

const routes = [
  { path: "/", component: AppHome },
  { path: "/menu", component: AppNavigation },
  { path: "/embedded-app", component: CometChatUI },

  {
    path: "/conversations",
    component: CometChatConversationListWithMessages,
  },
  { path: "/users", component: CometChatUserListWithMessages },
  { path: "/groups", component: CometChatGroupListWithMessages },

  { path: "/conversation-list", component: CometChatConversationList },
  { path: "/user-list", component: CometChatUserList },
  { path: "/group-list", component: CometChatGroupList },
];

export default routes;
