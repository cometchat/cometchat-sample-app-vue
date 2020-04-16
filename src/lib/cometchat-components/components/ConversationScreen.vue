<template>

    <div class="page-wrapper">
        <div class="page-int-wrapper" id="pageWrapper" :class="{ 'left-open': leftOpen, 'center-open': centerOpen, 'right-open': rightOpen }">
            <div class="ccl-left-panel">
                <ChatList />
            </div>
            <MessageContainer :currentUser=currentUser />
            <RightSidebar />

        </div>
    </div>

</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import ChatList from './ChatList'
import MessageContainer from './MessageContainer';
import RightSidebar from './RightSidebar';


export default {
    name: 'ConversationScreen',
    components: {
        ChatList,
        MessageContainer,
        RightSidebar
    },

    data() {
        return {
            currentUser: null,
            leftOpen: true,
            centerOpen: false,
            rightOpen: false
        }
    },

    created() {
        CometChat.getLoggedinUser().then(user => {
            if (user) {
                this.currentUser = user;
            }
        }, error => {
            console.log('yes here', error);
        });
    },

    mounted() {
        this.$root.$on("selectedUser", data => {
            console.log(data);
            const el  = document.getElementById('pageWrapper');
            if (el.classList.contains("left-open")) {
                el.classList.add("center-open");
                el.classList.remove("left-open");
            }
        });
    },
    
}
</script>

