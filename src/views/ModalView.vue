<template>
  <div class="overlay" v-if="modalStore.overlay"></div>
  <div class="modal-view">
    <!-- 카테고리 모달 -->
    <modal-select-category-or-content
      v-if="modalStore.selectModal"
    ></modal-select-category-or-content>
    <modal-category-add v-if="modalStore.addCategoryModal"></modal-category-add>
    <modal-category-select v-if="modalStore.selectCategoryModal"></modal-category-select>
    <modal-set-category-location
      v-if="modalStore.categoryLocationModal"
    ></modal-set-category-location>
    <!-- 콘텐츠 모달 -->
    <modal-content-add v-if="modalStore.addContentModal"></modal-content-add>
    <modal-content-add-set-new-category
      v-if="modalStore.contentLocationModal"
    ></modal-content-add-set-new-category>
    <modal-content-add-step-02 v-if="modalStore.addContentDetailModal"></modal-content-add-step-02>
  </div>
</template>

<script setup>
import ModalCategoryAdd from '@/components/modal/category/ModalCategoryAdd.vue'
import ModalSelectCategoryOrContent from '@/components/modal/ModalSelectCategoryOrContent.vue'
import { useModalStore } from '@/stores/useModalStore.ts'
import ModalCategorySelect from '@/components/modal/category/ModalCategorySelect.vue'
import ModalSetCategoryLocation from '@/components/modal/category/ModalSetCategoryLocation.vue'
import ModalContentAdd from '@/components/modal/content/ModalContentAdd.vue'
import ModalContentAddSetNewCategory from '@/components/modal/content/ModalContentAddSetNewCategory.vue'
import ModalContentAddStep02 from '@/components/modal/content/ModalContentAddStep02.vue'

// counter store 가져오기
const modalStore = useModalStore()
</script>

<style></style>
