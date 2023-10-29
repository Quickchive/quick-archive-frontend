<template>
  <div class="wrapper__navbar">
    <the-nav-bar></the-nav-bar>
  </div>
  <section class="flex-container__col wrapper__section">
    <router-view></router-view>
  </section>
</template>

<script setup>
import TheNavBar from '@/components/nav/TheNavBar.vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const categoryStore = useCategoryStore()
const route = useRoute()

onMounted(async () => {
  // 로그인
  if (route.fullPath.includes('google')) {
    console.log('google login')
    try {
      const code = route.query.code
      await userStore.googleLogin(code)
      await userStore.getProfile()
      await categoryStore.getUserCategoryList()
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      console.log('kakao login')
      const code = route.query.code
      await userStore.kakaoLogin(code)
      await userStore.getProfile()
      await categoryStore.getUserCategoryList()
    } catch (error) {
      console.error(error)
    }
  }
})
</script>
