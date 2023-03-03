<template>
  <div>
    <!-- Header -->
    <div class="header  py-3 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">Login Your account.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0" id="loginLoader">
            <div class="card-header bg-transparent">
              <div class="text-muted text-center mt-2 h1">
                Login
              </div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <form role="form" @submit.prevent="login()">
                <div class="form-group mb-3">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                    </div>
                    <input class="form-control" placeholder="Email" type="email" name="email" v-model="loginData.email">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input class="form-control" placeholder="Password" type="password" v-model="loginData.password">
                  </div>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary my-4">Login</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  mounted() {
    
  },
  methods: {
    login() {

      this.axios.post(process.env.VUE_APP_ROOT_API + 'auth/signin/admin', this.loginData)
        .then(response => {
          if (response.data.message == "Ok.") {

            localStorage.setItem("token", response.data.data.token);
            this.$router.push({ name: "dashboard" })
         
          } else {
            this.$toast.open({
              message: "email atau passowrd salah",
              type: 'error',
            });
          }
        })
        .catch(error => {
          this.$toast.open({
              message: "email atau passowrd salah",
              type: 'error',
            });
        });
    }
  },
}
</script>

<style scoped></style>
