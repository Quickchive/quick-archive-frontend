<template>
  <nav class="thenavbar">
    <div class="navbar__top-container">
      <button @click="toMainPage()" class="btn--transparent"><img :src="mainLogo" /></button>
      <!-- profile -->
      <router-link to="/main/setting">
        <div class="profile__wrapper">
          <div class="img-profile">
            <img :src="profileImg" />
          </div>
          <span>{{ userStore.nickname }}</span>
        </div>
      </router-link>
      <div class="search__wrapper">
        <search-input
          :keyword="'main'"
          :location="searchStore.keyword.main"
          :placeholderText="searchStore.placeholderText.main"
          :isSizeSm="true"
        >
        </search-input>
      </div>
    </div>
    <!-- divider -->
    <div class="navbar__divider--top"></div>
    <!-- 카테고리 -->
    <div class="wrapper__category-list">
      <category-list></category-list>
      <div class="wrapper__banner">
        <a
          href="https://cream-pharaoh-d66.notion.site/AI-11107f7f59b348a8afdd2d8f2f762fc1?pvs=74"
          target="_blank"
        >
          <img :src="banner2" />
        </a>
        <a
          href="https://www.notion.so/Quick-Archive-Team-Space-f3185cc8ad6a48cb95398b181fefdd58"
          target="_blank"
        >
          <img :src="banner1" />
        </a>
      </div>
    </div>
    <!-- 배너 -->

    <!-- divider -->
    <div class="navbar__divider--bottom"></div>
    <!-- 버튼 -->
    <div class="navbar__btn__wrapper">
      <button class="navbar__btn btn-56" @click="showAddModal()">
        <img :src="plus" />추가하기
      </button>
    </div>
  </nav>
  <div class="navbar-shadow"></div>
  <!-- 모달 -->
  <modal-view v-if="modalViewStore.overlay.default"></modal-view>
</template>

<script setup>
import profileImg from '@/assets/img/img_empty_noprofile.png'
import plus from '@/assets/ic/ic-add.svg'
import CategoryList from '@/components/nav/CategoryList.vue'
import SearchInput from '@/components/input/SearchInput.vue'
import ModalView from '@/views/ModalView.vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useSearchStore } from '@/stores/useSearchStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useRouter, useRoute } from 'vue-router'
import mainLogo from '@/assets/logo/logo_black_20px.svg'
import { onMounted } from 'vue'
import { useToastStore } from '@/stores/useToastStore.ts'
import banner1 from '@/assets/img/banner/banner_1.png'
import banner2 from '@/assets/img/banner/banner_2.png'

const categoryStore = useCategoryStore()
const contentStore = useContentStore()
const userStore = useUserStore()
const searchStore = useSearchStore()
const modalViewStore = useModalViewStore()
const toastStore = useToastStore()

const router = useRouter()
const route = useRoute()

const RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

const showAddModal = () => {
  modalViewStore.showModalWithOverlay('select', 'default')

  // 클립보드에 URL 데이터가 있는지 확인하고 있으면 토스트 노출
  navigator.clipboard.readText().then((text) => {
    console.log('Pasted content: ', text)
    if (RegExp.test(text)) {
      const toastData = {
        message: text,
        func: {
          message: '저장하기',
          execute: () => {
            modalViewStore.hideModalWithOverlay('select', 'default')
            contentStore.setSingleLink(text)
            modalViewStore.showModalWithOverlay('addContentDetail', 'default')
          }
        }
      }
      toastStore.executeDefaultToast(toastData)
    }
  })
}

const toMainPage = () => {
  router.push('/main')
}

onMounted(async () => {
  // 로그인
  // if (route.fullPath.includes('google')) {
  //   console.log('google login')
  //   userStore.setSocialLoginInfo('google')
  //   try {
  //     const code = route.query.code
  //     await userStore.googleSocialLogin(code)
  //     await userStore.getUserProfile()
  //     await categoryStore.getUserCategoryList()
  //     await contentStore.fetchAllContents()
  //     await userStore.getRecommendationMode()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // if (route.fullPath.includes('kakao')) {
  //   try {
  //     console.log('kakao login')
  //     userStore.setSocialLoginInfo('kakao')
  //     const code = route.query.code
  //     await userStore.kakaoSocialLogin(code)
  //     await userStore.getUserProfile()
  //     await categoryStore.getUserCategoryList()
  //     await contentStore.fetchAllContents()
  //     await userStore.getRecommendationMode()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // if (route.fullPath.includes('apple')) {
  //   try {
  //     console.log('apple login')
  //     userStore.setSocialLoginInfo('apple')
  //     const code = route.query.code
  //     await userStore.appleSocialLogin(code)
  //     await userStore.getUserProfile()
  //     await categoryStore.getUserCategoryList()
  //     await contentStore.fetchAllContents()
  //     await userStore.getRecommendationMode()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // } else {

  await userStore.getUserProfile()
  await categoryStore.getUserCategoryList()
  await contentStore.fetchAllContents()
  await userStore.getRecommendationMode()
  // }
})
</script>

<style></style>
