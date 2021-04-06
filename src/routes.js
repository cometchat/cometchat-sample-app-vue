import {
  CometChatUI,
  CometChatUserList,
  CometChatGroupList,
  CometChatConversationList,
  CometChatUserListWithMessages,
  CometChatGroupListWithMessages,
  CometChatConversationListWithMessages,
} from "./cometchat-pro-vue-ui-kit/";

import { AppHome, AppNavigation } from "./components/";

const routes = [
  { path: "/", component: AppHome },
  { path: "/menu", component: AppNavigation },
  { path: "/embedded-app", component: CometChatUI },

  {
    path: "/conversation-screen",
    component: CometChatConversationListWithMessages,
  },
  { path: "/user-screen", component: CometChatUserListWithMessages },
  { path: "/group-screen", component: CometChatGroupListWithMessages },

  { path: "/conversation-list", component: CometChatConversationList },
  { path: "/user-list", component: CometChatUserList },
  { path: "/group-list", component: CometChatGroupList },
];

export default routes;
