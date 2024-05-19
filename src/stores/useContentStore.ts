import { defineStore } from 'pinia'
import { ref, reactive, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import {
  getContents,
  getAllContents,
  addContents,
  deleteContents,
  addFavorite,
  updateContents
} from '@/api/contents'
import { getOgData } from '@/api/contents'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
import { useToastStore } from '@/stores/useToastStore.ts'
import {
  type CategoryIdMap,
  type ContentObj,
  type ContentList,
  type OgContent
} from '@/utils/interface'
import { saveHideAlertToCookie } from '@/utils/cookies'
import { sortByCreatedAtDescending } from '@/utils/sort.js'
import { deleteNullContentProp, deleteNullEditContentProp } from '@/utils/util.js'
import { useRouter } from 'vue-router'
import { json } from 'stream/consumers'

export const useContentStore = defineStore('content', () => {
  const alertDataStore = useAlertDataStore()
  const modalViewStore = useModalViewStore()
  const toastStore = useToastStore()
  const categoryStore = useCategoryStore()

  const route = useRoute()
  const router = useRouter()

  /*** state ***/

  // 사용: 콘텐츠 추가 모달, 콘텐츠 수정 모달
  const contentObj = reactive<ContentObj>({
    id: 0,
    link: '',
    title: '',
    siteName: '',
    description: '',
    comment: '',
    favorite: false,
    categoryName: '전체 콘텐츠',
    categoryIconName: '',
    categoryId: -1,
    parentId: -1,
    coverImg: '',
    focused: false
  })

  // 사용: 콘텐츠 추가 모달
  const multipleContentList: any = ref([])

  // 사용: 콘텐츠 조회, 검색 대상
  const allContentList = ref<ContentList[]>([])

  // 사용: 콘텐츠 조회, 카테고리 별 콘텐츠 페이지
  const contentList = ref<ContentList[]>([])

  const focusedContent = ref({
    id: -1,
    index: -1
  })

  const moreBtnContentIdTree = ref<CategoryIdMap>({})

  /*** actions ***/

  function setAllContentList(contents: ContentList[]) {
    allContentList.value = contents
  }

  function setContentList(contents: ContentList[]) {
    contentList.value = contents
  }

  function setContentObj(content: OgContent) {
    contentObj.link = content.link
    contentObj.coverImg = content.coverImg
    contentObj.title = content.title
    contentObj.description = content.description
    contentObj.siteName = content.siteName
  }

  function setContentTitle(title: string) {
    contentObj.title = title
  }

  function resetContentObj() {
    contentObj.id = -1
    contentObj.link = ''
    contentObj.coverImg = ''
    contentObj.title = ''
    contentObj.comment = ''
    contentObj.description = ''
    contentObj.siteName = ''
    contentObj.favorite = false
    contentObj.categoryName = ''
    contentObj.categoryId = -1
    contentObj.categoryIconName = ''
  }

  function createContentIdMap(items: any[]) {
    return items.reduce((acc, item) => {
      acc[item.id] = false
      return acc
    }, {})
  }

  function setFocusedContent(content: any) {
    contentObj.id = content.id
    contentObj.link = content.link
    contentObj.coverImg = content.coverImg
    contentObj.title = content.title
    contentObj.comment = content.comment
    contentObj.description = content.description
    contentObj.siteName = content.siteName
    contentObj.favorite = content.favorite
    if (content.category !== null) {
      contentObj.categoryName = content.category.name
      contentObj.categoryId = content.category.id
      contentObj.categoryIconName = content.category.iconName
    }
  }

  // 다중 콘텐츠에서 사용
  function setFocusedContentIndex(index: number) {
    focusedContent.value.index = index
  }

  function checkLinkInMultipleLink(index: any) {
    console.log('isChecked', multipleContentList.value[index].checked)
    multipleContentList.value[index].checked = !multipleContentList.value[index].checked
  }

  function setMultipleTitle(title: string) {
    multipleContentList.value[focusedContent.value.index].title = title
  }

  function setMultipleLinks(multipleLinkArray: OgContent) {
    console.log(multipleContentList)
    multipleContentList.value = multipleLinkArray
  }

  function setFavoriteToggle() {
    contentObj.favorite = !contentObj.favorite
  }

  function setMemo(memo: string) {
    contentObj.comment = memo
  }

  function setCategory() {
    contentObj.categoryName = categoryStore.parentCategory.name
    contentObj.categoryIconName = categoryStore.parentCategory.iconName
    contentObj.categoryId = categoryStore.parentCategory.id
  }

  /*************** api 함수 ***************/
  async function fetchAllContents() {
    try {
      const response: any = await getAllContents()
      if (response.data.statusCode === 200) {
        setAllContentList(sortByCreatedAtDescending(response.data.contents))
        setContentList(allContentList.value)
        const contentIdMap = createContentIdMap(contentList.value)
        moreBtnContentIdTree.value = contentIdMap
      }
    } catch (error: any) {
      toastStore.executeErrorToast(error.message)
    }
  }

  async function fetchContents(categoryId: number) {
    try {
      const response: any = await getContents(categoryId)
      console.log('콘텐츠 조회', response.data.statusCode)
      if (response.data.statusCode === 200) {
        setContentList(response.data.contents)
        const contentIdMap = createContentIdMap(contentList.value)
        moreBtnContentIdTree.value = contentIdMap
      }
    } catch (error: any) {
      toastStore.executeErrorToast(error.message)
    }
  }

  async function favoriteContent(contentId: number) {
    try {
      const response = await addFavorite(contentId)
    } catch (error) {
      console.log(error)
    }
  }

  async function addContent() {
    try {
      const contentData = deleteNullContentProp(contentObj)
      const response: any = await addContents(contentData)
      console.log('addContent', response)
      if (response.data.statusCode === 201) {
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
        const jsonResponse = JSON.parse(response.config.data)
        const toastData = {
          message: '콘텐츠가 추가되었습니다.',
          func: {
            message: '보러가기',
            execute: () => {
              // 해당 카테고리로 이동 후 (categoryName으로 categoryId 찾는 로직 구현 필요)
              // router.push(`/home/detail/${categoryId}`)
              // 새탭에서 해당 콘텐츠 열기 처리
              window.open(jsonResponse.link)
            }
          }
        }
        toastStore.executeDefaultToast(toastData)
      }
    } catch (error: any) {
      console.log(error)
      toastStore.executeErrorToast(error.message)
    } finally {
      resetContentObj()
    }
  }

  async function addMultipleContent() {
    try {
      for (let i = 0; i < multipleContentList.value.length; i++) {
        if (multipleContentList.value[i].checked) {
          const contentData = deleteNullContentProp(multipleContentList.value[i])
          const response: any = await addContents(contentData)
          console.log('addContent', response)
        }
      }
    } catch (error: any) {
      // 토스트
      toastStore.executeErrorToast(error.message)
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
      const contentData = deleteNullEditContentProp(contentObj)
      const response: any = await updateContents(contentData)
      console.log('editContent', response)
      if (response.data.statusCode === 200) {
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
      toastStore.executeErrorToast(error.message)
    }
  }

  async function deleteContent() {
    try {
      const response: any = await deleteContents(focusedContent.value.id)
      console.log('deleteContent', response)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        modalViewStore.hideModalWithOverlay('deleteContent', 'default')
        const toastData = {
          message: '콘텐츠가 삭제되었습니다.',
          func: {
            message: '취소하기'
          }
        }
        toastStore.executeDefaultToast(toastData)

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
      toastStore.executeErrorToast(error.message)
    }
  }

  // og 데이터 추출
  async function fetchOgData(link: string) {
    try {
      const response: any = await getOgData(link)
      console.log('ogdata', response)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        return response.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function setSingleLink(link: string) {
    const ogData = await fetchOgData(link)
    const singleLinkObj: OgContent = {
      link: link,
      coverImg: ogData.coverImg,
      title: ogData.title,
      description: ogData.description,
      siteName: ogData.siteName
    }

    setContentObj(singleLinkObj)
  }

  async function fetchMultipleLinksOgData(links: any) {
    const multipleLinksArr = <OgContent[]>[]

    for (let i = 0; i < links.length; i++) {
      const ogData = await fetchOgData(links[i])
      const linkData = {
        link: links[i],
        coverImg: ogData.coverImg,
        title: ogData.title,
        description: ogData.description,
        siteName: ogData.siteName,
        checked: true
      }
      multipleLinksArr.push(linkData)
    }

    return multipleLinksArr
  }

  return {
    allContentList,
    focusedContent,
    contentList,
    multipleContentList,
    moreBtnContentIdTree,
    contentObj,
    setFocusedContent,
    setContentTitle,
    setSingleLink,
    setMultipleLinks,
    checkLinkInMultipleLink,
    setMultipleTitle,
    setFocusedContentIndex,
    addContent,
    deleteContent,
    editContent,
    favoriteContent,
    addMultipleContent,
    fetchAllContents,
    fetchContents,
    fetchOgData,
    fetchMultipleLinksOgData,
    setFavoriteToggle,
    setMemo,
    setCategory
  }
})
