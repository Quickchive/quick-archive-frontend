import { defineStore } from 'pinia'
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  getContents,
  getAllContents,
  addContents,
  addMultipleContents,
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
import {
  deleteNullContentProp,
  deleteNullEditContentProp,
  formatMultipleLinks
} from '@/utils/util.js'
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
    coverImg: ''
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

  // 전체 카테고리 리스트가 갱신될 때 더보기 버튼용 카테고리 id 리스트 맵도 갱신한다.
  watch(
    () => contentList.value,
    (newContentList) => {
      moreBtnContentIdTree.value = createContentIdMap(newContentList)
    },
    { deep: true }
  )

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

  function setContentCategory(category: any) {
    contentObj.categoryName = category.name
    contentObj.categoryId = category.id
    contentObj.categoryIconName = category.iconName
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
    contentObj.categoryName = '전체 콘텐츠'
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
    console.log('fetchAllContents')
    try {
      const response: any = await getAllContents()
      if (response.data.statusCode === 200) {
        setAllContentList(sortByCreatedAtDescending(response.data.contents))
        setContentList(allContentList.value)
      }
    } catch (error: any) {
      toastStore.executeErrorToast(error.message)
    }
  }

  async function fetchContents(categoryId: number) {
    console.log('fetchContents')

    try {
      const response: any = await getContents(categoryId)
      console.log('콘텐츠 조회', response.data.statusCode)
      if (response.data.statusCode === 200) {
        setContentList(response.data.contents)
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
        modalViewStore.resetAll()
        categoryStore.resetParentCategory()
        resetContentObj()

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
    }
  }

  async function addMultipleContent() {
    try {
      const contentLinks = formatMultipleLinks(multipleContentList.value)
      const contentData = {
        contentLinks: contentLinks,
        categoryName: contentObj.categoryName,
        parentId: contentObj.categoryId
      }
      const response: any = await addMultipleContents(contentData)
      console.log('addMultipleContent', response)
    } catch (error: any) {
      // 토스트
      toastStore.executeErrorToast(error.message)
    } finally {
      modalViewStore.resetAll()
      categoryStore.resetParentCategory()
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
        categoryStore.resetParentCategory()
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
      const response: any = await deleteContents(contentObj.id)
      console.log('deleteContent', response)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        modalViewStore.hideModalWithOverlay('deleteContent', 'default')
        const toastData = {
          message: '콘텐츠가 삭제되었습니다.'
          // func: {
          //   message: '취소하기'
          // }
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
    try {
      const ogData = await fetchOgData(link)

      const singleLinkObj: OgContent = {
        link: link,
        coverImg: ogData.coverImg,
        title: ogData.title,
        description: ogData.description,
        siteName: ogData.siteName
      }

      setContentObj(singleLinkObj)
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw error
      }
      // 구체적인 에러 타입 체크
      if (error instanceof Error) {
        console.error('OG 데이터 가져오기 실패:', error.message)
      } else {
        console.error('알 수 없는 오류 발생:', error)
      }

      // 기본값으로 설정
      const fallbackLinkObj: OgContent = {
        link: link,
        coverImg: '', // 또는 기본 이미지 URL
        title: '제목을 가져올 수 없습니다',
        description: '설명을 가져올 수 없습니다',
        siteName: '사이트 이름을 가져올 수 없습니다'
      }

      setContentObj(fallbackLinkObj)

      // 필요한 경우 에러를 상위로 전파
      // throw error
    }
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
    setCategory,
    setContentCategory
  }
})
