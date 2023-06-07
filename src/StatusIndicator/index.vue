<template>
  <div class="status_indicator__backdrop"></div>
  <div
    class="status_indicator__container"
    :style="computedStyles.wrapperStyle()"
  >
    <div class="header">
      <span class="header_title" :style="computedStyles.titleStyle()"
        >Status Indicator</span
      >
      <div
        class="close__icon"
        :style="computedStyles.closeIconStyle()"
        @click="onClose()"
      ></div>
    </div>
    <div class="description" :style="computedStyles.cardDescriptionStyle()">
      StatusIndicator component indicates whether a user is online or offline..
    </div>
    <div class="status">
      <cometchat-status-indicator
        :backgroundColor="background"
        :statusIndicatorStyle="statusIndicatorStyle"
      >
      </cometchat-status-indicator>
    </div>

    <div class="footer">
      <div class="switch__button">
        <span class="mode__title" :style="computedStyles.modeTitleStyle()">
          Status
        </span>
        <div class="tabs__container">
          <ul class="tab__list" :style="computedStyles.tabListStyle()">
            <li
              class="tab"
              @click="setActiveTab('online')"
              @mouseenter="handleMouseHover('online', $event)"
              @mouseleave="handleMouseHover('online', $event)"
              :style="computedStyles.modeStyle('online')"
            >
              Online
            </li>
            <li
              class="tab"
              @click="setActiveTab('offline')"
              @mouseenter="handleMouseHover('offline', $event)"
              @mouseleave="handleMouseHover('offline', $event)"
              :style="computedStyles.modeStyle('offline')"
            >
              Offline
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, Ref } from "vue";
import { useRouter } from "vue-router";

import {
  CometChatTheme,
  Close2xIcon,
  fontHelper,
} from "@cometchat/chat-uikit-vue";

import ""@cometchat/uikit-elements";

export default defineComponent({
  name: "StatusIndicator",
  emits: ["close-status-indicator"],
  components: {},

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );

    let type = ref("");
    let activeTab = ref("Image");
    let closeIconURL: string = Close2xIcon;

    const borderRadius = ref("28px");

    let background: Ref<string | undefined> = ref(
      theme.value.palette.getSuccess()
    );
    let statusIndicatorStyle: any = {
      height: "18px",
      width: "18px",
      borderRadius: "50%",
    };

    const router = useRouter();

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode || type.value ? getStyles() : {};
    });

    const onClose = () => {
      context.emit("close-status-indicator", {});
    };

    const handleMouseHover = (typePara: string, event: any) => {
      type.value = event.type == "mouseenter" ? typePara : "";
    };

    const setActiveTab = (typePara: string) => {
      activeTab.value = typePara;
      if (typePara == "online") {
        background.value = theme.value.palette.getSuccess();
      } else {
        background.value = theme.value.palette.getAccent600();
      }
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
      };
    };

    return {
      computedStyles,
      onClose,
      setActiveTab,

      handleMouseHover,
      activeTab,

      borderRadius,

      background,
      statusIndicatorStyle,
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
.status_indicator__backdrop {
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

.status {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  height: 30px;
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
.status_indicator__container {
  height: 220px;
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
</style>
