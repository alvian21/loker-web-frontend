<template>
  <div class="row py-4" id="summaryLoading">

    <div class="col-xl-3 col-md-6 ">
      <div class="card card-stats">
        <!-- Card body -->
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h5 class="card-title text-uppercase text-muted mb-0">Total Lowongan</h5>
              <span class="h2 font-weight-bold mb-0">{{ this.totalLowongan }}</span>
            </div>
            <div class="col-auto">
              <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                <i class="fas fa-tasks"></i>
              </div>
            </div>
          </div>
          <div class="mt-4 mb-0 text-sm"></div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "Summary",
  props:{
    totalLowongan:{
      type:Number,
      required:true
    }
  },
  methods: {
  },
  mounted() {
   
  }
}
</script>

<style scoped>

</style>
