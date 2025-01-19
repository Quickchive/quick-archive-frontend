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
          href="https://quick-archive.notion.site/AI-11107f7f59b348a8afdd2d8f2f762fc1"
          target="_blank"
        >
          <img :src="banner2" />
        </a>
        <a
          href="https://chromewebstore.google.com/detail/quick-archive/phdbepngmohoalnmhjjjbbjijdjgnpoo?hl=ko"
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
import { onMounted, watch } from 'vue'
import { useToastStore } from '@/stores/useToastStore.ts'
import banner1 from '@/assets/img/banner/banner_1.png'
import banner2 from '@/assets/img/banner/banner_2.png'
import { getAutoCategorizeSettingFromCookie } from '@/utils/cookies.js'

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
            modalViewStore.hideModal('select')
            handleSingleLinkProcess(text, getAutoCategorizeSettingFromCookie())
            // contentStore.setSingleLink(text)
            // modalViewStore.showModalWithOverlay('addContentDetail', 'default')
          }
        }
      }
      toastStore.executeDefaultToast(toastData)
    }
  })
}

async function handleSingleLinkProcess(linkStr, shouldAutoCategorize = false) {
  modalViewStore.modal.loader = true

  try {
    const result = await contentStore.setSingleLink(linkStr)

    if (result.statusCode === 403) {
      // OG 데이터를 가져오는데 실패한 경우
      console.log('OG 데이터를 가져오는데 실패했습니다. 기본값 노출 및 자동분류 하지 않음')
      shouldAutoCategorize = false
      // 필요한 경우 추가적인 에러 처리나 사용자 알림을 여기서 수행
      // return false;
    } else {
      // OG 데이터를 성공적으로 가져온 경우
      console.log('OG 데이터를 성공적으로 가져왔습니다.')
      shouldAutoCategorize = true
    }

    // 자동 분류 실행 (조건부)
    if (shouldAutoCategorize) {
      try {
        await categoryStore.getAutoCategorizedName(linkStr)
      } catch (error) {
        console.error('카테고리 자동 분류 실패:', error)
      }
    }

    // 링크 정보를 성공적으로 가져왔으므로 모달 표시
    modalViewStore.showModalWithOverlay('addContentDetail', 'default')
  } catch (error) {
    // setSingleLink 함수 자체가 실패한 경우 (예: 잘못된 URL 형식 등)
    console.error('링크 처리 중 오류 발생:', error)
    return false
  } finally {
    modalViewStore.modal.loader = false
  }
}

const toMainPage = () => {
  router.push('/main')
}

onMounted(async () => {
  await userStore.getUserProfile()
  await categoryStore.getUserCategoryList()
  await userStore.getRecommendationMode()
})
</script>

<style></style>
