<template>
  <div class="more-button">
    <button @click="modalViewStore.openEditCategoryModal()">편집하기</button>
    <button @click="modalViewStore.openDeleteCategoryModal()">삭제하기</button>
  </div>
</template>

<script setup>
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
const modalViewStore = useModalViewStore()
</script>

<style></style>
