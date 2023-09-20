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
import { useModalStore } from '@/stores/useModalStore.ts'

export default {
  data() {
    return {
      topCloseIcon
    }
  },
  props: {
    modalTitle: String,
    isBtnOnLeft: Boolean
  },
  setup() {
    // counter store 가져오기
    const modalStore = useModalStore()
    return {
      modalStore
    }
  },
  methods: {
    closeModal() {
      this.modalStore.closeSelectModal()
    }
  }
}
</script>

<style></style>
