import { defineStore } from 'pinia'
import { getCategories } from '@/api/category'
import { deleteCategories } from '@/api/category.js'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { ref } from 'vue'
import { addCategories, updateCategories } from '@/api/category.js'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'

export const useCategoryStore = defineStore('category', () => {
  const modalViewStore = useModalViewStore()
  const modalDataStore = useModalDataStore()
  const categoryTreeStore = useCategoryTreeStore()

  const userCategoryList = ref([
    {
      id: 0,
      createdAt: '2023-09-20T14:43:26.954Z',
      updatedAt: '2023-09-20T14:43:26.954Z',
      name: '쇼핑',
      slug: '쇼핑',
      parentId: null,
      userId: 7,
      iconName: 'Cake'
    },
    {
      id: 1,
      createdAt: '2023-09-20T23:36:28.027Z',
      updatedAt: '2023-09-20T23:36:28.027Z',
      name: '꿀팁',
      slug: '꿀팁',
      parentId: null,
      userId: 7,
      iconName: 'Watch'
    },
    {
      id: 2,
      createdAt: '2023-09-20T23:36:35.059Z',
      updatedAt: '2023-09-20T23:36:35.059Z',
      name: '맛집',
      slug: '맛집',
      parentId: null,
      userId: 7,
      iconName: 'Watch',
      children: [
        {
          id: 3,
          createdAt: '2023-09-20T23:39:41.268Z',
          updatedAt: '2023-09-20T23:39:41.268Z',
          name: '서울 맛집',
          slug: '서울-맛집',
          parentId: 2,
          userId: 7
        }
      ]
    },
    {
      id: 4,
      createdAt: '2023-09-20T23:36:38.288Z',
      updatedAt: '2023-09-20T23:36:38.288Z',
      name: '문서',
      slug: '문서',
      iconName: 'Watch',
      parentId: null,
      userId: 7
    },
    {
      id: 5,
      createdAt: '2023-09-20T23:37:17.774Z',
      updatedAt: '2023-09-20T23:37:17.774Z',
      name: '여행',
      slug: '여행',
      parentId: null,
      userId: 7,
      children: [
        {
          id: 6,
          createdAt: '2023-09-20T23:38:52.899Z',
          updatedAt: '2023-09-20T23:38:52.899Z',
          name: '국내 여행',
          slug: '국내-여행',
          parentId: 5,
          userId: 7,
          children: [
            {
              id: 7,
              createdAt: '2023-09-20T23:39:21.779Z',
              updatedAt: '2023-09-20T23:39:21.779Z',
              name: '부산',
              slug: '부산',
              parentId: 6,
              userId: 7
            }
          ]
        },
        {
          id: 8,
          createdAt: '2023-09-20T23:39:01.686Z',
          updatedAt: '2023-09-20T23:39:01.686Z',
          name: '해외 여행',
          slug: '해외-여행',
          parentId: 5,
          userId: 7,
          children: [
            {
              id: 9,
              createdAt: '2023-09-20T23:39:21.779Z',
              updatedAt: '2023-09-20T23:39:21.779Z',
              name: '파리',
              slug: '파리',
              parentId: 8,
              userId: 7
            },
            {
              id: 10,
              createdAt: '2023-09-20T23:39:21.779Z',
              updatedAt: '2023-09-20T23:39:21.779Z',
              name: '프랑스',
              slug: '프랑스',
              parentId: 8,
              userId: 7
            }
          ]
        }
      ]
    },
    {
      id: 11,
      createdAt: '2023-09-20T23:37:23.377Z',
      updatedAt: '2023-09-20T23:37:23.377Z',
      name: '게임',
      slug: '게임',
      parentId: null,
      userId: 7
    }
  ])
  const curCategoryName = ref('전체 콘텐츠')
  const focusedCategoryId = ref(-1)
  const focusedCategoryData = ref({})
  const deleteContentsChecked = ref(false)

  // 자식 카테고리 정보로 부모 카테고리 이름을 얻는다
  // 찾은 부모의 parentId !== null이라면
  // 부모의 부모의 이름까지 찾는다.

  function getCategoryDepth2NameById(parentId: number) {
    const categoryName = userCategoryList.value.find((e) => e.id === parentId)
    if (categoryName) {
      return categoryName.name
    }
    return 0
  }

  function getCategoryDepth3NameById(parentId: number) {
    const grandParentName = getCategoryDepth2NameById(parentId)

    const categoryName = userCategoryList.value.find((e) => e.name === grandParentName)
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
    const result = userCategoryList.value.find((e) => e.id === id)
    if (result) {
      // console.log('2차 카테고리')
      return false
    }
    // console.log('3차 카테고리')
    return true
  }

  async function getUserCategoryList() {
    try {
      const response = await getCategories()
      // console.log('store', response.data.categoriesTree)
      if (response.data.statusCode == 200) {
        userCategoryList.value = response.data.categoriesTree
      }
    } catch (error) {
      console.log(error)
    }
  }
  function setCategoryName(categoryName: string) {
    curCategoryName.value = categoryName
  }

  function setFocusedCategory(categoryId: number) {
    focusedCategoryId.value = categoryId
  }

  function setFocusedCategoryData(categoryData: object) {
    focusedCategoryData.value = categoryData
  }

  async function deleteCategory() {
    try {
      const focusedCategory_id = focusedCategoryId.value
      const response = await deleteCategories(focusedCategory_id, deleteContentsChecked.value)
      if (response.data.statusCode === (200 || 201)) {
        await categoryTreeStore.updateUserCategoryList()
        modalViewStore.closeDeleteCategoryModal()
      }
    } catch (error) {
      console.log(error)
    }
  }
  function deleteContentsInCategory() {
    deleteContentsChecked.value = !deleteContentsChecked.value
  }
  async function addCategory(categoryData: any) {
    // 카테고리 추가
    try {
      const response = await addCategories(categoryData)
      // 상태코드로 에러 처리 하기
      if (response.data.statusCode === 201) {
        modalViewStore.closeAddCategoryModal()
        modalViewStore.closeSelectModal()
        await categoryTreeStore.updateUserCategoryList()
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 409) {
        modalViewStore.setDuplicatedCategoryName(modalDataStore.selectedLocation.name)
        modalViewStore.openAlertModal()
      }
    }
  }

  async function editCategory(categoryData: any) {
    console.log(categoryData)
    try {
      const response = await updateCategories(categoryData)
      if (response.data.statusCode === 200) {
        modalViewStore.closeEditCategoryModal()
        // modalViewStore.closeSelectModal()
        await categoryTreeStore.updateUserCategoryList()
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 409) {
        modalViewStore.setDuplicatedCategoryName(modalDataStore.selectedLocation.name)
        modalViewStore.openAlertModal()
      }
    }
  }

  return {
    userCategoryList,
    curCategoryName,
    focusedCategoryId,
    focusedCategoryData,
    deleteContentsChecked,
    getUserCategoryList,
    deleteContentsInCategory,
    deleteCategory,
    setCategoryName,
    setFocusedCategory,
    setFocusedCategoryData,
    getCategoryDepth3NameById,
    isCategoryDepth3,
    getCategoryDepth2NameById,
    addCategory,
    editCategory
  }
})
