<template>
  <dialog class="category-set-location__modal">
    <div class="wrapper__search-input">
      <search-input
        :keyword="'modal'"
        :location="searchStore.keyword.modal"
        :placeholderText="searchStore.placeholderText.modal"
        :isSizeSm="false"
      ></search-input>
    </div>
    <div class="wrapper__add-new-category__button">
      <button
        class="add-new-category__btn btn--transparent"
        @click="modalViewStore.openSetNewCategoryModal()"
      >
        <img :src="addCategoryIcon" />새 카테고리 만들기
      </button>
    </div>
    <!-- 카테고리 목록 (라디오 버튼) -->
    <div class="wrapper__modal-category-list">
      <category-item-with-radio-button></category-item-with-radio-button>
    </div>
    <!-- divider -->
    <div class="modal__divider--bottom"></div>
    <div class="modal-footer">
      <button
        class="btn-confirm"
        :class="modalDataStore.isSelectedCategory ? 'active' : 'inactive'"
        :disabled="!modalDataStore.isSelectedCategory"
        @click="setLocation()"
      >
        완료
      </button>
    </div>
  </dialog>
</template>

<script setup>
import SearchInput from '@/components/input/SearchInput.vue'
import addCategoryIcon from '@/assets/ic/ic-category-add.svg'
import CategoryItemWithRadioButton from '@/components/nav/CategoryItemWithRadioButton.vue'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useSearchStore } from '@/stores/useSearchStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { toRaw, onMounted, ref } from 'vue'
import categoryListDummy from '@/assets/model/categoryList.json'

// 스토어 선언
const categoryTreeStore = useCategoryTreeStore()
const searchStore = useSearchStore()

const modalViewStore = useModalViewStore()
const modalDataStore = useModalDataStore()

const categoryList = ref(categoryTreeStore.userCategoryList)

onMounted(async () => {
  await categoryTreeStore.getUserCategoryList()
  if (toRaw(categoryTreeStore.userCategoryList).length > 0) {
    categoryList.value = toRaw(categoryTreeStore.userCategoryList)
  } else {
    categoryList.value = categoryListDummy
  }
})

// 완료 버튼 클릭
const setLocation = () => {
  modalViewStore.hideModal('categoryLocation')
}
</script>
<style></style>
