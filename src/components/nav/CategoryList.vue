<template>
  <div class="category-list">
    <!-- default 카테고리 -->
    <category-item-default></category-item-default>
    <!-- divider -->
    <div class="category-list__divider"></div>
    <!-- 유저 카테고리 -->
    <category-item-user-custom
      v-for="categoryItem in categoryStore.userCategoryList"
      :key="categoryItem"
      :categoryData="categoryStore.userCategoryList"
    ></category-item-user-custom>
  </div>
</template>

<script>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import CategoryItemUserCustom from '@/components/nav/CategoryItemUserCustom.vue'
import CategoryItemDefault from '@/components/nav/CategoryItemDefault.vue'
// import testJSON from '@/assets/model/test.json'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

export default {
  components: { CategoryItemUserCustom, CategoryItemDefault },
  data() {
    return {
      expandMoreIcon,
      expandLessIcon,
      moreIcon,
      // userCategoryList: testJSON
      useCategoryList: []
    }
  },
  setup() {
    const categoryStore = useCategoryStore()
    return {
      categoryStore
    }
  },
  mounted() {
    this.categoryStore.getUserCategoryList()
  }
}
</script>

<style></style>
