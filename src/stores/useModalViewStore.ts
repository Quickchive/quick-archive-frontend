import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { Modal, Overlay } from '@/utils/interface'

export const useModalViewStore = defineStore('modalView', () => {
  const duplicatedCategoryLocation = ref('올리비아..')

  const overlay: Overlay = reactive({
    default: ref(false),
    alert: ref(false),
    settingAlert: ref(false)
  })

  const modal: Modal = reactive({
    addContent: ref(false),
    addContentDetail: ref(false),
    addContentMultiple: ref(false),
    deleteContent: ref(false),
    editContent: ref(false),
    editContentDetail: ref(false),
    select: ref(false),
    selectCategory: ref(false),
    categoryLocation: ref(false),
    contentLocation: ref(false),
    editContentTitle: ref(false),
    completeAddNewCategory: ref(false),
    logout: ref(false),
    withdrawal: ref(false),
    alert: ref(false),
    addCategory: ref(false),
    editCategory: ref(false),
    addNewCategory: ref(false),
    deleteCategory: ref(false),
    loader: ref(false)
  })

  // 카테고리 위치 선택 모달이 콘텐츠/카테고리에서 열렸는지 여부
  const setCategoryLocation = ref('category')

  function showModalWithOverlay(modalName: keyof Modal, overlayName: keyof Overlay) {
    if (modal[modalName] !== undefined) {
      modal[modalName] = true
      overlay[overlayName] = true
    }
  }

  function hideModalWithOverlay(modalName: keyof Modal, overlayName: keyof Overlay) {
    if (modal[modalName] !== undefined) {
      modal[modalName] = false
      overlay[overlayName] = false
    }
  }

  function showModal(modalName: keyof Modal) {
    if (modal[modalName] !== undefined) {
      modal[modalName] = true
    }
  }

  function hideModal(modalName: keyof Modal) {
    if (modal[modalName] !== undefined) {
      modal[modalName] = false
    }
  }

  function openAddCategoryModal() {
    setCategoryLocation.value = 'category'
    modal.select = false
    modal.addCategory = true
    overlay.default = true
  }

  function closeAddCategoryModal() {
    modal.addCategory = false
    modal.select = true
  }

  function openSetNewCategoryModal() {
    modal.addNewCategory = true
    modal.categoryLocation = false
    modal.contentLocation = false
    modal.addContentMultiple = false
    modal.addCategory = false
    modal.addContentDetail = false
    modal.addContent = false
    modal.editCategory = false
    modal.editContent = false
    modal.editContentDetail = false
  }

  function closeSetNewCategoryModal() {
    modal.addNewCategory = false
    // modal.categoryLocation = true
  }

  function closeCompleteAddCategoryModal() {
    console.log('@@@@@@@@')
    resetAllModal()
    overlay.alert = false
    modal.contentLocation = true
    modal.completeAddNewCategory = false
  }

  function openAddContentModal() {
    setCategoryLocation.value = 'content'
    modal.select = false
    modal.addContent = true
    overlay.default = true
  }

  function closeAddContentModal() {
    modal.addContent = false
    modal.select = true
  }

  function openEditContentModal() {
    modal.select = false
    modal.editContent = true
    overlay.default = true
  }

  function closeEditContentModal() {
    modal.editContent = false
    modal.select = true
  }

  function closeAddContentSingle() {
    modal.addContentDetail = false
    closeAddContentModal()
    closeSelectModal()
  }

  function closeAddContentMultiple() {
    modal.addContentMultiple = false
    closeAddContentModal()
    closeSelectModal()
  }

  function closeSelectModal() {
    modal.select = false
    modal.addCategory = false
    modal.selectCategory = false
    overlay.default = false
  }

  function openDeleteContentModal() {
    resetAllModal()
    modal.deleteContent = true
    overlay.default = true
  }

  function openDeleteCategoryModal() {
    resetAllModal()
    modal.deleteCategory = true
    overlay.default = true
  }

  function setDuplicatedCategoryName(categoryName: string) {
    duplicatedCategoryLocation.value = categoryName
  }

  function resetAll() {
    Object.keys(modal).forEach((key) => {
      modal[key as keyof Modal] = false
    })

    Object.keys(overlay).forEach((key) => {
      overlay[key as keyof Overlay] = false
    })
  }

  function resetAllModal() {
    console.log('@@@@@@@@')
    Object.keys(modal).forEach((key) => {
      modal[key as keyof Modal] = false
    })
  }

  return {
    overlay,
    modal,
    duplicatedCategoryLocation,
    closeSelectModal,
    openAddCategoryModal,
    closeAddCategoryModal,
    openAddContentModal,
    closeAddContentModal,
    closeAddContentSingle,
    setDuplicatedCategoryName,
    openSetNewCategoryModal,
    closeSetNewCategoryModal,
    closeCompleteAddCategoryModal,
    closeAddContentMultiple,
    // showToast,
    // toastModal,
    // showErrorToast,
    // toastErrorModal,
    openEditContentModal,
    closeEditContentModal,
    showModalWithOverlay,
    hideModalWithOverlay,
    showModal,
    hideModal,
    resetAll,
    resetAllModal,
    setCategoryLocation,
    openDeleteContentModal,
    openDeleteCategoryModal
  }
})
