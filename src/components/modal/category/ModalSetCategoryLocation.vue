<template>
  <dialog class="category-set-location__modal">
    <modal-header
      :modalTitle="modalTitle"
      :isBtnOnLeft="true"
      :closeModal="closeModal"
    ></modal-header>
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
    <template v-if="searchStore.keyword.modal === ''">
      <div class="wrapper__modal-category-list">
        <category-item-with-radio-button></category-item-with-radio-button>
      </div>
    </template>
    <template v-else>
      <div>
        <category-item-with-radio-button-search
          v-if="searchStore.searchedCategory2.length > 0"
        ></category-item-with-radio-button-search>
      </div>
    </template>

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
import CategoryItemWithRadioButtonSearch from '@/components/nav/CategoryItemWithRadioButtonSearch.vue'

import ModalHeader from '@/components/header/ModalHeader.vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useSearchStore } from '@/stores/useSearchStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { toRaw, onMounted, ref } from 'vue'

const modalTitle = '현재 위치'

// 스토어 선언
const categoryStore = useCategoryStore()
const searchStore = useSearchStore()

const modalViewStore = useModalViewStore()
const modalDataStore = useModalDataStore()

const categoryList = ref(categoryStore.userCategoryList)

const closeModal = () => {
  modalDataStore.resetCategoryLocation()
  modalViewStore.hideModal('categoryLocation')
}

onMounted(async () => {
  await categoryStore.getUserCategoryList()
  if (toRaw(categoryStore.userCategoryList).length > 0) {
    categoryList.value = toRaw(categoryStore.userCategoryList)
  }
})

// 완료 버튼 클릭
const setLocation = () => {
  modalViewStore.hideModal('categoryLocation')
}
</script>
<style></style>
