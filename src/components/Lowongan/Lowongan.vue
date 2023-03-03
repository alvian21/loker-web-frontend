<template>
  <div>
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Data Lowongan Kerja</h6>
            </div>
            <div class="col-lg-6 col-5 text-right">
              <router-link class="btn btn-sm btn-neutral" to="/lowongan/create">
                New
              </router-link>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card" id="deleteLoading">
            <!-- Card header -->
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">

                  <input type="text" v-model="cari" @keyup="cariData" required id="input-title"
                    placeholder="Carii Lowongan...." class="form-control form-control-alternative">
                </div>

              </div>
            </div>

            <!-- Light table -->
            <div class="table-responsive" id="taskLoading">
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
                    <th scope="col" class="sort">Action</th>
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
                    <td>
                      <div style="display: inline-flex">
                        <div>
                          <button class="btn btn-primary btn-sm" @click="editBtn(item.id)">
                            <i class="far fa-edit"></i>
                            <span><strong>Edit</strong></span>
                          </button>
                          <button href="#" class="btn btn-danger btn-sm" @click="deleteBtn(item.id)">
                            <i class="fas fa-trash-alt"></i>
                            <span><strong>Delete</strong></span>
                          </button>
                        </div>
                      </div>
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


    </div>


  </div>
</template>

<script>

export default {
  name: "Dashboard",
  data() {
    return {
      deletePostData: {
        id: null
      },
      items: {},
      dataNotFound: false,
      count: 0,
      cari: ""
    }
  },
  methods: {
    getLowongan(cari) {

      this.axios.get(process.env.VUE_APP_ROOT_API + "lowongan", {
        params: {
          cari: cari
        }
      })
        .then(response => {
          console.log(response);
          this.items = response.data.data;
          if (this.items.length > 0) {
            this.dataNotFound = false
          } else {
            this.dataNotFound = true
          }

        })
        .catch(error => {
          this.items = null
          console.log(error.response.data)
          this.dataNotFound = true

        })
    },
    cariData() {
      this.getLowongan(this.cari)
    },
    deleteBtn(id) {
      swal({
        title: "Apa anda yakin?",
        text: "ketika dihapus, data tidak bisa dikembalikan lagi!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            this.axios.delete(process.env.VUE_APP_ROOT_API + "lowongan/delete/" + id)
              .then(response => {
                this.$toast.success("Lowongan Berhasil dihapus")
                this.getLowongan();
              })
              .catch(error => {

              })
          }
        });
    },
    editBtn(id) {

      this.$router.replace({ name: "lowongan-edit", params: { id: id } })
    },
    formattedDate(originalDate) {
      const dateObj = new Date(originalDate);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
      const day = ('0' + dateObj.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
  },
  beforeMount() {

    if (this.$session.has('message')) {
      this.$toast.success(this.$session.get('message'))
      this.$session.remove('message')

    }
  },

  mounted() {
    this.getLowongan(this.cari)

  }
}
</script>
<style>
.btn i:not(:last-child),
.btn svg:not(:last-child) {
  margin-right: unset;
}
</style>
