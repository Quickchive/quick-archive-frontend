import { defineStore } from 'pinia'
import { getCategories } from '@/api/category'
import { getContents } from '@/api/contents'

export const useCategoryStore = defineStore('category', {
  // 화살표 함수는 전체 유형 유추을 위해 권장됨.
  state: () => {
    return {
      // 더미
      userCategoryList: [],
      // 더미
      userContentData: [
        {
          id: 0,
          createdAt: '2023-09-23T05:47:38.105Z',
          updatedAt: '2023-09-23T05:47:38.105Z',
          link: 'ex.com',
          title: 'string',
          siteName: 'string',
          coverImg: 'string',
          description: 'string',
          comment: 'string',
          reminder: '2022-08-20',
          favorite: true,
          category: {
            id: 23,
            createdAt: '2023-09-23T05:47:38.105Z',
            updatedAt: '2023-09-23T05:47:38.105Z',
            name: '테스트 카테고리',
            slug: 'string',
            parentId: 0,
            userId: 0
          },
          userId: 0
        },
        {
          id: 1,
          createdAt: '2023-09-23T05:47:38.105Z',
          updatedAt: '2023-09-23T05:47:38.105Z',
          link: 'ex.com',
          title: 'string',
          siteName: 'string',
          coverImg: 'string',
          description: 'string',
          comment: 'string',
          reminder: '2022-08-20',
          favorite: false,
          category: {
            id: 33,
            createdAt: '2023-09-23T05:47:38.105Z',
            updatedAt: '2023-09-23T05:47:38.105Z',
            name: '쇼핑',
            slug: 'string',
            parentId: 0,
            userId: 0
          },
          userId: 0
        }
      ]
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
    async getContents(categoryId: Number) {
      try {
        const response = await getContents(categoryId)
        console.log('store', response)
        if (response.data.statusCode == 200) {
          this.userContentData = response.data.contents
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
