<template>
    <div class="chat-contact-listitem-thum" v-if="item.uid">
        <img v-if="item.avatar" :src="item.avatar">
        <div class="avatar" v-bind:style= "{'background-color': randomcolor()}" v-else>{{item.name.charAt(0).toLowerCase()}}</div>
    </div>

    <div class="chat-ppl-thumbnail-wrap grp-chat-ppl-thumbnail-wrap" v-else-if="item.guid">
        <img v-if="item.icon" :src="item.icon">
        <div class="avatar" v-bind:style= "{'background-color': randomcolor()}" v-else>{{item.name.charAt(0).toLowerCase()}}</div>
    </div>

    <!-- <div class="chat-ppl-thumbnail-wrap">
      <img v-if="chat.conversationWith.avatar" :src="chat.conversationWith.avatar" />
      <img v-else src="./../assets/images/people-2_2.jpg" />
    </div> -->


</template>
<script>
export default {
    name: "Avatar",
    props:['item'],
    data() {
        return {
            randomcolor: () => {
                let color = Math.floor(0x1000000 * Math.random()).toString(16)
                let bgcolor ='#' + ('000000' + color).slice(-6);
                return bgcolor;
            }
        }
    },

}
</script>

<style scoped>
.avatar {
    width: 100%x;
    height: 100%;
    color: #fff;
    font-size: 18px;
    text-align: center;
    border-radius: 50%;
    padding: 5px;
}

</style>