<template>
  <dialog class="category-set-location__modal">
    <modal-header
      :modalTitle="modalTitle"
      :isBtnOnLeft="true"
      :titlePosition="'left'"
      :closeModal="closeModal"
    ></modal-header>
    <div
      :class="
        userStore.recommendationMode && categoryStore.isRecommended
          ? 'wrapper__search-input-ai'
          : 'wrapper__search-input'
      "
    >
      <search-input
        :keyword="'modal'"
        :location="searchStore.keyword.modal"
        :placeholderText="searchStore.placeholderText.modal"
        :isSizeSm="false"
      ></search-input>
    </div>

    <!-- 추천 배너 -->

    <div
      v-if="
        userStore.recommendationMode &&
        categoryStore.isRecommended &&
        (modalViewStore.modal.addContent || modalViewStore.modal.addContentDetail)
      "
      class="wrapper__banner-ai"
    >
      <img :src="icAutomatic" />
      <span>퀵카이브와 AI가 카테고리를 추천했어요.</span>
    </div>

    <div class="wrapper__add-new-category__button">
      <button
        class="add-new-category__btn btn--transparent"
        @click="modalViewStore.openSetNewCategoryModal()"
      >
        <img :src="addCategoryIcon" />새 카테고리 만들기
      </button>
    </div>

    <!-- 카테고리 목록 전체(라디오 버튼) -->
    <template v-if="searchStore.keyword.modal === ''">
      <div
        class="wrapper__modal-category-list"
        :class="
          userStore.recommendationMode &&
          categoryStore.isRecommended &&
          modalViewStore.modal.addContent
            ? 'wrapper__modal-category-list--ai'
            : 'wrapper__modal-category-list'
        "
      >
        <category-item-with-radio-button></category-item-with-radio-button>
      </div>
    </template>
    <!-- 카테고리 목록 검색 결과(라디오 버튼) -->
    <template v-else>
      <div>
        <category-item-with-radio-button-search
          v-if="searchStore.searchedCategory2.length > 0"
        ></category-item-with-radio-button-search>
      </div>
    </template>

    <!-- divider -->
    <div class="modal__divider--bottom"></div>
    <div class="modal-footer-categoryLocation">
      <button class="btn-confirm active" @click="setLocation">완료</button>
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
import { useSearchStore } from '@/stores/useSearchStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { toRaw, onMounted, ref } from 'vue'
import { useContentStore } from '@/stores/useContentStore.ts'
import icAutomatic from '@/assets/ic/ic_automatic.svg'
import { useUserStore } from '@/stores/useUserStore.ts'

const userStore = useUserStore()
const modalTitle = '현재 위치'

// 스토어 선언
const categoryStore = useCategoryStore()
const searchStore = useSearchStore()
const contentStore = useContentStore()
const modalViewStore = useModalViewStore()

const props = defineProps({
  closeModal: Function
})

const categoryList = ref(categoryStore.categoryList)

onMounted(async () => {
  await categoryStore.getUserCategoryList()
  if (toRaw(categoryStore.categoryList).length > 0) {
    categoryList.value = toRaw(categoryStore.categoryList)
  }
})

// 완료 버튼 클릭
const setLocation = () => {
  if (modalViewStore.modal.contentLocation) {
    contentStore.setCategory()
    modalViewStore.hideModal('contentLocation')
  } else {
    categoryStore.setCategory()
    modalViewStore.hideModal('categoryLocation')
  }
}
</script>
<style></style>
