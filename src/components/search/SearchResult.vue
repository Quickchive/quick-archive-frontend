<template>
  <title-header :title="title"></title-header>
</template>

<script setup>
import TitleHeader from '../header/TitleHeader.vue'
import { ref } from 'vue'

const keyword = ref('')
const title = `${keyword.value} 검색 결과`
</script>

<style></style>
