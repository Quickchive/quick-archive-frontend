<template>
  <div>
    <title-bar></title-bar>
    <div class="divider"></div>
    <article class="flex-container__col contents-container">
      <div class="contents-num__wrapper">{{ contentStore.userContentList.length }}개</div>
      <!-- 콘텐츠 있을 때 -->
      <template v-if="contentStore.userContentList.length > 0">
        <div class="flex-container__col contents-list__wrapper">
          <contents-item v-for="item in contentList" :key="item"></contents-item>
        </div>
      </template>
      <!-- 콘텐츠 없을 떄 -->
      <template v-if="contentStore.userContentList.length === 0">
        <div class="flex-container__col contents__empty">
          <img :src="emptyImg" class="img-empty" />
          <span>저장된 콘텐츠가 없습니다.</span>
        </div>
      </template>
    </article>
  </div>
</template>

<script setup>
import ContentsItem from '@/components/home/ContentsItem.vue'
import TitleBar from '@/components/home/TitleBar.vue'
import { toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import contentListDummy from '@/assets/model/contentList.json'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import emptyImg from '@/assets/img/img-empty-nocontent.png'

const categoryStore = useCategoryStore()
const contentStore = useContentStore()
const route = useRoute()
const contentList = ref(contentStore.getContents)

categoryStore.getUserCategoryList()

onMounted(async () => {
  await contentStore.getContents(route.params.id)
  if (toRaw(contentStore.userContentList).length > 0) {
    contentList.value = toRaw(contentStore.userContentList)
    console.log(contentList, 'contentList')
  } else {
    contentList.value = contentListDummy
  }
})
</script>
<style></style>
