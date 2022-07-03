import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// const EventBus = this.$root;


/* eslint-disable */
// const axios = require('axios');
// import Spinner from 'vue-spinkit'
//
// App.component('Spinner', Spinner)

createApp(App).use(router).mount('#app')
