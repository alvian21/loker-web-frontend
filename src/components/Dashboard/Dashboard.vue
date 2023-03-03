<template>
    <div>
        <div class="header bg-primary pb-6">
            <div class="container-fluid">
                <div class="header-body">
                    <div class="row align-items-center py-3">
                        <div class="col-lg-6 col-7">
                            <h6 class="h2 text-white d-inline-block mb-0">Dashboard</h6>
                        </div>
                    </div>
                    <Summary v-bind:totalLowongan="totalLowongan"></Summary>
                </div>
            </div>
        </div>
        <div class="container-fluid mt--6">

            <LowonganTable v-bind:items="itemLowongan" v-bind:dataNotFound="dataNotFound" ></LowonganTable>
        </div>
    </div>
</template>

<script>

import Summary from "./Summary";
import LowonganTable from "./LowonganTable";
export default {
    name: "Dashboard",
    data() {
        return {
            itemLowongan: [],
            totalLowongan: 0,
            dataNotFound:false
        }
    },
    components: { LowonganTable, Summary },
    methods: {
        getLowongan() {
            this.axios.get(process.env.VUE_APP_ROOT_API + "dashboard/lowongan")
                .then(response => {
                    
                    this.itemLowongan = response.data.data
                    this.totalLowongan = this.itemLowongan.length
                    if(this.itemLowongan.length == 0){
                        this.dataNotFound = true
                    }
                })
        }
    },
    mounted(){
        this.getLowongan()
    }
}
</script>
