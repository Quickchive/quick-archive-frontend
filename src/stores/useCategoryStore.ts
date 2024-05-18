import { defineStore } from 'pinia'
import { deleteCategories } from '@/api/category.js'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { ref } from 'vue'
import { addCategories, updateCategories } from '@/api/category.js'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useToastStore } from '@/stores/useToastStore.ts'

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
  const toastStore = useToastStore()

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
      console.log('deleteCategory', response)
      await categoryTreeStore.updateUserCategoryList()
      modalViewStore.hideModalWithOverlay('deleteCategory', 'default')
      const toastData = {
        message: '카테고리가 삭제되었습니다.',
        func: {
          message: '취소하기'
        }
      }
      toastStore.executeDefaultToast(toastData)
    } catch (error: any) {
      toastStore.executeErrorToast(error.response.data.message)
    }
  }

  async function addCategory(categoryData: any) {
    // 카테고리 추가
    try {
      const response = await addCategories(categoryData)
      console.log(response)
      const toastData = {
        message: '카테고리가 추가되었습니다.',
        func: {
          message: '보러가기'
        }
      }
      toastStore.executeDefaultToast(toastData)
      modalViewStore.closeAddCategoryModal()
      modalViewStore.closeSelectModal()
      await categoryTreeStore.updateUserCategoryList()
    } catch (error: any) {
      if (error.response.data.statusCode === 409) {
        if (error.response.data.message === 'Category already exists') {
          modalViewStore.setDuplicatedCategoryName(modalDataStore.selectedLocation.name)

          const alertData = {
            title: '알림',
            content: `동일한 이름의 카테고리가 ${modalViewStore.duplicatedCategoryLocation}내에 있어요.\n카테고리 이름을 변경해주세요.`
          }

          alertDataStore.setDefaultAlertData(alertData)
          modalViewStore.showModalWithOverlay('alert', 'alert')
        }
        if (error.response.data.message === "Root categories can't be more than 10 in one user") {
          const alertData = {
            title: '알림',
            content: `무료 버전에서는 메인 카테고리를
          10개까지만 만들 수 있어요. 
          단, 서브 카테고리는 개수 제한 없이 만들 수 있어요.`
          }
          modalViewStore.setDuplicatedCategoryName(modalDataStore.selectedLocation.name)

          alertDataStore.setDefaultAlertData(alertData)
          modalViewStore.showModalWithOverlay('alert', 'alert')
        }
      } else {
        toastStore.executeErrorToast(error.response.data.message)
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
        toastStore.executeErrorToast(error.response.data.message)
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
        contentStore.contentList = filterByFavoriteAndCategoryIsNull(contentStore.allContentList)
      }
      // && 즐겨찾기 off
      else {
        contentStore.contentList = filterByCategoryIsNull(contentStore.allContentList)
      }
    }
    // 카테고리 미지정 off
    else {
      // && 즐겨찾기 on
      if (isFavoriteChipOn.value === true) {
        contentStore.contentList = filterByFavorite(contentStore.allContentList)
      }
      // && 즐겨찾기 off
      else {
        contentStore.contentList = contentStore.allContentList
      }
    }
  }

  function resetContentChip() {
    contentStore.contentList = contentStore.allContentList
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
        contentStore.contentList = filterByFavoriteAndCategoryIsNull(contentStore.allContentList)
      }
      // && 즐겨찾기 off
      else {
        contentStore.contentList = filterByCategoryIsNull(contentStore.allContentList)
      }
    }
    // 카테고리 미지정 off
    else {
      // && 즐겨찾기 on
      if (isFavoriteChipOn.value === true) {
        contentStore.contentList = filterByFavorite(contentStore.allContentList)
      }
      // && 즐겨찾기 off
      else {
        contentStore.contentList = contentStore.allContentList
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
