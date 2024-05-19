<template>
  <li :class="props.treeWidth">
    <div class="singleCategoryBtn">
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
      <more-button
        :btnList="btnList"
        class="more-button"
        v-if="categoryStore.moreBtnCategoryIdTree[props.category.id]"
      ></more-button>
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
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'

const modalDataStore = useModalDataStore()
const categoryStore = useCategoryStore()
const contentStore = useContentStore()
const modalViewStore = useModalViewStore()

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
  router.push(`/home/detail/${categoryId}`)
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
  categoryStore.moreBtnCategoryIdTree = excludeItem(
    categoryStore.moreBtnCategoryIdTree,
    categoryData.id
  )
  categoryStore.setFocusedCategoryData(categoryData)
}

const clickArrowEvent = () => {
  if (props.activeExpandButton === false) return
  if (props.children) {
    isChildrenCategoryShow.value = !isChildrenCategoryShow.value
    categoryStore.showChildrenCategory(props.children)
  }
}

const btnList = [
  {
    name: '수정하기',
    clickEvent: () => modalViewStore.showModalWithOverlay('editCategory', 'default')
  },

  {
    name: '삭제하기',
    clickEvent: () => modalViewStore.showModalWithOverlay('deleteCategory', 'default')
  }
]
</script>

<style></style>
