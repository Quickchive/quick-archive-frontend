<template>
  <div
    class="category-tree"
    v-for="categoryItem1 in categoryStore.userCategoryList"
    :key="categoryItem1"
  >
    <div class="category-item-default">
      <!-- 1차 카테고리 -->
      <ul v-if="categoryItem1" class="category-list__first-ul">
        <li>
          <single-category-tree
            :category="categoryItem1"
            :children="categoryItem1.children ? categoryItem1.children : null"
            :treeWidth="treeWidth1"
          ></single-category-tree>
        </li>
        <!-- 2차 카테고리 -->
        <ul v-for="categoryItem2 in categoryItem1.children" :key="categoryItem2">
          <template v-if="categoryStore.categoryIdTree[categoryItem2.id]">
            <li>
              <single-category-tree
                :category="categoryItem2"
                :children="categoryItem2.children ? categoryItem2.children : null"
                :treeWidth="treeWidth2"
              ></single-category-tree>
            </li>
            <!-- 3차 카테고리 -->
            <ul v-for="categoryItem3 in categoryItem2.children" :key="categoryItem3">
              <template v-if="categoryStore.categoryIdTree[categoryItem3.id]">
                <li>
                  <single-category-tree
                    :category="categoryItem3"
                    :treeWidth="treeWidth3"
                    :activeExpandButton="false"
                  ></single-category-tree>
                </li>
              </template>
            </ul>
          </template>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import SingleCategoryTree from '@/components/nav/SingleCategoryTree.vue'

const categoryStore = useCategoryStore()
const treeWidth1 = 'category-list__first-ul'
const treeWidth2 = 'category-list__second-ul'
const treeWidth3 = 'category-list__third-ul'
</script>

<style></style>
