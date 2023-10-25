<template>
  <div class="more-button">
    <button @click="modalStore.openEditCategoryModal()">편집하기</button>
    <button @click="modalStore.openDeleteCategoryModal()">삭제하기</button>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore.ts'
const modalStore = useModalStore()
</script>

<style></style>
