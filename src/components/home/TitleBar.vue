<template>
  <!-- <h1>{{  }}</h1> -->
  <title-header class="titleHeader-main" :title="categoryStore.curCategoryName"></title-header>
  <the-filter></the-filter>
</template>

<script setup>
import TheFilter from '@/components/home/TheFilter.vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import TitleHeader from '@/components/header/TitleHeader.vue'

const categoryStore = useCategoryStore()
</script>

<style></style>
