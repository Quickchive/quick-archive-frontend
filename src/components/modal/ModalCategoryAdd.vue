<template>
  <dialog class="category-add__modal">
    <modal-header :modalTitle="modalTitle"></modal-header>
    <div class="wrapper__category-change">
      <button
        class="button--transparent category-change__button"
        @click="openSelectCategoryModal()"
      >
        <div class="icon__category-change">
          <img class="img-category-custom" :src="getSelectedIcon" /><img
            class="icon__thumb-change"
            :src="thumbChangeIcon"
          />
        </div>
      </button>
    </div>
    <label class="input__category-modal">
      <input
        v-model="this.categoryName"
        class="input__category-modal"
        placeholder="카테고리 이름(2~15글자)"
        maxlength="15"
      />
      <button class="button--transparent">
        <img :src="textfieldCancelIcon" />
      </button>
    </label>
    <div class="flex-container__row wrapper__category-position">
      <label>생성 위치</label>
      <button class="button--transparent flex-container__row">
        미지정<img :src="nextBlackIcon" />
      </button>
    </div>
    <div class="modal-footer">
      <button class="confirm-button--active" @click="addCategories()">저장</button>
    </div>
  </dialog>
</template>

<script>
import thumbChangeIcon from '@/assets/ic/ic-thumb-change.svg'
import categoryWatchIcon from '@/assets/img/category/img_category_watch.png'
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import ModalHeader from '@/components/header/ModalHeader.vue'
import { useModalStore } from '@/stores/useModalStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { addCategories } from '@/api/category.js'

export default {
  components: { ModalHeader },

  data() {
    return {
      thumbChangeIcon,
      categoryWatchIcon,
      nextBlackIcon,
      textfieldCancelIcon,
      modalTitle: '카테고리 추가',
      isBtnOnRight: true,
      categoryName: ''
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
    openSelectCategoryModal() {
      this.modalStore.openSelectCategoryModal()
    },
    async addCategories() {
      console.log(this.categoryName)
      try {
        const categoryData = {
          categoryName: this.categoryName
        }
        await addCategories(categoryData)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    getSelectedIcon() {
      return this.categoryStore.getSelectedCategory
    }
  }
}
</script>

<style></style>
