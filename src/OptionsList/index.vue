<template>
  <div :style="computedOptionWrapperStyles">
    <h2 :style="computedHeaderStyle">UI Components</h2>

    <div
      class="innerView"
      style="
        height: 90%;
        width: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        overflow-y: hidden;
        display: inline-flex;
        top: -22px;
      "
    >
      <div style="height: 100%; width: 100%">
        <CometChatList
          :hideSearch="true"
          :list="cardsList"
          listItemKey="none"
          sectionHeaderKey=""
          :state="States.loaded"
          :listStyle="{
            height: '99%',
            width: '100%',
            background: theme.palette.getBackground(),
          }"
        >
          <template v-slot:listItem="{ item }">
            <component
              :is="listItemView(item)!.componentName!"
              v-bind="{ ...listItemView(item)?.props }"
              v-on="
                listItemView && listItemView(item) ? listItemView(item) : {}
              "
            >
              <template
                v-for="(html, key) in listItemView(item)!.slots"
                :key="key"
              >
                <div :v-slot="[key]" :v-html="html"></div>
              </template>
            </component>
          </template>
        </CometChatList>
      </div>
    </div>
    <footer :style="computedFooterStyle">3.0.10-pluto.beta.2</footer>
  </div>
</template>

<script lang="ts">
import { CometChat } from "@cometchat-pro/chat";
import { computed, defineComponent, inject, PropType, provide } from "vue";
import { useRouter } from "vue-router";
import CardComponent from "../Card/index.vue";
import * as Assets from "../assets";
import {
  CometChatList,
  CometChatTheme,
  States,
  fontHelper,
} from "@cometchat/chat-uikit-vue";

export default defineComponent({
  name: "OptionsListComponent",
  components: { CardComponent, CometChatList },
  props: {
    cardsList: { type: null },
    style: {
      type: null,
      default: {
        height: "100%",
        width: "30%",
      },
    },
  },
  setup(props) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );
    let logOutIcon = Assets.PowerSettingsNew;
    const router = useRouter();

    const logout = async () => {
      await CometChat.logout()
        .then(() => {
          console.log("User Logged Out");
          router.push({ path: "/" });
        })
        .catch(() => {
          console.log("User Logout Error");
        });
    };

    const computedOptionWrapperStyles: any = computed(() => {
      let borderColor = theme.value.palette.mode
        ? theme.value.palette.getAccent()
        : "";
      let backgroundColor = theme.value.palette.mode
        ? theme.value.palette.getBackground()
        : "";
      return {
        ...props.style,
        backgroundColor,
        ...{
          position: "relative",
          "margin-right": "5px",
          display: "inline-flex",
          flexDirection: "column",
          verticalAlign: "top",
          border: `2px solid ${theme.value.palette.getAccent200()}`,
          width: "fit-content",
        },
      };
    });

    const computedFooterStyle: any = computed(() => {
      return theme.value.palette.mode
        ? {
            width: "100%",
            "text-align": "center",
            font: fontHelper(theme.value.typography.subtitle2),
            color: theme.value.palette.getAccent500(),
          }
        : {};
    });

    const computedHeaderStyle: any = computed(() => {
      return theme.value.palette.mode
        ? { "margin-left": "20px", color: theme.value.palette.getAccent() }
        : {};
    });

    const listItemView = (item: any): ViewType => {
      return {
        componentName: item.componentName || "CardComponent",
        props: {
          title: item.title,
          description: item.description,

          imageUrl: item.imageUrl,
          imageAltText: item.imageAltText,
          onClick: item.onClick,
        },
      };
    };
    return {
      logout,
      listItemView,
      States,
      Assets,
      logOutIcon,
      theme,
      computedOptionWrapperStyles,
      computedHeaderStyle,
      computedFooterStyle,
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
</style>
