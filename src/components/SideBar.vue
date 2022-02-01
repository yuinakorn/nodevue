<template>
  <div class="col-md-3 my-scroll-side">
    <ul class="list-group bg-body rounded shadow-sm" id="scrollspy-list">
      <a :href="`#vn${ visit.vn }`"
         class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
         v-for="visit in visits" :key="visit.id">
        <div class="col-4">
          <!--          <div class="fw-bold line-height07">{{ visit.dateserv }}</div>-->
          <div class="fw-bold line-height07">{{ getThaiDate(visit.dateserv) }}</div>
          <span class="text-sub-title line-height07">{{ visit.hname }}</span>
        </div>
        <div class="text-truncate">
          <span class="text-muted small">{{ visit.symptom }}</span>
        </div>
        <span :class="getClass(visit.depart)">{{ visit.depart }}</span>
      </a>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      thDate: null,
    }
  },
  props: {
    visits: Array
  },
  methods: {
    getClass(result) {
      if (result === 'OPD') {
        return 'badge bg-primary-my rounded-pill';
      } else {
        return 'badge bg-danger-my rounded-pill';
      }
    },
    getThaiDate(thd) {
      // console.log(thd);
      const y = new Date(thd);
      let year = y.getFullYear();
      const m = new Date(thd);
      let month = m.getMonth();
      const d = new Date(thd);
      let day = d.getDay();
      // console.log(year);
      const date = new Date(year, month, day)
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

.list-group {
  top: 5rem;
}

.list-group-item {
  padding-top: .65rem;
  padding-bottom: .3rem;
}

.text-sub-title {
  font-size: 0.9rem;
}

.line-height07 {
  line-height: 0.7rem;
}
.my-scroll-side {
  height: 82vh;
  overflow-y: scroll;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  /*scrollbar-width: none; !* for Firefox *!*/
}
.my-scroll-side::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>
