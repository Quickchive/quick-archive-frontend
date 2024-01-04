<template>
  <div>
    <!-- <title-bar></title-bar> -->
    <h1>전체 콘텐츠</h1>
    <the-filter></the-filter>
    <div class="divider"></div>
    <article class="flex-container__col contents-container">
      <div class="contents-num__wrapper">{{ contentStore.userContentList.length }}개</div>
      <!-- 콘텐츠 있을 때 -->
      <template v-if="contentStore.userContentList.length > 0">
        <div class="flex-container__col contents-list__wrapper">
          <contents-item v-for="item in contentList" :key="item" :item="item"></contents-item>
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
import contentListDummy from '@/assets/model/contentList.json'
import { useContentStore } from '@/stores/useContentStore.ts'
import { ref, onMounted, toRaw } from 'vue'
import emptyImg from '@/assets/img/img-empty-nocontent.png'
import TheFilter from '@/components/home/TheFilter.vue'

const contentStore = useContentStore()
const contentList = ref({})

onMounted(async () => {
  await contentStore.getAllContents()

  if (contentStore.userContentList.length > 0) {
    contentList.value = toRaw(contentStore.userContentList)
    console.log(contentList, 'contentList')
  } else {
    contentStore.setUserContentList(contentListDummy.contents)
  }
})

// 콘텐츠 데이터 감시
contentStore.$subscribe(() => {
  if (contentStore.userContentList.length > 0) {
    contentList.value = toRaw(contentStore.userContentList)
  }
})
</script>

<style></style>
