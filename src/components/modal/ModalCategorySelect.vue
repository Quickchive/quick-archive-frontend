<template>
  <dialog class="category-select__modal">
    <modal-header :modalTitle="modalTitle" :isBtnOnLeft="true"></modal-header>
    <article class="flex-container__row wrapper__category-icon">
      <button
        :key="categoryIcon"
        v-for="categoryIcon in this.categoryStore.defaultCategory"
        class="button--category-icon"
        @click="selectCategory(categoryIcon)"
      >
        <img :src="categoryIcon.img" class="category-default-icon" />
        <div v-if="categoryIcon.selected" class="isSelected">
          <img :src="controlCheckbox" class="controlCheckbox" v-if="categoryIcon.selected" />
        </div>
      </button>
    </article>
    <div class="modal-footer">
      <button class="confirm-button--active" @click="closeSelectCategoryModal()">완료</button>
    </div>
  </dialog>
</template>

<script>
import ModalHeader from '@/components/header/ModalHeader.vue'
import controlCheckbox from '@/assets/ic/ic-control-checkbox-on.svg'
import { useModalStore } from '@/stores/useModalStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

export default {
  components: { ModalHeader },
  data() {
    return {
      modalTitle: '카테고리 아이콘 선택',
      controlCheckbox
    }
  },
  setup() {
    const modalStore = useModalStore()
    const categoryStore = useCategoryStore()

    return {
      modalStore,
      categoryStore
    }
  },
  methods: {
    selectCategory(i) {
      this.categoryStore.selectCategory(i)
    },
    closeSelectCategoryModal() {
      this.modalStore.closeSelectCategoryModal()
    }
  }
}
</script>

<style></style>
