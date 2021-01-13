<template>
  <div v-if="show" :style="backdropStyle" @click="emitEvent('click')"></div>
</template>
<script>
import { DEFAULT_BOOLEAN_PROP } from "../../../resources/constants";
import { cometChatCommon } from "../../../mixins";

import { backdropStyle } from "./style";

export default {
  name: "CometChatBackdrop",
  mixins: [cometChatCommon],
  props: {
    show: { ...DEFAULT_BOOLEAN_PROP },
  },
  computed: {
    backdropStyle() {
      return {
        ...backdropStyle(),
      };
    },
  },
};
</script>