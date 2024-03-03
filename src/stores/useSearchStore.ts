import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoryIdWithKeyword, getContentIdWithKeyword } from '@/utils/search.js'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { toRaw } from 'vue'
import { useContentStore } from '@/stores/useContentStore.ts'
import { getContents } from '@/api/contents'

export const useSearchStore = defineStore('search', () => {
  const keyword = ref({
    main: '',
    modal: ''
  })

  const placeholderText = ref({
    main: '제목, 메모, 카테고리명 검색',
    modal: '카테고리명 검색'
  })

  const searchedCategoryCount = ref(0)
  const searchedContentCount = ref(0)
  const searchedCategory: any = ref([])
  const searchedCategory2: any = ref([])

  const searchedContent: any = ref([])
  const categoryTreeStore = useCategoryTreeStore()
  const contentStore = useContentStore()
  const contentCounts: any = ref({}) // 카테고리별 콘텐츠 개수를 저장할 객체

  function searchEvent() {
    // 카테고리
    searchedCategory.value = getCategoryIdWithKeyword(
      keyword.value.main,
      categoryTreeStore.userCategoryList
    )

    if (searchedCategory.value !== undefined) {
      searchedCategoryCount.value = searchedCategory.value.length
    }

    // 콘텐츠
    searchedContent.value = toRaw(
      getContentIdWithKeyword(keyword.value.main, contentStore.userContentList)
    )

    if (searchedContent.value !== undefined) {
      searchedContentCount.value = searchedContent.value.length
    }
  }

  function searchCategoryEvent() {
    // 카테고리
    searchedCategory2.value = getCategoryIdWithKeyword(
      keyword.value.modal,
      categoryTreeStore.userCategoryList
    )
  }

  // 자식 카테고리 정보로 부모 카테고리 이름을 얻는다
  // 찾은 부모의 parentId !== null이라면
  // 부모의 부모의 이름까지 찾는다.

  function getCategoryDepth2NameById(parentId: number) {
    const categoryName = categoryTreeStore.userCategoryList.find((e: any) => e.id === parentId)
    if (categoryName) {
      return categoryName.name
    }
    return 0
  }

  function getCategoryDepth3NameById(parentId: number) {
    const grandParentName = getCategoryDepth2NameById(parentId)
    console.log('grandParentName', grandParentName)
    const categoryName = categoryTreeStore.userCategoryList.find(
      (e: any) => e.name === grandParentName
    )
    if (categoryName) {
      return categoryName.name
    }
  }

  // 3차 카테고리인지 체크
  function isCategoryDepth3(id: number) {
    // ex) parentId = 6 (3차 카테고리)

    // 1차만 있는 카테고리는 여기에 넘기지 않음
    // 고로 이 함수로 체크하는 값은 2 또는 3인 값
    // 3차 카테고리라면 true를, 2차 카테고리라면 false를 반환.

    // 1. id로 현재 위치를 찾음
    // result가 있다면 2차 카테고리임.
    // result가 없다면 3차 카테고리임.
    const result = categoryTreeStore.userCategoryList.find((e: any) => e.id === id)
    if (result) {
      // console.log('2차 카테고리')
      return false
    }
    // console.log('3차 카테고리')
    return true
  }

  function findParentAndGrandParent(id: number) {
    let parentName = ''
    let grandParentName = ''

    function findNames(arr: any, targetId: number) {
      for (const item of arr) {
        if (item.children) {
          for (const child of item.children) {
            if (child.id === targetId) {
              parentName = item.name
              grandParentName =
                categoryTreeStore.userCategoryList.find(
                  (parent: { children: any[] }) =>
                    parent.children &&
                    parent.children.some((grandChild) => grandChild.id === item.id)
                )?.name || ''
              return // 찾았으므로 종료
            }
          }
          // 재귀적으로 탐색
          findNames(item.children, targetId)
        }
      }
    }

    findNames(categoryTreeStore.userCategoryList, id)
    console.log('parent', parentName, 'grand', grandParentName)

    return { parentName, grandParentName }
  }

  async function getContentCountByCategory(categoryId: any) {
    try {
      const response = await getContents(categoryId)
      if (response.data.statusCode === 200) {
        const contentCount = response.data.contents.length
        console.log(contentCount, '콘텐츠 개수')
        // return contentCount
        contentCounts.value[categoryId] = contentCount
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    keyword,
    placeholderText,
    searchedCategoryCount,
    searchedContentCount,
    searchedCategory,
    searchedContent,
    searchEvent,
    getCategoryDepth3NameById,
    isCategoryDepth3,
    getCategoryDepth2NameById,
    findParentAndGrandParent,
    searchCategoryEvent,
    searchedCategory2,
    getContentCountByCategory
  }
})
