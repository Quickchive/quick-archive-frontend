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
import { toRaw, onMounted, ref } from 'vue'
import categoryListDummy from '@/assets/model/categoryList.json'

const categoryStore = useCategoryStore()
const categoryList = ref(categoryStore.userCategoryList)

onMounted(async () => {
  await categoryStore.getUserCategoryList()
  if (toRaw(categoryStore.userCategoryList).length > 0) {
    categoryList.value = toRaw(categoryStore.userCategoryList)
  } else {
    categoryList.value = categoryListDummy
  }
  // console.log('navBar', categoryList)
})

// 카테고리 데이터 감시
categoryStore.$subscribe(() => {
  categoryList.value = toRaw(categoryStore.userCategoryList)
})
</script>

<style></style>
