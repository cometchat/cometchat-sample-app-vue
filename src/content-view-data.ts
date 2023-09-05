import * as Assets from "./assets";

import { MicIcon } from "@cometchat/chat-uikit-vue";

export default {
  chats: [
    {
      id: "conversations_inner",
      componentName: "CardComponent",

      title: "Conversations",
      description:
        "CometChatConversations is an independent component used to set \
      up a screen that shows the recent conversations alone.",

      imageUrl: Assets.Conversation,
      imageAltText: "Image Unavailable",

      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/conversationlist" });
        };
      },
    },
    {
      id: "conversations_with_messages",
      componentName: "CardComponent",

      title: "Conversations With Messages",
      description:
        "CometChatConversationsWithMessages is an independent component used to set up a  \
        screen that shows the recent conversations and allows you to send a message  \
        to the user or group from the list.",

      imageUrl: Assets.ConversationWithMessages,
      imageAltText: "Image Unavailable",

      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/conversationwithmessages" });
        };
      },
    },
    {
      id: "contacts",
      componentName: "CardComponent",
      title: "Contacts",
      description:
        "CometChatContacts is an independent component used to set up a screen that displays the list of contacts available in your app and gives you the ability to search for a specific contact.",
      imageUrl: Assets.ConversationWithMessages,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/contacts" });
        };
      },
    },
  ],
  groups: [
    {
      id: "groups",
      componentName: "CardComponent",

      title: "Groups",
      description:
        "CometChatGroups is an independent component used to set up a screen that displays the list of groups available in your app and gives you the ability to search for a specific group",

      imageUrl: Assets.Conversation,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/groups" });
        };
      },
    },

    {
      id: "create_group",
      componentName: "CardComponent",

      title: "Create Group",
      description:
        " This component is used to create a new group.Groups can of three types- public, private or password protected. To learn more about this component tap here.",

      imageUrl: Assets.CreateGroup,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/creategroup" });
        };
      },
    },

    {
      id: "groups_with_messages",
      componentName: "CardComponent",

      title: "Groups With Messages",
      description:
        " CometChatGroupsWithMessages is an independent component used to set up a screen that shows the list of groups available in your app and gives you the ability to search for a specific group and to start a conversation.",

      imageUrl: Assets.ConversationWithMessages,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/groupswithmessages" });
        };
      },
    },

    {
      id: "protected_group",
      componentName: "CardComponent",

      title: "Protected Group",
      description:
        "This component is used to join a password protected group. To learn more about this component tap here ",

      imageUrl: Assets.PasswordGroup,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/joingroup" });
        };
      },
    },

    {
      id: "group_members",
      componentName: "CardComponent",

      title: "Group Members",
      description:
        "This component is used to view a members in a group. To learn more about this component tap here",

      imageUrl: Assets.GroupMember,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/groupmembers" });
        };
      },
    },

    {
      id: "add_members",
      componentName: "CardComponent",

      title: "Add Members",
      description:
        "This component is used to add users to a group. To learn more about this component tap here",

      imageUrl: Assets.AddMembers,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/addmembers" });
        };
      },
    },

    {
      id: "transfer_onwership",
      componentName: "CardComponent",

      title: "Transfer Ownership",
      description:
        "This component is used to transfer ownership of a group from one user to another. To learn more about this component tap here",

      imageUrl: Assets.TransferOwnershipIcon,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/transferownership" });
        };
      },
    },

    {
      id: "banned_members",
      componentName: "CardComponent",

      title: "Banned Members",
      description:
        "This component is used to view banned members from group. To learn more about this component tap here",

      imageUrl: Assets.BanMember,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/bannedmembers" });
        };
      },
    },

    {
      id: "details",
      componentName: "CardComponent",

      title: "Details",
      description:
        "CometChatDetails component for a group To learn more about this component tap here",

      imageUrl: Assets.Details,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          router.push({ path: "/groupsdetails" });
        };
      },
    },
  ],
  shared: [
    {
      id: "sound_manager",
      componentName: "CardComponent",

      title: "Sound Manager",
      description:
        "CometChatSoundManager allows you to play different types of audio which is required for incoming and outgoing events in UI Kit.",

      imageUrl: Assets.SoundSmall,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context: any) => {
        return () => {
          context.emit("open-sound-manager", {});
        };
      },
    },
    {
      id: "theme",
      componentName: "CardComponent",

      title: "Theme",
      description:
        "CometChatTheme is a style applied to every component and every view in the activity or component in the UI Kit.",

      imageUrl: Assets.Theme,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context: any) => {
        return () => {
          context.emit("open-theme-manager", {});
        };
      },
    },
    {
      id: "localize",
      componentName: "CardComponent",

      title: "Localize",
      description:
        "CometChatLocalize allows you to detect the language of your users based on their browser or device settings and set the language accordingly.",

      imageUrl: Assets.Localize,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context: any) => {
        return () => {
          context.emit("open-localize-manager", {});
        };
      },
    },
    {
      id: "list_item",
      componentName: "CardComponent",

      title: "List Item",
      description:
        "ListItem displays data on a tile and that tile may contain leading, trailing, title and subtitle widgets.To learn more about this component tap here.",

      imageUrl: Assets.ListItem,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/conversationlistItem" });
        };
      },
    },
    {
      id: "avatar",
      componentName: "CardComponent",

      title: "Avatar",
      description:
        "CometChatAvatar component displays an image or user/group avatar with fallback to the first two letters of the user name/group name.",

      imageUrl: Assets.Avatar,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          context.emit("open-avatar", {});
        };
      },
    },
    {
      id: "status_indicator",
      componentName: "CardComponent",

      title: "Status Indicator",
      description:
        "StatusIndicator component indicates whether a user is online or offline.",

      imageUrl: Assets.StatusIndicator,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          context.emit("open-status-indicator", {});
        };
      },
    },
    {
      id: "badge_count",
      componentName: "CardComponent",

      title: "Badge",
      description:
        "CometChatBadgeCount is a custom component which is used to display the unread message count. It can be used in places like ConversationListItem ,etc.",

      imageUrl: Assets.BadgeCount,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          context.emit("open-badge-count", {});
        };
      },
    },
    {
      id: "message_receipt",
      componentName: "CardComponent",

      title: "Message Receipt",
      description:
        "CometChatReceipt component renders the receipts such as sending, sent, delivered, read and error state indicator of a message.",

      imageUrl: Assets.Receipt,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          context.emit("open-message-receipt", {});
        };
      },
    },
    {
      id: "text_bubble",
      componentName: "CardComponent",

      title: "Text Bubble",
      description:
        "CometChatTextBubble component displays a text message to learn more about this component click here.",

      imageUrl: Assets.TextBubble,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          context.emit("open-text-bubble", {});
        };
      },
    },
    {
      id: "image_bubble",
      componentName: "CardComponent",

      title: "Image Bubble",
      description:
        "CometChatImageBubble component displays a media message containing an image to learn more about this component click here.",

      imageUrl: Assets.ImageBubble,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          context.emit("open-image-bubble", {});
        };
      },
    },
    {
      id: "audio_bubble",
      componentName: "CardComponent",

      title: "Audio Bubble",
      description:
        "CometChatAudioBubble component displays a media message containing an audio to learn more about this component click here",

      imageUrl: Assets.AudioBubble,
      imageAltText: "Audio Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          context.emit("open-audio-bubble", {});
        };
      },
    },
    {
      id: "video_bubble",
      componentName: "CardComponent",

      title: "Video Bubble",
      description:
        "CometChatVideoBubble component displays a media message containing a video to learn more about this component click here",

      imageUrl: Assets.VideoBubble,
      imageAltText: "Video Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          context.emit("open-video-bubble", {});
        };
      },
    },
    {
      id: "file_bubble",
      componentName: "CardComponent",

      title: "File Bubble",
      description:
        "CometChatFileBubble component displays a media message containing an file to learn more about this component click here.",

      imageUrl: Assets.FileBubble,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          context.emit("open-file-bubble", {});
        };
      },
    },
    {
      id: "media_recorder",
      componentName: "CardComponent",
      title: "Media Recorder",
      description:
        "CometChatMediaRecorder component is used to record audio and video messages. To learn more about this component tap here.",
      imageUrl: MicIcon,
      imageAltText: "Image Unavailable",
      onClick: (router: any, context?: any) => {
        return () => {
          context.emit("open-media-recorder", {});
        };
      },
    },
  ],
  messages: [
    {
      id: "messages_inner",
      componentName: "CardComponent",

      title: "Messages",
      description:
        " The CometChatMessages component is an independent component that is used to handle messages for users and groups.",

      imageUrl: Assets.ConversationWithMessages,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/messages" });
        };
      },
    },
    {
      id: "messages",
      componentName: "CardComponent",

      title: "Message Header",
      description:
        "CometChatMessageHeader is an independent component that  displays the User or Group information using SDK's User or Group object.",

      imageUrl: Assets.Conversation,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/messageheader" });
        };
      },
    },
    {
      id: "messages",
      componentName: "CardComponent",

      title: "Message List",
      description:
        "CometChatMessageList displays a list of messages and handles real-time operations.",

      imageUrl: Assets.MessageList,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/CometChatMessageList" });
        };
      },
    },
    {
      id: "messages",
      componentName: "CardComponent",

      title: "Message Composer",
      description:
        "CometChatComposer is an independent and a critical component that allows users to compose and send various types of messages such as text, image, video and custom messages.",

      imageUrl: Assets.MessageComposer,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/CometChatMessageComposer" });
        };
      },
    },
    {
      id: "messages",
      componentName: "CardComponent",
      title: "Message Information",
      description:
        "CometChatMessageInformation component displays the information of a message.",
      imageUrl: Assets.Message,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/messageinformation" });
        };
      },
    },
  ],
  users: [
    {
      id: "users",
      componentName: "CardComponent",

      title: "Users",
      description:
        "CometChatUsers is an independent component used to set up a screen that displays a scrollable list of users available in your app and gives you the ability to search for a specific user.",

      imageUrl: Assets.ConversationWithMessages,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/CometChatUsers" });
        };
      },
    },

    {
      id: "users_with_messages",
      componentName: "CardComponent",

      title: "Users With Messages",
      description:
        "CometChatUsersWithMessages is an independent component used to set up a screen that shows the list of users available in your app and gives you the ability to search for a specific user and to start conversation.",

      imageUrl: Assets.ConversationWithMessages,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/userswithmessages" });
        };
      },
    },

    {
      id: "details",
      componentName: "CardComponent",

      title: "Details",
      description:
        " CometChatDetails component for a user. To learn more about this component tap here. ",

      imageUrl: Assets.Details,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/usersdetails" });
        };
      },
    },
  ],
  calls: [
    {
      id: "call_buttons",
      componentName: "CardComponent",

      title: "Call Buttons",
      description:
        " CometChatCallButtons is an independent component used to initiate 1v1 and direct calling.",

      imageUrl: Assets.ConversationWithMessages,
      imageAltText: "Image Unavailable",
      onClick: (router: any) => {
        return () => {
          router.push({ path: "/callbuttons" });
        };
      },
    },
  ],
};
