<template>
  <header class="modal-header" :class="isBtnOnLeft ? 'left' : 'right'">
    <button class="btn--transparent btn-32" :class="btnPosition" @click="closeModal()">
      <img :src="useBackIcon ? topBackIcon : topCloseIcon" />
    </button>
    <h1 class="modal-title" :class="titlePosition">{{ modalTitle }}</h1>
  </header>
</template>

<script setup>
import topCloseIcon from '@/assets/ic/ic-top-close.svg'
import topBackIcon from '@/assets/ic/ic-top-back.svg'
const props = defineProps({
  modalTitle: String,
  isBtnOnLeft: Boolean,
  titlePosition: String,
  closeModal: Function,
  btnPosition: String,
  useBackIcon: Boolean
})
</script>

<style></style>
