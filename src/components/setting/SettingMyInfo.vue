<template>
  <div class="flex-container__col--100">
    <title-header :title="title"></title-header>
    <div class="divider"></div>
    <section class="myinfo">
      <article>
        <div class="myinfo-list">
          <label class="label__modal">이메일</label>
          <div class="wrapper__input-left-icon">
            <div class="logo__social-info" v-if="userStore.socialLoginInfo() !== null">
              <img :src="googleIcon" v-if="userStore.socialLoginInfo === 'google'" />
              <img :src="kakaoIcon" v-if="userStore.socialLoginInfo === 'kakao'" />
              <img :src="appleIcon" v-if="userStore.socialLoginInfo === 'apple'" />
            </div>
            <input class="input__sm--readonly" readonly :placeholder="userStore.email" />
          </div>
        </div>
        <div class="myinfo-list">
          <label class="label__modal">닉네임</label>
          <div class="wrapper__input-right-icon">
            <input
              class="input__sm--before-edit"
              :value="nickname"
              @input="setNickName"
              :disabled="disabled"
            />
            <button v-show="clearButtonShow" class="button-clear" @click="clearText()">
              <img :src="textfieldCancelIcon" />
            </button>
            <button class="button--change-nickname" @click="editNickname()">
              {{ editNicknameButton }}
            </button>
          </div>
        </div>
        <div class="wrapper__logout">
          <button
            class="flex-container__row--space-between btn--transparent"
            @click="modalViewStore.showModalWithOverlay('logout', 'settingAlert')"
          >
            <label class="label__md">로그아웃</label>
            <img :src="nextIcon" />
          </button>
        </div>
      </article>
      <div class="wrapper__withdraw">
        <label
          >회원 탈퇴를 원하시면
          <button @click="modalViewStore.showModalWithOverlay('withdrawal', 'settingAlert')">
            이곳</button
          >을 눌러주세요
        </label>
      </div>
    </section>
  </div>
</template>

<script setup>
import TitleHeader from '@/components/header/TitleHeader.vue'
import googleIcon from '@/assets/ic/logo_google.svg'
import kakaoIcon from '@/assets/ic/logo_kakao.svg'
import appleIcon from '@/assets/ic/logo_apple.svg'
import nextIcon from '@/assets/ic/ic_next_gray_24px.svg'
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'

const title = ref('내정보')
const disabled = ref(true)
const clearButtonShow = ref(false)
const editNicknameButton = ref('변경하기')

const userStore = useUserStore()
const modalViewStore = useModalViewStore()
const nickname = ref(userStore.nickname)

const clearText = () => {
  nickname.value = ''
}

const editNickname = async () => {
  // 수정모드 on
  if (disabled.value === true) {
    disabled.value = false
    editNicknameButton.value = '수정완료'
    clearButtonShow.value = true
    return
  }
  // 수정모드 off -> 닉네임 수정 요청
  if (disabled.value === false) {
    disabled.value = true
    userStore.editNickname(nickname.value)
    editNicknameButton.value = '변경하기'
    clearButtonShow.value = false
    return
  }
}

const setNickName = (e) => {
  nickname.value = e.target.value
}
</script>

<style></style>
