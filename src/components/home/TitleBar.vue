<template>
  <h1>{{ categoryStore.curCategoryName }}</h1>
  <the-filter></the-filter>
</template>

<script setup>
import TheFilter from '@/components/home/TheFilter.vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

const categoryStore = useCategoryStore()
</script>

<style></style>
