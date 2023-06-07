<template>
  <div class="message_receipt__backdrop"></div>
  <div
    class="message_receipt__container"
    :style="computedStyles.wrapperStyle()"
  >
    <div class="header">
      <span class="header-title" :style="computedStyles.titleStyle()"
        >Message Receipt</span
      >
      <div
        class="close__icon"
        :style="computedStyles.closeIconStyle()"
        @click="onClose()"
      ></div>
    </div>
    <div class="description" :style="computedStyles.cardDescriptionStyle()">
      CometChatReceipt component renders the receipts such as sending, sent,
      delivered, read and error state indicator of a message..
    </div>
    <div class="receipt__container">
      <div class="cards" :style="computedStyles.cardStyle()">
        <div class="card__title" :style="computedStyles.sectionHeaderStyle()">
          Progress Status
        </div>
        <div class="receipt__icon">
          <cometchat-receipt :receipt="receipt.wait"></cometchat-receipt>
        </div>
      </div>
      <div class="cards" :style="computedStyles.cardStyle()">
        <div class="card__title" :style="computedStyles.sectionHeaderStyle()">
          Sent Receipt
        </div>
        <div class="receipt__icon">
          <cometchat-receipt :receipt="receipt.sent"></cometchat-receipt>
        </div>
      </div>
      <div class="cards" :style="computedStyles.cardStyle()">
        <div class="card__title" :style="computedStyles.sectionHeaderStyle()">
          Delivered Receipt
        </div>
        <div class="receipt__icon">
          <cometchat-receipt :receipt="receipt.delivered"></cometchat-receipt>
        </div>
      </div>
      <div class="cards" :style="computedStyles.cardStyle()">
        <div class="card__title" :style="computedStyles.sectionHeaderStyle()">
          Read Receipt
        </div>
        <div class="receipt__icon">
          <cometchat-receipt :receipt="receipt.read"></cometchat-receipt>
        </div>
      </div>
      <div class="cards" :style="computedStyles.cardStyle()">
        <div class="card__title" :style="computedStyles.sectionHeaderStyle()">
          Error Status
        </div>
        <div class="receipt__icon">
          <cometchat-receipt :receipt="receipt.error"></cometchat-receipt>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";

import {
  CometChatTheme,
  Close2xIcon,
  fontHelper,
  Receipts,
} from "@cometchat/chat-uikit-vue";

import ""@cometchat/uikit-elements";

export default defineComponent({
  name: "MessageReceipt",
  emits: ["close-message-receipt"],
  components: {},

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );

    let receipt: typeof Receipts = Receipts;

    let type = ref("");

    let closeIconURL: string = Close2xIcon;

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode || type.value ? getStyles() : {};
    });

    const onClose = () => {
      context.emit("close-message-receipt", {});
    };

    const handleMouseHover = (typePara: string, event: any) => {
      type.value = event.type == "mouseenter" ? typePara : "";
    };

    const getStyles = () => {
      return {
        closeIconStyle: () => {
          return {
            WebkitMask: `url(${closeIconURL}) center center no-repeat`,
            background: theme.value.palette.getAccent600(),
          };
        },
        titleStyle: () => {
          return {
            font: fontHelper(theme.value.typography.title2),
            color: theme.value.palette.getAccent(),
          };
        },
        wrapperStyle: () => {
          return {
            background: theme.value.palette.getBackground(),
            boxShadow: `${theme.value.palette.getAccent400()} 0px 0px 3px`,
          };
        },
        cardDescriptionStyle: () => {
          return {
            font: fontHelper(theme.value.typography.subtitle2),
            color: theme.value.palette.getAccent600(),
          };
        },
        sectionHeaderStyle: () => {
          return {
            font: fontHelper(theme.value.typography.subtitle2),
            color: theme.value.palette.getAccent(),
          };
        },
        cardStyle: () => {
          return {
            background: theme.value.palette.getBackground(),
            boxShadow: `${theme.value.palette.getAccent400()} 0px 0px 3px`,
          };
        },
      };
    };

    return {
      computedStyles,
      onClose,

      handleMouseHover,
      receipt,
    };
  },
});
</script>
<style scoped>
.close__icon {
  height: 30px;
  width: 30px;
  cursor: pointer;
}
.message_receipt__backdrop {
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.header-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.description {
  margin: 8px 0;
}
.message_receipt__container {
  height: fit-content;
  width: fit-content;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  position: absolute;
  z-index: 10;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.receipt__container {
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0;
}
.receipt__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
}
.cards {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  margin: 8px;
  padding: 8px;
  flex-basis: 30%;
  flex-shrink: 1;
}
@media (min-width: 320px) and (max-width: 767px) {
  .cards {
    flex-grow: 1;
    flex-shrink: 1 !important;
    flex-basis: 100% !important;
  }
  .message_receipt__container {
    width: 92%;
  }
}
</style>
