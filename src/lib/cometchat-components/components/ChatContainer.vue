<template>
    <div>
        <div class="page-wrapper">
            <div class="page-int-wrapper" id="pageWrapper" :class="{ 'left-open': leftOpen, 'center-open': centerOpen, 'right-open': rightOpen }">
                <!--Calls and Group list-->
                <LeftSidebar />
                <!--Chat Window-->
                <MessageContainer :currentUser=currentUser />
                <!-- Chat Detail -->
                <RightSidebar />
            </div>
        </div>
    </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import LeftSidebar from './LeftSidebar';
import MessageContainer from './MessageContainer';
import RightSidebar from './RightSidebar';

export default {
    name: 'ChatContainer',
    components: {
        LeftSidebar,
        MessageContainer,
        RightSidebar
    },
    data() {
        return {
            leftOpen: true,
            centerOpen: false,
            rightOpen: false,
            currentUser: null
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
            console.log('back butn', el);
            if (el.classList.contains("left-open")) {
                el.classList.add("center-open");
                el.classList.remove("left-open");
            }
        });
    },
}
</script>

<style>
    @media (min-width : 320px) and (max-width : 767px) {
        .page-int-wrapper .ccl-left-panel,
        .page-int-wrapper .ccl-center-panel, 
        .page-int-wrapper .ccl-right-panel {
            display: none;
        }

        .page-int-wrapper.left-open .ccl-left-panel {
            display: block;
        } 
        
        .page-int-wrapper.center-open .ccl-center-panel {
            display: block;
        } 
        
        .page-int-wrapper.right-open .ccl-right-panel {
            display: block !important;
        }
        
        .cc1-chat-win-con-opt {
            margin-left: 10px;
        }


        .cc1-chat-win-inpt-attach a,
        .cc1-chat-win-inpt-send a {
            margin-top: 0px;
        }



    }
</style>