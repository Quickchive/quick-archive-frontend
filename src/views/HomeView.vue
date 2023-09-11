<template>
  <div class="wrapper__navbar">
    <the-nav-bar></the-nav-bar>
  </div>
  <section class="flex-container__col wrapper__section">
    <title-bar></title-bar>
    <div class="divider"></div>
    <article class="flex-container__col contents-container">
      <div class="contents-num__wrapper">{{ contentsNum }}개</div>
      <div class="flex-container__col contents-list__wrapper">
        <contents-item v-for="item in items" :key="item"></contents-item>
      </div>
    </article>
  </section>
</template>

<script>
import { defineComponent } from 'vue'
import TheNavBar from '@/components/nav/TheNavBar.vue'
import TitleBar from '@/components/home/TitleBar.vue'
import ContentsItem from '@/components/home/ContentsItem.vue'
import { useUserStore } from '@/stores/useUserStore.ts'

export default defineComponent({
  components: {
    TheNavBar,
    TitleBar,
    ContentsItem
  },
  data() {
    return {
      contentsNum: '0',
      items: 5
    }
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
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        console.log('kakao login')
        const code = this.$route.query.code
        await this.userStore.kakaoLogin(code)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
