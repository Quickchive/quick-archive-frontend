<template>
  <dialog class="category-modal">
    <modal-header
      :modalTitle="modalTitle"
      :isBtnOnLeft="false"
      :closeModal="closeModal"
    ></modal-header>
    <div class="category-modal__btn__wrapper">
      <button class="category-modal__btn" @click="modalViewStore.openAddContentModal()">
        <img :src="addContent" class="img-add-content" />
        <span>콘텐츠</span>
      </button>
      <button class="category-modal__btn" @click="modalViewStore.openAddCategoryModal()">
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

const modalTitle = '추가'
const modalViewStore = useModalViewStore()

const closeModal = () => {
  modalViewStore.closeSelectModal()
}
</script>

<style></style>
