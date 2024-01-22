<template>
  <dialog class="confirm-modal">
    <h1 class="alert-title">새 카테고리</h1>
    <p class="text__confirm-content">
      새 카테고리 이름을 입력해 주세요.<br />
      생성 위치는 카테고리 수정 시 변경할 수 있어요.
    </p>
    <div class="wrapper__confirm-input">
      <input
        class="input__sm--default"
        placeholder="이름을 입력해주세요(2~15글자)"
        :value="categoryName"
        @input="setNewCategory"
      />
      <button class="btn--transparent" @click="clearInput()">
        <img :src="textfieldCancelIcon" />
      </button>
    </div>
    <div class="wrapper__confirm-button">
      <div class="alert-btn__wrapper">
        <button class="alert-btn cancel btn-48" @click="modalViewStore.closeSetNewCategoryModal()">
          닫기
        </button>
      </div>
      <div class="alert-btn__wrapper">
        <button
          class="alert-btn btn-48"
          :class="isCategoryNameValid ? 'confirm' : 'inactive'"
          :disabled="!isCategoryNameValid"
          @click="saveNewCategory()"
        >
          저장
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import { ref, computed } from 'vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'

import { useCategoryStore } from '@/stores/useCategoryStore.ts'

const modalViewStore = useModalViewStore()
const categoryStore = useCategoryStore()
const modalDataStore = useModalDataStore()

const categoryName = ref('')

const setNewCategory = (e) => {
  categoryName.value = e.target.value
}

// 카테고리 명 유효성 검사
const isCategoryNameValid = computed(() => {
  return 2 <= categoryName.value.length && categoryName.value.length <= 15 ? true : false
})

const clearInput = () => {
  categoryName.value = ''
}

const saveNewCategory = async () => {
  modalViewStore.closeSetNewCategoryModal()
  modalViewStore.openDeleteCategoryModal()

  // 카테고리 생성
  const categoryData = {
    categoryName: categoryName.value
    // iconName: modalDataStore.getSelectedCategory.iconName
  }
  // const response = await categoryStore.addCategory(categoryData)
  // if (response.data.statusCode === 201) {
  //   // 카테고리 생성 완료 얼럿 띄우기
  //   modalViewStore.deleteCategoryModal()
  // }
}
</script>

<style></style>
