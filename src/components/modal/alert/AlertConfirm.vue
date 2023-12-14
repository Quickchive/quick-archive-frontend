<template>
  <dialog class="flex-container__col alert-modal">
    <h1 class="alert-title">알림</h1>
    <p class="select-alert-content">{{ props.message }}</p>
    <button
      class="flex-container__row button--alert-checkbox"
      @click="categoryStore.deleteContentsInCategory()"
      v-if="checkbox"
    >
      <img :src="checkboxOffIcon" v-if="!categoryStore.deleteContentsChecked" class="icon-small" />
      <img
        :src="checkboxOnIcon"
        v-if="categoryStore.deleteContentsChecked"
        class="icon-small"
      />카테고리 내 콘텐츠도 함께 삭제하기
    </button>
    <div class="flex-container__row wrapper__alert-button--double">
      <button class="flex-container alert-cancel-button" @click="closeModal()">
        {{ closeButtonMessage }}
      </button>
      <button class="flex-container alert-confirm-button" @click="confirm()">
        {{ confirmButtonMessage }}
      </button>
    </div>
  </dialog>
</template>

<script setup>
import checkboxOffIcon from '@/assets/ic/ic-control-checkbox-off.svg'
import checkboxOnIcon from '@/assets/ic/ic-control-checkbox-on.svg'
// import { deleteCategories } from '@/api/category.js'
// import { useModalStore } from '@/stores/useModalStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { ref } from 'vue'
// const isChecked = ref(false)
// const modalStore = useModalStore()
const categoryStore = useCategoryStore()

// const deleteCategory = async () => {
//   try {
//     const focusedCategoryId = categoryStore.getFocusedCategoryId
//     const response = await deleteCategories(focusedCategoryId, isChecked.value)
//     console.log(response)
//     if (response.data.statusCode === (200 || 201)) {
//       categoryStore.getUserCategoryList()
//       modalStore.closeDeleteCategoryModal()
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

const props = defineProps({
  message: String,
  closeModal: Function,
  confirm: Function,
  checkbox: Boolean,
  closeButtonMessage: String,
  confirmButtonMessage: String
})
</script>

<style></style>
