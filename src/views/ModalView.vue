<template>
  <div class="overlay" v-if="this.modalStore.overlay"></div>
  <div class="modal-view">
    <modal-select-category-or-content
      v-if="this.modalStore.selectModal"
    ></modal-select-category-or-content>
    <modal-category-add v-if="this.modalStore.addCategoryModal"></modal-category-add>
    <modal-category-select v-if="this.modalStore.selectCategoryModal"></modal-category-select>
  </div>
</template>

<script>
import ModalCategoryAdd from '@/components/modal/ModalCategoryAdd.vue'
import ModalSelectCategoryOrContent from '@/components/modal/ModalSelectCategoryOrContent.vue'
import { useModalStore } from '@/stores/useModalStore.ts'
import ModalCategorySelect from '@/components/modal/ModalCategorySelect.vue'

export default {
  components: {
    ModalSelectCategoryOrContent,
    ModalCategoryAdd,
    ModalCategorySelect
  },
  setup() {
    // counter store 가져오기
    const modalStore = useModalStore()
    return {
      modalStore
    }
  }
}
</script>

<style></style>
