<template>
  <header class="modal-header--step">
    <button class="button--transparent"><img :src="topBackIcon" /></button>
    <h1 class="modal-title">{{ modalTitle }}</h1>
    <button class="button--transparent close-button--top" @click="closeModal()">
      <img :src="topCloseIcon" />
    </button>
  </header>
</template>

<script>
import topCloseIcon from '@/assets/ic/ic-top-close.svg'
import topBackIcon from '@/assets/ic/ic-top-back.svg'
export default {
  data() {
    return {
      topCloseIcon,
      topBackIcon
    }
  },
  props: {
    modalTitle: String,
    isBtnOnLeft: Boolean,
    closeModal: Function
  }
}
</script>

<style></style>
