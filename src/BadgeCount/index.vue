<template>
  <div class="badgecount__backdrop"></div>
  <div class="badgecount__container" :style="computedStyles.wrapperStyle()">
    <div class="header">
      <span class="header-title" :style="computedStyles.titleStyle()"
        >Badge Count</span
      >
      <div
        class="close__icon"
        :style="computedStyles.closeIconStyle()"
        @click="onClose()"
      ></div>
    </div>
    <div class="description" :style="computedStyles.cardDescriptionStyle()">
      CometChatBadgeCount is a custom component which is used to display the
      unread message count. It can be used in places like ConversationListItem
      ,etc.
    </div>
    <div class="badgecount">
      <cometchat-badge :count="count" :badgeStyle="badgeStyle">
      </cometchat-badge>
    </div>

    <div class="footer">
      <input
        class="footer-input"
        type="number"
        placeholder="Badge Count"
        v-model="count"
        :style="computedStyles.inputStyle()"
      />

      <div class="switch__button">
        <span class="mode__title" :style="computedStyles.modeTitleStyle()">
          Background Color
        </span>
        <div class="tabs__container">
          <ul class="tab__list" :style="computedStyles.tabListStyle()">
            <li
              class="tab"
              @click="setActiveTab(color)"
              @mouseenter="handleMouseHover(color, $event)"
              @mouseleave="handleMouseHover(color, $event)"
              :style="computedStyles.modeStyle(color)"
              v-for="color in colors"
              :key="color"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  ref,
  onBeforeMount,
  Ref,
} from "vue";

import {
  CometChatTheme,
  Close2xIcon,
  fontHelper,
} from "@cometchat/chat-uikit-vue";
import { BadgeStyle } from "@cometchat/uikit-elements";
import "@cometchat/uikit-elements";

export default defineComponent({
  name: "BadgeCount",
  emits: ["close-badge-count"],
  components: {},

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );
    let background: Ref<string> = ref("");

    let colors: Ref<any[]> = ref([]);
    let badgeStyle: Ref<BadgeStyle> = ref({});
    let count: Ref<number> = ref(10);

    onBeforeMount(() => {
      setBadgeStyle();
      setColorPicker();
    });

    const setBadgeStyle = () => {
      let defaultStyle: BadgeStyle = new BadgeStyle({
        textFont: fontHelper(theme.value.typography.subtitle2),
        textColor: theme.value.palette.getAccent("dark"),
        background: theme.value.palette.getPrimary(),
        borderRadius: "16px",
        width: "fit-content",
        height: "16px",
      });
      badgeStyle.value = { ...defaultStyle, ...badgeStyle.value };
    };
    const setColorPicker = () => {
      colors.value = [
        theme.value.palette.getPrimary(),
        theme.value.palette.getError(),
        theme.value.palette.getAccent600(),
        theme.value.palette.getSuccess(),
      ];
    };

    let type = ref("");

    let closeIconURL: string = Close2xIcon;

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode || type.value ? getStyles() : {};
    });

    const onClose = () => {
      context.emit("close-badge-count", {});
    };

    const handleMouseHover = (typePara: string, event: any) => {
      type.value = event.type == "mouseenter" ? typePara : "";
    };

    const setActiveTab = (type: string) => {
      background.value = type;
      badgeStyle.value = {
        textFont: fontHelper(theme.value.typography.subtitle2),
        textColor: theme.value.palette.getAccent("dark"),
        background: type,
        width: "fit-content",
        height: "16px",
        borderRadius: "16px",
      };
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
        modeStyle: (colorPara: string) => {
          return {
            background:
              background.value == colorPara || type.value == colorPara
                ? colorPara
                : theme.value.palette.getSecondary(),
          };
        },
        tabListStyle: () => {
          return {
            background: theme.value.palette.getSecondary(),
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
      badgeStyle,
      handleMouseHover,

      count,
      colors,
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
.badgecount__backdrop {
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
.footer-input {
  height: 36px;
  width: 100%;
  outline: none;
  padding: 8px;
  border-radius: 12px;
  background: transparent;
}
.switch__button {
  display: flex;
  width: 100%;
  margin: 16px 0 8px 0;
  justify-content: space-between;
}

.header-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.badgecount {
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
.badgecount__container {
  height: 280px;
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
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;

  margin: auto;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
ul li {
  width: 30px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  padding: 0 8px;
  cursor: pointer;
  text-align: center;
  position: relative;
  border-radius: 8px;
}
ul li:last-child {
  border-right: none !important;
}
</style>
