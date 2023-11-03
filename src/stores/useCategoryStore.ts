import { defineStore } from 'pinia'
import { getCategories } from '@/api/category'
import { deleteCategories } from '@/api/category.js'
import { useModalStore } from '@/stores/useModalStore.ts'

const modalStore = useModalStore()

export const useCategoryStore = defineStore('category', {
  // 화살표 함수는 전체 유형 유추을 위해 권장됨.
  state: () => {
    return {
      userCategoryList: [
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
      ],
      curCategoryName: '전체 콘텐츠',
      focusedCategoryId: -1,
      focusedCategoryData: {},
      deleteContentsChecked: false
    }
  },
  getters: {
    getFocusedCategoryId: (state) => state.focusedCategoryId
  },
  actions: {
    async getUserCategoryList() {
      try {
        const response = await getCategories()
        console.log('store', response.data.categoriesTree)
        if (response.data.statusCode == 200) {
          this.userCategoryList = response.data.categoriesTree
        }
      } catch (error) {
        console.log(error)
      }
    },
    setCategoryName(categoryName: string) {
      this.curCategoryName = categoryName
    },
    setFocusedCategory(categoryId: number) {
      this.focusedCategoryId = categoryId
    },
    setFocusedCategoryData(categoryData: object) {
      this.focusedCategoryData = categoryData
    },

    async deleteCategory() {
      try {
        const focusedCategoryId = this.getFocusedCategoryId
        const response = await deleteCategories(focusedCategoryId, this.deleteContentsChecked)
        console.log(response)
        if (response.data.statusCode === (200 || 201)) {
          this.getUserCategoryList()
          modalStore.closeDeleteCategoryModal()
        }
      } catch (error) {
        console.log(error)
      }
    },
    deleteContentsInCategory() {
      this.deleteContentsChecked = !this.deleteContentsChecked
    }
  }
})
