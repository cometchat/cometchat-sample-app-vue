<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>


<style lang="css">
/* @import "./assets/css/style.css"; */

@import url('https://rsms.me/inter/inter.css');

::-webkit-scrollbar {
  width: 2px;   
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #ddd;
  width: 50px;
}

::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}

a{background:0 0}
img{border:0}
button,input,select,textarea{font-family:inherit;font-size:100%;margin:0}
button,input{line-height:normal}
button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;outline:0;border:0;background-color:transparent}
html{text-size-adjust:100%;font-size:10px}
body{margin:0;padding:0;font-family:Inter,sans-serif;font-size:1.4rem;box-sizing:border-box;overflow-x:hidden;background-color:#fff;color:#141414}
body *{box-sizing:border-box}
h1,h2,h3,h4,h5,h6{font-family:Inter,sans-serif;font-stretch:normal;font-weight:400}
h4,.font-22{font-size:2.2rem;line-height:27px}
.font-15{font-size:1.5rem;line-height:20px}
a{text-decoration:none}
a{background-color:transparent}
img{border-style:none;max-width:100%;display:inherit}
button,input,select,textarea{font:inherit;margin:0}
button,input{overflow:visible}
button,html [type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}
a{color:inherit}

</style>

