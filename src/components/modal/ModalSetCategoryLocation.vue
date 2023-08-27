<template>
  <dialog class="category-set-location__modal">
    <modal-header :modalTitle="modalTitle" :isBtnOnLeft="isBtnOnLeft"></modal-header>
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
      <category-item-user-custom></category-item-user-custom>
    </div>

    <!-- divider -->
    <div class="modal__divider--bottom"></div>

    <div class="modal-footer">
      <button class="confirm-button--inactive">완료</button>
    </div>
  </dialog>
</template>

<script>
import SearchInput from '@/components/input/SearchInput.vue'
import addCategoryIcon from '@/assets/ic/ic-category-add.svg'
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import categoryIcon from '@/assets/ic/ic-category-list.png'
import CategoryItemUserCustom from '@/components/home/CategoryItemUserCustom.vue'
import ModalHeader from '@/components/header/ModalHeader.vue'

export default {
  components: { SearchInput, CategoryItemUserCustom, ModalHeader },
  data() {
    return {
      placeholderText: '카테고리명 검색',
      addCategoryIcon,
      expandMoreIcon,
      expandLessIcon,
      moreIcon,
      categoryIcon,
      modalTitle: '생성 위치',
      isBtnOnLeft: true
    }
  }
}
</script>

<style></style>
