<template>
  <nav class="thenavbar">
    <div class="navbar__top-container">
      <a>logo</a>
      <!-- profile -->
      <div class="profile__wrapper">
        <img class="img-profile" :src="profileImg" /><span>{{ nickname }}</span>
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
      <button class="button--md btn__add"><img :src="plus" />추가하기</button>
    </div>
  </nav>
  <div class="navbar-shadow"></div>
</template>

<script>
import profileImg from '@/assets/img/img_empty_noprofile.png'
import naviSearch from '@/assets/ic/ic-navi-search-unselected.svg'
import plus from '@/assets/ic/ic-add.svg'
import CategoryList from '@/components/nav/CategoryList.vue'
import SearchInput from '@/components/input/SearchInput.vue'

export default {
  components: {
    CategoryList,
    SearchInput
  },
  data() {
    return {
      profileImg,
      naviSearch,
      plus,
      nickname: '퀵퀵콘텐츠마스터',
      placeholderText: '제목, 메모, 카테고리명 검색'
    }
  }
}
</script>

<style></style>
