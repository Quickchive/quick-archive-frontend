<template>
  <div class="wrapper__navbar">
    <the-nav-bar></the-nav-bar>
  </div>
  <div class="wrapper__setting-component">
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavBar from '@/components/nav/TheNavBar.vue'

export default {
  components: {
    TheNavBar
  },
  data() {
    return {}
  }
}
</script>
