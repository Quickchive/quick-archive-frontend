<template>
  <header class="modal-header" :class="isBtnOnLeft ? 'left' : 'right'">
    <button class="btn--transparent btn-32" @click="closeModal()">
      <img :src="topCloseIcon" />
    </button>
    <h1 class="modal-title" :class="isBtnOnLeft ? 'left' : 'right'">{{ modalTitle }}</h1>
  </header>
</template>

<script setup>
import topCloseIcon from '@/assets/ic/ic-top-close.svg'
const props = defineProps({
  modalTitle: String,
  isBtnOnLeft: Boolean,
  closeModal: Function
})
</script>

<style></style>
