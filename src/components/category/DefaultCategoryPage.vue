<template>
  <div>
    <title-bar :categoryName="categoryName"></title-bar>
    <div class="divider"></div>
    <article class="flex-container__col contents-container">
      <div class="contents-num__wrapper">{{ contentsNum }}개</div>
      <div class="flex-container__col contents-list__wrapper">
        <contents-item v-for="item in items" :key="item"></contents-item>
      </div>
    </article>
  </div>
</template>

<script setup>
import ContentsItem from '@/components/home/ContentsItem.vue'
import TitleBar from '@/components/home/TitleBar.vue'

const categoryName = '전체 콘텐츠'

const contentsNum = 1
const items = 5
</script>

<style></style>
