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
        <button class="button--go-next" @click="modalStore.openSetContentLocationModal()">
          미지정<img :src="nextBlackIcon" />
        </button>
      </div>
    </div>
    <!-- 즐겨찾기 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__row--space-between">
        <label class="label__modal">즐겨찾기</label>
        <toggle-button :value="value"></toggle-button>
      </div>
    </div>
    <!-- 메모 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__col">
        <label class="label__modal">메모</label>
        <div class="wrapper__textarea">
          <textarea class="textarea__memo" placeholder="메모를 남겨보세요"></textarea>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="confirm-button--inactive">저장</button>
    </div>
  </dialog>
</template>

<script setup>
import ModalHeaderStep from '@/components/header/ModalHeaderStep.vue'
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import ToggleButton from '@/components/button/ToggleButton.vue'
import ThumbnailItem from '../ThumbnailItem.vue'
import { useModalStore } from '@/stores/useModalStore.ts'

const modalTitle = '콘텐츠 추가'
const isBtnOnLeft = true
const modalStore = useModalStore()
const value = false

const closeModal = () => {
  modalStore.closeAddContentDetailModal()
  modalStore.closeAddContentModal()
  modalStore.closeSelectModal()
}
</script>

<style></style>
