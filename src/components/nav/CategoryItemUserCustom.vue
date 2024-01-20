<template>
  <div
    class="category-tree"
    v-for="categoryItem1 in categoryTreeStore.userCategoryList"
    :key="categoryItem1"
  >
    <div class="category-item">
      <!-- 1차 카테고리 -->
      <ul v-if="categoryItem1" class="category-list__first-ul">
        <li>
          <single-category-tree
            :category="categoryItem1"
            :children="categoryItem1.children ? categoryItem1.children : null"
          ></single-category-tree>
        </li>
        <!-- 2차 카테고리 -->
        <ul v-for="categoryItem2 in categoryItem1.children" :key="categoryItem2">
          <template v-if="categoryTreeStore.categoryIdTree[categoryItem2.id]">
            <li>
              <single-category-tree
                :category="categoryItem2"
                :children="categoryItem2.children ? categoryItem2.children : null"
                :treeWidth="treeWidth2"
              ></single-category-tree>
            </li>
            <!-- 3차 카테고리 -->
            <ul v-for="categoryItem3 in categoryItem2.children" :key="categoryItem3">
              <template v-if="categoryTreeStore.categoryIdTree[categoryItem3.id]">
                <li>
                  <single-category-tree
                    :category="categoryItem3"
                    :treeWidth="treeWidth3"
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
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import SingleCategoryTree from '@/components/nav/SingleCategoryTree.vue'
import { onMounted } from 'vue'

const categoryTreeStore = useCategoryTreeStore()
const treeWidth2 = 'liDepth2'
const treeWidth3 = 'liDepth3'

onMounted(async () => {
  // 카테고리 id맵을 생성
  const createIdMap = (items) => {
    return items.reduce((acc, item) => {
      acc[item.id] = false
      if (item.children && Array.isArray(item.children)) {
        const nestedMap = createIdMap(item.children)
        Object.assign(acc, nestedMap)
      }
      return acc
    }, {})
  }
  categoryTreeStore.createCategoryIdTree(createIdMap(categoryTreeStore.userCategoryList))
})
</script>

<style></style>
