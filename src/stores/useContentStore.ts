import { defineStore } from 'pinia'
import { getContents } from '@/api/contents'

export const useContentStore = defineStore('content', {
  // 화살표 함수는 전체 유형 유추을 위해 권장됨.
  state: () => {
    return {
      // 더미
      userContentList: []
    }
  },
  getters: {},
  actions: {
    async getContents(categoryId: Number) {
      try {
        const response = await getContents(categoryId)
        console.log('store', response)
        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          this.userContentList = response.data.contents
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})