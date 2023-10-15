import { defineStore } from 'pinia'
import { getCategories } from '@/api/category'

export const useCategoryStore = defineStore('category', {
  // 화살표 함수는 전체 유형 유추을 위해 권장됨.
  state: () => {
    return {
      userCategoryList: []
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
    }
  }
})
