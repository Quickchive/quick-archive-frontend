<template>
  <div class="flex-container__col--100">
    <title-header :title="title"></title-header>
    <div class="divider"></div>
    <section class="setting-list">
      <article class="main-button-list">
        <button class="setting-main-button">
          <div class="wrapper__button-icon"><img :src="automaticIcon" />내정보</div>
          <div class="flex-container__row--align-center">
            <span class="setting-nickname">{{ nickname }}</span>
            <img :src="nextIcon" />
          </div>
        </button>
        <div class="setting-main-button">
          <div class="wrapper__button-icon"><img :src="makerIcon" />카테고리 추천</div>
          <toggle-button></toggle-button>
        </div>
        <button class="setting-main-button">
          <div class="wrapper__button-icon"><img :src="policyIcon" />오류신고</div>
          <img :src="nextIcon" />
        </button>
        <button class="setting-main-button">
          <div class="wrapper__button-icon"><img :src="errorIcon" />서비스 만든 사람들</div>
          <img :src="nextIcon" />
        </button>
        <button class="setting-main-button">
          <div class="wrapper__button-icon"><img :src="profileIcon" />약관 및 정책</div>
          <img :src="nextIcon" />
        </button>
      </article>
    </section>
  </div>
</template>

<script>
import automaticIcon from '@/assets/ic/ic_setting_automatic.svg'
import makerIcon from '@/assets/ic/ic_setting_maker.svg'
import policyIcon from '@/assets/ic/ic_setting_policy.svg'
import errorIcon from '@/assets/ic/ic_setting_error.svg'
import profileIcon from '@/assets/ic/ic_setting_profile.svg'
import nextIcon from '@/assets/ic/ic_next_gray_24px.svg'
import ToggleButton from '@/components/ToggleButton.vue'
import TitleHeader from '@/components/header/TitleHeader.vue'

export default {
  components: {
    ToggleButton,
    TitleHeader
  },
  data() {
    return {
      automaticIcon,
      makerIcon,
      policyIcon,
      errorIcon,
      profileIcon,
      nextIcon,
      nickname: '2seul25',
      title: '설정'
    }
  }
}
</script>

<style></style>
