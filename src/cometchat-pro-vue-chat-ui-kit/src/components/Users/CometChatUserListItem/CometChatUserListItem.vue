<template>
  <div
    class="list__item--hover"
    :style="styles.listItem"
    @click="emitEvent('click', user)"
  >
    <div :style="styles.itemThumbnail">
      <comet-chat-avatar
        border-width="1px"
        corner-radius="50%"
        :image="user.avatar"
        :border-color="theme.borderColor.primary"
      />
      <comet-chat-user-presence
        border-width="1px"
        corner-radius="50%"
        :status="user.status"
        :border-color="theme.borderColor.primary"
      />
    </div>
    <div :style="styles.itemDetail">
      <div
        :style="styles.itemName"
        @mouseenter="toggleTooltip($event, true)"
        @mouseleave="toggleTooltip($event, false)"
      >
        {{ user.name }}
      </div>
      <div :style="styles.itemDescription"></div>
    </div>
  </div>
</template>
<script>
import { DEFAULT_OBJECT_PROP } from "../../../resources/constants";

import { tooltip, cometChatCommon } from "../../../mixins";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared/";

import * as style from "./style";

export default {
  name: "CometChatUserListItem",
  mixins: [tooltip, cometChatCommon],
  components: {
    CometChatAvatar,
    CometChatUserPresence,
  },
  props: {
    user: { ...DEFAULT_OBJECT_PROP },
    theme: { ...DEFAULT_OBJECT_PROP },
    selectedUser: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    styles() {
      return {
        itemName: style.itemNameStyle(),
        itemDetail: style.itemDetailStyle(),
        itemThumbnail: style.itemThumbnailStyle(),
        itemDescription: style.itemDescriptionStyle(this.theme),
        listItem: style.listItemStyle(this.theme, this.user, this.selectedUser),
      };
    },
  },
};
</script>
<style scoped>
.list__item--hover:hover {
  background-color: var(--list-item-bg-color-hover);
}
</style>