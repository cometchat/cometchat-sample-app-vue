<template>
  <div style="display: flex; height: 100%">
    <OptionsListComponent
      :style="{ height: '100%', width: '400px' }"
      :cardsList="cardsList"
    >
    </OptionsListComponent>
    <div class="cc-main-content" :style="computedMainContentStyles">
      <div style="display: flex; flex-direction: row">
        <template v-if="pathRef">
          <h4 :style="computedStyles.pathRefHeaderStyle">UI Components</h4>
          <div :style="computedStyles.sideArrowStyle"></div>

          <h4 :style="computedStyles.pathRefHeaderStyle">{{ pathRef }}</h4>
        </template>
        <div
          @click="switchTheme"
          :style="computedStyles.switchThemeStyle"
        ></div>
        <div @click="logout" :style="computedStyles.logOutStyle"></div>
      </div>
      <router-view
        @open-sound-manager="toggleSoundManagerVisibility()"
        @open-theme-manager="toggleThemeManagerVisibility()"
        @open-localize-manager="toggleLocalizeManagerVisibility()"
        @open-avatar="toggleAvatarVisibility()"
        @open-status-indicator="toggleStatusIndicatorVisibility()"
        @open-badge-count="toggleBadgeCountVisibility()"
        @open-message-receipt="toggleMessageReceiptVisibility()"
        @open-text-bubble="toggleTextBubbleVisibility()"
        @open-image-bubble="toggleImageBubbleVisibility()"
        @open-audio-bubble="toggleAudioBubbleVisibility()"
        @open-video-bubble="toggleVideoBubbleVisibility()"
        @open-file-bubble="toggleFileBubbleVisibility()"
        @open-media-recorder="toggleMediaRecorderVisibility()"
      ></router-view>
      <CometChatSoundManager
        @close-sound-manager="toggleSoundManagerVisibility()"
        v-if="showSoundManager"
      ></CometChatSoundManager>
      <CometChatThemeManager
        @close-theme-manager="toggleThemeManagerVisibility()"
        v-if="showThemeManager"
      ></CometChatThemeManager>
      <CometChatLocalizeManager
        @close-localize-manager="toggleLocalizeManagerVisibility()"
        v-if="showLocalizeManager"
      ></CometChatLocalizeManager>
      <Avatar
        @close-avatar="toggleAvatarVisibility()"
        v-if="showAvatar"
      ></Avatar>
      <StatusIndicator
        @close-status-indicator="toggleStatusIndicatorVisibility()"
        v-if="showStatusIndicator"
      ></StatusIndicator>
      <BadgeCount
        @close-badge-count="toggleBadgeCountVisibility()"
        v-if="showBadgeCount"
      ></BadgeCount>
      <MessageReceipt
        @close-message-receipt="toggleMessageReceiptVisibility()"
        v-if="showMessageReceipt"
      ></MessageReceipt>
      <TextBubble
        @close-text-bubble="toggleTextBubbleVisibility()"
        v-if="showTextBubble"
      ></TextBubble>
      <ImageBubble
        @close-image-bubble="toggleImageBubbleVisibility()"
        v-if="showImageBubble"
      ></ImageBubble>
      <VideoBubble
        @close-Video-bubble="toggleVideoBubbleVisibility()"
        v-if="showVideoBubble"
      ></VideoBubble>
      <AudioBubble
        @close-Audio-bubble="toggleAudioBubbleVisibility()"
        v-if="showAudioBubble"
      ></AudioBubble>
      <FileBubble
        @close-File-bubble="toggleFileBubbleVisibility()"
        v-if="showFileBubble"
      ></FileBubble>
      <MediaRecorder
        @close-media-recorder="toggleMediaRecorderVisibility()"
        v-if="showMediaRecorder"
      ></MediaRecorder>
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { CometChat } from "@cometchat/chat-sdk-javascript";
import {
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  onBeforeUpdate,
  ref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import CardComponent from "../Card/index.vue";
import * as Assets from "../assets";
import { States } from "@cometchat/chat-uikit-vue";
import OptionsListComponent from "../OptionsList/index.vue";
import CometChatSoundManager from "../CometChatSoundManager/index.vue";
import CometChatThemeManager from "../CometChatThemeManager/index.vue";
import CometChatLocalizeManager from "../CometChatLocalize/index.vue";
import Avatar from "../Avatar/index.vue";
import StatusIndicator from "../StatusIndicator/index.vue";
import BadgeCount from "../BadgeCount/index.vue";
import MessageReceipt from "../MessageReceipt/index.vue";
import TextBubble from "../TextBubble/index.vue";
import ImageBubble from "../ImageBubble/index.vue";
import VideoBubble from "../VideoBubble/index.vue";
import AudioBubble from "../AudioBubble/index.vue";
import FileBubble from "../FileBubble/index.vue";
import MediaRecorder from "../MediaRecorder/index.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    OptionsListComponent,
    CometChatSoundManager,
    CometChatThemeManager,
    CometChatLocalizeManager,
    Avatar,
    StatusIndicator,
    BadgeCount,
    MessageReceipt,
    TextBubble,
    ImageBubble,
    VideoBubble,
    AudioBubble,
    FileBubble,
    MediaRecorder,
  },
  props: {},
  setup(props) {
    let pathRef: any = ref(null);

    const { theme, switchThemeMode }: any = inject("theme");

    let logOutIcon = Assets.PowerSettingsNew;
    const router = useRouter();
    const route = useRoute();
    const matchedRecords: any = ref([]);

    let themeMode = ref(theme.value.palette.mode);
    let showSoundManager = ref(false);
    let showThemeManager = ref(false);
    let showLocalizeManager = ref(false);
    let showAvatar = ref(false);
    let showStatusIndicator = ref(false);
    let showBadgeCount = ref(false);
    let showMessageReceipt = ref(false);
    let showTextBubble = ref(false);
    let showImageBubble = ref(false);
    let showAudioBubble = ref(false);
    let showVideoBubble = ref(false);
    let showFileBubble = ref(false);
    let showMediaRecorder = ref(false);

    const getThemeMode = () => {
      return theme.value.palette.mode;
    };

    onBeforeMount(() => {
      if (route.name != "home") {
        pathRef.value = (route.name as string) + "-module";
      }
    });

    const computedMainContentStyles: any = computed(() => {
      let backgroundColor = theme.value.palette.mode
        ? theme.value.palette.getBackground()
        : "";
      return {
        height: "100%",
        width: "1340px",
        display: "inline-flex",
        overflowY: "scroll",
        overflowX: "hidden",
        flexDirection: "column",
        backgroundColor,
      };
    });

    onBeforeUpdate(() => {
      console.log("ON BEFORE UPATE REACTIVE: ", theme);
    });

    // Update matchedRecords and hasContent when navigating to a new route
    router.beforeEach((to, from) => {
      matchedRecords.value = to.matched;
      pathRef.value = matchedRecords.value.length < 2 ? null : pathRef.value;
      return true;
    });

    let cardsList = [
      {
        id: "chats",
        componentName: "CardComponent",

        title: "Chats",
        description:
          "Conversations module helps you to list the recent conversations between your users and groups. To learn more about its components click here.",

        onClick: () => {
          pathRef.value = "chats-module";
          router.push({ path: "/home/chats" });
        },
      },

      {
        id: "calls",
        componentName: "CardComponent",

        title: "Calls",
        description:
          "Calls module helps you to list the recent calls between your users and groups. To learn more about its components click here.",

        onClick: () => {
          pathRef.value = "calls-module";
          router.push({ path: "/home/calls" });
        },
      },
      {
        id: "messages",
        componentName: "CardComponent",

        title: "Messages",
        description:
          "Messages module helps you to send and receive in a conversation between a user or group. To learn more about its components click here.",

        onClick: () => {
          pathRef.value = "messages-module";
          router.push({ path: "/home/messages" });
        },
      },

      {
        id: "users",
        componentName: "CardComponent",

        title: "Users",
        description:
          "Users module helps you list all the users available in your app. To learn more about its components click here.",

        onClick: () => {
          pathRef.value = "users-module";
          router.push({ path: "/home/users" });
        },
      },

      {
        id: "groups",
        componentName: "CardComponent",

        title: "Groups",
        description:
          "Groups module helps you list all the groups you are part of in your app. To learn more about its components click here.",

        onClick: () => {
          pathRef.value = "groups-module";
          router.push({ path: "/home/groups" });
        },
      },

      {
        id: "shared",
        componentName: "CardComponent",

        title: "Shared",
        description:
          "Shared module contains several reusable components that are divided into Primary, Secondary and SDK derived components. To learn more about these components click here.",

        onClick: () => {
          pathRef.value = "shared-module";
          router.push({ path: "/home/shared" });
        },
      },
    ];

    const logout = async () => {
      await CometChat.logout()
        .then(() => {
          router.push({ path: "/" });
        })
        .catch(() => {
          console.log("User Logout Error");
        });
    };

    const switchTheme = () => {
      switchThemeMode();
    };

    const listItemView = (item: any): ViewType => {
      return {
        componentName: item.componentName || "CardComponent",
        props: {
          title: item.title,
          description: item.description,

          imageUrl: item.imageUrl,
          imageAltText: item.imageAltText,
        },
      };
    };

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode
        ? {
            pathRefHeaderStyle: {
              color: theme.value.palette.getAccent(),
            },
            sideArrowStyle: {
              WebkitMask: `url(${Assets.SideArrowSvg})  center center no-repeat`,
              background: theme.value.palette.getAccent(),
              height: "20px",
              width: "20px",
              top: "21px",
              position: "relative",
            },
            logOutStyle: {
              WebkitMask: `url(${Assets.PowerSettingsNew})  center center no-repeat`,
              background: theme.value.palette.getAccent(),
              height: "30px",
              width: "30px",
              top: "21px",
              position: "fixed",
              left: "95%",
            },
            switchThemeStyle: {
              WebkitMask: `url(${Assets.SwitchMode})  center center no-repeat`,
              background: theme.value.palette.getAccent(),
              height: "28px",
              width: "28px",
              top: "23px",
              position: "fixed",
              left: "92%",
            },
          }
        : {};
    });

    const toggleSoundManagerVisibility = () => {
      showSoundManager.value = !showSoundManager.value;
    };
    const toggleThemeManagerVisibility = () => {
      showThemeManager.value = !showThemeManager.value;
    };
    const toggleLocalizeManagerVisibility = () => {
      showLocalizeManager.value = !showLocalizeManager.value;
    };
    const toggleAvatarVisibility = () => {
      showAvatar.value = !showAvatar.value;
    };
    const toggleStatusIndicatorVisibility = () => {
      showStatusIndicator.value = !showStatusIndicator.value;
    };
    const toggleBadgeCountVisibility = () => {
      showBadgeCount.value = !showBadgeCount.value;
    };
    const toggleMessageReceiptVisibility = () => {
      showMessageReceipt.value = !showMessageReceipt.value;
    };
    const toggleTextBubbleVisibility = () => {
      showTextBubble.value = !showTextBubble.value;
    };
    const toggleImageBubbleVisibility = () => {
      showImageBubble.value = !showImageBubble.value;
    };
    const toggleAudioBubbleVisibility = () => {
      showAudioBubble.value = !showAudioBubble.value;
    };
    const toggleVideoBubbleVisibility = () => {
      showVideoBubble.value = !showVideoBubble.value;
    };
    const toggleFileBubbleVisibility = () => {
      showFileBubble.value = !showFileBubble.value;
    };
    const toggleMediaRecorderVisibility = () => {
      showMediaRecorder.value = !showMediaRecorder.value;
    };

    return {
      logout,
      cardsList,
      listItemView,
      States,
      Assets,
      logOutIcon,
      pathRef,
      switchTheme,
      themeMode,
      theme,
      getThemeMode,
      computedMainContentStyles,
      showSoundManager,
      toggleSoundManagerVisibility,
      showThemeManager,
      toggleThemeManagerVisibility,
      showLocalizeManager,
      toggleLocalizeManagerVisibility,
      showAvatar,
      toggleAvatarVisibility,
      showStatusIndicator,
      toggleStatusIndicatorVisibility,
      showBadgeCount,
      toggleBadgeCountVisibility,
      showMessageReceipt,
      toggleMessageReceiptVisibility,
      showTextBubble,
      toggleTextBubbleVisibility,
      showImageBubble,
      toggleImageBubbleVisibility,
      showAudioBubble,
      toggleAudioBubbleVisibility,
      showVideoBubble,
      toggleVideoBubbleVisibility,
      showFileBubble,
      toggleFileBubbleVisibility,
      showMediaRecorder,
      toggleMediaRecorderVisibility,
      computedStyles,
    };
  },
});
</script>
<style scoped>
.home {
  height: 100%;
}

.innerView {
  position: relative;
  justify-content: center;
  display: flex;
}

.cc-list__list::-webkit-scrollbar {
  background: transparent;
  width: 8px;
}
.cc-list__list::-webkit-scrollbar-thumb {
  background: rgb(232, 229, 229);
  border-radius: 8px;
}
.cc-main-content::-webkit-scrollbar {
  background: transparent;
  width: 8px;
}
.cc-main-content::-webkit-scrollbar-thumb {
  background: rgb(232, 229, 229);
  border-radius: 8px;
}
</style>
