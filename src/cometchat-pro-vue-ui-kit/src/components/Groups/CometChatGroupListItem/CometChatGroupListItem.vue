<template>
  <div
    :style="styles.list"
    class="group__item--hover"
    @click="emitEvent('click', group)"
  >
    <div :style="styles.thumbnail">
      <comet-chat-avatar
        border-width="1px"
        corner-radius="18px"
        :image="group.icon"
        :border-color="theme.borderColor.primary"
      />
    </div>
    <div :style="styles.detail">
      <div
        :style="styles.nameWrapper"
        @mouseenter="toggleTooltip($event, true)"
        @mouseleave="toggleTooltip($event, false)"
      >
        <div :style="styles.name">
          {{ group.name }}
        </div>
        <img
          :alt="STRINGS.SHIELD"
          :style="styles.icon"
          v-if="group.type === 'private'"
          :src="groupTypeIcons.shieldIcon"
        />
        <img
          :alt="STRINGS.LOCK"
          :style="styles.icon"
          :src="groupTypeIcons.lockIcon"
          v-else-if="group.type === 'password'"
        />
      </div>
      <div :style="styles.description">{{ groupDescription }}</div>
    </div>
  </div>
</template>
<script>
import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import { tooltip, cometChatCommon } from "../../../mixins";

import { CometChatAvatar } from "../../Shared";

import shieldIcon from "./resources/shield.png";
import lockIcon from "./resources/lock.png";

import * as style from "./style";

/**
 * List item for group list.
 *
 * @displayName CometChatGroupListItem
 */
export default {
  name: "CometChatGroupListItem",
  mixins: [tooltip, cometChatCommon],
  components: {
    CometChatAvatar,
  },
  props: {
    /**
     * Group item.
     */
    group: { ...DEFAULT_OBJECT_PROP },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * Selected group item.
     */
    selectedGroup: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        name: style.itemNameStyle(),
        detail: style.itemDetailStyle(),
        icon: style.listItemIconStyle(),
        thumbnail: style.itemThumbnailStyle(),
        nameWrapper: style.itemNameWrapperStyle(),
        description: style.itemDescriptionStyle(this.theme),
        list: style.listItemStyle(this.theme, this.group, this.selectedGroup),
      };
    },
    /**
     * Icon for group types.
     */
    groupTypeIcons() {
      return { shieldIcon, lockIcon };
    },
    /**
     * Description of group.
     */
    groupDescription() {
      return `${this.group.membersCount} members`;
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
<style scoped>
.group__item--hover:hover {
  background-color: var(--group-item-bg-color-hover);
}
</style>
