<template>
  <div class="contents-filter__wrapper">
    <select class="selectbox__contents-filter">
      <option selected value="recent">최신순</option>
      <option value="old">오래된순</option>
    </select>
    <button class="btn--chip" :class="categoryStore.isFavoriteChipOn ? 'active' : 'inactive'">
      즐겨찾기
    </button>
    <button :class="categoryStore.isUnselectedChipOn ? 'active' : 'inactive'" class="btn--chip">
      카테고리 미지정
    </button>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
const categoryStore = useCategoryStore()
</script>

<style></style>
