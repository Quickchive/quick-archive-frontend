<template>
  <div>
    <title-bar :categoryName="categoryName"></title-bar>
    <div class="divider"></div>
    <article class="flex-container__col contents-container">
      <div class="contents-num__wrapper">{{ contentsData.length }}개</div>
      <div class="flex-container__col contents-list__wrapper">
        <contents-item v-for="item in contentsData" :key="item"></contents-item>
      </div>
    </article>
  </div>
</template>

<script setup>
import ContentsItem from '@/components/home/ContentsItem.vue'
import TitleBar from '@/components/home/TitleBar.vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { isProxy, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const categoryStore = useCategoryStore()
categoryStore.getUserCategoryList()
const route = useRoute()
// const userData = ref()
categoryStore.getContents(route.params.id)

let contentsData = categoryStore.getContents
let categoryName = contentsData[0]
watch(
  () => route.params.id,
  async (newId) => {
    categoryStore.getContents(newId)
    if (isProxy(categoryStore.userContentData)) {
      contentsData = toRaw(categoryStore.userContentData)
      console.log(contentsData, 'contentsData')
      categoryName = contentsData[0].category.name
      console.log(categoryName, '카테고리명 ')
    }
  }
)

// let contentsNum = 0
// contentsNum = categoryStore.userContentData.length
// categoryName = categoryStore.userContentData.length

// const items = 5
// const categoryName = '커스텀 카테고리'
</script>

<style></style>
