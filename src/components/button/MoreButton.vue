<template>
  <div>
    <button class="single-btn" @click="modalViewStore.openEditCategoryModal()">편집하기</button>
    <button
      v-if="props.contentsBtn"
      class="single-btn"
      @click="modalViewStore.openDeleteCategoryModal()"
    >
      공유하기
    </button>
    <button class="single-btn" @click="modalViewStore.openDeleteCategoryModal()">삭제하기</button>
  </div>
</template>

<script setup>
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
const modalViewStore = useModalViewStore()

const props = defineProps({
  contentsBtn: Boolean
})
</script>

<style></style>
