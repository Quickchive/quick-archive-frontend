<template>
  <div class="wrapper__navbar">
    <the-nav-bar></the-nav-bar>
  </div>
  <section class="flex-container__col wrapper__section">
    <router-view></router-view>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import TheNavBar from '@/components/nav/TheNavBar.vue'
import { useUserStore } from '@/stores/useUserStore.ts'

export default defineComponent({
  components: {
    TheNavBar
  },

  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  async created() {
    // 로그인
    if (this.$route.fullPath.includes('google')) {
      console.log('google login')
      try {
        const code = this.$route.query.code
        await this.userStore.googleLogin(code)
        await this.userStore.getProfile()
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        console.log('kakao login')
        const code = this.$route.query.code
        await this.userStore.kakaoLogin(code)
        await this.userStore.getProfile()
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
