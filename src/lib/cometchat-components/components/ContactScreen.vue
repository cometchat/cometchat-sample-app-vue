<template>

    <div class="page-wrapper">
        <div class="page-int-wrapper" id="pageWrapper" :class="{ 'left-open': leftOpen, 'center-open': centerOpen, 'right-open': rightOpen }">
            <div class="ccl-left-panel">
                <UserList />
            </div>
            <MessageContainer :currentUser=currentUser />
            <RightSidebar />
        </div>
    </div>

</template>
<script>
import { CometChat } from "@cometchat-pro/chat";

import UserList from './UserList'
import MessageContainer from './MessageContainer';
import RightSidebar from './RightSidebar';



export default {
    name: 'ContactScreen',
    components: {
        UserList,
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

