<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="handleSubmit">
      <div class="d-flex justify-content-center">
        <img class="mb-4" src="../assets/LOGO_SSJ.png" alt="" width="180" height="180">
      </div>
      <h1 class="h3 fw-normal text-center">ลงชื่อเข้าใช้งาน</h1>
      <div class="mb-3 fw-normal text-muted text-center">ใช้ username เดียวกันกับระบบ HDC</div>

      <div class="form-floating">
        <input type="text" class="form-control rounded-pill mb-3" id="floatingInput" v-model="username" autocomplete="off" placeholder="Username">
        <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control rounded-pill" id="floatingPassword" v-model="password" autocomplete="off" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary-my rounded-pill" type="submit">Log in</button>
      <!--      <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>-->
    </form>
  </main>
</template>

<script>
import axios from "axios";

const qs = require('qs');


export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      fullname: '',
    }
  },
  methods: {
    async handleSubmit() {
      console.log('submit');
      const response = await axios.post(process.env.API_ONEUSER_LOGIN, qs.stringify({
        'username': this.username,
        'password': this.password
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      });

      console.log('Token => ' + response.data.access_token)
      localStorage.setItem('token', response.data.access_token);
      this.fullname = response.data.firstname + ' ' + response.data.lastname;
      localStorage.setItem('fullname', this.fullname);
    }
  }
}
</script>

<style scoped>

html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #cbcbcb;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.btn-primary-my:hover {
  color: white !important;
  background-color: #02504f !important;
  /*border-color: var(--border-color) !important;*/
}

.btn-primary-my {
  color: white !important;
  background-color: var(--main-color) !important;
}
</style>