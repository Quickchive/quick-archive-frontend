import { defineStore } from 'pinia'
import { deleteCategories } from '@/api/category.js'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { ref } from 'vue'
import { addCategories, updateCategories } from '@/api/category.js'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import {
  filterByCategoryIsNull,
  filterByFavoriteAndCategoryIsNull,
  filterByFavorite
} from '@/utils/filter.js'

export const useCategoryStore = defineStore('category', () => {
  const modalViewStore = useModalViewStore()
  const modalDataStore = useModalDataStore()
  const alertDataStore = useAlertDataStore()
  const categoryTreeStore = useCategoryTreeStore()
  const contentStore = useContentStore()

  const curCategoryName = ref('전체 콘텐츠')
  const focusedCategoryData: any = ref({
    children: [],
    createdAt: '',
    iconName: '',
    id: -1,
    name: '',
    parentId: null,
    slug: '',
    updatedAt: '',
    userId: -1
  })

  // 상단 필터
  const isUnselectedChipOn = ref(false)
  const isFavoriteChipOn = ref(false)

  function setCategoryName(categoryName: string) {
    curCategoryName.value = categoryName
  }

  function setFocusedCategoryData(categoryData: any) {
    focusedCategoryData.value.children = categoryData.children
    focusedCategoryData.value.iconName = categoryData.iconName
    focusedCategoryData.value.name = categoryData.name
    focusedCategoryData.value.parentId = categoryData.parentId
    focusedCategoryData.value.id = categoryData.id
  }

  async function deleteCategory() {
    try {
      const focusedCategory_id = focusedCategoryData.value.id
      const response = await deleteCategories(focusedCategory_id, alertDataStore.checkboxChecked)
      if (response.data.statusCode === (200 || 201)) {
        await categoryTreeStore.updateUserCategoryList()
        modalViewStore.hideModalWithOverlay('deleteCategory', 'default')
        // 토스트
        const toastData = {
          message: '카테고리가 삭제되었습니다.',
          func: {
            message: '취소하기'
          }
        }
        modalDataStore.setToastMessage(toastData)
        modalViewStore.showToast()
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

  async function addCategory(categoryData: any) {
    // 카테고리 추가
    try {
      // 대카테고리가 10개 이상인지 체크
      console.log('len', categoryTreeStore.userCategoryList.length)
      if (
        categoryTreeStore.userCategoryList.length >= 10 &&
        !categoryData.categoryId === undefined
      ) {
        console.log(categoryData.categoryId)

        const alertData = {
          title: '알림',
          content: `무료 버전에서는 메인 카테고리를
          10개까지만 만들 수 있어요. 
          단, 서브 카테고리는 개수 제한 없이 만들 수 있어요.`
        }
        alertDataStore.setDefaultAlertData(alertData)
        modalViewStore.showModalWithOverlay('alert', 'alert')
      } else {
        const response = await addCategories(categoryData)
        // 상태코드로 에러 처리 하기
        if (response.data.statusCode === 201) {
          // 토스트
          const toastData = {
            message: '카테고리가 추가되었습니다.',
            func: {
              message: '보러가기'
            }
          }
          modalDataStore.setToastMessage(toastData)
          modalViewStore.showToast()
          modalViewStore.closeAddCategoryModal()
          modalViewStore.closeSelectModal()
          await categoryTreeStore.updateUserCategoryList()
        }
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 409) {
        modalViewStore.setDuplicatedCategoryName(modalDataStore.selectedLocation.name)
        const alertData = {
          title: '알림',
          content: `동일한 이름의 카테고리가
          ${modalViewStore.duplicatedCategoryLocation}내에 있어요.
          카테고리 이름을 변경해주세요.`
        }
        alertDataStore.setDefaultAlertData(alertData)
        modalViewStore.showModalWithOverlay('alert', 'alert')
      } else {
        // 토스트
        const toastData = {
          message: error.response.data.message
        }
        modalDataStore.setToastMessage(toastData)
        modalViewStore.showErrorToast()
      }
    }
  }

  async function editCategory(categoryData: any) {
    console.log(categoryData)
    try {
      const response = await updateCategories(categoryData)
      if (response.data.statusCode === 200) {
        modalViewStore.hideModalWithOverlay('editCategory', 'default')
        await categoryTreeStore.updateUserCategoryList()
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 409) {
        modalViewStore.setDuplicatedCategoryName(modalDataStore.selectedLocation.name)
        const alertData = {
          title: '알림',
          content: `동일한 이름의 카테고리가 
          ${modalViewStore.duplicatedCategoryLocation}내에 있어요.
          카테고리 이름을 변경해주세요.`
        }
        alertDataStore.setDefaultAlertData(alertData)
        modalViewStore.showModalWithOverlay('alert', 'alert')
      } else {
        // 토스트
        const toastData = {
          message: error.response.data.message
        }
        modalDataStore.setToastMessage(toastData)
        modalViewStore.showErrorToast()
      }
    }
  }

  function setUnselectedContentChip(offBtn: Boolean) {
    if (offBtn) {
      isUnselectedChipOn.value = !isUnselectedChipOn.value
    } else {
      isFavoriteChipOn.value = false
      isUnselectedChipOn.value = true
    }

    // 카테고리 미지정 on
    if (isUnselectedChipOn.value === true) {
      // && 즐겨찾기 on
      if (isFavoriteChipOn.value === true) {
        contentStore.userFilteredContentList = filterByFavoriteAndCategoryIsNull(
          contentStore.userContentList
        )
      }
      // && 즐겨찾기 off
      else {
        contentStore.userFilteredContentList = filterByCategoryIsNull(contentStore.userContentList)
      }
    }
    // 카테고리 미지정 off
    else {
      // && 즐겨찾기 on
      if (isFavoriteChipOn.value === true) {
        contentStore.userFilteredContentList = filterByFavorite(contentStore.userContentList)
      }
      // && 즐겨찾기 off
      else {
        contentStore.userFilteredContentList = contentStore.userContentList
      }
    }
  }

  function resetContentChip() {
    contentStore.userFilteredContentList = contentStore.userContentList
    isFavoriteChipOn.value = false
    isUnselectedChipOn.value = false
  }

  function setFavoriteContentChip(offBtn: Boolean) {
    // 캡슐 버튼
    if (offBtn) {
      isFavoriteChipOn.value = !isFavoriteChipOn.value
    }
    // navBar
    else {
      isFavoriteChipOn.value = true
      isUnselectedChipOn.value = false
    }

    // 카테고리 미지정 on
    if (isUnselectedChipOn.value === true) {
      // && 즐겨찾기 on
      if (isFavoriteChipOn.value === true) {
        contentStore.userFilteredContentList = filterByFavoriteAndCategoryIsNull(
          contentStore.userContentList
        )
      }
      // && 즐겨찾기 off
      else {
        contentStore.userFilteredContentList = filterByCategoryIsNull(contentStore.userContentList)
      }
    }
    // 카테고리 미지정 off
    else {
      // && 즐겨찾기 on
      if (isFavoriteChipOn.value === true) {
        contentStore.userFilteredContentList = filterByFavorite(contentStore.userContentList)
      }
      // && 즐겨찾기 off
      else {
        contentStore.userFilteredContentList = contentStore.userContentList
      }
    }
  }

  return {
    curCategoryName,
    focusedCategoryData,
    deleteCategory,
    setCategoryName,
    setFocusedCategoryData,
    addCategory,
    editCategory,
    isFavoriteChipOn,
    isUnselectedChipOn,
    setUnselectedContentChip,
    setFavoriteContentChip,
    resetContentChip
  }
})
