<template>
  <img
    :src="computedImage"
    :style="avatarStyle"
    :alt="STRINGS.AVATAR"
    @error="() => (error = true)"
  />
</template>
<script>
import {
  STRING_MESSAGES,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import srcIcon from "./resources/1px.png";
import { imgStyle } from "./style";

export default {
  name: "CometChatAvatar",
  data() {
    return {
      error: false,
    };
  },
  props: {
    image: { default: srcIcon },
    borderWidth: { ...DEFAULT_STRING_PROP, default: "1px" },
    borderColor: { ...DEFAULT_STRING_PROP, default: "#aaa" },
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "50%" },
  },
  computed: {
    avatarStyle() {
      return {
        ...imgStyle(),
        borderStyle: "solid",
        borderColor: this.borderColor,
        borderRadius: this.cornerRadius,
        borderWidth: this.borderWidth,
      };
    },
    computedImage() {
      return this.error ? srcIcon : this.image;
    },
    STRINGS() {
      return STRING_MESSAGES;
    },
  },
};
</script>