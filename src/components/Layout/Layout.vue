<template>
  <div>
    <Sidebar></Sidebar>
    <div class="main-content" id="panel">
      <Navbar v-bind:name="name"></Navbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
export default {
  name: "Layout",
  components: { Footer, Sidebar, Navbar },
  data() {
    return {
      name: '',
      email: '',
    }
  },
  methods: {
    getUser() {
      this.axios.get(process.env.VUE_APP_ROOT_API + "user")
        .then(response => {
          console.log(response);
          if (response.data.code !== "ERR_ACCESS") {
            this.name = response.data.data.name
          } else {
            localStorage.removeItem("token");
            window.location.reload();
          }

        }).catch(err => {
          localStorage.removeItem("token");
          window.location.reload();
        })
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<style scoped>
.fade {
  transition: opacity .15s linear;
}

.alert-dismissible {
  padding-right: 3.85rem;
}

.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: unset;
  border: unset;
  border-radius: unset;
  margin-left: 250px !important;
}

@media (max-width: 1199.98px) {
  .alert {
    margin-left: 0px !important;
  }
}

.spinner-border {
  width: 1rem;
  height: 1rem;
}
</style>
