<template>
  <div
    class="category-tree"
    v-for="categoryItem1 in categoryStore.userCategoryList"
    :key="categoryItem1"
  >
    <div class="category-item-radio">
      <!-- 1차 카테고리 -->
      <ul v-if="categoryItem1.name" class="category-list__first-ul">
        <li>
          <single-category-tree-with-radio-button
            :category="categoryItem1"
            :children="categoryItem1.children ? categoryItem1.children : null"
            :activeExpandButton="true"
          ></single-category-tree-with-radio-button>
        </li>
        <!-- 2차 카테고리 -->
        <ul
          class="category-list__second-ul"
          v-for="categoryItem2 in categoryItem1.children"
          :key="categoryItem2"
        >
          <template v-if="categoryStore.categoryIdTreeRadio[categoryItem2.id]">
            <li>
              <single-category-tree-with-radio-button
                :category="categoryItem2"
                :children="categoryItem2.children ? categoryItem2.children : null"
                :treeWidth="treeWidth2"
                :activeExpandButton="false"
              ></single-category-tree-with-radio-button>
            </li>
          </template>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script setup>
import SingleCategoryTreeWithRadioButton from '@/components/nav/SingleCategoryTreeWithRadioButton.vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

// 스토어 선언
const categoryStore = useCategoryStore()
const treeWidth2 = 'liDepth2'
</script>

<style></style>
