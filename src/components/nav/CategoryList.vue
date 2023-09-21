<template>
  <div class="category-list">
    <!-- default 카테고리 -->
    <category-item-default></category-item-default>
    <!-- divider -->
    <div class="category-list__divider"></div>
    <!-- 유저 카테고리 -->
    <category-item-user-custom
      v-for="categoryItem in categoryList"
      :key="categoryItem"
      :categoryData="categoryItem"
    ></category-item-user-custom>
  </div>
</template>

<script setup>
import CategoryItemUserCustom from '@/components/nav/CategoryItemUserCustom.vue'
import CategoryItemDefault from '@/components/nav/CategoryItemDefault.vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { isProxy, toRaw } from 'vue'

const categoryStore = useCategoryStore()
categoryStore.getUserCategoryList()
let categoryList = categoryStore.userCategoryList
if (isProxy(categoryStore.userCategoryList)) {
  categoryList = toRaw(categoryStore.userCategoryList)
}
console.log(categoryList)
</script>

<style></style>
