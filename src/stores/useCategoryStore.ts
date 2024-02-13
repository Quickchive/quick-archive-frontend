import { defineStore } from 'pinia'
import { deleteCategories } from '@/api/category.js'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { ref } from 'vue'
import { addCategories, updateCategories } from '@/api/category.js'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
import { getFavorites } from '@/api/contents.js'
import { useContentStore } from '@/stores/useContentStore.ts'

export const useCategoryStore = defineStore('category', () => {
  const modalViewStore = useModalViewStore()
  const modalDataStore = useModalDataStore()
  const alertDataStore = useAlertDataStore()
  const categoryTreeStore = useCategoryTreeStore()
  const contentStore = useContentStore()

  const curCategoryName = ref('전체 콘텐츠')
  const focusedCategoryId = ref(-1)
  const focusedCategoryData = ref({})

  // 상단 필터
  const isUnselectedChipOn = ref(false)
  const isFavoriteChipOn = ref(false)

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
  }

  async function setFavoriteContentChip(offBtn: Boolean) {
    // 캡슐 버튼
    if (offBtn) {
      isFavoriteChipOn.value = !isFavoriteChipOn.value
      if (isFavoriteChipOn.value) {
        try {
          const response = await getFavorites()
          console.log('favorite', response)
          if (response.data.statusCode === 200 || response.data.statusCode === 201) {
            contentStore.userFilteredContentList = response.data.favorite_contents
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    // navBar
    else {
      isFavoriteChipOn.value = true
      try {
        const response = await getFavorites()
        console.log('favorite', response)
        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          contentStore.userFilteredContentList = response.data.favorite_contents
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return {
    curCategoryName,
    focusedCategoryId,
    focusedCategoryData,
    deleteCategory,
    setCategoryName,
    setFocusedCategory,
    setFocusedCategoryData,
    addCategory,
    editCategory,
    isFavoriteChipOn,
    isUnselectedChipOn,
    setUnselectedContentChip,
    setFavoriteContentChip
  }
})
