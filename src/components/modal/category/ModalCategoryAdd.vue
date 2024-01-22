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
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
// import { addCategories } from '@/api/category.js'
import { addCategories, updateCategories } from '@/api/category.js'
import { ref, computed, onMounted } from 'vue'
import { searchCategoryDataById } from '@/utils/search.js'

const props = defineProps({
  modalTitle: String,
  closeModal: Function,
  apiName: String
})

onMounted(async () => {
  if (props.apiName === 'editCategory') {
    console.log('editCategory')
    categoryName.value = categoryStore.focusedCategoryData.name
    if (categoryStore.focusedCategoryData.parentId !== null) {
      const parentData = searchCategoryDataById(
        categoryStore.userCategoryList,
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

// store 선언
const modalViewStore = useModalViewStore()
const categoryStore = useCategoryStore()
const modalDataStore = useModalDataStore()

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

const saveCategory = async () => {
  // 카테고리 추가
  if (props.apiName === 'addCategory') {
    // 저장 버튼 클릭
    // const addCategory = async () => {
    try {
      let categoryData = {
        categoryName: categoryName.value,
        iconName: modalDataStore.getSelectedCategory.iconName
      }
      if (modalDataStore.selectedLocation.name !== '미지정') {
        categoryData.parentId = modalDataStore.selectedLocation.id
      }
      const response = await addCategories(categoryData)
      console.log('카테고리 추가 서버 전송 응답', response)
      // 상태코드로 에러 처리 하기
      if (response.data.statusCode === 201) {
        modalViewStore.closeAddCategoryModal()
        modalViewStore.closeSelectModal()
        await categoryStore.getUserCategoryList()
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.statusCode === 409) {
        modalViewStore.setDuplicatedCategoryName(modalDataStore.selectedLocation.name)
        modalViewStore.openAlertModal()
      }
    }
  }
  // 카테고리 수정
  if (props.apiName === 'editCategory') {
    try {
      let categoryData = {
        categoryName: categoryName.value,
        iconName: modalDataStore.getSelectedCategory.iconName,
        // parentId: modalDataStore.selectedLocation.id,
        categoryId: categoryStore.focusedCategoryData.id
      }
      if (modalDataStore.selectedLocation.name !== '미지정') {
        categoryData.parentId = modalDataStore.selectedLocation.id
      }
      const response = await updateCategories(categoryData)
      console.log('카테고리 수정 서버 전송 응답', response)
      if (response.data.statusCode === 201) {
        modalViewStore.closeAddCategoryModal()
        modalViewStore.closeSelectModal()
        await categoryStore.getUserCategoryList()
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.statusCode === 409) {
        modalViewStore.setDuplicatedCategoryName(modalDataStore.selectedLocation.name)
        modalViewStore.openAlertModal()
      }
    }
  }
}

const setCategoryName = (e) => {
  categoryName.value = e.target.value
}
</script>

<style></style>
