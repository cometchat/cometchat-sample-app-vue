<template>
  <cometchat-backdrop>
    <div class="scheduler__container" :style="computedStyles.wrapperStyle()">
      <div class="header">
        <span class="header-title" :style="computedStyles.titleStyle()"
          >Scheduler Bubble</span
        >
        <div
          class="close__icon"
          :style="computedStyles.closeIconStyle()"
          @click="onClose()"
        ></div>
      </div>
      <div class="description" :style="computedStyles.cardDescriptionStyle()">
        The CometChatSchedulerBubble component is used to render a scheduler
        within a chat bubble. To learn more about this component tap here
      </div>
      <div class="scheduler">
        <CometChatSchedulerBubble
          :schedulerMessage="getSchedulerMessage()"
          :schedulerBubbleStyle="getSchedulerMessageBubbleStyle()"
        >
        </CometChatSchedulerBubble>
      </div>
    </div>
  </cometchat-backdrop>
</template>

<script lang="ts">
import {
  CSSProperties,
  ComputedRef,
  Ref,
  computed,
  defineComponent,
  inject,
  ref,
} from "vue";

import {
  CometChatTheme,
  Close2xIcon,
  fontHelper,
  CometChatSchedulerBubble,
  SchedulerMessage,
  AvatarStyle,
  ListItemStyle,
  CalendarStyle,
  TimeSlotStyle,
  QuickViewStyle,
  SchedulerBubbleStyle,
} from "@cometchat/chat-uikit-vue";

import "@cometchat/uikit-elements";

export default defineComponent({
  name: "SchedulerBubble",
  emits: ["close-scheduler-bubble"],
  components: { CometChatSchedulerBubble },

  setup(props, context) {
    let { theme }: { theme: Ref<CometChatTheme> } = inject("theme", {
      theme: ref(new CometChatTheme({})),
    });
    let closeIconURL: string = Close2xIcon;

    const computedStyles: ComputedRef<Record<string, () => CSSProperties>> =
      computed(() => {
        return theme.value.palette.mode ? getStyles() : {};
      });

    const onClose = () => {
      context.emit("close-scheduler-bubble", {});
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
      };
    };

    function getSchedulerMessageBubbleStyle() {
      const avatarStyle = new AvatarStyle({
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        border: "none",
        backgroundColor: theme.value.palette.getAccent700(),
        nameTextColor: theme.value.palette.getAccent900(),
        backgroundSize: "cover",
        nameTextFont: fontHelper(theme.value.typography.subtitle1),
      });
      const listItemStyle = new ListItemStyle({
        height: "auto",
        width: "100%",
        background: "inherit",
        activeBackground: "transparent",
        borderRadius: "0",
        titleFont: fontHelper(theme.value.typography.text1),
        titleColor: theme.value.palette.getAccent(),
        border: "none",
        separatorColor: "",
        hoverBackground: "transparent",
      });
      const calendarStyle = new CalendarStyle({
        height: "100%",
        width: "100%",
        border: "none",
        borderRadius: "0",
        background: "transparent",
        dateTextFont: fontHelper(theme.value.typography.subtitle2),
        dateTextColor: theme.value.palette.getAccent(),
        dayTextFont: fontHelper(theme.value.typography.text2),
        dayTextColor: theme.value.palette.getAccent(),
        monthYearTextFont: fontHelper(theme.value.typography.text2),
        monthYearTextColor: theme.value.palette.getAccent(),
        defaultDateTextBackground: "transparent",
        disabledDateTextColor: theme.value.palette.getAccent400(),
        disabledDateTextFont: fontHelper(theme.value.typography.subtitle2),
        disabledDateTextBackground: "transparent",
        titleTextFont: fontHelper(theme.value.typography.text1),
        titleTextColor: theme.value.palette.getAccent(),
        timezoneTextFont: fontHelper(theme.value.typography.caption2),
        timezoneTextColor: theme.value.palette.getAccent(),
        arrowButtonTextColor: theme.value.palette.getAccent(),
        arrowButtonTextFont: fontHelper(theme.value.typography.title2),
      });
      const timeSlotStyle = new TimeSlotStyle({
        background: "transparent",
        height: "fit-content",
        width: "100%",
        border: "none",
        borderRadius: "0",
        calendarIconTint: theme.value.palette.getAccent(),
        timezoneIconTint: theme.value.palette.getAccent(),
        emptySlotIconTint: theme.value.palette.getAccent500(),
        emptySlotTextColor: theme.value.palette.getAccent500(),
        emptySlotTextFont: fontHelper(theme.value.typography.subtitle1),
        dateTextColor: theme.value.palette.getAccent(),
        dateTextFont: fontHelper(theme.value.typography.subtitle1),
        seperatorTint: theme.value.palette.getAccent100(),
        slotBackground: theme.value.palette.getAccent900(),
        slotBorder: "none",
        slotBorderRadius: "8px",
        slotTextColor: theme.value.palette.getAccent(),
        slotTextFont: fontHelper(theme.value.typography.caption2),
        timezoneTextColor: theme.value.palette.getAccent(),
        timezoneTextFont: fontHelper(theme.value.typography.caption2),
        titleTextColor: theme.value.palette.getAccent(),
        titleTextFont: fontHelper(theme.value.typography.text1),
      });
      const qucikViewStyle = new QuickViewStyle({
        background: theme.value.palette.getAccent50(),
        height: "fit-content",
        width: "100%",
        titleFont: fontHelper(theme.value.typography.subtitle2),
        titleColor: theme.value.palette.getAccent(),
        subtitleFont: fontHelper(theme.value.typography.subtitle2),
        subtitleColor: theme.value.palette.getAccent600(),
        leadingBarTint: theme.value.palette.getPrimary(),
        leadingBarWidth: "4px",
        borderRadius: "8px",
      });
      return new SchedulerBubbleStyle({
        avatarStyle: avatarStyle,
        listItemStyle: listItemStyle,
        quickViewStyle: qucikViewStyle,
        dateSelectorStyle: calendarStyle,
        timeSlotSelectorStyle: timeSlotStyle,
        backButtonIconTint: theme.value.palette.getPrimary(),
        background: theme.value.palette.getSecondary(),
        height: "100%",
        width: "100%",
        border: `1px solid ${theme.value.palette.getAccent100()}`,
        borderRadius: "8px",
        loadingIconTint: theme.value.palette.getAccent600(),
        suggestedTimeBackground: theme.value.palette.getAccent900(),
        suggestedTimeBorder: `1px solid ${theme.value.palette.getPrimary()}`,
        suggestedTimeBorderRadius: "8px",
        suggestedTimeDisabledBackground: theme.value.palette.getAccent50(),
        suggestedTimeDisabledBorder: `1px solid ${theme.value.palette.getAccent200()}`,
        suggestedTimeDisabledBorderRadius: "8px",
        suggestedTimeDisabledTextColor: theme.value.palette.getAccent700(),
        suggestedTimeDisabledTextFont: fontHelper(theme.value.typography.text3),
        suggestedTimeTextColor: theme.value.palette.getPrimary(),
        suggestedTimeTextFont: fontHelper(theme.value.typography.text3),
        moreButtonDisabledTextBackground: "transparent",
        moreButtonDisabledTextBorder: "none",
        moreButtonDisabledTextBorderRadius: "0",
        moreButtonDisabledTextColor: theme.value.palette.getAccent600(),
        moreButtonDisabledTextFont: fontHelper(theme.value.typography.caption2),
        moreButtonTextBackground: "transparent",
        moreButtonTextBorder: "none",
        moreButtonTextBorderRadius: "0",
        moreButtonTextColor: theme.value.palette.getPrimary(),
        moreButtonTextFont: fontHelper(theme.value.typography.caption2),
        goalCompletionTextColor: theme.value.palette.getAccent(),
        goalCompletionTextFont: fontHelper(theme.value.typography.text3),
        errorTextColor: theme.value.palette.getError(),
        errorTextFont: fontHelper(theme.value.typography.text3),
        scheduleButtonStyle: {
          iconHeight: "16px",
          iconWidth: "16px",
          buttonIconTint: theme.value.palette.getAccent(),
          buttonTextFont: fontHelper(theme.value.typography.name),
          buttonTextColor: theme.value.palette.getAccent("dark"),
          border: "none",
          borderRadius: "8px",
          background: theme.value.palette.getPrimary(),
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "8px",
        },
        seperatorTint: theme.value.palette.getAccent200(),
        subtitleTextColor: theme.value.palette.getAccent400(),
        subtitleTextFont: fontHelper(theme.value.typography.name),
        summaryTextColor: theme.value.palette.getAccent(),
        summaryTextFont: fontHelper(theme.value.typography.subtitle1),
        timezoneTextColor: theme.value.palette.getAccent600(),
        timezoneTextFont: fontHelper(theme.value.typography.caption2),
        titleTextColor: theme.value.palette.getAccent(),
        titleTextFont: fontHelper(theme.value.typography.title1),
        timezoneIconTint: theme.value.palette.getAccent(),
        calendarIconTint: theme.value.palette.getAccent(),
        clockIconTint: theme.value.palette.getAccent(),
      });
    }

    function getSchedulerMessage() {
      const json = {
        id: "951",
        conversationId: "group_supergroup",
        sender: "superhero1",
        receiverType: "group",
        receiver: "supergroup",
        category: "interactive",
        type: "scheduler",
        data: {
          duration: 30,
          entities: {
            sender: {
              entity: {
                uid: "superhero1",
                name: "Iron Man",
                role: "default",
                avatar:
                  "https://data-us.cometchat-staging.com/assets/images/avatars/ironman.png",
                status: "available",
                createdAt: 1683717043,
                lastActiveAt: 1704362403,
              },
              entityType: "user",
            },
            receiver: {
              entity: {
                guid: "supergroup",
                icon: "https://data-us.cometchat-staging.com/assets/images/avatars/supergroup.png",
                name: "Comic Heros' Hangout",
                type: "public",
                owner: "superhero1",
                createdAt: 1683717041,
                membersCount: 3,
                conversationId: "group_supergroup",
                onlineMembersCount: 207,
              },
              entityType: "group",
            },
          },
          bufferTime: 0,
          interactionGoal: {
            type: "anyAction",
            elementIds: [],
          },
          interactiveData: {
            title: "Meet with Dr. Jacob",
            duration: 60,
            bufferTime: 15,
            icsFileUrl:
              "https://data-us.cometchat.io/23965108c9b89ad2/media/1704380186_864562419_ab59586ed5ab5f89d2c960457ceee249.ics",
            availability: {
              friday: [
                {
                  to: "2359",
                  from: "0000",
                },
              ],
              monday: [
                {
                  to: "1700",
                  from: "0600",
                },
              ],
              tuesday: [
                {
                  to: "1400",
                  from: "1000",
                },
                {
                  to: "2000",
                  from: "1700",
                },
              ],
              saturday: [
                {
                  to: "0800",
                  from: "0600",
                },
                {
                  to: "2300",
                  from: "1200",
                },
              ],
              thursday: [
                {
                  to: "2359",
                  from: "0000",
                },
              ],
              wednesday: [
                {
                  to: "0800",
                  from: "0600",
                },
                {
                  to: "2300",
                  from: "1200",
                },
              ],
            },
            dateRangeEnd: "2024-02-09",
            timezoneCode: "Asia/Kolkata",
            dateRangeStart: "2023-02-10",
            scheduleElement: {
              action: {
                url: "test.com",
                method: "post",
                actionType: "apiAction",
              },
              elementId: "1",
              buttonText: "Schedule",
              elementType: "button",
              disableAfterInteracted: true,
            },
            goalCompletionText: "Appointment scheduled",
            interactableElementIds: ["1"],
            allowSenderInteraction: true,
          },
          allowSenderInteraction: true,
        },
        sentAt: 1706806090,
        updatedAt: 1706806090,
      };

      const schedulerMessage = SchedulerMessage.fromJSON(json);

      return schedulerMessage;
    }
    return {
      computedStyles,
      onClose,
      getSchedulerMessage,
      getSchedulerMessageBubbleStyle,
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

.scheduler {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scheduler__container {
  height: fit-content;
  max-height: 80%;
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
  justify-content: flex-start;
  gap: 12px;
  overflow: scroll;
}
</style>

<!--  -->
