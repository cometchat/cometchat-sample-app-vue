<template>
  <div class="localize__backdrop"></div>
  <div class="localize__container" :style="computedStyles.wrapperStyle()">
    <div class="header">
      <span class="header_title" :style="computedStyles.titleStyle()"
        >Localize</span
      >
      <div
        class="close__icon"
        :style="computedStyles.closeIconStyle()"
        @click="onClose()"
      ></div>
    </div>
    <div class="description" :style="computedStyles.cardDescriptionStyle()">
      CometChatLocalize allows you to detect the language of your users based on
      their browser or device settings and set the language accordingly.
    </div>
    <div class="footer">
      <div class="switch__button">
        <span class="mode__title" :style="computedStyles.modeTitleStyle()">
          Localize
        </span>
        <div class="tabs__container">
          <ul class="tab__list" :style="computedStyles.tabListStyle()">
            <li
              class="tab"
              @click="setActiveTab('English')"
              @mouseenter="handleMouseHover('English', $event)"
              @mouseleave="handleMouseHover('English', $event)"
              :style="computedStyles.modeStyle('English')"
            >
              English
            </li>
            <li
              class="tab"
              @click="setActiveTab('हिन्दी')"
              @mouseenter="handleMouseHover('हिन्दी', $event)"
              @mouseleave="handleMouseHover('हिन्दी', $event)"
              :style="computedStyles.modeStyle('हिन्दी')"
            >
              हिन्दी
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="button">
      <button
        :style="computedStyles.buttonStyle()"
        class="view__button"
        @click="redirect('conversations-with-messages')"
      >
        View
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, provide, ref } from "vue";
import { useRouter } from "vue-router";

import {
  CometChatTheme,
  Close2xIcon,
  fontHelper,
} from "@cometchat/chat-uikit-vue";

export default defineComponent({
  name: "CometChatLocalizeManager",
  emits: ["close-localize-manager"],
  components: {},

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );
    let type = ref("");
    let activeTab = ref("Default");
    let closeIconURL: string = Close2xIcon;

    const router = useRouter();

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode || type.value ? getStyles() : {};
    });

    const onClose = () => {
      context.emit("close-localize-manager", {});
    };

    const handleMouseHover = (typePara: string, event: any) => {
      type.value = event.type == "mouseenter" ? typePara : "";
    };

    const redirect = (name: string) => {
      let language = "en";
      if (activeTab.value == "English") {
        language = "en";
      } else {
        language = "hi";
      }

      router.push({
        path: "/localizeconversationwithmessages",
        query: { language: language },
      });
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
                ? "8px"
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
        buttonStyle: () => {
          return {
            font: fontHelper(theme.value.typography.subtitle1),
            color: theme.value.palette.getAccent("dark"),
            backgroundColor: theme.value.palette.getPrimary(),
          };
        },
      };
    };

    return {
      computedStyles,
      onClose,
      setActiveTab,
      redirect,
      handleMouseHover,
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
.localize__backdrop {
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
.localize__container {
  height: 280px;
  width: 360px;
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
  margin: 2px;
  width: 70px;
  height: 32px;
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

.view__button {
  height: 38px;
  width: 100%;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
