<template>
  <nav class="thenavbar">
    <div class="navbar__top-container">
      <button @click="toMainPage()" class="button--transparent"><img :src="mainLogo" /></button>
      <!-- profile -->
      <router-link to="/setting">
        <div class="profile__wrapper">
          <img class="img-profile" :src="profileImg" /><span>{{ userStore.nickname }}</span>
        </div>
      </router-link>

      <div class="search__wrapper">
        <search-input :placeholderText="placeholderText" :isSizeSm="true"></search-input>
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
    <div class="btnAdd__wrapper">
      <button class="button--md btn__add" @click="showAddModal()">
        <img :src="plus" />추가하기
      </button>
    </div>
  </nav>
  <div class="navbar-shadow"></div>
  <!-- 모달 -->
  <modal-view v-if="modalStore.overlay"></modal-view>
</template>

<script setup>
import profileImg from '@/assets/img/img_empty_noprofile.png'
import plus from '@/assets/ic/ic-add.svg'
import CategoryList from '@/components/nav/CategoryList.vue'
import SearchInput from '@/components/input/SearchInput.vue'
import ModalView from '@/views/ModalView.vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useModalStore } from '@/stores/useModalStore.ts'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import mainLogo from '@/assets/logo/logo_black_20px.svg'

const userStore = useUserStore()
const modalStore = useModalStore()
const router = useRouter()

const placeholderText = ref('제목, 메모, 카테고리명 검색')
const showAddModal = () => {
  modalStore.openSelectModal()
}

const toMainPage = () => {
  router.push('/home')
}
</script>

<style></style>
