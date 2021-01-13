<template>
  <div>
    <comet-chat-backdrop :show="open" @click="emitAction('closeActualImage')" />
    <div :style="styles.imageWrapper" @click="emitAction('closeActualImage')">
      <img
        :src="computedImage"
        :style="styles.image"
        :alt="STRINGS.FULL_SCREEN_VIEW"
        @error="() => (error = true)"
      />
    </div>
  </div>
</template>
<script>
import {
  STRING_MESSAGES,
  DEFAULT_OBJECT_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { cometChatCommon } from "../../../mixins/";

import { CometChatBackdrop } from "../../Shared";

import closeIcon from "./resources/close.png";
import srcIcon from "./resources/1px.png";

import * as style from "./style";

export default {
  name: "CometChatImageViewer",
  mixins: [cometChatCommon],
  components: { CometChatBackdrop },
  props: {
    open: { ...DEFAULT_BOOLEAN_PROP },
    message: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      error: false,
    };
  },
  computed: {
    styles() {
      return {
        image: style.imageStyle(),
        imageWrapper: style.imageWrapperStyle(closeIcon),
      };
    },
    computedImage() {
      return this.error ? srcIcon : this.message.data.url;
    },
    STRINGS() {
      return STRING_MESSAGES;
    },
  },
};
</script>