<template>
  <div class="col-12" id="overlay">
    <div class="d-flex justify-content-center">
      <div class="spinner-my">
<!--        <Spinner name="circle" color="red"/>-->
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow ms-2 text-dark" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-border ms-2 text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow ms-2 text-dark" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
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
  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2); /* Black background with opacity */
  z-index: 0; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}

.spinner-border, .spinner-grow {
  z-index: 1;
  width: 3rem;
  height: 3rem;
}

.spinner-my {
  z-index: 1;
  position: fixed;
  left: 50%;
  top: 35%;
  margin-left: -4em;
}
.text-info {
  color: var(--main-color)!important;
}
.text-dark {
  color: #2c3e50!important;
}
</style>
