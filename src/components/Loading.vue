<template>
  <div class="col-12" id="overlay">
    <div class="d-flex justify-content-center">
      <div class="spinner-my">
        <div class="loader">Loading...</div>
<!--        <Spinner name="circle" color="red"/>-->
<!--        <div class="spinner-border text-info" role="status">-->
<!--          <span class="visually-hidden">Loading...</span>-->
<!--        </div>-->
<!--        <div class="spinner-grow ms-2 text-dark" role="status">-->
<!--          <span class="visually-hidden">Loading...</span>-->
<!--        </div>-->
<!--        <div class="spinner-border ms-2 text-info" role="status">-->
<!--          <span class="visually-hidden">Loading...</span>-->
<!--        </div>-->
<!--        <div class="spinner-grow ms-2 text-dark" role="status">-->
<!--          <span class="visually-hidden">Loading...</span>-->
<!--        </div>-->
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  mounted() {
    document.getElementById("overlay").style.display = "block";
  }
}
</script>

<style scoped>
#overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*background-color: rgba(0, 0, 0, 0.15);*/
  z-index: 0;
  cursor: pointer;
}

/*https://projects.lukehaas.me/css-loaders/*/
.spinner-border, .spinner-grow {
  z-index: 1;
  width: 3rem;
  height: 3rem;
}

.spinner-my {
  z-index: 1;
  position: fixed;
  left: 50%;
  top: 30%;
  margin-left: -4em;
}
.text-info {
  color: var(--main-color)!important;
}
.text-dark {
  color: #2c3e50!important;
}

.loader,
.loader:before,
.loader:after {
  background: #0dc5c1;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  z-index: 2;
  color: #0dc5c1;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}

</style>
