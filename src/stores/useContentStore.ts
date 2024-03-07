import { defineStore } from 'pinia'
import {
  getContents,
  getAllContents,
  addContents,
  deleteContents,
  addFavorite,
  updateContents
} from '@/api/contents'
import { ref } from 'vue'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import type { CategoryIdMap } from '@/utils/interface'
import { saveHideAlertToCookie } from '@/utils/cookies'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
import { useRoute } from 'vue-router'
import { sortByCreatedAtDescending, sortByCreatedAtAscending } from '@/utils/sort.js'

export const useContentStore = defineStore('content', () => {
  const userContentList: any = ref([])
  const userCustomContentList = ref([])
  const userFilteredContentList: any = ref([])
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
        userContentList.value = sortByCreatedAtDescending(response.data.contents)
        userFilteredContentList.value = userContentList.value
        const contentIdMap = createContentIdMap(userFilteredContentList.value)
        moreBtnContentIdTree.value = contentIdMap
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

  async function fetchContents(categoryId: number) {
    try {
      const response: any = await getContents(categoryId)
      console.log('콘텐츠 조회', response)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        userCustomContentList.value = response.data.contents
        const contentIdMap = createContentIdMap(userCustomContentList.value)
        moreBtnContentIdTree.value = contentIdMap
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
        modalViewStore.closeSelectModal()
        modalViewStore.closeAddContentModal()
        modalViewStore.closeAddContentSingle()
        if (route.params.id !== undefined) {
          // 특정 콘텐츠 페이지인 경우
          fetchContents(Number(route.params.id))
        } else {
          // 전체 콘텐츠 페이지인 경우
          fetchAllContents()
        }
      }
    } catch (error: any) {
      // 토스트
      const toastData = {
        message: error.response.data.message
      }
      modalDataStore.setToastMessage(toastData)
      modalViewStore.showErrorToast()
    }
  }

  async function addMultipleContent() {
    try {
      for (let i = 0; i < modalDataStore.addContentData.length; i++) {
        if (modalDataStore.addContentData[i].checked) {
          const contentData = {
            link: modalDataStore.addContentData[i].link,
            title: modalDataStore.addContentData[i].title,
            comment: modalDataStore.addContentData[i].memo,
            favorite: modalDataStore.addContentData[i].favorite,
            categoryName: modalDataStore.selectedLocation.name,
            parentId: modalDataStore.selectedLocation.parentId
          }
          const response: any = await addContents(contentData)
          console.log('addContent', response)
        }
      }
    } catch (error: any) {
      console.log(error)
      // 토스트
      const toastData = {
        message: error.response.data.message
      }
      modalDataStore.setToastMessage(toastData)
      modalViewStore.showErrorToast()
    } finally {
      modalViewStore.closeSelectModal()
      modalViewStore.closeAddContentModal()
      modalViewStore.closeAddContentMultiple()
      if (route.params.id !== undefined) {
        // 특정 콘텐츠 페이지인 경우
        fetchContents(Number(route.params.id))
      } else {
        // 전체 콘텐츠 페이지인 경우
        fetchAllContents()
      }
    }
  }

  async function editContent() {
    try {
      const contentData = {
        id: modalDataStore.addContentData.id,
        link: modalDataStore.addContentData.link,
        title: modalDataStore.addContentData.title,
        comment: modalDataStore.addContentData.memo,
        favorite: modalDataStore.addContentData.favorite,
        categoryName: modalDataStore.selectedLocation.name,
        parentId: modalDataStore.selectedLocation.parentId
      }

      if (modalDataStore.selectedLocation.name === '전체 콘텐츠') {
        delete contentData.categoryName
      }

      const response: any = await updateContents(contentData)
      console.log('addContent', response)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        modalViewStore.closeSelectModal()
        modalViewStore.hideModalWithOverlay('editContent', 'default')
        modalViewStore.hideModalWithOverlay('editContentDetail', 'default')
        if (route.params.id !== undefined) {
          // 특정 콘텐츠 페이지인 경우
          fetchContents(Number(route.params.id))
        } else {
          // 전체 콘텐츠 페이지인 경우
          fetchAllContents()
        }
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

  async function deleteContent() {
    try {
      const response: any = await deleteContents(focusedContentId.value)
      console.log('deleteContent', response)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        modalViewStore.hideModalWithOverlay('deleteContent', 'default')
        // 토스트
        const toastData = {
          message: '콘텐츠가 삭제되었습니다.',
          func: {
            message: '취소하기'
          }
        }
        modalDataStore.setToastMessage(toastData)
        modalViewStore.showToast()
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

  function createContentIdMap(items: any[]) {
    return items.reduce((acc, item) => {
      acc[item.id] = false
      return acc
    }, {})
  }

  function setFocusedContent(contentId: number) {
    focusedContentId.value = contentId
  }

  function setFocusedContentData(contentData: object) {
    focusedContentData.value = contentData
  }

  async function favoriteContent(contentId: number) {
    try {
      const response = await addFavorite(contentId)
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
    userCustomContentList,
    deleteContent,
    createContentIdMap,
    moreBtnContentIdTree,
    focusedContentId,
    focusedContentData,
    setFocusedContent,
    setFocusedContentData,
    favoriteContent,
    userFilteredContentList,
    editContent,
    addMultipleContent
  }
})
