<template>
<!--  <div class="col-md-6 my-scroll-box" data-bs-spy="scroll" data-bs-target="#scrollspy-list" data-bs-offset="180"-->
  <div :class="showClass(toggles)" data-bs-spy="scroll" data-bs-target="#scrollspy-list" data-bs-offset="180"
       tabindex="0">
    <div :id="`vn${visit0.vn}`" v-for="visit0 in visits" :key="visit0.id">
      <!--        <h4 id="intro">Introduction to Bootstrap</h4>-->
      <!--      <h4>{{ visit0.dateserv }}</h4>-->
      <div class="d-flex justify-content-between align-items-start p-2 mb-3 text-white bg-bar rounded shadow-sm">
        <!--        <img class="me-3" src="" alt="" width="48" height="38">-->
        <div class="lh-1 me-auto align-items-start">
          <h1 class="h6 mb-0 text-white lh-1">{{ getThaiDate(visit0.dateserv) }}</h1>
          <small>{{ visit0.hname }}</small>
        </div>
        <span :class="getClass(visit0.depart)">{{ visit0.depart }}</span>
      </div>
      <div class="my-3 p-3 bg-body rounded shadow-sm">
        <h6 class="border-bottom pb-2 mb-0"><strong>Screening</strong></h6>
        <div class="d-flex pt-3 justify-content-between px-3">
          <div><span class="fw-bold">SBP/DBP</span> {{ formatNum0(visit0.bps) }}/{{ formatNum0(visit0.bpd) }}</div>
          <div><span class="fw-bold">Pulse:</span> {{ formatNum1(visit0.pulse) }}</div>
          <div><span class="fw-bold">Temp:</span> {{ formatNum1(visit0.temperature) }} °C</div>
          <div><span class="fw-bold">น้ำหนัก:</span> {{ formatNum0(visit0.weight) }} กก.</div>
          <div><span class="fw-bold">ส่วนสูง:</span> {{ formatNum0(visit0.height) }} ซม.</div>
        </div>
      </div>
      <div class="my-3 p-3 bg-body rounded shadow-sm">
        <h6 class="border-bottom pb-2 mb-0"><strong>Symptom</strong></h6>
        <div class="d-flex pt-3">
          <span>{{ visit0.symptom }}</span>
        </div>
      </div>
      <div :class="diagClass(visit0.data.drug.length)">
        <h6 class="border-bottom pb-2 mb-0"><strong>Diagnosis</strong></h6>
        <div class="d-flex text-muted pt-3">
          <table class="table">
            <thead>
            <tr>
              <th>ICD10</th>
              <th>Name</th>
              <th>Type</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="diag in visit0.data.diag" :key="diag.id">
              <td>{{ diag.icd10 }}</td>
              <td>{{ diag.diagname }}</td>
              <td>{{ diag.diagtype }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--        <small class="d-block text-end mt-3">-->
        <!--          <a href="#">All updates</a>-->
        <!--        </small>-->
      </div>

      <div :class="drugClass(visit0.data.drug.length)">
        <h6 class="border-bottom pb-2 mb-0"><strong>Drug</strong></h6>
        <div class="d-flex text-muted pt-3">
          <table class="table">
            <thead>
            <tr>
              <th>ชื่อยา</th>
              <th>วิธีใช้</th>
              <th>จำนวน</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="drug in visit0.data.drug" :key="drug.id">
              <td>{{ drug.drugname }}</td>
              <td>{{ drug.drugusage }}</td>
              <td>{{ drug.qty }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--        <small class="d-block text-end mt-3">-->
        <!--          <a href="#">All updates</a>-->
        <!--        </small>-->
      </div>

      <div :class="labClass(visit0.data.lab.length)">
        <h6 class="border-bottom pb-2 mb-0"><strong>Laboratory</strong></h6>
        <div class="d-flex text-muted pt-3">
          <table class="table">
            <thead>
            <tr>
              <th>ชื่อ Lab</th>
              <th>ผล</th>
              <th>unit</th>
              <th>ref.</th>
              <th>remark</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="lab in visit0.data.lab" :key="lab.id">
              <td>{{ lab.labname }}</td>
              <td>{{ lab.result }}</td>
              <td>{{ lab.unit }}</td>
              <td>{{ lab.ref }}</td>
              <td>{{ lab.remark }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--      <div class="my-3 p-3 bg-body rounded shadow-sm">-->
      <div :class="procClass(visit0.data.procedure.length)">
        <h6 class="border-bottom pb-2 mb-0"><strong>หัตถการ</strong></h6>
        <div class="d-flex text-muted pt-3">
          <table class="table">
            <thead>
            <tr>
              <th>ชื่อหัตถการ</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="proc in visit0.data.procedure" :key="proc.id">
              <td>{{ proc.icd9name }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

  </div>
  <!-- Bootstrap JS -->
  <div v-if="toggles" class="col-md-3 col-lg-3">
    <iframe allow="camera; microphone; fullscreen; display-capture; autoplay"
            :src="getJitsiUrl(visits[0].cid)"
            style="height: 100%; width: 100%; border: 0;"></iframe>
  </div>
</template>
<!--https://meet.jit.si/964lA3aTqKE-->
<script>

// import NavBar from "@/components/NavBar";
export default {
  name: 'HomePage',
  // name: 'Main',
  // components: {NavBar},
  data() {
    return {
      formatNum: '',
      number: '',
      isActive: 'col-md-6 my-scroll-box'
    }
  },
  props: {
    visits: Array,
    toggles: Boolean
  },

  methods: {
    getJitsiUrl(cid) {
      return `https://jitsi.chiangmaihealth.go.th/${cid}`;
    },
    showClass(myParam){
      if(myParam === true) {
        return 'col-md-6 my-scroll-box'
      } else {
        return 'col-md-9 my-scroll-box'
      }
    },

    getClass(result) {
      if (result === 'OPD') {
        return 'badge bg-primary-my rounded-pill';
      } else if (result === 'IPD') {
        return 'badge bg-danger-my rounded-pill';
      } else if (result === 'ER') {
        return 'badge bg-warning-my rounded-pill';
      } else {
        return 'badge bg-light text-dark rounded-pill';
      }
    },
    diagClass(result) {
      // console.log(result);
      if (result != 0) {
        return 'my-3 p-3 bg-body rounded shadow-sm';
      } else {
        return 'd-none';
      }
    },
    drugClass(result) {
      // console.log(result);
      if (result != 0) {
        return 'my-3 p-3 bg-body rounded shadow-sm';
      } else {
        return 'd-none';
      }
    },
    labClass(result) {
      // console.log(result);
      if (result != 0) {
        return 'my-3 p-3 bg-body rounded shadow-sm';
      } else {
        return 'd-none';
      }
    },
    procClass(result) {
      // console.log(result);
      if (result != 0) {
        return 'my-3 p-3 bg-body rounded shadow-sm';
      } else {
        return 'd-none';
      }
    },
    getThaiDate(thd) {
      let ymd = new Date(thd);
      let year = ymd.getFullYear();
      let month = ymd.getMonth();
      let day = ymd.getDate();
      const date = new Date(year, month, day)
      const resultd = date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        // month: '2-digit',
        day: '2-digit',
      });
      return resultd;
    },
    formatNum0(n) {
      let num0 = parseFloat(n).toFixed(0);
      let fnum = '';
      if (num0 === 'NaN') {
        fnum = '-';
      } else {
        fnum = num0;
      }
      return fnum;
    },
    formatNum1(n) {
      let num1 = parseFloat(n).toFixed(1);
      let fnum = '';
      if (num1 === 'NaN') {
        fnum = '-';
      } else {
        fnum = num1;
      }
      return fnum;
    }
  },
  // components: {ContentLoader}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  /*color: #42b983;*/
}

.my-scroll-box {
  height: 83vh;
  overflow-y: scroll;
}

.bg-bar {
  background-color: var(--main-color);
  /*background-color: var(--main-color);*/
  /*background-color: var(--main-color);*/
  color: white;
}

</style>
