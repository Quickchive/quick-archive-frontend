<!-- views/auth/SocialLoginCallback.vue -->
<template>
  <div class="loading-container">
    <jumping-loader :loading="true"></jumping-loader>
    <p>{{ loadingMessage }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import JumpingLoader from '@/components/loading/JumpingLoader.vue'

const props = defineProps({
  provider: {
    type: String,
    required: true,
    validator: (value) => ['kakao', 'google', 'apple'].includes(value)
  },
  code: {
    type: String,
    required: true
  }
})

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
    const { provider, code } = props

    console.log(provider, code)

    // if (!socialLoginConfig[provider]) {
    //   throw new Error('지원하지 않는 로그인 방식입니다.')
    // }

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

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
}
</style>
