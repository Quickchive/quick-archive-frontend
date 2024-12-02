<template>
  <onboarding-view></onboarding-view>

  <Transition name="fade">
    <div class="login-overlay" v-show="isVisible"></div>
  </Transition>

  <!-- <div class="login-overlay"></div> -->

  <Transition name="slide-fade">
    <div class="login-container" v-show="isVisible">
      <div class="login-form">
        <div class="close-btn__wrapper">
          <button class="btn--transparent" @click="toOnboarding"><img :src="icClose" /></button>
        </div>
        <header class="header__login">
          <h1>Login</h1>
          <p>간단하게 로그인하고 퀵카이브를 이용해보세요</p>
        </header>
        <div class="banner__wrapper">
          <img :src="union" />
          <span><strong>3초만에</strong> 빠른 회원가입!</span>
        </div>
        <div class="login__btn__wrapper">
          <a href="https://test.quickarchive.co.kr/api/oauth/kakao-auth" target="_blank">
            <button class="btn--kakao btn-56">
              <img :src="logoKakao" />
              카카오톡으로 시작하기
            </button>
          </a>
          <a href="https://test.quickarchive.co.kr/api/oauth/google-auth" target="_blank">
            <button class="btn--google btn-56">
              <img :src="logoGoogle" />
              Google로 시작하기
            </button>
          </a>
          <a href="https://test.quickarchive.co.kr/api/oauth/apple-auth" target="_blank">
            <button class="btn--apple btn-56"><img :src="logoApple" />Apple로 시작하기</button>
          </a>
        </div>
        <div class="desc__wrapper">
          <a href="https://www.notion.so/fabc4b39c85b446bab8f2bb8549926b7"
            >서비스 이용약관 및 개인정보처리방침</a
          ><span> 안내</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import icClose from '@/assets/ic/ic-top-close.svg'
import logoKakao from '@/assets/logo/logo-kakao.svg'
import logoGoogle from '@/assets/logo/logo-google.svg'
import logoApple from '@/assets/logo/logo-apple.svg'
import union from '@/assets/union.svg'
import onboardingView from '@/views/OnboardingView.vue'

export default {
  data() {
    return {
      icClose,
      logoKakao,
      logoGoogle,
      logoApple,
      union,
      isVisible: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.isVisible = true
    })
  },
  components: { onboardingView },
  methods: {
    // 로그인 요청
    async submitForm() {
      try {
        const userData = {
          email: this.email,
          password: this.pw,
          auto_login: this.stayLogin
        }
        await this.$store.dispatch('LOGIN', userData)
        // 로그인 유지 여부 저장
        this.$store.dispatch('STAY_LOGIN', this.stayLogin)
        await this.$router.push('/main').catch(() => {})
      } catch (error) {
        this.alertModalContent = error.response.data.message
        this.isAlertModalActive = true
      }
    },
    toOnboarding() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
