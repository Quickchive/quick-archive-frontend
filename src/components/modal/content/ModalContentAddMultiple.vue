<template>
  <dialog class="content-add__modal">
    <modal-header-step
      :modalTitle="modalTitle"
      :isBtnOnLeft="true"
      :titlePosition="'left'"
      :closeModal="closeModal"
      :goBack="goBack"
    ></modal-header-step>
    <div class="wrapper__content-num">
      {{ contentStore.multipleContentList.filter((item) => item.checked).length }}개 콘텐츠
    </div>
    <!-- 썸네일 -->
    <template v-if="contentStore.multipleContentList.length > 0">
      <div class="wrapper__multiple-thumbnail">
        <thumbnail-item-with-checkbox
          v-for="(data, index) in contentStore.multipleContentList"
          :key="index"
          :contentData="data"
          :index="index"
        ></thumbnail-item-with-checkbox>
      </div>
    </template>
    <!-- divider -->
    <div class="content-add__divider"></div>

    <!-- 카테고리 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__row--space-between">
        <label class="label__modal"> 카테고리 </label>
        <button class="button--go-next" @click="modalViewStore.showModal('contentLocation')">
          <img
            v-if="categoryStore.hasSelectedCategory"
            class="category-select-icon"
            :src="categoryStore.getCategoryImgByIconName(contentStore.contentObj.categoryIconName)"
          />
          <span class="category-name-text">{{ contentStore.contentObj.categoryName }} </span
          ><img :src="nextBlackIcon" />
        </button>
      </div>
    </div>

    <div class="modal-footer">
      <button
        :class="isValid ? 'active' : 'inactive'"
        class="btn-confirm"
        id="btn-web__save-content-multiple"
        :disabled="!isValid"
        @click="saveContent"
      >
        저장
      </button>
    </div>
  </dialog>
</template>

<script setup>
import ModalHeaderStep from '@/components/header/ModalHeaderStep.vue'
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import ThumbnailItemWithCheckbox from '@/components/modal/ThumbnailItemWithCheckbox.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { computed } from 'vue'

const modalViewStore = useModalViewStore()
const contentStore = useContentStore()
const categoryStore = useCategoryStore()

const props = defineProps({
  modalTitle: String,
  closeModal: Function
})

const saveContent = () => {
  contentStore.addMultipleContent()
}

const goBack = () => {
  modalViewStore.closeAddContentMultiple()
  modalViewStore.openAddContentModal()
}

const isValid = computed(() => {
  return 1 <= contentStore.multipleContentList.filter((item) => item.checked).length > 0 &&
    !(contentStore.multipleContentList.filter((item) => item.title).length < 0)
    ? true
    : false
})
</script>

<style></style>
