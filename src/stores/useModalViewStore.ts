import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalViewStore = defineStore('modalView', () => {
  const selectModal = ref(false)
  // 카테고리 모달
  const addCategoryModal = ref(false)
  // 카테고리 수정 모달
  const selectCategoryModal = ref(false)
  const alertOverlay = ref(false)
  const overlay = ref(false)
  const categoryLocationModal = ref(false)
  // 콘텐츠 모달
  const addContentModal = ref(false)
  const addContentDetailModal = ref(false)
  const alertModal = ref(false)
  const duplicatedCategoryLocation = ref('올리비아..')
  const editContentTitleModal = ref(false)
  // 카테고리 삭제/수정 모달
  const editCategoryModal = ref(false)
  const deleteCategoryModal = ref(false)
  const toastMessage = ref('')
  // 마이 페이지
  const logoutModal = ref(false)
  const withdrawalModal = ref(false)
  const settingAlertOverlay = ref(false)
  const addNewCategoryModal = ref(false)

  function openSelectModal() {
    console.log('openmodal', selectModal.value)
    selectModal.value = true
    overlay.value = true
  }
  function closeSelectModal() {
    selectModal.value = false
    addCategoryModal.value = false
    selectCategoryModal.value = false
    overlay.value = false
  }
  // step 1.2 - 카테고리
  function openAddCategoryModal() {
    selectModal.value = false
    addCategoryModal.value = true
    overlay.value = true
  }
  function closeAddCategoryModal() {
    addCategoryModal.value = false
    selectModal.value = true
  }
  // step 1.2.1
  function openSelectCategoryModal() {
    selectCategoryModal.value = true
  }
  function closeSelectCategoryModal() {
    selectCategoryModal.value = false
  }
  // step 1.2.2 - 생성 위치
  function openSetCategoryLocationModal() {
    categoryLocationModal.value = true
  }
  function closeSetCategoryLocationModal() {
    categoryLocationModal.value = false
  }
  // step 1.1 - 콘텐츠
  function openAddContentModal() {
    selectModal.value = false
    addContentModal.value = true
    overlay.value = true
  }
  function closeAddContentModal() {
    addContentModal.value = false
    selectModal.value = true
  }
  function openAddContentDetailModal() {
    addContentDetailModal.value = true
    overlay.value = true
  }
  function closeAddContentDetailModal() {
    addContentDetailModal.value = false
  }
  function returnAddContentModal() {
    addContentDetailModal.value = false
  }
  function openEditContentTitleModal() {
    editContentTitleModal.value = true
  }
  function closeEditContentTitleModal() {
    editContentTitleModal.value = false
  }
  function openAlertModal() {
    alertModal.value = true
    alertOverlay.value = true
  }
  function closeAlertModal() {
    alertModal.value = false
    alertOverlay.value = false
  }
  function setDuplicatedCategoryName(categoryName: string) {
    duplicatedCategoryLocation.value = categoryName
  }
  function openSetNewCategoryModal() {
    addNewCategoryModal.value = true
    categoryLocationModal.value = false
    addCategoryModal.value = false
    addContentDetailModal.value = false
    addContentModal.value = false
  }
  function closeSetNewCategoryModal() {
    addNewCategoryModal.value = false
    overlay.value = false
  }
  // 카테고리 삭제 모달
  function openDeleteCategoryModal() {
    deleteCategoryModal.value = true
    overlay.value = true
  }
  function closeDeleteCategoryModal() {
    deleteCategoryModal.value = false
    overlay.value = false
  }
  // 카테고리 수정 모달
  function openEditCategoryModal() {
    editCategoryModal.value = true
    overlay.value = true
  }
  function closeEditCategoryModal() {
    editCategoryModal.value = false
    overlay.value = false
  }
  // 토스트 메시지
  function setToastMessage(message: string) {
    toastMessage.value = message
  }
  // 로그아웃 모달
  function openLogoutModal() {
    logoutModal.value = true
    settingAlertOverlay.value = true
  }
  function closeLogoutModal() {
    logoutModal.value = false
    settingAlertOverlay.value = false
  }
  // 회원탈퇴 모달
  function openWithdrawalModal() {
    withdrawalModal.value = true
    settingAlertOverlay.value = true
  }
  function closeWithdrawalModal() {
    withdrawalModal.value = false
    settingAlertOverlay.value = false
  }

  return {
    selectModal,
    addCategoryModal,
    selectCategoryModal,
    alertOverlay,
    overlay,
    categoryLocationModal,
    addContentModal,
    addContentDetailModal,
    alertModal,
    duplicatedCategoryLocation,
    editCategoryModal,
    deleteCategoryModal,
    toastMessage,
    logoutModal,
    withdrawalModal,
    settingAlertOverlay,
    openSelectModal,
    closeSelectModal,
    openAddCategoryModal,
    openSelectCategoryModal,
    closeSelectCategoryModal,
    closeAddCategoryModal,
    openSetCategoryLocationModal,
    closeSetCategoryLocationModal,
    openAddContentModal,
    closeAddContentModal,
    openAddContentDetailModal,
    closeAddContentDetailModal,
    returnAddContentModal,
    openAlertModal,
    closeAlertModal,
    setDuplicatedCategoryName,
    openDeleteCategoryModal,
    closeDeleteCategoryModal,
    openEditCategoryModal,
    closeEditCategoryModal,
    setToastMessage,
    openLogoutModal,
    closeLogoutModal,
    openWithdrawalModal,
    closeWithdrawalModal,
    openEditContentTitleModal,
    editContentTitleModal,
    closeEditContentTitleModal,
    addNewCategoryModal,
    openSetNewCategoryModal,
    closeSetNewCategoryModal
  }
})
