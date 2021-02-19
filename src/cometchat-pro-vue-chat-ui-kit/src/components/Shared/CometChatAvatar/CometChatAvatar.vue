<template>
  <img
    :style="styles"
    :src="computedImage"
    :alt="STRINGS.AVATAR"
    @error="() => (error = true)"
  />
</template>
<script>
import {
  COMETCHAT_CONSTANTS,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import srcIcon from "./resources/1px.png";
import { imgStyle } from "./style";

/**
 * Shared avatar component.
 *
 * @displayName CometChatAvatar
 */
export default {
  name: "CometChatAvatar",
  data() {
    return {
      error: false,
    };
  },
  props: {
    /**
     * The image source for the avatar.
     */
    image: { default: srcIcon },
    /**
     * The border width for the avatar.
     */
    borderWidth: { ...DEFAULT_STRING_PROP, default: "1px" },
    /**
     * The border color for the avatar.
     */
    borderColor: { ...DEFAULT_STRING_PROP, default: "#aaa" },
    /**
     * The corner radius for the avatar.
     */
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "50%" },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        ...imgStyle(),
        borderStyle: "solid",
        borderColor: this.borderColor,
        borderRadius: this.cornerRadius,
        borderWidth: this.borderWidth,
      };
    },
    /**
     * Computed image depending on the error state.
     */
    computedImage() {
      return this.error ? srcIcon : this.image;
    }
    /**
     * Local string constants.
     */,
    STRINGS() {
      return COMETCHAT_CONSTANTS;
    },
  },
};
</script>