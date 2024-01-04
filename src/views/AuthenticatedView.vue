<template>
  <div class="wrapper__navbar">
    <the-nav-bar></the-nav-bar>
  </div>
  <RouterView />
</template>

<script setup>
import TheNavBar from '@/components/nav/TheNavBar.vue'
</script>
