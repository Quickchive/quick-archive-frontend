<template>
  <dialog class="category-set-location__modal">
    <modal-header
      :modalTitle="modalTitle"
      :isBtnOnLeft="isBtnOnLeft"
      :closeModal="closeModal"
    ></modal-header>
    <div class="wrapper__search-input">
      <search-input :placeholderText="placeholderText" :isSizeSm="false"></search-input>
    </div>
    <div class="wrapper__add-new-category__button">
      <button class="add-new-category__button button--transparent">
        <img :src="addCategoryIcon" />새 카테고리 만들기
      </button>
    </div>
    <!-- 카테고리 목록 (라디오 버튼) -->
    <div class="wrapper__modal-category-list">
      <category-item-with-radio-button
        v-for="categoryItem in categoryList"
        :key="categoryItem"
        :categoryDepth1="categoryItem"
      ></category-item-with-radio-button>
    </div>

    <!-- divider -->
    <div class="modal__divider--bottom"></div>

    <div class="modal-footer">
      <button
        class="confirm-button--inactive"
        :class="
          categoryAddStore.isSelectedCategory
            ? 'confirm-button--active'
            : 'confirm-button--inactive'
        "
        :disabled="!categoryAddStore.isSelectedCategory"
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
import ModalHeader from '@/components/header/ModalHeader.vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useCategoryAddStore } from '@/stores/useCategoryAddStore.ts'
import { useModalStore } from '@/stores/useModalStore.ts'
import { toRaw, onMounted, ref } from 'vue'
import categoryListDummy from '@/assets/model/categoryList.json'

const placeholderText = '카테고리명 검색'
const modalTitle = '생성 위치'
const isBtnOnLeft = true

// 스토어 선언
const categoryStore = useCategoryStore()
const modalStore = useModalStore()
const categoryAddStore = useCategoryAddStore()

const categoryList = ref(categoryStore.userCategoryList)

const closeModal = () => {
  categoryAddStore.resetCategoryLocation()
  modalStore.closeSetCategoryLocationModal()
}

onMounted(async () => {
  await categoryStore.getUserCategoryList()
  if (toRaw(categoryStore.userCategoryList).length > 0) {
    categoryList.value = toRaw(categoryStore.userCategoryList)
  } else {
    categoryList.value = categoryListDummy
  }
  console.log('생성 위치', categoryList)
})

// 완료 버튼 클릭
const setLocation = () => {
  console.log('완료 버튼 클릭')
  modalStore.closeSetCategoryLocationModal()
}
</script>
<style></style>
