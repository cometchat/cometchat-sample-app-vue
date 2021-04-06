<template>
  <div ref="parentElement" :style="styles.reactionContainer">
    <span
      :key="i"
      :style="styles.reactionEmoji"
      class="live__reaction__emoji"
      v-for="(_, i) in Array(6).fill(0)"
    >
      <img :src="reactionIconSrc" :alt="reaction" />
    </span>
  </div>
</template>
<script>
import {
  DEFAULT_OBJECT_PROP,
  DEFAULT_STRING_PROP,
} from "../../../resources/constants";

import * as enums from "../../../util/enums.js";

import heart from "./resources/heart.png";

import * as style from "./style";

/**
 * Displays live reaction animation.
 *
 * @displayName CometChatLiveReactions
 */
export default {
  name: "CometChatLiveReactions",
  props: {
    /**
     * Theme of the UI.
     */
    theme: { ...DEFAULT_OBJECT_PROP },
    /**
     * The reaction to animate.
     */
    reaction: { ...DEFAULT_STRING_PROP },
  },
  data() {
    return {
      items: [],
      counter: 0,
      timer: null,
      verticalSpeed: 5,
      horizontalSpeed: 2,
      before: Date.now(),
    };
  },
  computed: {
    /**
     * Computed styles for the bubble.
     */
    styles() {
      return {
        reactionEmoji: style.reactionEmojiStyle(),
        reactionContainer: style.reactionContainerStyle(),
      };
    },
    /**
     * Computed reaction icon source.
     */
    reactionIconSrc() {
      return this.reaction
        ? this.icons[enums.LIVE_REACTIONS[this.reaction]]
        : this.icons[enums.LIVE_REACTIONS["heart"]];
    },
    /**
     * Icons computed from file images.
     */
    icons() {
      return {
        heart,
      };
    },
  },
  methods: {
    /**
     * Sets the items before animating
     */
    setItems() {
      this.$nextTick(() => {
        const width = this.$refs.parentElement.offsetWidth;
        const height = this.$refs.parentElement.offsetHeight;

        const elements = this.$refs.parentElement.querySelectorAll(
          ".live__reaction__emoji"
        );

        for (let i = 0; i < elements.length; i++) {
          const element = elements[i],
            elementWidth = element.offsetWidth,
            elementHeight = element.offsetHeight;

          const item = {
            faded: false,
            element: element,
            elementWidth: elementWidth,
            elementHeight: elementHeight,
            ySpeed: -this.verticalSpeed,
            random: (Math.random() / 2 + 0.5) * i * 10000,
            omega: (2 * Math.PI * this.horizontalSpeed) / (width * 60),
            x: function (time) {
              return (
                ((Math.sin(this.omega * (time + this.random)) + 1) / 2) *
                (width - elementWidth)
              );
            },
            y: height + (Math.random() + 1) * i * elementHeight,
          };

          this.items.push(item);
        }
      });
    },
    /**
     * Animates the reaction
     */
    animate() {
      this.$nextTick(() => {
        if (!this.$refs.parentElement) {
          return false;
        }

        const height = this.$refs.parentElement.offsetHeight;
        const time = +new Date();

        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];

          const transformString =
            "translate3d(" + item.x(time) + "px, " + item.y + "px, 0px)";
          item.element.style.transform = transformString;

          item.element.style.visibility = "visible";

          if (item.y <= height) {
            item.element.classList.add("live__reaction__emoji--fade");
            item.faded = true;
          }

          item.y += item.ySpeed;
        }

        if (this.counter < 500) {
          this.requestAnimation();
        }

        this.counter++;
      });
    },
    /**
     * Looper function that controls the animation
     */
    requestAnimation() {
      this.timer = setTimeout(this.animate, 1000 / 60);
    },
  },
  mounted() {
    this.setItems();
    this.requestAnimation();
  },
  beforeDestroy() {
    this.timer = null;
  },
};
</script>
<style>
.live__reaction__emoji--fade {
  opacity: 0 !important;
}
</style>