<template>
  <nav class="flex-container__col">
    <div>
      <a>logo</a>
      <!-- profile -->
      <div class="flex-container__row profile__wrapper">
        <img :src="profileImg" /><span>{{ nickname }}</span>
      </div>
      <div class="search__wrapper">
        <img :src="naviSearch" />
        <input class="input__naviSearch" placeholder="제목, 메모, 카테고리명 검색" />
      </div>
    </div>
    <!-- 카테고리 -->
    <div></div>
    <!-- 버튼 -->
    <div class="btnAdd__wrapper">
      <button class="button--md btn__add"><img :src="plus" />추가하기</button>
    </div>
  </nav>
</template>

<script>
import profileImg from '@/assets/img/avatar.png'
import naviSearch from '@/assets/ic/ic-navi-search-unselected.svg'
import plus from '@/assets/ic/ic-add.svg'

export default {
  data() {
    return {
      profileImg,
      naviSearch,
      plus,
      nickname: '퀵퀵콘텐츠마스터'
    }
  }
}
</script>

<style></style>
