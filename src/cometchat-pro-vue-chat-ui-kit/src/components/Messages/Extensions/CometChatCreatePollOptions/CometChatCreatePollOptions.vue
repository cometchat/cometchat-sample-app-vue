<template>
  <tr :style="styles">
    <td>&nbsp;</td>
    <td>
      <input
        autofocus
        type="text"
        tabIndex="1"
        autoComplete="off"
        :style="inputStyles"
        :value="option.value"
        placeholder="Enter your option"
        @input="emitEvent('change', { event: $event, option })"
      />
    </td>
    <td :style="pollViewStyle.iconWrapper">
      <span
        :style="pollViewStyle.removeOption"
        @click="emitEvent('remove', option)"
      ></span>
    </td>
  </tr>
</template>

<script>
import { DEFAULT_OBJECT_PROP } from "../../../../resources/constants";
import { cometChatCommon } from "../../../../mixins";

import removeIcon from "./resources/remove.png";

import * as style from "./style";

/**
 * Option view used to create polls.
 *
 * @displayName CometChatCreatePollOptions
 */
export default {
  name: "CometChatCreatePollOptions",
  mixins: [cometChatCommon],
  props: {
    /**
     * Option value.
     */
    option: { ...DEFAULT_OBJECT_PROP },
    /**
     * Wrapper styles.
     */
    styles: { ...DEFAULT_OBJECT_PROP },
    /**
     * Input styles.
     */
    inputStyles: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    pollViewStyle() {
      return {
        iconWrapper: style.iconWrapperStyle(),
        removeOption: style.removeOptionIconStyle(removeIcon),
      };
    },
  },
};
</script>