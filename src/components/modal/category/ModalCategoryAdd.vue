<template>
  <dialog class="category-add__modal">
    <modal-header :modalTitle="'카테고리 추가'" :closeModal="closeEvent"></modal-header>
    <div class="wrapper__category-change">
      <button class="btn--transparent category-change__button" @click="openSelectCategoryModal()">
        <div class="icon__category-change">
          <img
            class="img-category-custom"
            :src="categoryStore.getCategoryImgByIconName(categoryStore.addCategoryObj.iconName)"
          /><img class="icon__thumb-change" :src="thumbChangeIcon" />
        </div>
      </button>
    </div>
    <label class="input__category-modal">
      <input
        :value="categoryStore.addCategoryObj.categoryName"
        @input="setCategoryName"
        class="input__category-modal"
        placeholder="카테고리 이름(2~15글자)"
        autofocus
        maxlength="15"
        ref="input"
      />
      <button
        v-show="categoryStore.addCategoryObj.categoryName"
        class="btn--transparent"
        @click="reset"
      >
        <img :src="textfieldCancelIcon" />
      </button>
    </label>
    <div class="flex-container__row wrapper__category-position">
      <label>현재 위치</label>
      <button class="btn--transparent flex-container__row" @click="openSetCategoryLocationModal()">
        <img
          v-if="categoryStore.addCategoryObj.parentCategoryName !== '전체 콘텐츠'"
          class="category-select-icon"
          :src="categoryStore.getCategoryImgByIconName(categoryStore.addCategoryObj.parentIconName)"
        />{{ categoryStore.addCategoryObj.parentCategoryName }}<img :src="nextBlackIcon" />
      </button>
    </div>
    <div class="modal-footer">
      <button
        class="btn-confirm"
        :class="isCategoryNameValid ? 'active' : 'inactive'"
        @click="categoryStore.addCategory"
        :disabled="!isCategoryNameValid"
      >
        저장
      </button>
    </div>
  </dialog>
</template>

<script setup>
import thumbChangeIcon from '@/assets/ic/ic-thumb-change.svg'
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import ModalHeader from '@/components/header/ModalHeader.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { computed, onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

// store 선언
const modalViewStore = useModalViewStore()
const categoryStore = useCategoryStore()

const closeEvent = () => {
  modalViewStore.hideModalWithOverlay('addCategory', 'default')
}
const input = ref(null)

onMounted(() => {
  // 카테고리 추가
  categoryStore.resetAddCategoryObj()
  closeEvent.value = () => modalViewStore.closeAddCategoryModal()
})

const openSelectCategoryModal = () => {
  modalViewStore.showModal('selectCategory')
}

const openSetCategoryLocationModal = () => {
  modalViewStore.showModal('categoryLocation')
}

// 카테고리 명 유효성 검사
const isCategoryNameValid = computed(() => {
  return 2 <= categoryStore.addCategoryObj.categoryName.length ? true : false
})

// 카테고리 아이콘 감시
categoryStore.$subscribe(() => {
  categoryStore.addCategoryObj.iconName = categoryStore.getSelectedCategory.iconName
  categoryStore.addCategoryObj.parentId = categoryStore.parentCategory.id
  categoryStore.addCategoryObj.parentCategoryName = categoryStore.parentCategory.name
  categoryStore.addCategoryObj.parentIconName = categoryStore.parentCategory.iconName
})

const setCategoryName = (e) => {
  categoryStore.addCategoryObj.categoryName = e.target.value
}

const reset = () => {
  if (input.value) {
    input.value.focus()
  }
  categoryStore.resetAddCategoryName
}
</script>

<style></style>
