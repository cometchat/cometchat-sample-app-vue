<template>
  <span :style="statusStyle" />
</template>
<script>
import { DEFAULT_STRING_PROP } from "../../../resources/constants";

import { propertyCheck } from "../../../mixins/";

import { presenceStyle } from "./style";

export default {
  name: "CometChatUserPresence",
  mixins: [propertyCheck],
  props: {
    status: { ...DEFAULT_STRING_PROP },
    borderWidth: { ...DEFAULT_STRING_PROP, default: "1px" },
    borderColor: { ...DEFAULT_STRING_PROP, default: "#aaa" },
    cornerRadius: { ...DEFAULT_STRING_PROP, default: "50%" },
  },
  computed: {
    statusStyle() {
      return {
        ...presenceStyle(this.status),
        borderStyle: "solid",
        borderColor: this.borderColor,
        borderWidth: this.borderWidth,
        borderRadius: this.cornerRadius,
      };
    },
  },
};
</script>
