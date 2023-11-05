import { defineStore } from 'pinia'
import { getCategories } from '@/api/category'
import { deleteCategories } from '@/api/category.js'
import { useModalStore } from '@/stores/useModalStore.ts'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const modalStore = useModalStore()

  const userCategoryList = ref([
    {
      id: 0,
      createdAt: '2023-09-20T14:43:26.954Z',
      updatedAt: '2023-09-20T14:43:26.954Z',
      name: '쇼핑',
      slug: '쇼핑',
      parentId: null,
      userId: 7,
      iconName: 'Cake'
    },
    {
      id: 1,
      createdAt: '2023-09-20T23:36:28.027Z',
      updatedAt: '2023-09-20T23:36:28.027Z',
      name: '꿀팁',
      slug: '꿀팁',
      parentId: null,
      userId: 7,
      iconName: 'Watch'
    }
  ])
  const curCategoryName = ref('전체 콘텐츠')
  const focusedCategoryId = ref(-1)
  const focusedCategoryData = ref({})
  const deleteContentsChecked = ref(false)

  async function getUserCategoryList() {
    try {
      const response = await getCategories()
      console.log('store', response.data.categoriesTree)
      if (response.data.statusCode == 200) {
        userCategoryList.value = response.data.categoriesTree
      }
    } catch (error) {
      console.log(error)
    }
  }
  function setCategoryName(categoryName: string) {
    curCategoryName.value = categoryName
  }

  function setFocusedCategory(categoryId: number) {
    focusedCategoryId.value = categoryId
  }

  function setFocusedCategoryData(categoryData: object) {
    focusedCategoryData.value = categoryData
  }

  async function deleteCategory() {
    try {
      const focusedCategory_id = focusedCategoryId.value
      const response = await deleteCategories(focusedCategory_id, deleteContentsChecked)
      console.log(response)
      if (response.data.statusCode === (200 || 201)) {
        getUserCategoryList()
        modalStore.closeDeleteCategoryModal()
      }
    } catch (error) {
      console.log(error)
    }
  }
  function deleteContentsInCategory() {
    deleteContentsChecked.value = !deleteContentsChecked.value
  }
  return {
    userCategoryList,
    curCategoryName,
    focusedCategoryId,
    focusedCategoryData,
    deleteContentsChecked,
    getUserCategoryList,
    deleteContentsInCategory,
    deleteCategory,
    setCategoryName,
    setFocusedCategory,
    setFocusedCategoryData
  }
})
