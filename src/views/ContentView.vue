<template>
  <div class="cc-chats-view" :style="computedStyles">
    <template v-for="item in currentCardsList" :key="item.id">
      <component
        :is="listItemView(item)!.componentName!"
        v-bind="{ ...listItemView(item)?.props }"
        v-on="listItemView && listItemView(item) ? listItemView(item) : {}"
        :style="{ 'margin-right': '20px' }"
      >
        <template v-for="(html, key) in listItemView(item)!.slots" :key="key">
          <div :v-slot="[key]" :v-html="html"></div>
        </template>
      </component>
    </template>
  </div>
</template>
<script lang="ts">
import { CometChat } from "@cometchat-pro/chat";
import { computed, defineComponent, inject, onBeforeUpdate, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import * as Assets from "../assets";

import OptionsListComponent from "../OptionsList/index.vue";
import ContentViewData from "../content-view-data";

export default defineComponent({
  name: "ChatsView",
  components: { OptionsListComponent },
  props: {},
  setup(props, context) {
    let { theme, switchThemeMode }: any = inject("theme")!;

    let logOutIcon = Assets.PowerSettingsNew;
    const router = useRouter();
    const route: any = useRoute();
    let cardsList: any = ContentViewData;
    let currentCardsList: any = ref(cardsList[route.name]);

    onBeforeUpdate(() => {
      currentCardsList.value = cardsList[route.name];
    });

    const computedStyles: any = computed(() => {
      let backgroundColor = theme.value.palette.mode
        ? theme.value.palette.getBackground()
        : "";
      return {
        "margin-left": "10px",
        width: "100%",
        display: "flex",
        "flex-direction": "row",
        "flex-wrap": "wrap",
        "align-content": "flex-start",
        "background-color": backgroundColor,
      };
    });

    const logout = async () => {
      await CometChat.logout()
        .then(() => {
          router.push({ path: "/" });
        })
        .catch(() => {
          console.log("User Logout Error");
        });
    };

    const listItemView = (item: any): ViewType => {
      return {
        componentName: item.componentName || "CardComponent",
        props: {
          showSideArrow: false,
          title: item.title,
          description: item.description,

          imageUrl: item.imageUrl,
          imageAltText: item.imageAltText,
          buttonStyle: {
            "margin-top": "10px",
            "margin-bottom": "10px",
            "padding-top": "20px",
            position: "relative",
            height: "150px",
            width: "420px",
            "max-width": "420px",
            display: "inline-flex",
            border: "none",
            "box-shadow": theme.value.palette.getAccent400() + " 0px 0px 5px",
            cursor: "pointer",
            borderRadius: "12px",
          },
          buttonContentStyle: {
            outerSpanStyle: {
              position: "relative",
              width: "fit-content",
              "text-align": "left",
            },
            titleSpanStyle: {
              width: "100%",
              "font-size": "15px",
              position: "relative",
            },
            textSpanStyle: {
              width: "fit-content",
              "font-size": "14px",
              display: "block",
              top: "-20px",
              position: "relative",
            },
          },
          onClick: item.onClick
            ? item.onClick(router, context)
            : () => {
                //do nothing
              },
        },
      };
    };
    return {
      logout,
      currentCardsList,
      listItemView,
      Assets,
      logOutIcon,
      theme,
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
</style>
