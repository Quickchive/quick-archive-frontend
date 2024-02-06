<template>
  <li :class="props.treeWidth">
    <div class="flex-container__row--align-center">
      <button class="btn--transparent expand-button" @click="clickArrowEvent()">
        <img v-if="isChildrenCategoryShow" :src="expandLessIcon" />
        <img v-if="!isChildrenCategoryShow" :src="expandMoreIcon" />
      </button>
      <button
        class="btn--transparent category-list__btn"
        @click="toCategoryPage(props.category.id, props.category.name)"
      >
        <img
          :src="modalDataStore.getCategoryImgByIconName(props.category.iconName)"
          class="category-icon img-category-icon"
        />
        {{ props.category.name }}
      </button>
    </div>
    <button class="btn--transparent moreButton" @click="showMoreButton(props.category)">
      <img :src="moreIcon" />
      <more-button v-if="categoryTreeStore.moreBtnCategoryIdTree[props.category.id]"></more-button>
    </button>
  </li>
</template>

<script setup>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import MoreButton from '@/components/button/MoreButton.vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'

const modalDataStore = useModalDataStore()
const categoryTreeStore = useCategoryTreeStore()
const categoryStore = useCategoryStore()
const contentStore = useContentStore()

const route = useRoute()

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
const toCategoryPage = async (categoryId, categoryName) => {
  await contentStore.fetchContents(categoryId)
  //
  router.push(`/home/${categoryId}`)
  categoryStore.setCategoryName(categoryName)
}

const excludeItem = (obj, excludedKey) => {
  let result = {}

  for (let key in obj) {
    if (key == excludedKey) {
      result[key] = !obj[key]
    } else {
      result[key] = false
    }
  }
  console.log(result)
  return result
}

const showMoreButton = (categoryData) => {
  categoryTreeStore.moreBtnCategoryIdTree = excludeItem(
    categoryTreeStore.moreBtnCategoryIdTree,
    categoryData.id
  )
  categoryStore.setFocusedCategory(categoryData.id)
  categoryStore.setFocusedCategoryData(categoryData)
}

const clickArrowEvent = () => {
  if (props.activeExpandButton === false) return
  if (props.children) {
    isChildrenCategoryShow.value = !isChildrenCategoryShow.value
    categoryTreeStore.showChildrenCategory(props.children)
  }
}
</script>

<style></style>
