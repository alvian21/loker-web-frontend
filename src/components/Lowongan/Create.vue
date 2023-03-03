<template>
  <div>
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">Create Lowongan</h6>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card">
            <!-- Card header -->
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Create Lowongan</h3>
                </div>
              </div>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="card-body">
                    <form v-on:submit.prevent="addLowongan()" id="addPostForm">

                      <div class="pl-lg-4">
                        <div class="row">
                          <div class="col-lg-4">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-title">Nama</label>
                              <input type="text" required id="input-title" v-model="addLowonganData.nama"
                                class="form-control form-control-alternative">
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-title">Tingkat Pendidikan Minimal</label>
                              <input type="text" required id="input-title"
                                v-model="addLowonganData.tingkat_pendidikan_minimal"
                                class="form-control form-control-alternative">
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-title">Kuota</label>
                              <input type="number" required id="input-title" v-model="addLowonganData.kuota"
                                class="form-control form-control-alternative">
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-6">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-title">Tanggal Dibuka</label>
                              <input type="date" required id="input-title" v-model="addLowonganData.tanggal_dibuka"
                                class="form-control form-control-alternative">
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="form-group focused">
                              <label class="form-control-label" for="input-title">Tanggal Ditutup</label>
                              <input type="date" required id="input-title" v-model="addLowonganData.tanggal_ditutup"
                                class="form-control form-control-alternative">
                            </div>
                          </div>

                        </div>

                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label class="form-control-label" for="input-content">Deskripsi</label>
                              <textarea class="form-control" required v-model="addLowonganData.deskripsi" id="input-content"
                                rows="3"></textarea>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12 text-center">
                            <button type="submit" class="btn btn-primary">Simpan</button>
                          </div>
                        </div>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
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
      addLowonganData: {
        nama: null,
        deskripsi: null,
        tingkat_pendidikan_minimal: null,
        tanggal_dibuka: null,
        tanggal_ditutup: null,
        kuota: null
      }
    }
  },
  methods: {

    addLowongan() {
      this.axios({
        method: "POST",
        url: process.env.VUE_APP_ROOT_API + 'lowongan/create',
        data: this.addLowonganData
      })
        .then(response => {

          if (response.data.message == 'Ok.') {

            this.$session.set('message', 'Data Lowongan Berhasil Disimpan')

            this.$router.push({ name: 'lowongan' })

          } else {
            response.data.data.missingKeys.forEach(element => {
              this.$toast.open({
                message: element,
                type: 'error',
              });
            });

          }
        })
        .catch(error => {
          console.log(error);
          if (error.response.data.code == "MISSING_KEY") {
            error.response.data.data.missingKeys.forEach(element => {
              this.$toast.open({
                message: element + " wajib diisi",
                type: 'error',
              });
            });
          } else {
            this.$toast.open({
              message: error.response.data.message,
              type: 'error',

            });
          }

        });
    },
  },
  mounted() {

  }
}
</script>
