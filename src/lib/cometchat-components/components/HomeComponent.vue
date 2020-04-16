<template>
  <div style="text-align: center; display: flex;">
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
            <a href="/?uid=superhero1"> superhero1</a>
          </p>
        </div>
        <div class="userSelector">
          <img 
            src="https://data-us.cometchat.io/assets/images/avatars/captainamerica.png"
            style="margin: 5px; max-width: 41px;"  />
          <p style="margin: auto;">
            <a href="/?uid=superhero2">superhero2</a>
          </p>
        </div>
        <div class="userSelector">
          <img 
            src="https://data-us.cometchat.io/assets/images/avatars/spiderman.png"
            style="margin: 5px; max-width: 41px;"  />
          <p style="margin: auto;">
            <a href="/?uid=superhero3">superhero3</a>
          </p>
        </div>
        <div class="userSelector">
          <img 
            src="https://data-us.cometchat.io/assets/images/avatars/wolverine.png"
            style="margin: 5px; max-width: 41px;"  />
          <p style="margin: auto;">
            <a href="/?uid=superhero4">superhero4</a>
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

      <div class="loginButton" v-on:click="login()">Login</div>
    </div>
  </div>
</template>
<script>
export default {
    name: "Home",
    data() {
        return {
            uid: ''
        }
    },
    methods: {
        login() {
            location.href = '/?uid=' + this.uid;
        }
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