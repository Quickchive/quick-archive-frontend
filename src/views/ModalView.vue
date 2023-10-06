<template>
  <div class="overlay" v-if="modalStore.overlay"></div>
  <div class="modal-view">
    <modal-select-category-or-content
      v-if="modalStore.selectModal"
    ></modal-select-category-or-content>
    <modal-category-add v-if="modalStore.addCategoryModal"></modal-category-add>
    <modal-category-select v-if="modalStore.selectCategoryModal"></modal-category-select>
    <modal-set-category-location
      v-if="modalStore.categoryLocationModal"
    ></modal-set-category-location>
  </div>
</template>

<script setup>
import ModalCategoryAdd from '@/components/modal/ModalCategoryAdd.vue'
import ModalSelectCategoryOrContent from '@/components/modal/ModalSelectCategoryOrContent.vue'
import { useModalStore } from '@/stores/useModalStore.ts'
import ModalCategorySelect from '@/components/modal/ModalCategorySelect.vue'
import ModalSetCategoryLocation from '@/components/modal/ModalSetCategoryLocation.vue'

// counter store 가져오기
const modalStore = useModalStore()
</script>

<style></style>
