<template>
  <dialog class="content-share__modal modal__sm">
    <modal-header :modalTitle="'콘텐츠 공유하기'" :closeModal="closeModal"></modal-header>
    <div class="wrapper__content-share-input">
      <input
        id="contentLink"
        class="input__sm--content-link"
        :value="contentStore.focusedContentData.link"
        readonly
        @select="deselectText"
      />
      <button class="content-copy__btn" @click="copyLink()">복사하기</button>
    </div>
  </dialog>
</template>

<script setup>
import ModalHeader from '@/components/header/ModalHeader.vue'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'

const contentStore = useContentStore()
const modalViewStore = useModalViewStore()
const modalDataStore = useModalDataStore()

const closeModal = () => {
  modalViewStore.closeShareContentModal()
  // 토스트
  const toastData = {
    message: 'URL이 복사되었습니다.',
    func: {
      message: ''
    }
  }
  modalDataStore.setToastMessage(toastData)
  modalViewStore.showToast()
}

const copyLink = () => {
  var content = document.getElementById('contentLink')
  content.select()
  document.execCommand('copy')
}

const deselectText = (event) => {
  event.preventDefault()
  window.getSelection().removeAllRanges()
}
</script>

<style></style>
