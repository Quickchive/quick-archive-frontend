<template>
  <div class="wrapper__navbar">
    <the-nav-bar></the-nav-bar>
  </div>
  <!-- <setting-default></setting-default> -->
  <setting-my-info></setting-my-info>
</template>

<script>
import TheNavBar from '@/components/nav/TheNavBar.vue'
import SettingMyInfo from '@/components/setting/SettingMyInfo.vue'

export default {
  components: {
    TheNavBar,
    SettingMyInfo
  },
  data() {
    return {}
  }
}
</script>
