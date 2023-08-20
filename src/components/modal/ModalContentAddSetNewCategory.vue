<template>
  <dialog class="content-add__set-new-category">
    <modal-header :modalTitle="modalTitle" :isBtnOnLeft="isBtnOnLeft"></modal-header>

    <div class="wrapper__search-input">
      <search-input :placeholderText="placeholderText"></search-input>
    </div>
    <div class="wrapper__add-new-category__button">
      <button class="add-new-category__button button--transparent">
        <img :src="addCategoryIcon" />새 카테고리 만들기
      </button>
    </div>
    <div class="wrapper__add-new-category-list">
      <category-list-with-radio-button></category-list-with-radio-button>
    </div>

    <div class="modal-footer">
      <button class="confirm-button--inactive">완료</button>
    </div>
  </dialog>
</template>

<script>
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import ModalHeader from '@/components/header/ModalHeader.vue'
import SearchInput from '../SearchInput.vue'
import addCategoryIcon from '@/assets/ic/ic-category-add.svg'
import CategoryListWithRadioButton from '@/components/home/CategoryListWithRadioButton.vue'

export default {
  components: { ModalHeader, SearchInput, CategoryListWithRadioButton },
  data() {
    return {
      nextBlackIcon,
      textfieldCancelIcon,
      modalTitle: '생성 위치',
      isBtnOnLeft: true,
      placeholderText: '카테고리명 검색',
      addCategoryIcon
    }
  }
}
</script>

<style></style>
