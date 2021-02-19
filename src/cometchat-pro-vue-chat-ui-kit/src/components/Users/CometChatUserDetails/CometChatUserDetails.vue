<template>
  <div :style="styles.userDetail" class="cometchat__detailpane">
    <div :style="styles.header">
      <div
        :style="styles.headerClose"
        class="cometchat__header__close"
        @click="emitAction('closeDetailClicked')"
      ></div>
      <h4 :style="styles.headerTitle">{{ STRINGS.DETAILS }}</h4>
    </div>
    <div :style="styles.section" class="cometchat__detailpane__section">
      <div
        :style="styles.privacySection"
        class="cometchat__detailpane__section__privacy"
      >
        <h6 :style="styles.sectionHeader">{{ STRINGS.OPTIONS }}</h6>
        <div :style="styles.sectionContent">
          <div
            :style="styles.contentItem"
            class="cometchat__detailpane__content__item"
          >
            <div
              :style="styles.itemLink"
              @click="
                emitAction(item.blockedByMe ? 'unblockUser' : 'blockUser')
              "
            >
              {{ item.blockedByMe ? STRINGS.UNBLOCK_USER : STRINGS.BLOCK_USER }}
            </div>
          </div>
        </div>
      </div>
      <comet-chat-shared-media-view
        :item="item"
        :type="type"
        :theme="theme"
        container-height="50px"
      />
    </div>
  </div>
</template>
<script>
import {
  COMETCHAT_CONSTANTS,
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import { propertyCheck, cometChatCommon } from "../../../mixins/";

import { CometChatSharedMediaView } from "../../Shared";

import navigateIcon from "./resources/navigate.png";

import * as style from "./style";

/**
 * Displays details for the user of current chat.
 *
 * @displayName CometChatUserDetails
 */
export default {
  name: "CometChatUserDetails",
  mixins: [propertyCheck, cometChatCommon],
  components: { CometChatSharedMediaView },
  props: {
    /**
     * The selected chat item object.
     */
    item: { ...DEFAULT_OBJECT_PROP },
    /**
     * Type of chat item.
     */
    type: { ...DEFAULT_STRING_PROP },
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        section: style.sectionStyle(),
        header: style.headerStyle(this.theme),
        contentItem: style.contentItemStyle(),
        headerTitle: style.headerTitleStyle(),
        sectionContent: style.sectionContentStyle(),
        userDetail: style.userDetailStyle(this.theme),
        itemLink: style.itemLinkStyle(true, this.theme),
        headerClose: style.headerCloseStyle(navigateIcon),
        sectionHeader: style.sectionHeaderStyle(this.theme),
        privacySection: style.privacySectionStyle(this.theme),
      };
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
.cometchat__detailpane * {
  box-sizing: border-box;
  font-family: var(--detailpane-font-family);
}
.cometchat__detailpane__section:not(:last-of-type) {
  margin-bottom: 16px;
}
.cometchat__detailpane__section__privacy > div {
  color: var(--privacy-color-red);
  font-weight: 600;
  cursor: pointer;
  font-size: 12px;
}
.cometchat__detailpane__content__item:not(:first-of-type):not(:last-of-type) {
  padding: 6px 0px;
}
@media (min-width: 320px) and (max-width: 767px) {
  .cometchat__header__close {
    display: block !important;
  }
}
</style>