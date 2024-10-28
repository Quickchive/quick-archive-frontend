<template>
  <div
    class="category-tree"
    v-for="categoryItem1 in categoryStore.categoryList"
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
                :activeExpandButton="true"
              ></single-category-tree-with-radio-button>
            </li>
            <!-- 3차 카테고리 -->
            <template v-if="modalViewStore.modal.contentLocation">
              <ul v-for="categoryItem3 in categoryItem2.children" :key="categoryItem3">
                <template v-if="categoryStore.categoryIdTreeRadio[categoryItem3.id]">
                  <li>
                    <single-category-tree-with-radio-button
                      :category="categoryItem3"
                      :children="categoryItem3.children ? categoryItem3.children : null"
                      :treeWidth="treeWidth3"
                      :activeExpandButton="false"
                    ></single-category-tree-with-radio-button>
                  </li>
                </template>
              </ul>
            </template>
          </template>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script setup>
import SingleCategoryTreeWithRadioButton from '@/components/nav/SingleCategoryTreeWithRadioButton.vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'

// 스토어 선언
const categoryStore = useCategoryStore()
const modalViewStore = useModalViewStore()
const treeWidth2 = 'category-list__first-ul'
const treeWidth3 = 'category-list__second-ul'
</script>

<style></style>
