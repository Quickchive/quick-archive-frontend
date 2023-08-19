<template>
  <header class="modal-header--edit-title">
    <button class="button--transparent close-button--top"><img :src="topCloseIcon" /></button>
    <button class="button--transparent">내용 전체삭제</button>
  </header>
</template>

<script>
import topCloseIcon from '@/assets/ic/ic-top-close.svg'
export default {
  data() {
    return {
      topCloseIcon
    }
  }
}
</script>

<style></style>
