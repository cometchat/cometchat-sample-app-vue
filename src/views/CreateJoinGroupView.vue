<template>
  <div v-if="route.name == 'creategroup'" :style="computedStyles.wrapperStyle">
    <cometchat-backdrop>
      <cometchat-create-group
        :createGroupStyle="computedStyles.createGroupStyle"
      >
      </cometchat-create-group>
    </cometchat-backdrop>
  </div>
  <div v-if="route.name == 'joingroup'" :style="computedStyles.wrapperStyle">
    <cometchat-join-group
      :joinGroupStyle="computedStyles.joinGroupStyle"
    ></cometchat-join-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onBeforeMount, ref } from "vue";

import { CometChatTheme, fontHelper } from "@cometchat/chat-uikit-vue";

import "@cometchat/uikit-elements";
import { CometChat } from "@cometchat-pro/chat";
import { CreateGroupStyle, JoinGroupStyle } from "@cometchat/uikit-elements";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "CreateJoinGroupView",

  components: {},

  setup(props, context) {
    let { theme, switchThemeMode }: any = inject(
      "theme",
      new CometChatTheme({})
    );

    let route = useRoute();

    const getCreateGroupStyle = () => {
      return new CreateGroupStyle({
        boxShadow: `${theme.value.palette.getAccent100()} 4px 16px 32px 4px`,
        groupTypeTextFont: fontHelper(theme.value.typography.subtitle2),
        groupTypeBorder: `1px solid ${theme.value.palette.getAccent600()}`,
        groupTypeBorderRadius: "0",
        groupTypeTextColor: theme.value.palette.getAccent(),
        groupTypeTextBackground: "transparent",
        groupTypeBackground: theme.value.palette.getAccent100(),
        groupTypeBoxShadow: "",
        activeGroupTypeTextFont: fontHelper(theme.value.typography.subtitle2),
        activeGroupTypeTextColor: theme.value.palette.getAccent(),
        activeGroupTypeBackground: theme.value.palette.getAccent900(),
        activeGroupTypeBoxShadow: `${theme.value.palette.getAccent200()} 0 3px 8px 0`,
        activeGroupTypeBorderRadius: "8px",
        activeGroupTypeBorder: "none",
        groupTypeTextBoxShadow: "none",
        groupTypeTextBorderRadius: "0",
        closeIconTint: theme.value.palette.getPrimary(),
        titleTextFont: fontHelper(theme.value.typography.title1),
        titleTextColor: theme.value.palette.getAccent(),
        errorTextFont: fontHelper(theme.value.typography.subtitle1),
        errorTextBackground: theme.value.palette.getError(),
        errorTextBorderRadius: "8px",
        errorTextBorder: "none",
        errorTextColor: theme.value.palette.getError(),
        nameInputPlaceholderTextFont: fontHelper(
          theme.value.typography.subtitle1
        ),
        nameInputPlaceholderTextColor: theme.value.palette.getAccent600(),
        nameInputBackground: theme.value.palette.getAccent100(),
        nameInputTextFont: fontHelper(theme.value.typography.subtitle1),
        nameInputTextColor: theme.value.palette.getAccent(),
        nameInputBorder: "none",
        nameInputBorderRadius: "8px",
        nameInputBoxShadow: `${theme.value.palette.getAccent100()} 0 0 0 1px`,
        passwordInputPlaceholderTextFont: fontHelper(
          theme.value.typography.subtitle1
        ),
        passwordInputPlaceholderTextColor: theme.value.palette.getAccent600(),
        passwordInputBackground: theme.value.palette.getAccent100(),
        passwordInputBorder: "none",
        passwordInputBorderRadius: "8px",
        passwordInputBoxShadow: `${theme.value.palette.getAccent100()} 0 0 0 1px`,
        passwordInputTextFont: fontHelper(theme.value.typography.subtitle1),
        passwordInputTextColor: theme.value.palette.getAccent(),
        createGroupButtonTextFont: fontHelper(theme.value.typography.text2),
        createGroupButtonTextColor: theme.value.palette.getAccent900("light"),
        createGroupButtonBackground: theme.value.palette.getPrimary(),
        createGroupButtonBorderRadius: "8px",
        createGroupButtonBorder: "none",
        height: "620px",
        width: "360px",
        borderRadius: "8px",
        background: theme.value.palette.getBackground(),
      });
    };

    const getJoinGroupStyle = () => {
      return new JoinGroupStyle({
        boxShadow: `${theme.value.palette.getAccent100()} 0px 16px 32px 0px`,
        titleTextFont: fontHelper(theme.value.typography.title1),
        titleTextColor: theme.value.palette.getAccent(),
        passwordInputPlaceholderTextFont: fontHelper(
          theme.value.typography.subtitle1
        ),
        passwordInputPlaceholderTextColor: theme.value.palette.getAccent600(),
        passwordInputBackground: theme.value.palette.getAccent100(),
        passwordInputBorder: "none",
        passwordInputBorderRadius: "8px",
        passwordInputBoxShadow: `${theme.value.palette.getAccent100()} 0 0 0 1px`,
        passwordInputTextFont: fontHelper(theme.value.typography.subtitle1),
        passwordInputTextColor: theme.value.palette.getAccent(),
        height: "100%",
        width: "100%",
        joinButtonTextFont: fontHelper(theme.value.typography.subtitle1),
        joinButtonTextColor: theme.value.palette.getAccent("dark"),
        joinButtonBackground: theme.value.palette.getPrimary(),
        joinButtonBorderRadius: "8px",
        joinButtonBorder: "none",
        background: theme.value.palette.getBackground(),
      });
    };

    const computedStyles: any = computed(() => {
      return theme.value.palette.mode
        ? {
            createGroupStyle: getCreateGroupStyle(),
            wrapperStyle: {
              backgroundColor: theme.value.palette.getBackground(),
              height: "100%",
              width: "100%",
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
            },
            joinGroupStyle: getJoinGroupStyle(),
          }
        : {};
    });
    let user: any = ref(null);

    onBeforeMount(async () => {
      user.value = await CometChat.getUser("superhero2");
    });

    return {
      computedStyles,
      user,
      route,
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

.file {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file__container {
  height: fit-content;
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
}
</style>
