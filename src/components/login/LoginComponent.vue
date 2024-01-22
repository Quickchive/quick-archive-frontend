<template>
  <div class="overlay"></div>
  <div class="login-container">
    <div class="login-form">
      <div class="close-btn__wrapper">
        <button class="btn--transparent"><img :src="icClose" /></button>
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
        <button class="btn--apple btn-56"><img :src="logoApple" />Apple로 시작하기</button>
      </div>
      <div class="desc__wrapper">
        <a href="https://www.notion.so/fabc4b39c85b446bab8f2bb8549926b7"
          >서비스 이용약관 및 개인정보처리방침</a
        ><span> 안내</span>
      </div>
    </div>
  </div>
</template>

<script>
import icClose from '@/assets/ic/ic-top-close.svg'
import logoKakao from '@/assets/logo/logo-kakao.svg'
import logoGoogle from '@/assets/logo/logo-google.svg'
import logoApple from '@/assets/logo/logo-apple.svg'
import union from '@/assets/union.svg'

export default {
  data() {
    return {
      icClose,
      logoKakao,
      logoGoogle,
      logoApple,
      union
    }
  },
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
    }
  }
}
</script>

<style></style>
