<template>
  <CometChatCallLogDetails v-if="call" :call="call"></CometChatCallLogDetails>
</template>
<script lang="ts">
import {
  defineComponent,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  ref,
} from "vue";

import {
  CometChatCallLogDetails,
  CometChatLocalize,
  CometChatUIKit,
} from "@cometchat/chat-uikit-vue";
import { CallLog, CallUser } from "@cometchat/calls-sdk-javascript";

export default defineComponent({
  name: "CallLogDetailsView",
  components: { CometChatCallLogDetails },
  props: {
    language: {
      type: String,
    },
  },
  setup() {
    let { isMobileView }: { isMobileView: boolean } = inject("isMobileView")!;
    const loggedInUser: any = ref(null);
    const call: any = ref(null);
    onBeforeUnmount(() => {
      CometChatLocalize.init("en");
    });

    onBeforeMount(() => {
      CometChatUIKit.getLoggedinUser()?.then((user) => {
        loggedInUser.value = user;
        call.value = getCall();
      });
    });

    function getCall() {
      const initiator = CallUser.getUserFromJson({
        name: loggedInUser.value.name,
        avatar: loggedInUser.value.avatar,
        uid: loggedInUser.value.uid,
      });

      const receiver = CallUser.getUserFromJson({
        name: "Kevin",
        avatar:
          "https://data-us.cometchat.io/assets/images/avatars/spiderman.png",
        uid: "UID233",
      });

      const call = CallLog.callLogFromJson({
        initiator,
        receiver,
        participants: [
          {
            uid: loggedInUser.value.uid,
            avatar: loggedInUser.value.avatar,
            name: loggedInUser.value.name,
            totalAudioMinutes: 120,
            totalDurationInMinutes: 120,
            totalVideoMinutes: 60,
          },
          {
            uid: "UID233",
            avatar:
              "https://data-us.cometchat.io/assets/images/avatars/spiderman.png",
            name: "Kevin",
            totalAudioMinutes: 120,
            totalDurationInMinutes: 120,
            totalVideoMinutes: 60,
          },
        ],
        recordings: [
          {
            startTime: 101,
            rid: "Recordings",
            recordingUrl:
              "https://cdn-icons-png.flaticon.com/512/1752/1752772.png",
            endTime: 101,
            duration: 100,
          },
        ],
        totalDurationInMinutes: 0.6833333333333333,
        totalParticipants: 2,
        type: "audio",
        mid: "dcb170b0-99da-4beb-b65a8-86e48c89ef18",
        startedAt: 1697458341,
        endedAt: 1697458382,
        totalAudioMinutes: 0.6833333333333333,
        totalVideoMinutes: 0,
        totalDuration: "00:00:41",
        hasRecording: true,
        initiatedAt: 1697458328,
      });
      console.log(call);

      return call;
    }

    return { isMobileView, call };
  },
});
</script>
