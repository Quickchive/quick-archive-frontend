import { defineStore } from 'pinia'
import { getCategories } from '@/api/category'
import { ref } from 'vue'
import categoryList from '@/assets/model/categoryList.json'
import type { CategoryIdMap } from '@/utils/interface'

export const useCategoryTreeStore = defineStore('categoryTree', () => {
  // 더미 값 들어있음
  const userCategoryList: any = ref([])

  // 카테고리 트리 depth show/hide 컨트롤 용
  const categoryIdTree = ref<CategoryIdMap>({})
  const categoryIdTreeRadio = ref<CategoryIdMap>({})

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

  // 카테고리 트리 depth show/hide 컨트롤 용
  function showChildrenCategoryRadio(children: any) {
    if (children) {
      for (const child of children) {
        if (child.id in categoryIdTreeRadio.value) {
          categoryIdTreeRadio.value[child.id] = !categoryIdTreeRadio.value[child.id]
        }
      }
    }
  }

  async function getUserCategoryList() {
    try {
      const response = await getCategories()
      if (response.data.statusCode === 200) {
        userCategoryList.value = response.data.categoriesTree
        const categoryIdMap = createCategoryIdMap(userCategoryList.value)
        categoryIdTree.value = categoryIdMap
        categoryIdTreeRadio.value = categoryIdMap
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function updateUserCategoryList() {
    try {
      const response = await getCategories()
      if (response.data.statusCode === 200) {
        userCategoryList.value = response.data.categoriesTree
      }
    } catch (error) {
      console.log(error)
    }
  }

  function createCategoryIdMap(items: any[]) {
    return items.reduce((acc, item) => {
      acc[item.id] = false
      if (item.children && Array.isArray(item.children)) {
        const nestedMap = createCategoryIdMap(item.children)
        Object.assign(acc, nestedMap)
      }
      return acc
    }, {})
  }

  function updateCategoryIdTree(categoryIdMap: any, targetMap: any) {
    targetMap.value = categoryIdMap
  }

  return {
    userCategoryList,
    categoryIdTree,
    categoryIdTreeRadio,
    createCategoryIdMap,
    showChildrenCategory,
    getUserCategoryList,
    updateCategoryIdTree,
    showChildrenCategoryRadio,
    updateUserCategoryList
  }
})
