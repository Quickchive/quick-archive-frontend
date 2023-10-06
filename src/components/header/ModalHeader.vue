<template>
  <header class="modal-header" :class="isBtnOnLeft ? 'headerBtnLeft' : 'headerBtnRight'">
    <button class="button--transparent close-button--top" @click="closeModal()">
      <img :src="topCloseIcon" />
    </button>
    <h1 class="modal-title">{{ modalTitle }}</h1>
  </header>
</template>

<script>
import topCloseIcon from '@/assets/ic/ic-top-close.svg'

export default {
  data() {
    return {
      topCloseIcon
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
