<template>
  <div>
    <title-bar></title-bar>
    <div class="divider"></div>
    <article class="flex-container__col contents-container">
      <div class="contents-num__wrapper">{{ contentStore.userCustomContentList.length }}개</div>
      <!-- 콘텐츠 있을 때 -->
      <template v-if="contentStore.userCustomContentList.length > 0">
        <div class="flex-container__col contents-list__wrapper">
          <contents-item
            v-for="item in contentStore.userCustomContentList"
            :item="item"
            :key="item"
          ></contents-item>
        </div>
      </template>
      <!-- 콘텐츠 없을 떄 -->
      <template v-else>
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
import { useContentStore } from '@/stores/useContentStore.ts'
import emptyImg from '@/assets/img/img-empty-nocontent.png'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()
const contentStore = useContentStore()

onMounted(async () => {
  await contentStore.fetchContents(Number(route.params.id))
})

watch(
  () => useContentStore.userCustomContentList,
  () => {
    // 적절한 화면 갱신 로직 추가
    console.log('myState가 변경되었습니다. 화면을 갱신합니다.')
  }
)
</script>
<style></style>
