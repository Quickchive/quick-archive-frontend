<template>
  <dialog class="category-add__modal">
    <modal-header :modalTitle="modalTitle" :closeModal="closeModal"></modal-header>
    <div class="wrapper__category-change">
      <button class="btn--transparent category-change__button" @click="openSelectCategoryModal()">
        <div class="icon__category-change">
          <img class="img-category-custom" :src="modalDataStore.getSelectedCategory.img" /><img
            class="icon__thumb-change"
            :src="thumbChangeIcon"
          />
        </div>
      </button>
    </div>
    <label class="input__category-modal">
      <input
        :value="categoryName"
        @input="setCategoryName"
        class="input__category-modal"
        placeholder="카테고리 이름(2~15글자)"
        autofocus
        maxlength="15"
      />
      <button class="btn--transparent" @click="clearCategoryName()">
        <img :src="textfieldCancelIcon" />
      </button>
    </label>
    <div class="flex-container__row wrapper__category-position">
      <label>생성 위치</label>
      <button class="btn--transparent flex-container__row" @click="openSetCategoryLocationModal()">
        {{ modalDataStore.selectedLocation.name }}<img :src="nextBlackIcon" />
      </button>
    </div>
    <div class="modal-footer">
      <button
        class="btn-confirm"
        :class="isCategoryNameValid ? 'active' : 'inactive'"
        @click="saveCategory()"
        :disabled="!isCategoryNameValid"
      >
        저장
      </button>
    </div>
  </dialog>
</template>

<script setup>
import thumbChangeIcon from '@/assets/ic/ic-thumb-change.svg'
import categoryWatchIcon from '@/assets/img/category/img_category_watch.png'
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import ModalHeader from '@/components/header/ModalHeader.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { ref, computed, onMounted } from 'vue'
import { searchCategoryDataById } from '@/utils/search.js'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

const props = defineProps({
  modalTitle: String,
  closeModal: Function,
  apiName: String
})

// store 선언
const modalViewStore = useModalViewStore()
const categoryTreeStore = useCategoryTreeStore()
const categoryStore = useCategoryStore()
const modalDataStore = useModalDataStore()

onMounted(async () => {
  if (props.apiName === 'editCategory') {
    categoryName.value = categoryStore.focusedCategoryData.name
    if (categoryStore.focusedCategoryData.parentId !== null) {
      const parentData = searchCategoryDataById(
        categoryTreeStore.userCategoryList,
        categoryStore.focusedCategoryData.parentId
      )
      modalDataStore.selectedLocation.name = parentData.name
      modalDataStore.selectedLocation.id = parentData.id
    }
    if (categoryStore.focusedCategoryData.parentId === null) {
      modalDataStore.selectedLocation.name = '미지정'
    }
    console.log('parentData', parentData)
  }
})

const categoryName = ref('')
let categoryIcon = ref(categoryWatchIcon)
let categoryLocationName = ref('미지정')

const openSelectCategoryModal = () => {
  modalViewStore.openSelectCategoryModal()
}

const openSetCategoryLocationModal = () => {
  modalViewStore.openSetCategoryLocationModal()
}

// 카테고리 명 유효성 검사
const isCategoryNameValid = computed(() => {
  return 2 <= categoryName.value.length ? true : false
})

// 카테고리 필드 삭제
const clearCategoryName = () => {
  categoryName.value = ''
}

// 카테고리 아이콘 감시
modalDataStore.$subscribe(() => {
  categoryIcon.value = modalDataStore.getSelectedCategory.img
  categoryLocationName.value = modalDataStore.selectedLocation.name
})

// 저장 버튼 클릭 이벤트
const saveCategory = () => {
  // 카테고리 추가
  if (props.apiName === 'addCategory') {
    let categoryData = {
      categoryName: categoryName.value,
      iconName: modalDataStore.getSelectedCategory.iconName
    }
    if (modalDataStore.selectedLocation.name !== '미지정') {
      categoryData.parentId = modalDataStore.selectedLocation.id
    }
    categoryTreeStore.addCategory(categoryData)
  }
  // 카테고리 수정
  if (props.apiName === 'editCategory') {
    let editCategoryData = {
      categoryName: categoryName.value,
      iconName: modalDataStore.getSelectedCategory.iconName,
      categoryId: categoryTreeStore.focusedCategoryId
    }
    if (modalDataStore.selectedLocation.name !== '미지정') {
      editCategoryData.parentId = modalDataStore.selectedLocation.id
    }
    categoryTreeStore.editCategory(editCategoryData)
  }
}

const setCategoryName = (e) => {
  categoryName.value = e.target.value
}
</script>

<style></style>
