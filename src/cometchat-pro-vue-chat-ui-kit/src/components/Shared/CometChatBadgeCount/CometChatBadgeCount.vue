<template>
  <span v-if="count" :style="badgeStyle">{{ count }}</span>
</template>
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_NUMBER_PROP,
} from "../../../resources/constants";

import { badgeStyle } from "./style";

export default {
  name: "CometChatBadgeCount",
  props: {
    theme: { ...DEFAULT_OBJECT_PROP },
    count: { ...DEFAULT_NUMBER_PROP },
  },
  computed: {
    badgeStyle() {
      return badgeStyle(this.theme);
    },
  },
};
</script>