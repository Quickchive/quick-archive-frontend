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
    const provider = route.params.provider?.toString()
    const code = route.query.code?.toString()

    console.log('Provider:', provider, 'Code:', code)

    if (!provider || !code || !socialLoginConfig[provider]) {
      throw new Error('유효하지 않은 로그인 시도입니다.')
    }

    loadingMessage.value = socialLoginConfig[provider].message

    // 소셜 로그인 처리
    userStore.setSocialLoginInfo(provider)
    await socialLoginConfig[provider].method(code)
    await userStore.getUserProfile()

    // 로그인 성공 시 홈으로 리다이렉트
    router.replace('/home')
  } catch (error) {
    console.error('소셜 로그인 실패:', error)
    userStore.setLoginError(error.message)
    router.replace('/login')
  }
})
</script>
