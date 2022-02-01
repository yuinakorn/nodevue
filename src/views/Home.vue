<template>
  <body>
  <NavBar :visits="visits"/>
  <div class="container-fluid pt-3">
    <div class="row">
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
import axios from "axios";
require('dotenv').config();

// import https from "https";

export default {
  name: 'Home',
  components: {
    Main,
    SideBar,
    NavBar
  },
  data() {
    return {
      visits: null
    }
  },
  mounted() {
    let cids = this.$route.params.cid;
    console.log(cids);

    let apiUrl = process.env.apiUrl + '/api/sv/service/' + cids;

// // At instance level
//     const instance = axios.create({
//       httpsAgent: new https.Agent({
//         rejectUnauthorized: false
//       })
//     });
//     instance.get("http://122.155.219.133:5002/api/sv/service/*");
//
// // At request level
//     const agent = new https.Agent({
//       rejectUnauthorized: false
//     });
//     axios.get(apiUrl, { httpsAgent: agent })
    axios.get(apiUrl)
        .then(response => {
          // handle success
          // console.log(response.data);
          this.visits = response.data;
          // console.log(this.visits);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
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
