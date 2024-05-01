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
    shareContent: ref(false),
    deleteContent: ref(false),
    editContent: ref(false),
    editContentDetail: ref(false),
    select: ref(false),
    selectCategory: ref(false),
    categoryLocation: ref(false),
    editContentTitle: ref(false),
    completeAddNewCategory: ref(false),
    logout: ref(false),
    withdrawal: ref(false),
    alert: ref(false),
    addCategory: ref(false),
    editCategory: ref(false),
    addNewCategory: ref(false),
    deleteCategory: ref(false)
  })

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
    modal.addCategory = false
    modal.addContentDetail = false
    modal.addContent = false
  }

  function closeSetNewCategoryModal() {
    modal.addNewCategory = false
    overlay.default = true
  }

  function closeCompleteAddCategoryModal() {
    modal.completeAddNewCategory = false
    overlay.default = true
    modal.categoryLocation = true
  }

  function openAddContentModal() {
    modal.select = false
    modal.addContent = true
    overlay.default = true
  }

  function closeAddContentModal() {
    modal.addContent = false
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
  function setDuplicatedCategoryName(categoryName: string) {
    duplicatedCategoryLocation.value = categoryName
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
    showModalWithOverlay,
    hideModalWithOverlay,
    showModal,
    hideModal
  }
})
