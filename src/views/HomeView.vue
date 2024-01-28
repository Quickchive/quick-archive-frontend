<template>
  <section class="flex-container__col wrapper__section">
    <router-view></router-view>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore.ts'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const categoryTreeStore = useCategoryTreeStore()
const route = useRoute()

onMounted(async () => {
  // 로그인
  if (route.fullPath.includes('google')) {
    console.log('google login')
    userStore.setSocialLoginInfo('google')
    try {
      const code = route.query.code
      await userStore.googleLogin(code)
      await userStore.getUserProfile()
      await categoryTreeStore.getUserCategoryList()
    } catch (error) {
      console.error(error)
    }
  }
  if (route.fullPath.includes('kakao')) {
    try {
      console.log('kakao login')
      userStore.setSocialLoginInfo('kakao')
      const code = route.query.code
      await userStore.kakaoSocialLogin(code)
      await userStore.getUserProfile()
      await categoryTreeStore.getUserCategoryList()
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('테스터 로그인')
    await userStore.getUserProfile()
    await categoryTreeStore.getUserCategoryList()
  }
})
</script>
