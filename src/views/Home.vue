<template>
  <body>
  <NavBar
      :visits="visits"
      @customEvent="parentMethod"
  />
  <div class="container-fluid pt-3" style="position: relative">
    <div class="row">
      <IsLoading v-if="loading"/>
      <SideBar :visits="visits"/>
      <Main
          :visits="visits"
          :toggles="toggle"
      />
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
      sendToggle: true,
      data: "Yui",
      visits: null,
      loading: false,
      overlay: false,
      toggle: false
    }
  },
  methods: {
    parentMethod(myParam) {
      this.toggle = myParam;
      console.log('this myParam => '+ myParam);
    }
  },
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
          // console.warn('This Visits => ' + this.visits);
          console.log('This message => ' + message);
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
  /*background-color: #F8F8F8;*/
}

</style>
