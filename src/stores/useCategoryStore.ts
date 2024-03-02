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
        modalViewStore.closeDeleteCategoryModal()
      }
    } catch (error) {
      console.log(error)
    }
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
