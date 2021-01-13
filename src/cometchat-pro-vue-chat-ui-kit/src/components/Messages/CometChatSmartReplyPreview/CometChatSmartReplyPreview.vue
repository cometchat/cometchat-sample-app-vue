<template>
  <div :style="styles.previewWrapper">
    <div :style="styles.previewHeading">
      <div :style="styles.previewClose" @click="emitEvent('close')"></div>
    </div>
    <div :style="styles.previewOptionsWrapper">
      <template v-for="(option, i) in options">
        <div
          :key="i"
          :style="styles.previewOption"
          @click="emitEvent('click', option)"
        >
          {{ option }}
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {
  DEFAULT_ARRAY_PROP,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import { cometChatCommon } from "../../../mixins";

import * as style from "./style";

import closeIcon from "./resources/clear.png";

export default {
  name: "CometChatSmartReplyPreview",
  mixins: [cometChatCommon],
  props: {
    theme: { ...DEFAULT_OBJECT_PROP },
    options: { ...DEFAULT_ARRAY_PROP },
  },
  computed: {
    styles() {
      return {
        previewHeading: style.previewHeadingStyle(),
        previewClose: style.previewCloseStyle(closeIcon),
        previewOption: style.previewOptionStyle(this.theme),
        previewWrapper: style.previewWrapperStyle(this.theme),
        previewOptionsWrapper: style.previewOptionsWrapperStyle(),
      };
    },
  },
};
</script>