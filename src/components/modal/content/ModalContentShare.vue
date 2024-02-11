<template>
  <dialog class="content-share__modal modal__sm">
    <modal-header :modalTitle="'콘텐츠 공유하기'" :closeModal="closeModal"></modal-header>
    <div class="wrapper__content-share-input">
      <input class="input__sm--content-link" :value="contentStore.focusedContentData.link" />
      <button class="content-copy__btn">복사하기</button>
    </div>
  </dialog>
</template>

<script setup>
import ModalHeader from '@/components/header/ModalHeader.vue'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'

const contentStore = useContentStore()
const modalViewStore = useModalViewStore()

const closeModal = () => {
  modalViewStore.closeShareContentModal()
}
</script>

<style></style>
