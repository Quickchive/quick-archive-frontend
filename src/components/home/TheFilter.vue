<template>
  <div class="contents-filter__wrapper">
    <select class="selectbox__contents-filter" v-model="selectedOption" @change="sortContent">
      <option selected value="recent">최신순</option>
      <option value="old">오래된순</option>
    </select>
    <button
      @click="categoryStore.setFavoriteContentChip(true)"
      class="btn--chip"
      :class="categoryStore.isFavoriteChipOn ? 'active' : 'inactive'"
    >
      즐겨찾기
    </button>
    <button
      @click="categoryStore.setUnselectedContentChip(true)"
      class="btn--chip"
      :class="categoryStore.isUnselectedChipOn ? 'active' : 'inactive'"
    >
      카테고리 미지정
    </button>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { ref } from 'vue'
const categoryStore = useCategoryStore()
import { useContentStore } from '@/stores/useContentStore.ts'
const contentStore = useContentStore()
import { sortByCreatedAtDescending, sortByCreatedAtAscending } from '@/utils/sort.js'

const selectedOption = ref('recent')

const sortContent = () => {
  if (selectedOption.value === 'recent') {
    contentStore.userFilteredContentList = sortByCreatedAtDescending(
      contentStore.userFilteredContentList
    )
  } else {
    contentStore.userFilteredContentList = sortByCreatedAtAscending(
      contentStore.userFilteredContentList
    )
  }
}
</script>

<style></style>
