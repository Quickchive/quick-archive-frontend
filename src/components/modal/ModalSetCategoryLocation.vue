<template>
  <dialog class="flex-container__col category-set-location__modal">
    <header class="flex-container__row">
      <button class="button--transparent close-button--top"><img :src="topCloseIcon" /></button>
      <h1 class="modal-title">생성 위치</h1>
    </header>
    <div class="wrapper__search-input">
      <search-input :placeholderText="placeholderText"></search-input>
    </div>
    <div class="wrapper__add-new-category__button">
      <button class="add-new-category__button button--transparent">
        <img :src="addCategoryIcon" />새 카테고리 만들기
      </button>
    </div>
    <!-- 카테고리 목록 -->
    <div class="wrapper__modal-category-list">
      <category-list-user-custom></category-list-user-custom>
    </div>

    <!-- divider -->
    <div class="modal__divider--bottom"></div>

    <!-- button -->
    <div class="wrapper__confirm-button flex-container__col">
      <button class="confirm-button--inactive">완료</button>
    </div>
  </dialog>
</template>

<script>
import topCloseIcon from '@/assets/ic/ic-top-close.svg'
import SearchInput from '@/components/SearchInput.vue'
import addCategoryIcon from '@/assets/ic/ic-category-add.svg'
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import categoryIcon from '@/assets/ic/ic-category-list.png'
import CategoryListUserCustom from '@/components/home/CategoryListUserCustom.vue'

export default {
  components: { SearchInput, CategoryListUserCustom },
  data() {
    return {
      topCloseIcon,
      placeholderText: '카테고리명 검색',
      addCategoryIcon,
      expandMoreIcon,
      expandLessIcon,
      moreIcon,
      categoryIcon
    }
  }
}
</script>

<style></style>
