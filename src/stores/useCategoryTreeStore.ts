import { defineStore } from 'pinia'
import { getCategories } from '@/api/category'
import { ref } from 'vue'
import type { CategoryIdMap } from '@/utils/interface'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'

export const useCategoryTreeStore = defineStore('categoryTree', () => {
  const modalDataStore = useModalDataStore()
  const modalViewStore = useModalViewStore()

  const userCategoryList: any = ref([])

  // 카테고리 트리 depth show/hide 컨트롤 용
  const categoryIdTree = ref<CategoryIdMap>({})
  const categoryIdTreeRadio = ref<CategoryIdMap>({})
  const moreBtnCategoryIdTree = ref<CategoryIdMap>({})

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
        categoryIdTree.value = Object.assign({}, categoryIdMap)
        categoryIdTreeRadio.value = Object.assign({}, categoryIdMap)
        moreBtnCategoryIdTree.value = Object.assign({}, categoryIdMap)
      }
    } catch (error: any) {
      console.log(error)
      // 토스트
      const toastData = {
        message: error.response.data.message
      }
      modalDataStore.setToastMessage(toastData)
      modalViewStore.showErrorToast()
    }
  }

  async function updateUserCategoryList() {
    try {
      const response = await getCategories()
      if (response.data.statusCode === 200) {
        userCategoryList.value = response.data.categoriesTree
      }
    } catch (error: any) {
      console.log(error)
      // 토스트
      const toastData = {
        message: error.response.data.message
      }
      modalDataStore.setToastMessage(toastData)
      modalViewStore.showErrorToast()
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

  return {
    userCategoryList,
    categoryIdTree,
    categoryIdTreeRadio,
    createCategoryIdMap,
    showChildrenCategory,
    getUserCategoryList,
    showChildrenCategoryRadio,
    updateUserCategoryList,
    moreBtnCategoryIdTree
  }
})
