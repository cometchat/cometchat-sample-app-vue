<template>
  <div class="avatar__backdrop"></div>
  <div class="avatar__container" :style="computedStyles.wrapperStyle()">
    <div class="header">
      <span class="header_title" :style="computedStyles.titleStyle()"
        >Avatar</span
      >
      <div
        class="close__icon"
        :style="computedStyles.closeIconStyle()"
        @click="onClose()"
      ></div>
    </div>
    <div class="description" :style="computedStyles.cardDescriptionStyle()">
      CometChatAvatar component displays an image or user/group avatar with
      fallback to the first two letters of the user name/group name.
    </div>
    <div class="avatar" v-if="activeTab == 'Image'">
      <cometchat-avatar :image="image" :avatarStyle="avatarStyle">
      </cometchat-avatar>
    </div>
    <div class="avatar" v-if="activeTab == 'Name'">
      <cometchat-avatar :name="name" :avatarStyle="avatarStyle">
      </cometchat-avatar>
    </div>

    <div class="footer">
      <input
        @input="updateBorderRadius"
        type="text"
        placeholder="Border Radius"
        v-model="borderRadius"
        :style="computedStyles.inputStyle()"
      />

      <div class="switch__button">
        <span class="mode__title" :style="computedStyles.modeTitleStyle()">
          {{ activeTab }}
        </span>
        <div class="tabs__container">
          <ul class="tab__list" :style="computedStyles.tabListStyle()">
            <li
              class="tab"
              @click="setActiveTab('Image')"
              @mouseenter="handleMouseHover('Image', $event)"
              @mouseleave="handleMouseHover('Image', $event)"
              :style="computedStyles.modeStyle('Image')"
            >
              Image
            </li>
            <li
              class="tab"
              @click="setActiveTab('Name')"
              @mouseenter="handleMouseHover('Name', $event)"
              @mouseleave="handleMouseHover('Name', $event)"
              :style="computedStyles.modeStyle('Name')"
            >
              Name
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, onBeforeMount } from "vue";

//import CometChatList from "../../src/components/CometChatList/index.vue";
import {
  CometChatTheme,
  Close2xIcon,
  fontHelper,
} from "@cometchat/chat-uikit-vue";
import { AvatarStyle } from "@cometchat/uikit-elements";
import "@cometchat/uikit-elements";

export default defineComponent({
  name: "Avatar",
  emits: ["close-avatar"],
  components: {},

  setup(props, context) {
    let { theme }: any = inject("theme", new CometChatTheme({}));

    onBeforeMount(() => {
      setAvatarStyle();
    });

    let type = ref("");
    let activeTab = ref("Image");
    let closeIconURL: string = Close2xIcon;
    let avatarStyle: any = ref(null);
    const borderRadius = ref("28px");
    const name = "John Doe";
    const image =
      "https://data-us.cometchat.io/assets/images/avatars/ironman.png";
    const setAvatarStyle = () => {
      let defaultStyle: AvatarStyle = new AvatarStyle({
        borderRadius: "24px",
        width: "36px",
        height: "36px",
        border: `1px solid ${theme.value.palette.getAccent100()}`,
        backgroundColor: theme.value.palette.getAccent700(),
        nameTextColor: theme.value.palette.getAccent900(),
        backgroundSize: "cover",
        nameTextFont: fontHelper(theme.value.typography.subtitle1),
        outerViewBorderSpacing: "",
      });
      avatarStyle.value = { ...defaultStyle, ...avatarStyle.value };
    };

    const updateBorderRadius = () => {
      avatarStyle.value = {
        borderRadius: borderRadius.value,
        width: "36px",
        height: "36px",
        border: `1px solid ${theme.value.palette.getAccent100()}`,
        backgroundColor: theme.value.palette.getAccent700(),
        nameTextColor: theme.value.palette.getAccent900(),
        backgroundSize: "cover",
        nameTextFont: fontHelper(theme.value.typography.subtitle1),
        outerViewBorder: "",
        outerViewBorderSpacing: "",
      };
    };

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode || type.value ? getStyles() : {};
    });

    const onClose = () => {
      context.emit("close-avatar", {});
    };

    const handleMouseHover = (typePara: string, event: any) => {
      type.value = event.type == "mouseenter" ? typePara : "";
    };

    const setActiveTab = (typePara: string) => {
      activeTab.value = typePara;
    };

    const getStyles = () => {
      return {
        closeIconStyle: () => {
          return {
            WebkitMask: `url(${closeIconURL}) center center no-repeat`,
            background: theme.value.palette.getAccent600(),
          };
        },
        titleStyle: () => {
          return {
            font: fontHelper(theme.value.typography.title2),
            color: theme.value.palette.getAccent(),
          };
        },
        modeTitleStyle: () => {
          return {
            font: fontHelper(theme.value.typography.subtitle1),
            color: theme.value.palette.getAccent(),
          };
        },
        wrapperStyle: () => {
          return {
            background: theme.value.palette.getBackground(),
            boxShadow: `${theme.value.palette.getAccent400()} 0px 0px 3px`,
          };
        },
        modeStyle: (typePara: string) => {
          return {
            font: fontHelper(theme.value.typography.subtitle1),
            color: theme.value.palette.getAccent(),
            background:
              activeTab.value == typePara || type.value == typePara
                ? theme.value.palette.getBackground()
                : "transparent",
            boxShadow:
              activeTab.value == typePara || type.value == typePara
                ? `${theme.value.palette.getAccent400()} 0px 0px 1px`
                : "none",
            borderRadius:
              activeTab.value == typePara || type.value == typePara
                ? "12px"
                : "none",
          };
        },
        tabListStyle: () => {
          return {
            background: theme.value.palette.getAccent100(),
            borderRadius: "12px",
          };
        },
        inputStyle: () => {
          return {
            font: fontHelper(theme.value.typography.subtitle2),
            color: theme.value.palette.getAccent600(),
            border: `1px solid ${theme.value.palette.getAccent100()}`,
          };
        },
        cardDescriptionStyle: () => {
          return {
            font: fontHelper(theme.value.typography.subtitle2),
            color: theme.value.palette.getAccent600(),
          };
        },
      };
    };

    return {
      computedStyles,
      onClose,
      setActiveTab,

      handleMouseHover,
      activeTab,
      name,
      avatarStyle,
      image,
      borderRadius,
      updateBorderRadius,
    };
  },
});
</script>
<style scoped>
.close__icon {
  height: 30px;
  width: 30px;
  cursor: pointer;
}
.avatar__backdrop {
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.header_title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.switch__button {
  display: flex;
  width: 100%;
  margin: 16px 0 8px 0;
  justify-content: space-between;
}

.mode__title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar__container {
  height: 320px;
  width: 320px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  position: absolute;
  z-index: 10;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tabs__container {
  border-radius: 8px;
}
.tab__list {
  padding: 0 !important;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: auto;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
ul li {
  margin: 1px;
  width: 70px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  padding: 0 8px;
  cursor: pointer;
  text-align: center;
  position: relative;
}
ul li:last-child {
  border-right: none !important;
}
</style>
