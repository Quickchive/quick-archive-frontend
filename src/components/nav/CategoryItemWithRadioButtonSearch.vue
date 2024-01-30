<template v-if="searchStore.searchedCategory2 !== undefined">
  <div class="category-tree" v-for="category in searchStore.searchedCategory2" :key="category.id">
    <div class="category-item-radio">
      <!-- 1차 카테고리 -->
      <ul v-if="category.name" class="category-list__first-ul">
        <li>
          <single-category-with-radio-button
            :category="category"
            :children="category.children ? category.children : null"
            :activeExpandButton="true"
          ></single-category-with-radio-button>
        </li>
        <!-- 2차 카테고리 -->
        <ul
          class="category-list__second-ul"
          v-for="categoryItem2 in category.children"
          :key="categoryItem2.id"
        >
          <template v-if="categoryTreeStore.categoryIdTreeRadio[categoryItem2.id]">
            <li>
              <single-category-with-radio-button
                :category="categoryItem2"
                :children="categoryItem2.children ? categoryItem2.children : null"
                :activeExpandButton="false"
              ></single-category-with-radio-button>
            </li>
          </template>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script setup>
import SingleCategoryWithRadioButton from '@/components/nav/SingleCategoryWithRadioButton.vue'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { useSearchStore } from '@/stores/useSearchStore.ts'

// 스토어 선언
const categoryTreeStore = useCategoryTreeStore()
const searchStore = useSearchStore()
</script>

<style></style>
