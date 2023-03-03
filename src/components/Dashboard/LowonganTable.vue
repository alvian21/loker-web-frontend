<template>
  <div class="row">
    <div class="col-md-12 col ">
      <div class="card">
        <div class="card-header border-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0">Lowongan</h3>
            </div>
            <div class="col text-right">
              <router-link to="/lowongan" class="btn btn-sm btn-primary">See all</router-link>
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <!-- Projects table -->
          <table class="table align-items-center table-flush">
            <thead class="thead-light">
              <tr>
                <th scope="col" class="sort">No</th>
                    <th scope="col" class="sort">Nama</th>
                    <th scope="col" class="sort">Deskripsi</th>
                    <th scope="col" class="sort">Tingkat Pendidikan</th>
                    <th scope="col" class="sort">Tgl Dibuka</th>
                    <th scope="col" class="sort">Tgl Ditutup</th>
                    <th scope="col" class="sort">Kuota</th>

              </tr>
            </thead>
            <tbody class="list">
                  <tr v-for="(item, index) in items" :key="index">
                    <th scope="row">
                      <div class="media align-items-center">
                        <div class="media-body">
                          <span class="name mb-0 text-sm">{{ index + 1 }}</span>
                        </div>
                      </div>
                    </th>

                    <td>
                      {{ item.nama }}
                    </td>
                    <td>
                      {{ item.deskripsi }}
                    </td>
                    <td>
                      {{ item.tingkat_pendidikan_minimal }}
                    </td>
                    <td>
                      {{ formattedDate(item.tanggal_dibuka) }}
                    </td>
                    <td>
                      {{ formattedDate(item.tanggal_ditutup) }}
                    </td>
                    <td>
                      {{ item.kuota }}
                    </td>
                  
                  </tr>
                </tbody>
            <tbody v-if="dataNotFound">
              <tr class="text-center">
                <td colspan="10">No Data Display</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LowonganTable",
  props:{
    items:[],
    dataNotFound: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    formattedDate(originalDate) {
      const dateObj = new Date(originalDate);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
      const day = ('0' + dateObj.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
  },
}
</script>
