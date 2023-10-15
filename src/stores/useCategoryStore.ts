import { defineStore } from 'pinia'
import { getCategories } from '@/api/category'

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
          userId: 7
        },
        {
          id: 1,
          createdAt: '2023-09-20T23:36:28.027Z',
          updatedAt: '2023-09-20T23:36:28.027Z',
          name: '꿀팁',
          slug: '꿀팁',
          parentId: null,
          userId: 7
        }
      ],
      curCategoryName: '전체 콘텐츠'
    }
  },
  getters: {},
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
    }
  }
})
