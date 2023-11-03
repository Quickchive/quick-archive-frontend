<template>
  <dialog class="category-select__modal">
    <modal-header
      :modalTitle="modalTitle"
      :isBtnOnLeft="true"
      :closeModal="closeModal"
    ></modal-header>
    <article class="flex-container__row wrapper__category-icon">
      <button
        :key="categoryIcon"
        v-for="categoryIcon in categoryAddStore.defaultCategory"
        class="button--category-icon"
        @click="selectCategoryIcon(categoryIcon)"
      >
        <img :src="categoryIcon.img" class="category-default-icon" />
        <div v-if="categoryIcon.selected" class="isSelected">
          <img :src="controlCheckbox" class="controlCheckbox" v-if="categoryIcon.selected" />
        </div>
      </button>
    </article>
    <div class="modal-footer">
      <button class="confirm-button--active" @click="submitCategoryIcon()">완료</button>
    </div>
  </dialog>
</template>

<script setup>
import ModalHeader from '@/components/header/ModalHeader.vue'
import controlCheckbox from '@/assets/ic/ic-control-checkbox-on.svg'
import { useModalStore } from '@/stores/useModalStore.ts'
// import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useCategoryAddStore } from '@/stores/useCategoryAddStore.ts'

const modalTitle = '카테고리 아이콘 선택'
const modalStore = useModalStore()
// const categoryStore = useCategoryStore()
const categoryAddStore = useCategoryAddStore()

// 카테고리 아이콘 선택
const selectCategoryIcon = (i) => {
  categoryAddStore.selectCategoryIcon(i)
}
// 완료 버튼 이벤트 - 카테고리 아이콘 셋 후 저장
const submitCategoryIcon = () => {
  // 1. 카테고리 아이콘 저장 로직
  // 2. 1번 완료 후 모달 닫기 로직
  modalStore.closeSelectCategoryModal()
}
// 닫기 이벤트 - 카테고리 아이콘 기본값으로 저장 후 닫기
const closeModal = () => {
  modalStore.closeSelectCategoryModal()
}
</script>

<style></style>
