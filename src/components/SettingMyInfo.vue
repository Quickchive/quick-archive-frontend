<template>
  <div class="flex-container__col--100">
    <title-header :title="title"></title-header>
    <div class="divider"></div>
    <section class="myinfo">
      <article>
        <div class="myinfo-list">
          <label class="label__modal">이메일</label>
          <div class="wrapper__input-left-icon">
            <img :src="googleIcon" />
            <input class="input__sm--readonly" readonly :placeholder="email" />
          </div>
        </div>
        <div class="myinfo-list">
          <label class="label__modal">닉네임</label>
          <div class="wrapper__input-right-icon">
            <input class="input__sm--before-edit" readonly :placeholder="nickname" />
            <button class="button--change-nickname">변경하기</button>
          </div>
        </div>
        <div class="wrapper__logout">
          <button class="flex-container__row--space-between button--transparent">
            <label class="label__md">로그아웃</label>
            <img :src="nextIcon" />
          </button>
        </div>
      </article>
      <div class="wrapper__withdraw">
        <label>회원 탈퇴를 원하시면 <button>이곳</button>을 눌러주세요 </label>
      </div>
    </section>
  </div>
</template>

<script>
import TitleHeader from '@/components/header/TitleHeader.vue'
import googleIcon from '@/assets/ic/logo_google.svg'
import nextIcon from '@/assets/ic/ic_next_gray_24px.svg'

export default {
  components: {
    TitleHeader
  },
  data() {
    return {
      title: '내정보',
      email: '2seul25@gmail.com',
      nickname: '2seul25',
      googleIcon,
      nextIcon
    }
  }
}
</script>

<style></style>
