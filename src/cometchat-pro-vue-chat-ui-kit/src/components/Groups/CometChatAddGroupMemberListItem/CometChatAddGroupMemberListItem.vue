<template>
  <tr :style="styles.tableRow" class="addmembers__table__row">
    <td
      :style="styles.tableColumn"
      @mouseenter="toggleTooltip($event, true)"
      @mouseleave="toggleTooltip($event, false)"
    >
      <div :style="styles.avatar">
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
      <div :style="styles.name">{{ user.name }}</div>
    </td>
    <td :style="styles.selectionColumn">
      <input
        :id="user.uid"
        type="checkbox"
        :checked="checked"
        class="addmember__checkbox"
        :style="styles.selectionBox"
        @change="checkHandler"
      />
      <label :style="styles.selectionBox.label" :for="user.uid">&nbsp;</label>
    </td>
  </tr>
</template>
<script>
import {
  DEFAULT_ARRAY_PROP,
  DEFAULT_OBJECT_PROP,
} from "../../../resources/constants";

import { tooltip, cometChatCommon } from "../../../mixins/";

import { CometChatAvatar, CometChatUserPresence } from "../../Shared";

import * as style from "./style";

import inactiveIcon from "./resources/checkbox-inactive.svg";
import activeIcon from "./resources/checkbox-blue-active.svg";

/**
 * List item for add group members list.
 *
 * @displayName CometChatAddGroupMemberListItem
 */
export default {
  name: "CometChatAddGroupMemberListItem",
  mixins: [tooltip, cometChatCommon],
  components: {
    CometChatAvatar,
    CometChatUserPresence,
  },
  props: {
    /**
     * User object.
     */
    user: { ...DEFAULT_OBJECT_PROP },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * List of all members.
     */
    members: { ...DEFAULT_ARRAY_PROP },
  },
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        name: style.nameStyle(),
        avatar: style.avatarStyle(),
        tableColumn: style.tableColumnStyle(),
        tableRow: style.tableRowStyle(this.theme),
        selectionColumn: style.selectionColumnStyle(),
        selectionBox: style.selectionBoxStyle(inactiveIcon, activeIcon),
      };
    },
  },
  methods: {
    /**
     * Handles checkbox input
     */
    checkHandler() {
      this.checked = !this.checked;

      this.emitEvent("change", { user: this.user, value: this.checked });
    },
  },
};
</script>
<style scoped>
.addmembers__table__row:not(:first-of-type) {
  border-top: none !important;
}
.addmember__checkbox:checked + label {
  background: var(--active-state-background) !important;
  background-size: 16px;
}
</style>