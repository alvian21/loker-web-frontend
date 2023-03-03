<template>
  <nav class="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
    <div class="scrollbar-inner">
      <!-- Brand -->
      <div class="sidenav-header  align-items-center">
        <a class="navbar-brand" href="javascript:void(0)">
          <h1 class="text-primary">Loker Web</h1>
        </a>
      </div>
      <div class="navbar-inner">
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
          <!-- Nav items -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard">
                <i class="fas fa-home text-primary"></i> &nbsp; &nbsp;
                <span class="nav-link-text">Dashboard</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/lowongan">
                <i class="fas fa-tasks text-primary"></i> &nbsp; &nbsp;
                <span class="nav-link-text">Lowongan</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout()">
                <i class="fas fa-sign-out-alt text-primary"></i> &nbsp; &nbsp;
                <span class="nav-link-text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Sidebar",
  methods: {
    logout() {
      this.axios.post(process.env.VUE_APP_ROOT_API+"auth/logout").then(() => {

       localStorage.removeItem("token");
        this.$router.push({
          name: "login"
        });
      });
    },
  }
}
</script>

<style scoped>

</style>
