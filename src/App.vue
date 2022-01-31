<template>
<!--  <NavBar />-->
  <router-view/>
</template>

<script>
// @ is an alias to /src
// import NavBar from '@/components/NavBar'

export default {
  name: 'Home',
  components: {
    // NavBar
  },
}
</script>

<style>
:root {
  /*--main-color: #007672;*/
  --main-color: #20afaa;
  /*--border-color: #016460;*/
  --border-color: #20afaa;
}
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  font-family: 'Kanit', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

* {
  font-family: 'Kanit', sans-serif !important;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.list-group-item.active {
  background-color: var(--main-color) !important;
  border-color: var(--border-color) !important;
}

.btn-outline-primary {
  color: var(--main-color) !important;
  border-color: var(--border-color) !important;
}

.btn-outline-primary:hover {
  color: white !important;
  background-color: var(--main-color) !important;
  border-color: var(--border-color) !important;
}

.bg-primary-my {
  background-color: #6bd2ff !important;
}

.bg-danger-my {
  background-color: #DD4FB1 !important;
}

</style>
