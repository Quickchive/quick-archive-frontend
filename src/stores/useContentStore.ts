import { defineStore } from 'pinia'
import { getContents, getAllContents, addContents, deleteContents } from '@/api/contents'
import { ref } from 'vue'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import type { CategoryIdMap } from '@/utils/interface'
import { saveHideAlertToCookie } from '@/utils/cookies'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
import { useRoute } from 'vue-router'

export const useContentStore = defineStore('content', () => {
  const userContentList = ref([])
  const userCustomContentList = ref([])
  const alertDataStore = useAlertDataStore()
  const modalDataStore = useModalDataStore()
  const modalViewStore = useModalViewStore()
  const moreBtnContentIdTree = ref<CategoryIdMap>({})
  const focusedContentId = ref(-1)
  const focusedContentData = ref({})
  const route = useRoute()

  async function fetchAllContents() {
    try {
      const response: any = await getAllContents()
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        userContentList.value = response.data.contents
        const contentIdMap = createContentIdMap(userContentList.value)
        moreBtnContentIdTree.value = contentIdMap
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
        const contentIdMap = createContentIdMap(userCustomContentList.value)
        moreBtnContentIdTree.value = contentIdMap
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
        if (route.params.id !== undefined) {
          // 특정 콘텐츠 페이지인 경우
          fetchContents(Number(route.params.id))
        } else {
          // 전체 콘텐츠 페이지인 경우
          fetchAllContents()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteContent() {
    try {
      const response: any = await deleteContents(focusedContentId.value)
      console.log('deleteContent', response)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        modalViewStore.closeDeleteContentModal()
        // 얼럿 다시 보지 않기
        if (alertDataStore.checkboxChecked === true) {
          saveHideAlertToCookie(true)
        } else {
          saveHideAlertToCookie(false)
        }
        if (route.params.id !== undefined) {
          // 특정 콘텐츠 페이지인 경우
          fetchContents(Number(route.params.id))
        } else {
          // 전체 콘텐츠 페이지인 경우
          fetchAllContents()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  function createContentIdMap(items: any[]) {
    return items.reduce((acc, item) => {
      acc[item.id] = false
      console.log('acc', acc)
      return acc
    }, {})
  }

  function setFocusedContent(contentId: number) {
    focusedContentId.value = contentId
  }

  function setFocusedContentData(contentData: object) {
    focusedContentData.value = contentData
  }

  return {
    userContentList,
    fetchAllContents,
    fetchContents,
    setUserContentList,
    addContent,
    userCustomContentList,
    deleteContent,
    createContentIdMap,
    moreBtnContentIdTree,
    focusedContentId,
    focusedContentData,
    setFocusedContent,
    setFocusedContentData
  }
})
