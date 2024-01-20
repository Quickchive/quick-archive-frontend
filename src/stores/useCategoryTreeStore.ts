import { defineStore } from 'pinia'
import { getCategories } from '@/api/category'
import { ref, reactive } from 'vue'
import categoryList from '@/assets/model/categoryList.json'
import type { CategoryIdMap } from '@/utils/interface'

export const useCategoryTreeStore = defineStore('categoryTree', () => {
  // 더미 값 들어있음
  const userCategoryList = ref(categoryList)

  // 카테고리 트리 depth show/hide 컨트롤 용
  const categoryIdTree = ref<CategoryIdMap>({})

  // 카테고리 트리 depth show/hide 컨트롤 용
  function showChildrenCategory(children: any) {
    if (children) {
      for (const child of children) {
        if (child.id in categoryIdTree.value) {
          categoryIdTree.value[child.id] = !categoryIdTree.value[child.id]
        }
      }
    }
  }

  // async function getUserCategoryList() {
  //   try {
  //     const response = await getCategories()
  //     if (response.data.statusCode === 200) {
  //       userCategoryList = response.data.categoriesTree
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  function createCategoryIdTree(categoryIdMap: any) {
    categoryIdTree.value = categoryIdMap
  }

  return {
    userCategoryList,
    categoryIdTree,
    createCategoryIdTree,
    showChildrenCategory
    // getUserCategoryList
  }
})
