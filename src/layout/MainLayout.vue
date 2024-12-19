<template>
  <the-navbar />
  <the-sidebar />
  <div class="container with-nav">
    <app-message />
    <router-view />
  </div>
</template>

<script>
import AppMessage from '../components/ui/AppMessage.vue';
import TheSidebar from '../components/TheSidebar.vue';
import TheNavbar from '../components/TheNavbar.vue';

export default {
  components: {
    TheNavbar,
    AppMessage,
    TheSidebar
  }
}
</script>

<style>

</style>