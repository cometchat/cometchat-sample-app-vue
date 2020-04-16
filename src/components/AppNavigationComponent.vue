<template>
    <div>
        <div style="display: flex; flex-direction: row; flex-wrap: wrap;">

            <p
                style="width: 90%; font-size: 24px; margin: auto; color: rgb(67, 171, 255); padding-top: 50px; text-align: center;">
                The UI Kit has three different ways to make fully customizable UI required to build a chat application.

                <span style="width: 90%; font-size: 16px; margin: auto; color: #AAA;">
                The UI Kit has been developed to help developers of different levels of experience to build a chat application in
                a
                few minutes to a couple of hours.
                </span>
            </p>

            <p style="width: 90%; text-align:center; font-size: 16px; margin: auto; color:#333; padding-top: 50px;">
                The UI Kit has three different ways to make chat Applications.
            </p>

            <div style="width: 90%; margin: 50px;  margin-left: auto; margin-right: auto; max-width:500px;">
                <div
                style="background-color: white; width: 100%; height: 100%; box-shadow: 0px 0px 5px 0px #3335; border-radius: 10px; padding: 5px;">
                <div style="text-align: center;">
                    <!-- <cometchat-avatar image="https://data-us.cometchat.io/assets/images/avatars/cyclops.png" cornerRadius='50%'>

                    </cometchat-avatar> -->
                    <h2>
                    UI Unified
                    </h2>
                    <p>
                    It open's Activity directly from UI Library. It is pre-defined UI helpful for user to build chat system by
                    integrating it within minutes.
                    </p>
                </div>
                <a class="launchButton" href="#/embeded-app">
                    <div style="width: 100%; height: 50px; text-align: center; border-top: 0.3px solid #e8e8e8; display: flex;">
                    <p style="margin: auto;"> Launch </p>
                    </div>
                </a>
                </div>
            </div>


            <div style="width: 90%; margin: 50px;   margin-left: auto; margin-right: auto; max-width:500px;">
                <div
                style="background-color: white; width: 100%; height: 100%; box-shadow: 0px 0px 5px 0px #3335; border-radius: 10px; padding: 5px;">
                <div style="text-align: center;">
                    <!-- <cometchat-avatar image="https://data-us.cometchat.io/assets/images/avatars/cyclops.png" cornerRadius='50%'>

                    </cometchat-avatar> -->
                    <h2>
                    UI Screens
                    </h2>
                    <p>
                    It open's Screen Activity where user can use predefined screen present in library. User can create their own
                    layout using screen in few minutes.
                    </p>
                    <div style="display: flex;">
                    <Ul style="display:flex; width: 100%; margin: auto; padding: 0px; padding: 5px;">
                        <li class="chips">
                        <a href="#/conversation-screen">coversations</a>
                        </li>
                        <li class="chips">
                        <a href="#/group-screen">group</a>
                        </li>
                        <li class="chips">
                        <a href="#/contact-screen">contact</a>
                        </li>

                    </Ul>
                    </div>

                </div>
                </div>
            </div>



            <div style="width: 90%; margin: 50px;   margin-left: auto; margin-right: auto; max-width:500px;">
                <div
                style="background-color: white; width: 100%; height: 100%; box-shadow: 0px 0px 5px 0px #3335; border-radius: 10px; padding: 5px;">
                <div style="text-align: center;">
                    <!-- <img src="https://data-us.cometchat.io/assets/images/avatars/spiderman.png"
                        style="margin: 5px; max-width: 41px;"  /> -->

                    <!-- <avatar image="https://data-us.cometchat.io/assets/images/avatars/cyclops.png" cornerRadius='50%' /> -->
                    <h2>
                    UI Components
                    </h2>
                    <p>
                    It open's Activity directly from UI Library. It is pre-defined UI helpful for user to build chat system by
                    integrating it within minutes.
                    </p>
                    <div style="display: flex;">
                    <Ul style="display:flex; width: 100%; margin: auto; padding: 0px; padding: 5px;">
                        <li class="chips">
                        <a href="#/contact-list">User</a>
                        </li>
                        <li class="chips">
                        <a href="#/group-list">Groups</a>
                        </li>
                        <li class="chips">
                        <a href="#/chat-list">Conversations</a>
                        </li>

                        <!-- <li class="chips">
                        <a href="/components">demo components</a>
                        </li> -->

                    </Ul>
                    </div>
                </div>
                </div>
            </div>



            </div>

            <div style="width: 90%; margin: 50px;  margin-left: auto; margin-right: auto; max-width: max-content;">
            <div v-on:click="logout()"
                style="background-color: #333; color: white; cursor: pointer;  padding:10px; width: 100%; height: 100%; box-shadow: 0px 0px 5px 0px #3335; border-radius: 10px;">
                <div style="text-align: center;">
                Logout
                </div>
            </div>
            </div>

    </div>
</template>

<script>
import { CometChat } from '@cometchat-pro/chat';
export default {
    name: "AppNavigationComponent",
    created() {
        CometChat.getLoggedinUser().then(user => {
            console.log('we are here', user);
            if (!user) {
                location.href = '/';
            }
        }, error => {
            console.log(error);
            location.href = '/';
        });
    },
    methods: {
        logout() {
            CometChat.logout().then(() => {
                location.href = '/';
            });
        }
    }
}
</script>

<style scoped>
.chips {
  margin: auto;
  background: #AAA;
  color: #FFF;
  padding: 3px;
  border-radius: 5px;
}

.chips:hover {
  cursor: pointer;
  background: #777777;
}

a,
a:visited,
a:active,
a:hover {
  color: white;
  text-decoration: none;

}

.launchButton,
.launchButton:visited,
.launchButton:active {
  color: rgb(67, 171, 255);
  font-weight: 600;


}

.launchButton:hover {
  color: darken(rgb(67, 171, 255), 20%);
  font-weight: 600;

}

</style>