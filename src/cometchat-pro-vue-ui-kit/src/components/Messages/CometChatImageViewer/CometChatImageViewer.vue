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
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_BOOLEAN_PROP,
} from "../../../resources/constants";

import { cometChatCommon } from "../../../mixins/";

import { CometChatBackdrop } from "../../Shared";

import closeIcon from "./resources/close.png";
import srcIcon from "./resources/1px.png";

import * as style from "./style";

/**
 * Displays fullscreen image.
 *
 * @displayName CometChatImageViewer
 */
export default {
  name: "CometChatImageViewer",
  mixins: [cometChatCommon],
  components: { CometChatBackdrop },
  props: {
    /**
     * Opens image viewer.
     */
    open: { ...DEFAULT_BOOLEAN_PROP },
    /**
     * The message object.
     */
    message: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      error: false,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        image: style.imageStyle(),
        imageWrapper: style.imageWrapperStyle(closeIcon),
      };
    },
    /**
     * Computed image based on error state.
     */
    computedImage() {
      return this.error ? srcIcon : this.message.data.url;
    },
    /**
     * Local string constants.
     */
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
  },
};
</script>