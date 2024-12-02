<template>
  <dialog class="content-add__modal">
    <modal-header-step
      v-if="props.modalTitle === '콘텐츠 추가'"
      :modalTitle="modalTitle"
      :isBtnOnLeft="true"
      :closeModal="closeModal"
      :goBack="goBack"
    ></modal-header-step>
    <modal-header
      v-else
      :modalTitle="modalTitle"
      :isBtnOnLeft="false"
      :closeModal="closeModal"
      :titlePosition="'right'"
      :btnPosition="'left'"
    ></modal-header>
    <!-- 썸네일 -->
    <thumbnail-item></thumbnail-item>
    <!-- 카테고리 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__row--space-between">
        <label class="label__modal"> 카테고리 </label>

        <button class="button--go-next" @click="gotoCategoryLocation">
          <!-- 카테고리 자동 추천 태그 -->
          <div
            v-if="
              userStore.recommendationMode &&
              (modalViewStore.modal.addContent || modalViewStore.modal.addContentDetail) &&
              categoryStore.isRecommended &&
              categoryStore.recommendedCategoryId === contentStore.contentObj.categoryId
            "
            class="wrapper__ai-tag"
          >
            <span class="ai-tag"> 추천 </span>
          </div>
          <img
            v-if="categoryStore.hasSelectedCategory"
            class="category-select-icon"
            :src="categoryStore.getCategoryImgByIconName(contentStore.contentObj.categoryIconName)"
          />{{ contentStore.contentObj.categoryName }}<img :src="nextBlackIcon" />
        </button>
      </div>
    </div>
    <!-- 즐겨찾기 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__row--space-between">
        <label class="label__modal">즐겨찾기</label>
        <toggle-button
          :value="contentStore.contentObj.favorite"
          :toggleOn="contentStore.setFavoriteToggle"
        ></toggle-button>
      </div>
    </div>
    <!-- 메모 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__col">
        <label class="label__modal">메모</label>
        <div class="wrapper__textarea">
          <textarea
            class="textarea__memo"
            placeholder="메모를 남겨보세요"
            :value="props.modalTitle === '콘텐츠 수정' ? contentStore.contentObj.comment : ''"
            @input="setMemo"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-confirm active" @click="saveContent">저장</button>
    </div>
  </dialog>
</template>

<script setup>
import ModalHeaderStep from '@/components/header/ModalHeaderStep.vue'
import ModalHeader from '@/components/header/ModalHeader.vue'
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import ToggleButton from '@/components/button/ToggleButton.vue'
import ThumbnailItem from '../ThumbnailItem.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useUserStore } from '@/stores/useUserStore.ts'

const modalViewStore = useModalViewStore()
const contentStore = useContentStore()
const categoryStore = useCategoryStore()
const userStore = useUserStore()

const props = defineProps({
  modalTitle: String,
  closeModal: Function,
  goBack: Function,
  content: Object
})

const setMemo = (e) => {
  contentStore.setMemo(e.target.value)
}

const saveContent = () => {
  if (props.modalTitle === '콘텐츠 추가') {
    contentStore.addContent()
  } else {
    contentStore.editContent()
  }
}

const gotoCategoryLocation = () => {
  modalViewStore.showModal('contentLocation')
}
</script>

<style></style>
