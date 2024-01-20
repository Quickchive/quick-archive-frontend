<template>
  <li :class="props.treeWidth">
    <div class="flex-container__row--align-center">
      <button class="button--transparent expand-button" @click="clickArrowEvent()">
        <img v-if="isChildrenCategoryShow" :src="expandLessIcon" />
        <img v-if="!isChildrenCategoryShow" :src="expandMoreIcon" />
      </button>
      <button
        class="button--transparent category-list__button"
        @click="toCategoryPage(props.category.id, props.category.name)"
      >
        <img
          :src="modalDataStore.getCategoryImgByIconName(props.category.iconName)"
          class="category-icon img-category-icon"
        />
        {{ props.category.name }}
      </button>
    </div>
    <button class="button--transparent moreButton" @click="showMoreButton(props.category.id)">
      <img :src="moreIcon" />
      <more-button v-if="isMoreButtonShow"></more-button>
    </button>
  </li>
</template>

<script setup>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import MoreButton from '@/components/button/MoreButton.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'

const categoryStore = useCategoryStore()
const modalDataStore = useModalDataStore()
const categoryTreeStore = useCategoryTreeStore()

const isChildrenCategoryShow = ref(false)
const isMoreButtonShow = ref(false)

const props = defineProps({
  category: Object,
  showChildren: Boolean,
  clickArrowEvent: Function,
  children: Array,
  treeWidth: String
})

const router = useRouter()
const moreButton = reactive([])

// 특정 카테고리 페이지로 이동
const toCategoryPage = (categoryId, categoryName) => {
  router.push(`/home/${categoryId}`)
  categoryStore.setCategoryName(categoryName)
}

const showMoreButton = () => {
  isMoreButtonShow.value = !isMoreButtonShow.value
}

const clickArrowEvent = () => {
  if (props.children) {
    isChildrenCategoryShow.value = !isChildrenCategoryShow.value
    categoryTreeStore.showChildrenCategory(props.children)
  }
}
</script>

<style></style>
