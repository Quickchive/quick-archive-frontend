<!-- views/auth/SocialLoginCallback.vue -->
<template>
  <div class="loading-container">
    <jumping-loader :loading="true"></jumping-loader>
    <p>{{ loadingMessage }}</p>
  </div>
</template>
<!-- views/auth/SocialLoginCallback.vue -->
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router' // useRoute 추가
import { useUserStore } from '@/stores/useUserStore'
import JumpingLoader from '@/components/loading/JumpingLoader.vue'

// props 제거하고 route 사용
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const loadingMessage = ref('')

const socialLoginConfig = {
  kakao: {
    method: userStore.kakaoSocialLogin,
    message: '카카오 계정으로 로그인 중...'
  },
  google: {
    method: userStore.googleSocialLogin,
    message: '구글 계정으로 로그인 중...'
  },
  apple: {
    method: userStore.appleSocialLogin,
    message: '애플 계정으로 로그인 중...'
  }
}
onMounted(async () => {
  try {
    // URL에서 provider 추출
    let provider = route.params.provider

    // provider가 없을 경우 query code 존재 시 google로 설정
    if (!provider && route.query.code) {
      provider = 'google'
    }

    const code = route.query.code

    if (!code || !socialLoginConfig[provider]) {
      throw new Error('유효하지 않은 로그인 시도입니다.')
    }

    loadingMessage.value = socialLoginConfig[provider].message

    userStore.setSocialLoginInfo(provider)
    await socialLoginConfig[provider].method(code)
    await userStore.getUserProfile()

    router.push('/main')
  } catch (error) {
    console.error('소셜 로그인 실패:', error)
    router.replace('/login')
  }
})
</script>
