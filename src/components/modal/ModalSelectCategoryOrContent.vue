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
        @click="modalStore.openAddContentModal()"
      >
        <img :src="addContent" class="img-add-content" />
        <span>콘텐츠</span>
      </button>
      <button
        class="flex-container__col add-category__button"
        @click="modalStore.openAddCategoryModal()"
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
import { useModalStore } from '@/stores/useModalStore.ts'
import { ref } from 'vue'

const modalTitle = '추가'
const isBtnOnRight = ref(true)
const modalStore = useModalStore()

const closeModal = () => {
  modalStore.closeSelectModal()
}
</script>

<style></style>
