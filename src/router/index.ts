import {
  CometChatAddMembers,
  CometChatCallButtons,
  CometChatConversations,
  CometChatConversationsWithMessages,
  CometChatGroupMembers,
  CometChatGroups,
  CometChatGroupsWithMessages,
  CometChatMessages,
  CometChatTheme,
} from "@cometchat/chat-uikit-vue";
import {
  RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatGroupEvents } from "@cometchat/uikit-resources";
import { Utils } from "@/utils/Utils";

const getRouter = () => {
  const routes: Array<RouteRecordRaw> = [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "Login" */ "../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () =>
        import(/* webpackChunkName: "Signup" */ "../views/SignupView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "Home" */ "../views/HomeView.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "chats",
          name: "chats",
          component: () =>
            import(
              /* webpackChunkName: "ContentView" */ "../views/ContentView.vue"
            ),
        },
        {
          path: "messages",
          name: "messages",
          component: () =>
            import(
              /* webpackChunkName: "ContentView" */ "../views/ContentView.vue"
            ),
        },
        {
          path: "users",
          name: "users",
          component: () =>
            import(
              /* webpackChunkName: "ContentView" */ "../views/ContentView.vue"
            ),
        },
        {
          path: "groups",
          name: "groups",
          component: () =>
            import(
              /* webpackChunkName: "ContentView" */ "../views/ContentView.vue"
            ),
        },
        {
          path: "calls",
          name: "calls",
          component: () =>
            import(
              /* webpackChunkName: "ContentView" */ "../views/ContentView.vue"
            ),
        },
        {
          path: "shared",
          name: "shared",
          component: () =>
            import(
              /* webpackChunkName: "ContentView" */ "../views/ContentView.vue"
            ),
        },
      ],
    },
    {
      path: "/conversationwithmessages",
      name: "conversationwithmessages",
      component: () =>
        import(
          /* webpackChunkName: "ContentView" */ "../views/ConversationWithMessagesView.vue"
        ),
      props: (route) => ({ language: route.query.language }),
      meta: { requiresAuth: true },
    },
    {
      path: "/callbuttons",
      name: "callbuttons",
      component: () =>
        import(
          /* webpackChunkName: "ContentView" */ "../views/CallButtonsView.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/groups",
      name: "groupslist",
      component: CometChatGroups,
    },
    {
      path: "/groupmembers",
      name: "groupmembers",
      component: () =>
        import(/* webpackChunkName: "ContentView" */ "../views/GroupsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/addmembers",
      name: "addmembers",
      component: () =>
        import(/* webpackChunkName: "ContentView" */ "../views/GroupsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/creategroup",
      name: "creategroup",
      component: () =>
        import(
          /* webpackChunkName: "Groups" */ "../views/CreateJoinGroupView.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/joingroup",
      name: "joingroup",
      component: () =>
        import(
          /* webpackChunkName: "Groups" */ "../views/CreateJoinGroupView.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/transferownership",
      name: "transferownership",
      component: () =>
        import(
          /* webpackChunkName: "Groups" */ "../views/TransferOwnershipView.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/bannedmembers",
      name: "bannedmembers",
      component: () =>
        import(/* webpackChunkName: "GroupsView" */ "../views/GroupsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/groupsdetails",
      name: "groupsdetails",
      component: () =>
        import(/* webpackChunkName: "Groups" */ "../views/DetailsView.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/usersdetails",
      name: "usersdetails",
      component: () =>
        import(/* webpackChunkName: "Groups" */ "../views/DetailsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/groupswithmessages",
      name: "groupswithmessages",
      component: () =>
        import(/* webpackChunkName: "GroupsView" */ "../views/GroupsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/customconversationwithmessages",
      name: "customconversationwithmessages",
      component: () =>
        import(
          /* webpackChunkName: "ConversationWithMessagesView" */ "../views/ConversationWithMessagesView.vue"
        ),
      props: (route) => ({ language: route.query.language }),
      meta: { requiresAuth: true },
    },
    {
      path: "/localizeconversationwithmessages",
      name: "localizeconversationwithmessages",
      component: () =>
        import(
          /* webpackChunkName: "ConversationWithMessagesView" */ "../views/ConversationWithMessagesView.vue"
        ),
      props: (route) => ({ language: route.query.language }),
      meta: { requiresAuth: true },
    },
    {
      path: "/conversationlist",
      name: "conversationlist",
      component: CometChatConversations,
      meta: { requiresAuth: true },
    },
    {
      path: "/messages",
      name: "message",
      component: () =>
        import(
          /* webpackChunkName: "MessageView" */ "../views/MessageView.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/messageheader",
      name: "messageheader",
      component: () =>
        import(
          /* webpackChunkName: "MessageView" */ "../views/MessageView.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/CometChatMessageList",
      name: "CometChatMessageList",
      component: () =>
        import(
          /* webpackChunkName: "MessageView" */ "../views/MessageView.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/CometChatMessageComposer",
      name: "CometChatMessageComposer",
      component: () =>
        import(
          /* webpackChunkName: "MessageView" */ "../views/MessageView.vue"
        ),
    },
    {
      path: "/CometChatUsers",
      name: "CometChatUsers",
      component: () =>
        import(/* webpackChunkName: "UsersView" */ "../views/UsersView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/userswithmessages",
      name: "CometChatUsersWithMessages",
      component: () =>
        import(/* webpackChunkName: "UsersView" */ "../views/UsersView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/contacts",
      name: "CometChatContacts",
      component: () =>
        import(
          /* webpackChunkName: "UsersView" */ "../views/CometChatContacts.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/messageinformation",
      name: "CometChatMessageInformation",
      component: () =>
        import(
          /* webpackChunkName: "UsersView" */ "../views/MessageInformation.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/userdetails",
      name: "userdetails",
      component: () =>
        import(
          /* webpackChunkName: "DetailsView" */ "../views/DetailsView.vue"
        ),
      meta: { requiresAuth: true },
    },
    {
      path: "/CometChatMessageComposer",
      name: "CometChatMessageComposer",
      component: () =>
        import(
          /* webpackChunkName: "MessageView" */ "../views/MessageView.vue"
        ),
      meta: { requiresAuth: true },
    },

    {
      path: "/conversationlistItem",
      name: "conversationlistItem",
      meta: { requiresAuth: true },
      component: {
        template: `<div style = "height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;"><div style="height: fit-content; width: fit-content;"><CometChatConversations :title="" :conversationsRequestBuilder="conversationsRequestBuilder" :listItemStyle="listItemStyle" :avatarStyle="avatarStyle"></CometChatConversations></div></div>`,
        props: {
          conversationsRequestBuilder: {
            type: Object,
            required: true,
          },
          listItemStyle: {
            type: Object,
            required: true,
          },
          avatarStyle: {
            type: Object,
            required: true,
          },
        },
      },
      props: {
        conversationsRequestBuilder:
          new CometChat.ConversationsRequestBuilder().setLimit(1),
        listItemStyle: {
          border: `2px solid ` + new CometChatTheme({}).palette.getAccent300(),
          height: "50px",
          width: "550px",

          borderRadius: "10px",
          "box-shadow": Utils.theme.palette.getAccent400() + " 0px 0px 3px",
        },
        avatarStyle: {
          height: "35px",
          width: "35px",
        },
      },
    },
  ];

  const router = createRouter({
    history: createWebHashHistory("/"),
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    // Check if the route requires authentication
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Check if the user is logged in
      const isLoggedIn = await CometChat.getLoggedinUser();

      if (isLoggedIn) {
        // User is logged in, allow access to the route
        next();
      } else {
        // User is not logged in, redirect to the login page or any other route
        next("/login");
      }
    } else {
      // Route does not require authentication, proceed as usual
      next();
    }
  });

  return router;
};

export default getRouter;
