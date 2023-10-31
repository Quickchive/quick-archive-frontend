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
            <input class="input__sm--readonly" readonly :placeholder="userStore.email" />
          </div>
        </div>
        <div class="myinfo-list">
          <label class="label__modal">닉네임</label>
          <div class="wrapper__input-right-icon">
            <input class="input__sm--before-edit" readonly v-model="userStore.nickname" />
            <button class="button--change-nickname" @click="editNickname">변경하기</button>
          </div>
        </div>
        <div class="wrapper__logout">
          <button
            class="flex-container__row--space-between button--transparent"
            @click="modalStore.openLogoutModal()"
          >
            <label class="label__md">로그아웃</label>
            <img :src="nextIcon" />
          </button>
        </div>
      </article>
      <div class="wrapper__withdraw">
        <label
          >회원 탈퇴를 원하시면 <button @click="modalStore.openWithdrawalModal()">이곳</button>을
          눌러주세요
        </label>
      </div>
    </section>
  </div>
</template>

<script setup>
import TitleHeader from '@/components/header/TitleHeader.vue'
import googleIcon from '@/assets/ic/logo_google.svg'
import nextIcon from '@/assets/ic/ic_next_gray_24px.svg'
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useModalStore } from '@/stores/useModalStore.ts'

const title = ref('내정보')
const userStore = useUserStore()
const modalStore = useModalStore()
</script>

<style></style>
