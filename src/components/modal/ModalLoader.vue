<template>
  <dialog class="loader__modal">
    <modal-header
      :modalTitle="modalTitle"
      :isBtnOnLeft="false"
      :titlePosition="'right'"
      :closeModal="closeModal"
    ></modal-header>
    <div class="wrapper__loader">
      <jumping-loader :loading="modalViewStore.modal.loader"></jumping-loader>
    </div>
  </dialog>
</template>

<script setup>
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import JumpingLoader from '@/components/loading/JumpingLoader.vue'
import ModalHeader from '@/components/header/ModalHeader.vue'

const modalViewStore = useModalViewStore()

const props = defineProps({
  modalTitle: String,
  closeModal: Function
})
</script>
