<template>
  <dialog class="flex-container__col category-modal">
    <header class="flex-container__row">
      <h1 class="modal-title">추가</h1>
      <button class="button--transparent close-button--top"><img :src="topCloseIcon" /></button>
    </header>
    <div class="flex-container__row add-category__button__wrapper">
      <button class="flex-container__col add-category__button">콘텐츠</button>
      <button class="flex-container__col add-category__button">카테고리</button>
    </div>
  </dialog>
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
