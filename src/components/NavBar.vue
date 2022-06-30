<template>
  <header class="p-2">
    <div class="container-fluid d-flex justify-content-between">
      <div class="d-flex">
        <a href="/" class="align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          <img :src="'data:image/png;base64,'+patient_img" height="95" v-if="patient_img != null && patient_img != ''">
          <img src="../assets/person_avatar.jpg" height="95" v-else>
        </a>

        <div class="nav col-sm-auto col-md-auto col-lg-auto me-lg-auto mb-2 ms-3 mb-md-0 d-block justify-content-start">
          <div class="d-block"><span class="fw-bold">ชื่อ-สกุล:</span> {{ patient.pname }}{{ patient.fname }}
            {{ patient.lname }}
          </div>
          <div class="d-block"><span class="fw-bold">เพศ:</span> {{ patient.sex }}</div>
          <div class="d-block"><span class="fw-bold">อายุ:</span> <span class="me-1">{{ patient.age }}</span> ปี</div>
          <div class="d-block"><span class="fw-bold">วันเกิด:</span> {{ getThaiDate(patient.birthday) }}</div>
        </div>

        <div class="nav col-sm-auto col-md-auto col-lg-auto me-lg-auto mb-2 ms-5 mb-md-0 d-block justify-content-start">
          <div class="d-block" id="telemed"><span class="fw-bold">เลขบัตรประชาชน:</span> {{ patient.cid }}
            <button class="ms-3 btn btn-outline-primary rounded-pill" @click='sendData'> Tele-Medicine</button>
          </div>
          <div class="d-block"><span class="fw-bold">ฉีดวัคซีนล่าสุดเมื่อ: </span><span>{{
              getThaiDate(max_date_vac)
            }}</span></div>
          <div class="d-block"><span class="fw-bold">วัคซีนโควิด:</span>
            <span class="ms-1 badge bg-soft1 text-white rounded-pill" v-for="imm in imms"
                  :key="imm.id">{{ imm.vaccine_dose_no }}. {{ imm.vaccine_manufacturer_name }}</span>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <div class="my-box col-lg-7 col-md-7 overflow-auto pt-1 px-2 pb-1 my-scroll-side">
          <div class="drug_arg">
            <span class="fw-bold">แพ้ยา: </span>
            <!--            <span style="font-size: 0.9rem!important;"> (หากมีหลายรายการ โปรดเลื่อนเพื่อดูเพิ่มเติม)</span>-->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

import axios from "axios";
import io from 'socket.io-client';

require('dotenv').config();
export default {
  name: "NavBar",
  el: '#telemed',
  data() {
    return {
      toggle: true,
      getVisits: null,
      imms: null,
      patient: [],
      patient_img: '',
      max_date_vac: ''
    }
  },
  props: {
    visits: Array
  },
  mounted() {
    let cids = this.$route.params.cid;
    let url = process.env.VUE_APP_VACCINEURL + "/?c=" + cids;
    axios.get(url)
        .then(response => {
          // handle success
          this.imms = response.data.result.vaccine_certificate[0].vaccination_list;
          let dose_arr = response.data.result.vaccine_certificate[0].vaccination_list;
          // console.log(dose_arr);
          let maxDose = Math.max.apply(Math, dose_arr.map(function (o) {
            return o.vaccine_dose_no;
          }));
          // console.log(maxDose);
          let vacdate = dose_arr.find(x => x.vaccine_dose_no === maxDose).vaccine_date;
          // console.log(vacdate);
          this.max_date_vac = vacdate;
          // console.log(this.visits);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });

    const sockets = io(process.env.VUE_APP_APIURL);
    sockets.on("connect", () => {
      let hcode = this.$route.params.hcode;
      // event get patient
      let message = '{"datatype": "patient","cid":"' + cids + '","hcode":"' + hcode + '"}';
      sockets.emit('patient', message);
      sockets.on('patient', (message) => {
        try {
          let resObj = JSON.parse(message);
          this.patient = resObj[0];
          this.patient_img = resObj[0].image;
          // console.log(this.patient);
        } catch (error) {
          console.log(error);
        }
      });
    });

  },
  emits: [
    'sendData'
  ],
  methods: {
    sendData() {
      alert('sendData');
      let CefSharp;
      let sc;
      CefSharp.PostMessage({"data_type": sc.script_name})
      this.$emit('sendData');
    },
    getThaiDate(thd) {
      let ymd = new Date(thd);
      let year = ymd.getFullYear();
      let month = ymd.getMonth();
      let day = ymd.getDate();
      const date = new Date(year, month, day);
      const resultd = date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        // month: '2-digit',
        day: '2-digit',
      });
      return resultd;
    }
  }
}
</script>

<style scoped>
header {
  background: white;
}

.my-box {
  height: 6rem;
  border-radius: 5px;
  /*background-color: #ffe6e6;*/
  max-width: 50%;
  width: 49rem;
}

.drug_arg {
  font-size: 1.2rem;
  color: red;

}

.border-bottom {
  border-bottom: 1px solid #dee2e6 !important;
}
</style>
