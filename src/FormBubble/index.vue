<template>
  <cometchat-backdrop>
    <div class="form__container" :style="computedStyles.wrapperStyle()">
      <div class="header">
        <span class="header-title" :style="computedStyles.titleStyle()"
          >Form Bubble</span
        >
        <div
          class="close__icon"
          :style="computedStyles.closeIconStyle()"
          @click="onClose()"
        ></div>
      </div>
      <div class="description" :style="computedStyles.cardDescriptionStyle()">
        The CometChatFormBubble component is used to render a form within a chat
        bubble. To learn more about this component tap here
      </div>
      <div class="form">
        <CometChatFormBubble
          :message="getFormMessage()"
          :formBubbleStyle="getFormMessageBubbleStyle()"
        >
        </CometChatFormBubble>
      </div>
    </div>
  </cometchat-backdrop>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";

import {
  CometChatTheme,
  Close2xIcon,
  fontHelper,
  APIAction,
  ButtonElement,
  FormMessage,
  CometChatFormBubble,
  InputStyle,
  LabelStyle,
  RadioButtonStyle,
  CheckboxStyle,
  DropdownStyle,
  FormBubbleStyle,
} from "@cometchat/chat-uikit-vue";

import "@cometchat/uikit-elements";

export default defineComponent({
  name: "FormBubble",
  emits: ["close-form-bubble"],
  components: { CometChatFormBubble },

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );
    let closeIconURL: string = Close2xIcon;

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode ? getStyles() : {};
    });

    const onClose = () => {
      context.emit("close-form-bubble", {});
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

    function getFormMessageBubbleStyle() {
      let textStyle = new InputStyle({
        width: "100%",
        height: "30px",
        border: `1px solid ${theme.value.palette.getAccent100()}`,
        borderRadius: "3px",
        padding: "0px 0px 0px 5px",
        placeholderTextColor: theme.value.palette.getAccent400(),
        placeholderTextFont: fontHelper(theme.value.typography.subtitle2),
        textFont: fontHelper(theme.value.typography.subtitle2),
        textColor: theme.value.palette.getAccent(),
        background: theme.value.palette.getBackground(),
      });
      const labelStyle = new LabelStyle({
        textFont: fontHelper(theme.value.typography.subtitle1),
        textColor: theme.value.palette.getAccent(),
        background: "transparent",
      });
      const radioButtonStyle = new RadioButtonStyle({
        height: "16px",
        width: "16px",
        border: "none",
        labelTextFont: fontHelper(theme.value.typography.subtitle2),
        labelTextColor: theme.value.palette.getAccent600(),
        borderRadius: "4px",
        background: "",
      });
      const checkboxStyle = new CheckboxStyle({
        height: "16px",
        width: "16px",
        border: "none",
        borderRadius: "4px",
        background: "",
        labelTextFont: fontHelper(theme.value.typography.subtitle2),
        labelTextColor: theme.value.palette.getAccent600(),
      });
      const dropdownStyle = new DropdownStyle({
        height: "35px",
        width: "100%",
        background: theme.value.palette.getBackground(),
        border: `1px solid ${theme.value.palette.getAccent100()}`,
        borderRadius: "12px",
        activeTextFont: fontHelper(theme.value.typography.subtitle2),
        activeTextColor: theme.value.palette.getAccent(),
        arrowIconTint: theme.value.palette.getAccent700(),
        textFont: fontHelper(theme.value.typography.subtitle2),
        textColor: theme.value.palette.getAccent(),
        optionBackground: theme.value.palette.getBackground(),
        optionBorder: `1px solid ${theme.value.palette.getAccent100()}`,
        optionHoverBorder: `1px solid ${theme.value.palette.getAccent100()}`,
        hoverTextFont: fontHelper(theme.value.typography.subtitle2),
        hoverTextColor: theme.value.palette.getAccent(),
        hoverTextBackground: theme.value.palette.getAccent100(),
      });
      const buttonGroupStyle = {
        height: "40px",
        width: "100%",
        background: theme.value.palette.getPrimary(),
        border: `none`,
        borderRadius: "12px",
        buttonTextFont: fontHelper(theme.value.typography.subtitle2),
        buttonTextColor: theme.value.palette.getBackground(),
        justifyContent: "center",
      };
      const singleSelectStyle = {
        height: "100%",
        width: "100%",
        background: theme.value.palette.getBackground(),
        border: "none",
        borderRadius: "12px",
        activeTextFont: fontHelper(theme.value.typography.subtitle2),
        activeTextColor: theme.value.palette.getAccent(),
        activeTextBackground: theme.value.palette.getAccent100(),
        textFont: fontHelper(theme.value.typography.subtitle2),
        textColor: theme.value.palette.getAccent(),
        optionBackground: theme.value.palette.getBackground(),
        optionBorder: `1px solid ${theme.value.palette.getAccent100()}`,
        optionBorderRadius: "2px",
        hoverTextFont: fontHelper(theme.value.typography.subtitle2),
        hoverTextColor: theme.value.palette.getAccent(),
        hoverTextBackground: theme.value.palette.getAccent100(),
      };
      const quickViewStyle = {
        background: "transparent",
        height: "fit-content",
        width: "100%",
        titleFont: fontHelper(theme.value.typography.subtitle2),
        titleColor: theme.value.palette.getPrimary(),
        subtitleFont: fontHelper(theme.value.typography.subtitle2),
        subtitleColor: theme.value.palette.getAccent600(),
        leadingBarTint: theme.value.palette.getPrimary(),
        leadingBarWidth: "4px",
        borderRadius: "8px",
        closeIconTint: "",
      };
      return new FormBubbleStyle({
        width: "300px",
        height: "fit-content",
        border: "1px solid #e0e0e0",
        background: "transparent",
        wrapperBackground: theme.value.palette.getBackground(),
        borderRadius: "8px",
        wrapperBorderRadius: "8px",
        textInputStyle: textStyle,
        labelStyle: labelStyle,
        radioButtonStyle: radioButtonStyle,
        checkboxStyle: checkboxStyle,
        dropdownStyle: dropdownStyle,
        buttonStyle: buttonGroupStyle,
        singleSelectStyle: singleSelectStyle,
        quickViewStyle: quickViewStyle,
        titleColor: theme.value.palette.getAccent(),
        titleFont: fontHelper(theme.value.typography.title1),
        goalCompletionTextColor: theme.value.palette.getAccent(),
        goalCompletionTextFont: fontHelper(theme.value.typography.subtitle1),
        wrapperPadding: "2px",
      });
    }

    function getFormMessage() {
      const json = {
        id: "2862",
        muid: "1698667506320",
        conversationId: "group_group_1696408979857",
        sender: "nakul",
        receiverType: "group",
        receiver: "group_1696408979857",
        category: "interactive",
        type: "form",
        data: {
          entities: {
            sender: {
              entity: {
                uid: "nakul",
                name: "Nakul",
                role: "default",
                status: "available",
                lastActiveAt: 1698830332,
              },
              entityType: "user",
            },
            receiver: {
              entity: {
                guid: "group_1696408979857",
                name: "chutiyaGang",
                type: "public",
                owner: "vivek",
                createdAt: 1696408980,
                updatedAt: 1698667314,
                membersCount: 7,
                conversationId: "group_group_1696408979857",
                onlineMembersCount: 14,
              },
              entityType: "group",
            },
          },
          metadata: {
            data: {
              text: "Thanks For filling the Form!",
            },
            type: "text",
            category: "message",
            receiver: "{$s}",
            receiverType: "{$t}",
          },
          resource:
            "WEB-4_0_1-a9b124b3-e092-43a7-9f78-cf507c93d153-1698830285347",
          interactions: [
            {
              elementId: "element8",
              interactedAt: 1699874632,
            },
          ],
          interactionGoal: {
            type: "none",
            elementIds: [],
          },
          interactiveData: {
            title: "Society Survey",
            formFields: [
              {
                label: "Name",
                maxLines: 1,
                optional: false,
                elementId: "element1",
                elementType: "textInput",
                defaultValue: "vivek",
              },
              {
                label: "Last Name",
                maxLines: 1,
                optional: false,
                elementId: "element2",
                elementType: "textInput",
              },
              {
                label: "Address",
                maxLines: 5,
                optional: false,
                elementId: "element3",
                elementType: "textInput",
              },
              {
                label: "Country",
                options: [
                  {
                    label: "INDIA",
                    value: "option1",
                  },
                  {
                    label: "AUSTRALIA",
                    value: "option2",
                  },
                ],
                optional: false,
                elementId: "element4",
                elementType: "dropdown",
                defaultValue: "option1",
              },
              {
                label: "Services",
                options: [
                  {
                    label: "Garbage",
                    value: "option1",
                  },
                  {
                    label: "Electricity Bill",
                    value: "option2",
                  },
                  {
                    label: "Lift",
                    value: "option3",
                  },
                ],
                optional: false,
                elementId: "element5",
                elementType: "checkbox",
                defaultValue: ["option1", "option2"],
              },
              {
                label: "Wing",
                options: [
                  {
                    label: "A",
                    value: "option1",
                  },
                  {
                    label: "B",
                    value: "option2",
                  },
                ],
                optional: false,
                elementId: "element6",
                elementType: "singleSelect",
                defaultValue: "option1",
              },
              {
                action: {
                  url: "https://www.cometchat.com/",
                  actionType: "urlNavigation",
                },
                elementId: "element9",
                buttonText: "About us",
                elementType: "button",
                disableAfterInteracted: true,
              },
            ],
            submitElement: {
              action: {
                url: "",
                actionType: "urlNavigation",
              },
              elementId: "element8",
              buttonText: "Submit",
              elementType: "button",
              disableAfterInteracted: true,
            },
          },
          allowSenderInteraction: true,
        },
        sentAt: 1698830332,
        updatedAt: 1698830332,
      };

      const formMessage = FormMessage.fromJSON(json);

      return formMessage;
    }
    return {
      computedStyles,
      onClose,
      getFormMessage,
      getFormMessageBubbleStyle,
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

.form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form__container {
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
