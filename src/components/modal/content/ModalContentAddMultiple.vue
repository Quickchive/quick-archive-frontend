<template>
  <dialog class="content-add__modal">
    <modal-header-step
      :modalTitle="modalTitle"
      :isBtnOnLeft="true"
      :closeModal="closeModal"
      :goBack="goBack"
    ></modal-header-step>
    <div class="wrapper__content-num">{{ modalDataStore.addContentData.length }}개 콘텐츠</div>
    <!-- 썸네일 -->
    <template v-if="modalDataStore.addContentData.length > 0">
      <div class="wrapper__multiple-thumbnail">
        <thumbnail-item-with-checkbox
          v-for="(data, index) in modalDataStore.addContentData"
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
        <button class="button--go-next" @click="modalViewStore.openSetCategoryLocationModal()">
          {{ modalDataStore.selectedLocation.name }}<img :src="nextBlackIcon" />
        </button>
      </div>
    </div>

    <div class="modal-footer">
      <button class="btn-confirm active" @click="saveContent">저장</button>
    </div>
  </dialog>
</template>

<script setup>
import ModalHeaderStep from '@/components/header/ModalHeaderStep.vue'
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import ThumbnailItemWithCheckbox from '@/components/modal/ThumbnailItemWithCheckbox.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'

const modalDataStore = useModalDataStore()
const modalViewStore = useModalViewStore()

const contentStore = useContentStore()

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
</script>

<style></style>
