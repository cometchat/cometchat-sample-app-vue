
<template>
  <div :style="styles.stickerWrapper">
    <div v-if="decoratorMessage" :style="styles.stickerMsg">
      <p :style="styles.stickerMsgText">
        {{ decoratorMessage }}
      </p>
    </div>
    <template v-else>
      <div
        class="stickers__close"
        :style="styles.stickerClose"
        @click="emitAction('closeSticker')"
      ></div>
      <div :style="styles.stickerList">
        <div
          :key="i"
          :style="styles.stickerItem"
          v-for="(item, i) in activeStickerList"
          @click="sendStickerMessage(item)"
        >
          <img :src="item.stickerUrl" :alt="item.stickerName" />
        </div>
      </div>
    </template>
    <div
      class="sticker__set"
      v-if="stickerSetList.length"
      :style="styles.stickerSectionList"
    >
      <div
        :key="i"
        :title="item"
        class="sticker__set__item"
        :style="styles.sectionListItem"
        v-for="(item, i) in stickerSetList"
        :class="{ 'sticker__set__item--active': activeStickerSet === item }"
        @click="onStickerSetClicked(item)"
      >
        <img :alt="item" :src="stickerSet[item][0]['stickerUrl']" />
      </div>
    </div>
  </div>
</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import { DEFAULT_OBJECT_PROP } from "../../../resources/constants";
import { propertyCheck, cometChatCommon } from "../../../mixins";

import * as style from "./style";

import closeIcon from "./resources/clear.svg";

/**
 * Used to choose and send sticker messages.
 *
 * @displayName CometChatStickerKeyboard
 */
export default {
  name: "CometChatStickerKeyboard",
  mixins: [propertyCheck, cometChatCommon],
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
  },
  data() {
    return {
      stickerSet: {},
      stickerList: [],
      decoratorMessage: "",
      activeStickerList: [],
      activeStickerSet: null,
    };
  },
  computed: {
    /**
     * Computed styles for the component.
     */
    styles() {
      return {
        stickerMsg: style.stickerMsgStyle(),
        stickerItem: style.stickerItemStyle(),
        stickerList: style.stickerListStyle(),
        stickerClose: style.stickerCloseStyle(closeIcon),
        stickerWrapper: style.stickerWrapperStyle(this.theme),
        stickerMsgText: style.stickerMsgTextStyle(this.theme),
        sectionListItem: style.sectionListItemStyle(this.theme),
        stickerSectionList: style.stickerSectionListStyle(this.theme),
      };
    },
    /**
     * List of all sticker sets.
     */
    stickerSetList() {
      return Object.keys(this.stickerSet);
    },
  },
  methods: {
    /**
     * Gets all available sticker sets.
     */
    async getStickers() {
      this.decoratorMessage = "Loading...";
      try {
        const stickers = await CometChat.callExtension(
          "stickers",
          "GET",
          "v1/fetch",
          null
        );

        let activeStickerSet = null;
        const customStickers = this.hasProperty(stickers, "customStickers")
          ? stickers["customStickers"]
          : [];
        const defaultStickers = this.hasProperty(stickers, "defaultStickers")
          ? stickers["defaultStickers"]
          : [];

        defaultStickers.sort(function (a, b) {
          return a.stickerSetOrder - b.stickerSetOrder;
        });

        customStickers.sort(function (a, b) {
          return a.stickerSetOrder - b.stickerSetOrder;
        });

        const stickerList = [...defaultStickers, ...customStickers];

        if (stickerList.length === 0) {
          this.decoratorMessage = "No stickers found";
        }

        const stickerSet = stickerList.reduce((r, sticker, index) => {
          const { stickerSetName } = sticker;
          if (index === 0) {
            activeStickerSet = stickerSetName;
          }

          r[stickerSetName] = [...(r[stickerSetName] || []), { ...sticker }];

          return r;
        }, {});

        let activeStickerList = [];
        if (Object.keys(stickerSet).length) {
          Object.keys(stickerSet).forEach((key) => {
            stickerSet[key].sort(function (a, b) {
              return a.stickerOrder - b.stickerOrder;
            });
          });

          activeStickerList = stickerSet[activeStickerSet];
        }

        this.decoratorMessage = "";

        this.stickerSet = stickerSet;
        this.stickerList = stickerList;
        this.activeStickerSet = activeStickerSet;
        this.activeStickerList = activeStickerList;
      } catch (error) {
        console.error("Error: ", error);
        this.decoratorMessage = "No stickers found";

        this.stickerSet = {};
        this.activeStickerList = [];
      }
    },
    /**
     * Sends a sticker message.
     */
    sendStickerMessage(item) {
      this.emitAction("sendSticker", { sticker: item });
    },
    /**
     * Handles sending a sticker.
     */
    onStickerSetClicked(item) {
      this.activeStickerSet = item;
      this.activeStickerList = [...this.stickerSet[item]];
    },
  },
  beforeMount() {
    this.getStickers();
  },
};
</script>
<style scoped>
.sticker__set__item:not(:first-of-type) {
  margin-left: 16px;
}
.sticker__set__item--active {
  box-sizing: border-box;
  border-bottom: 1px solid var(--sticker-set-active-color);
}
/* .sticker__set::-webkit-scrollbar {
}
.sticker__set::-webkit-scrollbar-thumb {
} */
</style>