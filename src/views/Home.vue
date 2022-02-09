<template>
  <body>
  <NavBar :visits="visits"/>
  <div class="container-fluid pt-3" style="position: relative">
    <div class="row">
      <IsLoading v-if="loading"/>
      <SideBar :visits="visits"/>
      <Main :visits="visits"/>
    </div>
  </div>
  </body>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main.vue';
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import IsLoading from "@/components/Loading";

// import axios from "axios";
import io from 'socket.io-client';

require('dotenv').config();

// import https from "https";

export default {
  name: 'Home',
  components: {
    Main,
    SideBar,
    NavBar,
    IsLoading
  },
  data() {
    return {
      visits: null,
      loading: false,
      overlay: false
    }
  },
  // methods: {
  //   let cids = this.$route.params.cid;
  //   console.log(cids);
  //
  //   let apiUrl = process.env.VUE_APP_APIURL + '/api/sv/service/' + cids;
  //   console.log(apiUrl);
  //
  //   // const config = {
  //   //   responseType: 'stream'
  //   // };
  //
  //   axios.get(apiUrl)
  //       .then(response => {
  //         // console.log(response.data);
  //         this.visits = response.data;
  //         // console.log(this.visits);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       })
  //       .then(function () {
  //         // always executed
  //       });
  // },
  async mounted() {
    this.loading = true;
    const socket = io(process.env.VUE_APP_APIURL);
    await socket.on("connect", () => {
      let cids = this.$route.params.cid;

      // event get service
      let messages = '{"datatype": "service","data": {"CID":"' + cids + '","viewer_id": "' + socket.id + '","client_id":"","his_data":""}}';
      socket.emit('viewer', messages);
      socket.on('viewer', (message) => {
        try {
          this.visits = JSON.parse(message);
          // console.log(this.visits);
          this.loading = false
        } catch (error) {
          console.log(error);
        }
      });

    });
  }
}
</script>

<style scoped>
body {
  position: relative;
  background-color: #F8F8F8;
}


/*.home {*/
/*  background: #FBFBFB;*/
/*  !*height: 100vh;*!*/
/*  height: 100%;*/
/*}*/

</style>
