<template>
  <div class="overlay"></div>
  <div class="modal-view">
    <modal-select-category-or-content></modal-select-category-or-content>
  </div>
</template>

<script>
export default {
  components: {
    ModalSelectCategoryOrContent
  }
}

import ModalSelectCategoryOrContent from '@/components/modal/ModalSelectCategoryOrContent.vue'
</script>

<style></style>
