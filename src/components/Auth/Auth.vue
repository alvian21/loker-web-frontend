<template>
  <div class="text-center">
    <!-- Main content -->
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
}
</script>

<style>
.main-content {
  background-color: #172b4d;
}
</style>
