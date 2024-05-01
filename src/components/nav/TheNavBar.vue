<template>
  <nav class="thenavbar">
    <div class="navbar__top-container">
      <button @click="toMainPage()" class="btn--transparent"><img :src="mainLogo" /></button>
      <!-- profile -->
      <router-link to="/home/setting">
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
    </div>
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
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { useRouter, useRoute } from 'vue-router'
import mainLogo from '@/assets/logo/logo_black_20px.svg'
import { onMounted } from 'vue'
import { useModalDataStore } from '@/stores/useModalDataStore'
import { useToastStore } from '@/stores/useToastStore.ts'

const categoryTreeStore = useCategoryTreeStore()
const userStore = useUserStore()
const searchStore = useSearchStore()
const modalViewStore = useModalViewStore()
const modalDataStore = useModalDataStore()
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
            modalDataStore.setSingleLink(text)
            modalViewStore.showModalWithOverlay('addContentDetail', 'default')
          }
        }
      }
      toastStore.executeDefaultToast(toastData)
    }
  })
}

const toMainPage = () => {
  router.push('/home')
}

onMounted(async () => {
  // 로그인
  if (route.fullPath.includes('google')) {
    console.log('google login')
    userStore.setSocialLoginInfo('google')
    try {
      const code = route.query.code
      await userStore.googleSocialLogin(code)
      await userStore.getUserProfile()
      await categoryTreeStore.getUserCategoryList()
    } catch (error) {
      console.error(error)
    }
  }
  if (route.fullPath.includes('kakao')) {
    try {
      console.log('kakao login')
      userStore.setSocialLoginInfo('kakao')
      const code = route.query.code
      await userStore.kakaoSocialLogin(code)
      await userStore.getUserProfile()
      await categoryTreeStore.getUserCategoryList()
    } catch (error) {
      console.error(error)
    }
  }
  if (route.fullPath.includes('apple')) {
    try {
      console.log('apple login')
      userStore.setSocialLoginInfo('apple')
      const code = route.query.code
      await userStore.appleSocialLogin(code)
      await userStore.getUserProfile()
      await categoryTreeStore.getUserCategoryList()
    } catch (error) {
      console.error(error)
    }
  } else {
    await userStore.getUserProfile()
    await categoryTreeStore.getUserCategoryList()
  }
})
</script>

<style></style>
