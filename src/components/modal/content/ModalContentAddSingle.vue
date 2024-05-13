<template>
  <dialog class="content-add__modal">
    <modal-header-step
      :modalTitle="modalTitle"
      :isBtnOnLeft="true"
      :closeModal="closeModal"
      :goBack="goBack"
    ></modal-header-step>
    <!-- 썸네일 -->
    <thumbnail-item></thumbnail-item>
    <!-- 카테고리 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__row--space-between">
        <label class="label__modal"> 카테고리 </label>
        <button class="button--go-next" @click="modalViewStore.showModal('categoryLocation')">
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
      <button class="btn-confirm active" @click="saveContent">저장</button>
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
import { onMounted } from 'vue'

const modalViewStore = useModalViewStore()
const modalDataStore = useModalDataStore()
const contentStore = useContentStore()

const props = defineProps({
  modalTitle: String,
  closeModal: Function
})

onMounted(() => {
  if (props.modalTitle === '콘텐츠 수정') {
    modalDataStore.addContentData.id = contentStore.focusedContentData.id
    modalDataStore.addContentData.link = contentStore.focusedContentData.link
    modalDataStore.addContentData.title = contentStore.focusedContentData.title
    modalDataStore.addContentData.memo = contentStore.focusedContentData.memo
    modalDataStore.addContentData.favorite = contentStore.focusedContentData.favorite
    modalDataStore.selectedLocation.name = contentStore.focusedContentData.category
      ? contentStore.focusedContentData.category.name
      : '전체 콘텐츠'
    modalDataStore.selectedLocation.parentId = contentStore.focusedContentData.parentId
      ? contentStore.focusedContentData.parentId
      : -1
    modalDataStore.addContentData.coverImg = contentStore.focusedContentData.coverImg
  }
})

const setMemo = (e) => {
  modalDataStore.setMemo(e.target.value)
}

const saveContent = () => {
  if (props.modalTitle === '콘텐츠 추가') {
    contentStore.addContent()
  } else {
    contentStore.editContent()
  }
}

const goBack = () => {
  modalViewStore.hideModal('editContentDetail')
  modalViewStore.openAddContentModal()
}
</script>

<style></style>
