<template>
  <h1>{{ categoryName }}</h1>
  <the-filter></the-filter>
</template>

<script setup>
import TheFilter from '@/components/home/TheFilter.vue'
import { defineProps } from 'vue'

const props = defineProps({
  categoryName: String
})
</script>

<style></style>
