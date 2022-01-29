<template>
  <body>
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
import axios from "axios";
// import https from "https";

export default {
  name: 'Home',
  components: {
    Main,
    SideBar
  },
  data() {
    return {
      visits: null
    }
  },
  mounted() {
    let cids = this.$route.params.cid;
    console.log(cids);
    // let apiUrl = 'http://localhost/php-api-client/json2.php';
    // let apiUrl = 'http://122.155.219.133:5002/api/sv/service/3500500413762';
    // let apiUrl = 'http://122.155.219.133:5002/api/sv/service/3510500001251';
    let apiUrl = 'http://122.155.219.133:5002/api/sv/service/' + cids;

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
