<template>
  <dialog class="category-select__modal">
    <modal-header :modalTitle="modalTitle"></modal-header>
    <article class="flex-container__row wrapper__category-icon">
      <img :src="categoryIcon" v-for="num in categoryNum" :key="num" />
    </article>
    <div class="modal-footer">
      <button class="confirm-button--inactive">완료</button>
    </div>
  </dialog>
</template>

<script>
import ModalHeader from '@/components/header/ModalHeader.vue'
import categoryIcon from '@/assets/ic/ic-category-86px.svg'
import checkboxOnIcon from '@/assets/ic/ic-control-checkbox-on.svg'
export default {
  components: { ModalHeader },
  data() {
    return {
      modalTitle: '카테고리 아이콘 선택',
      categoryIcon,
      categoryNum: 12,
      checkboxOnIcon
    }
  }
}
</script>

<style></style>
