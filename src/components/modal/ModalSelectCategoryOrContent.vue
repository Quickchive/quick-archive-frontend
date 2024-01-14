<template>
  <dialog class="category-modal">
    <modal-header
      :modalTitle="modalTitle"
      :isBtnOnRight="isBtnOnRight"
      :closeModal="closeModal"
    ></modal-header>
    <div class="flex-container__row add-category__button__wrapper">
      <button
        class="flex-container__col add-category__button"
        @click="modalViewStore.openAddContentModal()"
      >
        <img :src="addContent" class="img-add-content" />
        <span>콘텐츠</span>
      </button>
      <button
        class="flex-container__col add-category__button"
        @click="modalViewStore.openAddCategoryModal()"
      >
        <img :src="addCategory" class="img-add-category" />
        <span>카테고리</span>
      </button>
    </div>
  </dialog>
</template>

<script setup>
import ModalHeader from '@/components/header/ModalHeader.vue'
import addCategory from '@/assets/img/img_add_category.png'
import addContent from '@/assets/img/img_add_content.png'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { ref } from 'vue'

const modalTitle = '추가'
const isBtnOnRight = ref(true)
const modalViewStore = useModalViewStore()

const closeModal = () => {
  modalViewStore.closeSelectModal()
}
</script>

<style></style>
