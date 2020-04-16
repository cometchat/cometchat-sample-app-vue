<template>
  <div>
    <div style="text-align: center; display: flex;" v-if="!showloader">
      <div style="margin: auto;">
        <div style=" width: 150px; margin: auto;">
          <img
            style="max-width: 100%; max-height: 100%;"
            src="https://www.cometchat.com/wp-content/uploads/2018/03/Logo-C-White.png"
            alt=""
          />
        </div>

        <p
          style="margin:auto; font-size: 42px; color: #2da7ff; font-weight: 500;line-height: 54px;"
        >
          Kitchen Sink App
        </p>

        <p style="margin:auto; padding: 10px;">
          Login with one of our sample users
        </p>
        <div style="display: flex; width: 100%;flex-wrap: wrap; margin: auto;">
          <div class="userSelector">
            <img 
              src="https://data-us.cometchat.io/assets/images/avatars/ironman.png"
              style="margin: 5px; max-width: 41px;"  />
            <p style="margin: auto;">
              <a href="javascript:;" v-on:click="login($event,'superhero1')"> superhero1</a>
            </p>
          </div>
          <div class="userSelector">
            <img 
              src="https://data-us.cometchat.io/assets/images/avatars/captainamerica.png"
              style="margin: 5px; max-width: 41px;"  />
            <p style="margin: auto;">
              <a href="javascript:;" v-on:click="login($event,'superhero2')">superhero2</a>
            </p>
          </div>
          <div class="userSelector">
            <img 
              src="https://data-us.cometchat.io/assets/images/avatars/spiderman.png"
              style="margin: 5px; max-width: 41px;"  />
            <p style="margin: auto;">
              <a href="javascript:;" v-on:click="login($event,'superhero3')">superhero3</a>
            </p>
          </div>
          <div class="userSelector">
            <img 
              src="https://data-us.cometchat.io/assets/images/avatars/wolverine.png"
              style="margin: 5px; max-width: 41px;"  />
            <p style="margin: auto;">
              <a href="javascript:;" v-on:click="login($event,'superhero4')">superhero4</a>
            </p>
          </div>
        </div>

        <p style="margin: auto; padding: 10px;">Login continue with UID</p>

        <input
          style="margin: auto; padding: 10px;"
          v-model="uid"
          type="text"
          placeholder="Enter your UID here"
        />

        <div class="loginButton" v-on:click="login($event,uid)">Login</div>
      </div>
      
    </div>
    <Loader v-else-if="showloader" />
  </div>

</template>
<script>
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from '../CONSTS';
import Loader from './Loader'

export default {
  name: "AppHomeComponent",
  components: {
    Loader
  },
  data() {
    return {
      // showUi: false,
      showloader: false,
      uid: null
    }
  },
  methods: {
    login(event, uid) {
      this.showloader = true;
      if (event) {
        event.preventDefault();
      }

      if (uid) {
        this.uid = uid;
      }

      CometChat.login(this.uid, COMETCHAT_CONSTANTS.API_KEY).then((user)=>{
        console.log('current log : ', user);
        location.href = '#/menu';
        this.showloader = false;
      });

    }
  },
  created() {
    CometChat.getLoggedinUser().then(user => {
      if (user) {
        location.href = '#/menu';
        this.uid = user.getUid();
      } else {
        this.showloader = false;
      }
    }, error => {
      console.log('yes here', error);
      this.showloader = false;
    });

  }
}
</script>

<style scoped>
.userSelector {
  display: flex;
  width: 150px;
  height: 50px;
  margin: auto;
  margin-right: 12.5px;
  margin-left: 12.5px;
  background: #333;
  border-radius: 10px;
  margin-bottom: 10px;
  color: white;
  font-weight: 550;
}

.userSelector:hover {
  cursor: pointer;
  /* color: darken($color: white, $amount: 5%);
  background: darken($color: #333, $amount: 20%); */
}

input {
  border: 2px solid #AAA;
  width: 300px;
  height: 40px;
  border-radius: 10px;
  padding: 5px;
  font-weight: 550;
  color: #555;
}

.loginButton {
  width: 76px;
  height: 40px;
  border-radius: 10px;
  margin: auto;
  margin-top: 10px;
  color: white;
  padding: 10px;
  text-align: center;
  background: #333;
}

.loginButton:hover {
  cursor: pointer;
  /* color: darken($color: white, $amount: 5%);
  background: darken($color: #333, $amount: 20%); */
}

</style>