<template>
  <button :style="computedButtonStyle" @click="onClick">
    <!-- <img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="imageAltText"
      :style="imageStyle"
    /> -->
    <div v-if="imageUrl" :style="computedSvgStyle"></div>
    <span :style="buttonContentStyle.outerSpanStyle">
      <span :style="computedTitleSpanStyle">{{ title }}</span>
      <br />
      <br />
      <br />
      <span :style="computedTextSpanStyle">
        {{ description }}
      </span>
    </span>

    <img
      v-if="showSideArrow"
      :src="Assets.SideArrowSvg"
      style="
        height: 30px;
        width: 30px;
        margin-right: 70px;
        position: relative;
        top: -5px;
        left: -20px;
      "
    />
  </button>
</template>

<script lang="ts">
/*es-lint disabled*/

import { computed, defineComponent, inject, PropType } from "vue";
import { fontHelper } from "@cometchat/chat-uikit-vue";

import * as Assets from "../assets";

export default defineComponent({
  name: "CardComponent",
  components: {},
  props: {
    title: { type: String, default: "Conversations" },
    showSideArrow: { type: Boolean, default: true },
    imageStyle: {
      type: null,
      default: () => {
        return {
          height: "35px",

          width: "40px",
          top: "-6px",
          position: "relative",
          "margin-right": "15px",
          "margin-left": "15px",
        };
      },
    },
    buttonContentStyle: {
      type: null,
      default: {
        outerSpanStyle: {
          position: "relative",
          width: "fit-content",
          "text-align": "left",
        },
        titleSpanStyle: {
          width: "100%",
          "font-size": "15px",
          "font-weight": "700",
          position: "relative",
        },
        textSpanStyle: {
          width: "250px",
          "font-size": "13px",
          display: "block",
          position: "relative",
          top: "-20px",
        },
      },
    },
    buttonStyle: {
      type: null,
      default: {
        "margin-top": "10px",
        "padding-top": "7px",
        position: "relative",
        height: "fit-content",
        "max-height": "150px",
        "max-width": "270px",
        width: "fit-content",
        display: "inline-flex",

        cursor: "pointer",
        borderRadius: "12px",
      },
    },
    description: {
      type: String,
      default:
        "Let's have a conversation. \
         Let's not jump to conclusions. \
         It's been a good day. Let us keep it that way. \
         Click to learn more above having a health conversation!",
    },
    imageUrl: { type: String },
    imageAltText: { type: String, default: "Image Unavailable" },
    onClick: {
      type: Function as PropType<() => void>,
      default: () => {
        console.log("CLICKED 1234");
      },
    },
  },
  setup(props) {
    let { theme }: any = inject("theme")!;

    const computedButtonStyle = computed(() => {
      let backgroundColor = theme.value.palette.mode
        ? theme.value.palette.getBackground()
        : "";
      let boxShadow = theme.value.palette.getAccent400() + " 0px 0px 5px";
      let border = "none";

      return { backgroundColor, boxShadow, border, ...props.buttonStyle };
    });

    const computedSvgStyle = computed(() => {
      return theme.value.palette.mode
        ? {
            WebkitMask: `url(${props.imageUrl})  center center no-repeat`,
            maskSize: "100%",
            background: theme.value.palette.getAccent(),
            ...props.imageStyle,
          }
        : {};
    });

    const computedTextSpanStyle = computed(() => {
      let color = theme.value.palette.mode
        ? theme.value.palette.getAccent600()
        : "";
      let font = fontHelper(theme.value.typography.subtitle2);
      return {
        color,
        font,
        ...props.buttonContentStyle.textSpanStyle,
      };
    });
    const computedTitleSpanStyle = computed(() => {
      let color = theme.value.palette.mode
        ? theme.value.palette.getAccent()
        : "";
      let font = fontHelper(theme.value.typography.title2);
      return {
        color,
        font,
        ...props.buttonContentStyle.titleSpanStyle,
      };
    });
    return {
      theme,
      Assets,
      fontHelper,
      computedTextSpanStyle,
      computedTitleSpanStyle,
      computedButtonStyle,
      computedSvgStyle,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
