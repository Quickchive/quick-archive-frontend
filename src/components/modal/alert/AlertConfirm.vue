<template>
  <dialog class="flex-container__col alert-modal">
    <h1 class="alert-title">알림</h1>
    <p class="select-alert-content">카테고리를 삭제할까요?</p>
    <button class="flex-container__row button--alert-checkbox" @click="isChecked = !isChecked">
      <img :src="checkboxOffIcon" v-if="!isChecked" class="icon-ex-small" />
      <img :src="checkboxOnIcon" v-if="isChecked" class="icon-ex-small" />카테고리 내 콘텐츠도 함께
      삭제하기
    </button>
    <div class="flex-container__row wrapper__alert-button--double">
      <button
        class="flex-container alert-cancel-button"
        @click="modalStore.closeDeleteCategoryModal()"
      >
        닫기
      </button>
      <button class="flex-container alert-confirm-button" @click="deleteCategory">삭제</button>
    </div>
  </dialog>
</template>

<script setup>
import checkboxOffIcon from '@/assets/ic/ic-control-checkbox-off.svg'
import checkboxOnIcon from '@/assets/ic/ic-control-checkbox-on.svg'
import { deleteCategories } from '@/api/category.js'
import { useModalStore } from '@/stores/useModalStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { ref } from 'vue'
const isChecked = ref(false)
const modalStore = useModalStore()
const categoryStore = useCategoryStore()

const deleteCategory = async () => {
  try {
    const focusedCategoryId = categoryStore.getFocusedCategoryId
    const response = await deleteCategories(focusedCategoryId, isChecked.value)
    console.log(response)
    if (response.data.statusCode === (200 || 201)) {
      modalStore.closeDeleteCategoryModal()
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style></style>
