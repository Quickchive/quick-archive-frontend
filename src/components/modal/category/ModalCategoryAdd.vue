<template>
  <dialog class="category-add__modal">
    <modal-header :modalTitle="modalTitle" :closeModal="closeEvent"></modal-header>
    <div class="wrapper__category-change">
      <button class="btn--transparent category-change__button" @click="openSelectCategoryModal()">
        <div class="icon__category-change">
          <img
            class="img-category-custom"
            :src="modalDataStore.getCategoryImgByIconName(categoryIcon)"
          /><img class="icon__thumb-change" :src="thumbChangeIcon" />
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
      <button v-show="categoryName" class="btn--transparent" @click="clearCategoryName()">
        <img :src="textfieldCancelIcon" />
      </button>
    </label>
    <div class="flex-container__row wrapper__category-position">
      <label>현재 위치</label>
      <button class="btn--transparent flex-container__row" @click="openSetCategoryLocationModal()">
        <img
          v-if="modalDataStore.selectedLocation.name !== '전체 콘텐츠'"
          class="category-select-icon"
          :src="modalDataStore.getCategoryImgByIconName(modalDataStore.selectedLocation.iconName)"
        />{{ modalDataStore.selectedLocation.name }}<img :src="nextBlackIcon" />
      </button>
    </div>
    <div class="modal-footer">
      <button
        class="btn-confirm"
        :class="isCategoryNameValid ? 'active' : 'inactive'"
        @click="saveCategory"
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
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { ref, computed, onMounted } from 'vue'
import { searchCategoryDataById } from '@/utils/search.js'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

const props = defineProps({
  closeModal: Function,
  apiName: String,
  modalData: Object
})

// store 선언
const modalViewStore = useModalViewStore()
const categoryTreeStore = useCategoryTreeStore()
const categoryStore = useCategoryStore()
const modalDataStore = useModalDataStore()

const categoryName = ref('')
const categoryIcon = ref('')
const modalTitle = ref('')
const closeEvent = ref(Function)

onMounted(() => {
  // 카테고리 추가
  if (props.apiName === 'addCategory') {
    modalTitle.value = '카테고리 추가'
    categoryName.value = ''
    categoryIcon.value = 'Folder'
    closeEvent.value = () => modalViewStore.closeAddCategoryModal()
  }

  // 카테고리 수정
  else {
    modalTitle.value = '카테고리 수정'
    categoryName.value = categoryStore.focusedCategoryData.name
    categoryIcon.value = categoryStore.focusedCategoryData.iconName
    const iconData = modalDataStore.getIconDatagByIconName(
      categoryStore.focusedCategoryData.iconName
    )
    modalDataStore.selectCategoryIcon(iconData)
    closeEvent.value = () => modalViewStore.hideModalWithOverlay('editCategory', 'default')
    if (categoryStore.focusedCategoryData.parentId !== null) {
      const parentData = searchCategoryDataById(
        categoryTreeStore.userCategoryList,
        categoryStore.focusedCategoryData.parentId
      )
      modalDataStore.selectedLocation.name = parentData.name
      modalDataStore.selectedLocation.id = parentData.id
    } else {
      modalDataStore.selectedLocation.name = '전체 콘텐츠'
      modalDataStore.selectedLocation.id = -1
    }
  }
})

const openSelectCategoryModal = () => {
  modalViewStore.showModal('selectCategory')
}

const openSetCategoryLocationModal = () => {
  modalViewStore.showModal('categoryLocation')
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
  categoryIcon.value = modalDataStore.getSelectedCategory.iconName
})

// 저장 버튼 클릭 이벤트
const saveCategory = () => {
  let categoryData = {
    categoryName: categoryName.value,
    iconName: categoryIcon.value
  }
  if (categoryStore.focusedCategoryData.parentId !== (null || -1 || undefined)) {
    categoryData.parentId = modalDataStore.selectedLocation.id
  }

  // // 카테고리 추가
  if (props.apiName === 'addCategory') {
    categoryStore.addCategory(categoryData)
  }

  // // 카테고리 수정
  if (props.apiName === 'editCategory') {
    categoryData.categoryId = categoryStore.focusedCategoryData.id
    categoryStore.editCategory(categoryData)
  }
}

const setCategoryName = (e) => {
  categoryName.value = e.target.value
}
</script>

<style></style>
