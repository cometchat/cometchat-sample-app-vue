<template>
  <div class="sound_manager__backdrop"></div>
  <div class="sound_manager__container" :style="computedStyles.wrapperStyle()">
    <div class="header">
      <span class="title" :style="computedStyles.titleStyle()"
        >Sound Manager</span
      >
      <div
        class="close__icon"
        :style="computedStyles.closeIconStyle()"
        @click="onClose()"
      ></div>
    </div>
    <div class="description" :style="computedStyles.cardDescriptionStyle()">
      CometChatSoundManager allows you to play different types of audio which is
      required for incoming and outgoing events in UI Kit. for example, events
      like incoming and outgoing messages.
    </div>
    <div class="incoming__sound">
      <div class="sound__name" :style="computedStyles.subtitleStyle()">
        Incoming Messages
      </div>
      <div class="play__button">
        <button
          class="cc-play-button"
          :style="computedStyles.buttonStyle()"
          @click="playIncoming()"
        >
          Play
        </button>
      </div>
    </div>
    <div class="outgoing__sound">
      <div class="sound__name" :style="computedStyles.subtitleStyle()">
        Outgoing Messages
      </div>
      <div class="play__button">
        <button
          class="cc-play-button"
          :style="computedStyles.buttonStyle()"
          @click="playOutgoing()"
        >
          Play
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import {
  CometChatTheme,
  Close2xIcon,
  fontHelper,
} from "@cometchat/chat-uikit-vue";
import { CometChatSoundManager } from "@cometchat/uikit-shared";

export default defineComponent({
  name: "CometChatSoundManager",
  emits: ["close-sound-manager"],
  components: {},

  setup(props, context) {
    let { theme }: any = inject("theme", new CometChatTheme({}));
    let closeIconURL: string = Close2xIcon;

    const playIncoming = () => {
      CometChatSoundManager.play(CometChatSoundManager.Sound.incomingMessage);
    };
    const playOutgoing = () => {
      CometChatSoundManager.play(CometChatSoundManager.Sound.outgoingMessage);
    };

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode ? getStyles() : {};
    });

    const onClose = () => {
      context.emit("close-sound-manager", {});
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
        subtitleStyle: () => {
          return {
            font: fontHelper(theme.value.typography.subtitle1),
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
        buttonStyle: () => {
          return {
            font: fontHelper(theme.value.typography.subtitle1),
            color: theme.value.palette.getAccent("dark"),
            backgroundColor: theme.value.palette.getPrimary(),
          };
        },
      };
    };

    return { computedStyles, playIncoming, playOutgoing, onClose };
  },
});
</script>
<style scoped>
.close__icon {
  height: 30px;
  width: 30px;
  cursor: pointer;
}
.sound_manager__backdrop {
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
.title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.incoming__sound {
  display: flex;
  justify-content: space-between;
}
.outgoing__sound {
  display: flex;
  justify-content: space-between;
}
.sound__name {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cc-play-button {
  height: 34px;
  width: 60px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.sound_manager__container {
  height: 260px;
  width: 320px;
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
</style>
