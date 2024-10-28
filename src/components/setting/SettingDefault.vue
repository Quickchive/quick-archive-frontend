<template>
  <div class="flex-container__col--100">
    <title-header :title="title"></title-header>
    <div class="divider"></div>
    <section class="setting-list">
      <article class="main-button-list">
        <button class="setting-main-button" @click="toMyInfoPage()">
          <div class="wrapper__button-icon"><img :src="profileIcon" />내정보</div>
          <div class="flex-container__row--align-center">
            <span class="setting-nickname">{{ userStore.nickname }}</span>
            <img :src="nextIcon" />
          </div>
        </button>
        <div class="setting-main-button">
          <div class="wrapper__button-icon"><img :src="automaticIcon" />카테고리 추천</div>
          <toggle-button
            :value="userStore.recommendationMode"
            :toggleOn="userStore.enableRecommendationMode"
          ></toggle-button>
        </div>
        <button class="setting-main-button">
          <a href="https://smore.im/form/cNH45wRGpS">
            <div class="wrapper__button-icon"><img :src="errorIcon" />오류신고</div>
            <img :src="nextIcon" />
          </a>
        </button>

        <button class="setting-main-button">
          <a href="https://www.notion.so/97624d059f044e26aeea371b2108c47d">
            <div class="wrapper__button-icon"><img :src="makerIcon" />서비스 만든 사람들</div>
            <img :src="nextIcon" />
          </a>
        </button>

        <button class="setting-main-button">
          <a href="https://www.notion.so/fabc4b39c85b446bab8f2bb8549926b7?pvs=4">
            <div class="wrapper__button-icon"><img :src="policyIcon" />약관 및 정책</div>
            <img :src="nextIcon" />
          </a>
        </button>
      </article>
    </section>
  </div>
</template>

<script setup>
import automaticIcon from '@/assets/ic/ic_setting_automatic.svg'
import makerIcon from '@/assets/ic/ic_setting_maker.svg'
import policyIcon from '@/assets/ic/ic_setting_policy.svg'
import errorIcon from '@/assets/ic/ic_setting_error.svg'
import profileIcon from '@/assets/ic/ic_setting_profile.svg'
import nextIcon from '@/assets/ic/ic_next_gray_24px.svg'
import ToggleButton from '@/components/button/ToggleButton.vue'
import TitleHeader from '@/components/header/TitleHeader.vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const title = ref('설정')

const toMyInfoPage = () => {
  router.push('/home/setting/myinfo')
}
</script>

<style></style>
