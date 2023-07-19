<template>
  <div class="flex-container__col login-container">
    <div class="flex-container__row close-btn__wrapper">
      <button class="button--transparent"><img :src="icClose" /></button>
    </div>
    <header class="header__login">
      <h1>Login</h1>
      <p>간단하게 로그인하고 퀵카이브를 이용해보세요</p>
    </header>
    <div class="banner__wrapper">
      <img :src="union" />
      <span><strong>3초만에</strong> 빠른 회원가입!</span>
    </div>
    <div class="flex-container__col login-btn__wrapper">
      <button class="button button--kakaoakao">
        <img :src="logoKakao" />카카오톡으로 시작하기
      </button>
      <button class="button button--google"><img :src="logoGoogle" />Google로 시작하기</button>
      <button class="button button--appleple"><img :src="logoApple" />Apple로 시작하기</button>
    </div>
    <div class="desc__wrapper"><a>서비스 이용약관 및 개인정보처리방침</a><span> 안내</span></div>
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
  }
}
</script>

<style></style>
