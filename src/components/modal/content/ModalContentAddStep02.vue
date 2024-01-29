<template>
  <dialog class="content-add__modal">
    <modal-header-step
      :modalTitle="modalTitle"
      :isBtnOnLeft="isBtnOnLeft"
      :closeModal="closeModal"
    ></modal-header-step>
    <!-- 썸네일 -->
    <thumbnail-item></thumbnail-item>
    <!-- 카테고리 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__row--space-between">
        <label class="label__modal"> 카테고리 </label>
        <button class="button--go-next" @click="modalViewStore.openSetCategoryLocationModal()">
          {{ modalDataStore.selectedLocation.name }}<img :src="nextBlackIcon" />
        </button>
      </div>
    </div>
    <!-- 즐겨찾기 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__row--space-between">
        <label class="label__modal">즐겨찾기</label>
        <toggle-button
          :value="modalDataStore.addContentData.favorite"
          :toggleOn="modalDataStore.setFavoriteToggle"
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
            @input="setMemo"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-confirm active" @click="contentStore.addContent()">저장</button>
    </div>
  </dialog>
</template>

<script setup>
import ModalHeaderStep from '@/components/header/ModalHeaderStep.vue'
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import ToggleButton from '@/components/button/ToggleButton.vue'
import ThumbnailItem from '../ThumbnailItem.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'

const modalTitle = '콘텐츠 추가'
const isBtnOnLeft = true
const modalViewStore = useModalViewStore()
const modalDataStore = useModalDataStore()
const contentStore = useContentStore()

const closeModal = () => {
  modalViewStore.closeAddContentDetailModal()
  modalViewStore.closeAddContentModal()
  modalViewStore.closeSelectModal()
}

const setMemo = (e) => {
  modalDataStore.setMemo(e.target.value)
}
</script>

<style></style>
