<template>
  <div>
    <title-bar :categoryName="categoryName"></title-bar>
    <div class="divider"></div>
    <article class="flex-container__col contents-container">
      <div class="contents-num__wrapper">{{ contentStore.userContentList.length }}개</div>
      <div class="flex-container__col contents-list__wrapper">
        <contents-item v-for="item in contentList" :key="item"></contents-item>
      </div>
    </article>
  </div>
</template>

<script setup>
import ContentsItem from '@/components/home/ContentsItem.vue'
import TitleBar from '@/components/home/TitleBar.vue'
import { toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import contentListDummy from '@/assets/model/contentList.json'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'

const categoryStore = useCategoryStore()
const contentStore = useContentStore()
const route = useRoute()
const contentList = ref(contentStore.getContents)

categoryStore.getUserCategoryList()

const categoryName = ref(contentsData.value[0])

onMounted(async () => {
  await contentStore.getContents(route.params.id)
  categoryName.value = contentList.value[0].category.name
  if (toRaw(contentStore.userContentList).length > 0) {
    contentList.value = toRaw(contentStore.userContentList)
    console.log(contentList, 'contentList')
  } else {
    contentList.value = contentListDummy
  }
})

// watch(
//   () => route.params.id,
//   async (newId) => {
//     await categoryStore.getContents(newId)
//     categoryName.value = contentsData.value[0].category.name
//     console.log(categoryName, '카테고리명 ')
//     if (toRaw(contentStore.userContentList).length > 0) {
//       contentList.value = toRaw(contentStore.userContentList)
//       console.log(contentList, 'contentList')
//     } else {
//       contentList.value = contentListDummy
//     }
//   }
// )
</script>
<style></style>
