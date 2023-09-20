<template>
  <nav class="thenavbar">
    <div class="navbar__top-container">
      <a>logo</a>
      <!-- profile -->
      <div class="profile__wrapper">
        <img class="img-profile" :src="profileImg" /><span>{{ userStore.nickname }}</span>
      </div>
      <div class="search__wrapper">
        <search-input :placeholderText="placeholderText"></search-input>
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
  <modal-view v-if="this.modalStore.overlay"></modal-view>
</template>

<script>
import profileImg from '@/assets/img/img_empty_noprofile.png'
import naviSearch from '@/assets/ic/ic-navi-search-unselected.svg'
import plus from '@/assets/ic/ic-add.svg'
import CategoryList from '@/components/nav/CategoryList.vue'
import SearchInput from '@/components/input/SearchInput.vue'
import ModalView from '@/views/ModalView.vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useModalStore } from '@/stores/useModalStore.ts'

export default {
  components: {
    CategoryList,
    SearchInput,
    ModalView
  },
  data() {
    return {
      profileImg,
      naviSearch,
      plus,
      placeholderText: '제목, 메모, 카테고리명 검색',
      isAddModalShow: false
    }
  },
  methods: {
    showAddModal() {
      this.modalStore.openSelectModal()
    }
  },
  setup() {
    // counter store 가져오기
    const userStore = useUserStore()
    const modalStore = useModalStore()
    return {
      userStore,
      modalStore
    }
  }
}
</script>

<style></style>
