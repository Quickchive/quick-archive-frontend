<template>
  <header class="modal-header--step">
    <button class="btn--transparent" @click="goBack"><img :src="topBackIcon" /></button>
    <h1 class="modal-title">{{ modalTitle }}</h1>
    <button class="btn--transparent btn-32" @click="closeModal()">
      <img :src="topCloseIcon" />
    </button>
  </header>
</template>

<script setup>
import topCloseIcon from '@/assets/ic/ic-top-close.svg'
import topBackIcon from '@/assets/ic/ic-top-back.svg'

const props = defineProps({
  modalTitle: String,
  closeModal: Function,
  goBack: Function
})
</script>

<style></style>
