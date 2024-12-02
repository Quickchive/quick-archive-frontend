<template>
  <title-header class="titleHeader-main" :title="pageName"></title-header>
  <the-filter></the-filter>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TheFilter from '@/components/home/TheFilter.vue'
import TitleHeader from '@/components/header/TitleHeader.vue'
import { getCustomPageNameToCookie } from '@/utils/cookies'

const route = useRoute()
const pageName = ref(getCustomPageNameToCookie())

watch(
  () => route.params.id,
  () => {
    pageName.value = getCustomPageNameToCookie()
  }
)
</script>
