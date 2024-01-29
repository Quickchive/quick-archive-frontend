import { defineStore } from 'pinia'
import { getContents, getAllContents, addContents } from '@/api/contents'
import contentListDummy from '@/assets/model/contentList.json'
import { ref } from 'vue'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'

export const useContentStore = defineStore('content', () => {
  // 더미
  const userContentList = ref([])
  const userCustomContentList = ref([])

  const modalDataStore = useModalDataStore()
  const modalViewStore = useModalViewStore()

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
      console.log('콘텐츠 조회', response)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        userCustomContentList.value = response.data.contents
      }
    } catch (error) {
      console.log(error)
    }
  }

  function setUserContentList(contentList: never[]) {
    userContentList.value = contentList
  }

  async function addContent() {
    try {
      const contentData = {
        link: modalDataStore.addContentData.link,
        title: modalDataStore.addContentData.title,
        comment: modalDataStore.addContentData.memo,
        favorite: modalDataStore.addContentData.favorite,
        categoryName: modalDataStore.selectedLocation.name,
        parentId: modalDataStore.selectedLocation.parentId
      }

      const response: any = await addContents(contentData)
      console.log('addContent', response)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        console.log('콘텐츠 추가 성공 로직')
        modalViewStore.closeSelectModal()
        modalViewStore.closeAddContentModal()
        modalViewStore.closeAddContentDetailModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    userContentList,
    fetchAllContents,
    fetchContents,
    setUserContentList,
    addContent,
    userCustomContentList
  }
})
