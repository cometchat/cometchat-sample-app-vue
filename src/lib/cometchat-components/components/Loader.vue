<template>
    <div class="card br">
      <div class="wrapper">
        <div class="comment br animate w80"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
        <div class="comment br animate"></div>
      </div>
    </div> 
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
/* loader start here */

.br {
  border-radius: 8px;  
}
.w80 {
  width: 80%;
}
.card {
  border: 2px solid #fff;
  padding: 30px 40px;
  width: 80%;
  margin: 50px auto;
}
.wrapper {
  width: 0px;
  animation: fullView 0.5s forwards cubic-bezier(0.250, 0.460, 0.450, 0.940);
}

.comment {
  height: 10px;
  background: #777;
  margin-top: 20px;
}

@keyframes fullView {
  100% {
    width: 100%;
  }
}

.animate {
  animation : shimmer 2s infinite linear;
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-size: 1000px 100%;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
</style>