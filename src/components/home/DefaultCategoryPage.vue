<template>
  <title-header class="titleHeader-main" :title="'전체 콘텐츠'"></title-header>
  <the-filter></the-filter>
  <div class="divider"></div>
  <article class="contents-container">
    <div class="contents-num__wrapper">{{ contentStore.userFilteredContentList.length }}개</div>
    <!-- 콘텐츠 있을 때 -->
    <template v-if="contentStore.userFilteredContentList.length > 0">
      <div class="contents-list__wrapper">
        <contents-item
          v-for="item in contentStore.userFilteredContentList"
          :key="item"
          :item="item"
        ></contents-item>
      </div>
    </template>
    <!-- 콘텐츠 없을 떄 -->
    <template v-if="contentStore.userFilteredContentList.length === 0">
      <div class="flex-container__col contents__empty">
        <img :src="emptyImg" class="img-empty" />
        <span>저장된 콘텐츠가 없습니다.</span>
      </div>
    </template>
  </article>
</template>

<script setup>
import ContentsItem from '@/components/home/ContentsItem.vue'
import { useContentStore } from '@/stores/useContentStore.ts'
import { ref, onMounted, toRaw } from 'vue'
import emptyImg from '@/assets/img/img-empty-nocontent.png'
import TheFilter from '@/components/home/TheFilter.vue'
import { useRoute } from 'vue-router'
import TitleHeader from '@/components/header/TitleHeader.vue'

const route = useRoute()

const contentStore = useContentStore()
const contentList = ref({})

onMounted(async () => {
  await contentStore.fetchAllContents()
  if (contentStore.userContentList.length > 0) {
    contentList.value = toRaw(contentStore.userContentList)
    console.log(contentList, 'contentList')
  }

  console.log('default-route', route.fullPath.length)
  console.log('default-route-query', route.params.id)
})

// 콘텐츠 데이터 감시
contentStore.$subscribe(() => {
  if (contentStore.userContentList.length > 0) {
    contentList.value = toRaw(contentStore.userContentList)
  }
})
</script>

<style></style>
