<template>
  <dialog class="content-add__set-new-category">
    <modal-header
      :modalTitle="modalTitle"
      :isBtnOnLeft="isBtnOnLeft"
      :closeModal="closeModal"
    ></modal-header>
    <div class="wrapper__search-input">
      <search-input :placeholderText="placeholderText"></search-input>
    </div>
    <div class="wrapper__add-new-category__button">
      <button class="add-new-category__button button--transparent">
        <img :src="addCategoryIcon" />새 카테고리 만들기
      </button>
    </div>
    <div class="wrapper__add-new-category-list">
      <category-item-with-radio-button
        v-for="categoryItem in categoryList"
        :key="categoryItem"
        :categoryDepth1="categoryItem"
      ></category-item-with-radio-button>
    </div>

    <div class="modal-footer">
      <button class="confirm-button--inactive">완료</button>
    </div>
  </dialog>
</template>

<script setup>
import ModalHeader from '@/components/header/ModalHeader.vue'
import SearchInput from '@/components/input/SearchInput.vue'
import addCategoryIcon from '@/assets/ic/ic-category-add.svg'
import CategoryItemWithRadioButton from '@/components/nav/CategoryItemWithRadioButton.vue'
import { toRaw, onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useModalStore } from '@/stores/useModalStore.ts'

import categoryListDummy from '@/assets/model/categoryList.json'

const modalTitle = '생성 위치'
const isBtnOnLeft = true
const placeholderText = '카테고리명 검색'
const categoryStore = useCategoryStore()
const modalStore = useModalStore()

const categoryList = ref(categoryStore.userCategoryList)

onMounted(async () => {
  await categoryStore.getUserCategoryList()
  if (toRaw(categoryStore.userCategoryList).length > 0) {
    categoryList.value = toRaw(categoryStore.userCategoryList)
  } else {
    categoryList.value = categoryListDummy
  }
  console.log('생성 위치', categoryList)
})

const closeModal = () => {
  modalStore.closeSetContentLocationModal()
  modalStore.closeAddContentDetailModal()
  modalStore.closeAddContentModal()
  modalStore.closeSelectModal()
}
</script>

<style></style>
