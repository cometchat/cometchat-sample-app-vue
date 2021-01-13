<div style="width:100%">
    <div style="width:50%;">
        <div align="center">
        <img align="center" width="180" height="180" alt="CometChat" src="./images/logo.png">    
        </div>    
    </div>    
</div>

<br/><br/>

# Vue Chat UI Kit

</br></br>

<div style="width:100%">
    <div style="width:50%; display:inline-block">
        <div align="center">
          <img align="left" alt="Main" src="./images/main.png">    
        </div>    
    </div>    
</div>

</br></br>
  
Vue Chat UI Kit is a collection of custom **UI Components** and **UI Screens** designed to build chat application with fully customizable UI. It is designed to avoid boilerplate code for building UI. 

___

## Prerequisites

Before you begin, ensure you have met the following requirements:

- A text editor. (e.g. [Visual Studio Code](https://code.visualstudio.com/), [Notepad++](https://notepad-plus-plus.org/), [Sublime Text](https://www.sublimetext.com/), [Atom](https://atom.io/), or [VIM](https://www.vim.org/))

- [Node](https://nodejs.org/)

- [npm](https://www.npmjs.com/get-npm)

- [Vue](https://vuejs.org/)  `npm install vue@2.6.11`

___

## Installing Vue Chat UI Kit 

## 1. Setup

### i. Register on CometChat 🔧

* To install Vue UI Kit, you need to first register on CometChat Dashboard. <a href="https://app.cometchat.com/" target="_blank">Click here to Sign Up.</a>

### ii. Get your application keys 🔑

* Create a new app.
* Head over to the Quick Start or API & Auth Keys section and note the `App ID`, `Auth Key`, and `Region`.

### iii. Add the CometChat dependency 📦

```javascript
  npm install @cometchat-pro/chat@2.1.5 --save
```

<br/>

## 2. Configure CometChat inside your app

### i. Initialize CometChat 🌟

The `init()` method initializes the settings required for CometChat.  
We suggest calling the `init()` method on app startup, preferably in the `created()` method of the Application class.

```javascript
const appID = "APP_ID";
const region = "REGION";
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();

CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  },
  error => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);
```
**Note:**</br>
* Replace `APP_ID` and `REGION` with your CometChat `App ID` and `Region` in the above code.


### ii. Login your user 👤

This method takes `UID` and `Auth Key` as input parameters and returns the User object containing all the information of the logged-in user.

```javascript
const authKey = "AUTH_KEY";
const uid = "SUPERHERO1";

CometChat.login(uid, authKey).then(
  user => {
    console.log("Login Successful:", { user });    
  },
  error => {
    console.log("Login failed with exception:", { error });    
  }
);
```
**Note:** </br>
* Replace `AUTH_KEY` with your CometChat `Auth Key` in the above code.

* We have setup 5 users for testing having UIDs: `SUPERHERO1`, `SUPERHERO2`, `SUPERHERO3`,`SUPERHERO4` and `SUPERHERO5`.

* We have used uid  `SUPERHERO1` as an example here. You can create User from CometChat Dashboard as well.

<br/>

## 3. Add UI Kit to your project

* Clone this repository.
* Copy the folder to your source folder.

<img align="center" width="300" height="auto" src="./images/add-ui-kit.png">

* Copy all the dependencies from package.json of `cometchat-pro-vue-chat-ui-kit` into your project's package.json and install them.

<img align="center" width="500" height="auto"  src="./images/package-dependencies.png" />

<br/>

## 4. Launch CometChat

Using the `CometChatUI` component from the UI Kit, you can launch a fully functional chat application.  
In this component all the UI Screens and UI Components are interlinked and work together to launch a fully functional chat on your website/application.  

Usage of application in project:

 ```html
<template>
  <div id="app">
    <CometChatUI />
  </div>
</template>

<script>
  import { CometChatUI } from "./cometchat-pro-vue-ui-kit";
  export default {
    name: "App",
    components: {
      CometChatUI,
    }
  };
</script>
 ```


---

# Checkout our sample app

Visit our [Vue sample app](https://github.com/cometchat-pro/javascript-vue-chat-app) repo to run the Vue sample app.

---

# Troubleshooting

- To read the full documentation on UI Kit integration visit our [Documentation](https://prodocs.cometchat.com/docs/ui-kit-vue-js).

- Facing any issues while integrating or installing the UI Kit please <a href="https://app.cometchat.com/" target="_blank"> connect with us via real time support present in CometChat Dashboard.</a>

---

# Contact 📪

Contact us via real time support present in [CometChat Dashboard](https://app.cometchat.com/).