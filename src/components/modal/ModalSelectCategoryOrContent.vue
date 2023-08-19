<template>
  <dialog class="category-modal">
    <modal-header :modalTitle="modalTitle" :isBtnOnRight="isBtnOnRight"></modal-header>
    <div class="flex-container__row add-category__button__wrapper">
      <button class="flex-container__col add-category__button">콘텐츠</button>
      <button class="flex-container__col add-category__button">카테고리</button>
    </div>
  </dialog>
</template>

<script>
import ModalHeader from '@/components/modal/ModalHeader.vue'

export default {
  components: { ModalHeader },

  data() {
    return {
      modalTitle: '추가',
      isBtnOnRight: true
    }
  }
}
</script>

<style></style>
