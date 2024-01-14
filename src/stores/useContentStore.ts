import { defineStore } from 'pinia'
import { getContents, getAllContents } from '@/api/contents'
import contentListDummy from '@/assets/model/contentList.json'
import { ref } from 'vue'

export const useContentStore = defineStore('content', () => {
  // 더미
  const userContentList = ref(contentListDummy.contents)

  async function fetchAllContents() {
    try {
      const response: any = await getAllContents()
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        userContentList.value = response.data.contents
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchContents(categoryId: number) {
    try {
      const response: any = await getContents(categoryId)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        userContentList.value = response.data.contents
      }
    } catch (error) {
      console.log(error)
    }
  }
  function setUserContentList(contentList: never[]) {
    userContentList.value = contentList
  }

  return {
    userContentList,
    fetchAllContents,
    fetchContents,
    setUserContentList
  }
})
