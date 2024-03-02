import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalViewStore = defineStore('modalView', () => {
  // ******** 공통 모달 ********
  const selectModal = ref(false)
  const alertOverlay = ref(false)
  const overlay = ref(false)
  const toastMessage = ref('')
  const alertModal = ref(false)

  // ******** 카테고리 모달 ********
  const addCategoryModal = ref(false)
  // 카테고리 수정 모달
  const selectCategoryModal = ref(false)
  const categoryLocationModal = ref(false)
  // 카테고리 삭제/수정 모달
  const editCategoryModal = ref(false)
  const deleteCategoryModal = ref(false)
  const completeAddNewCategoryModal = ref(false)

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
  // step 1.2.2 - 현재 위치
  function openSetCategoryLocationModal() {
    categoryLocationModal.value = true
  }
  function closeSetCategoryLocationModal() {
    categoryLocationModal.value = false
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
    overlay.value = true
  }
  function openCompleteAddCategoryModal() {
    completeAddNewCategoryModal.value = true
  }
  function closeCompleteAddCategoryModal() {
    completeAddNewCategoryModal.value = false
    overlay.value = true
    categoryLocationModal.value = true
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
  // ********************************

  // ******** 콘텐츠 모달 ********
  const addContentModal = ref(false)
  const addContentDetailModal = ref(false)
  const addContentMultiple = ref(false)
  const duplicatedCategoryLocation = ref('올리비아..')
  const editContentTitleModal = ref(false)
  const deleteContentModal = ref(false)
  const shareContentModal = ref(false)
  const editContentModal = ref(false)
  const editContentDetailModal = ref(false)

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
  function openAddContentSingle() {
    addContentDetailModal.value = true
    overlay.value = true
  }
  function closeAddContentSingle() {
    addContentDetailModal.value = false
    closeAddContentModal()
    closeSelectModal()
  }
  function openAddContentMultiple() {
    addContentMultiple.value = true
    overlay.value = true
  }
  function closeAddContentMultiple() {
    addContentMultiple.value = false
    closeAddContentModal()
    closeSelectModal()
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
  function openDeleteContentModal() {
    deleteContentModal.value = true
    overlay.value = true
  }
  function closeDeleteContentModal() {
    deleteContentModal.value = false
    overlay.value = false
  }
  function openEditContentModal() {
    editContentModal.value = true
    overlay.value = true
  }
  function closeEditContentModal() {
    editContentModal.value = false
    overlay.value = false
  }
  function openEditContentDetailModal() {
    editContentDetailModal.value = true
    overlay.value = true
  }
  function closeEditContentDetailModal() {
    editContentDetailModal.value = false
    overlay.value = false
  }
  function openShareContentModal() {
    shareContentModal.value = true
    overlay.value = true
  }
  function closeShareContentModal() {
    shareContentModal.value = false
    overlay.value = false
  }
  // ********************************

  // ******** 마이 페이지 ********
  const logoutModal = ref(false)
  const withdrawalModal = ref(false)
  const settingAlertOverlay = ref(false)
  const addNewCategoryModal = ref(false)

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
  // ********************************

  function openSelectModal() {
    selectModal.value = true
    overlay.value = true
  }
  function closeSelectModal() {
    selectModal.value = false
    addCategoryModal.value = false
    selectCategoryModal.value = false
    overlay.value = false
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
  // 토스트 메시지
  function setToastMessage(message: string) {
    toastMessage.value = message
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
    openAddContentSingle,
    closeAddContentSingle,
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
    closeSetNewCategoryModal,
    openCompleteAddCategoryModal,
    closeCompleteAddCategoryModal,
    completeAddNewCategoryModal,
    deleteContentModal,
    openDeleteContentModal,
    closeDeleteContentModal,
    openShareContentModal,
    closeShareContentModal,
    shareContentModal,
    editContentModal,
    openEditContentModal,
    closeEditContentModal,
    editContentDetailModal,
    openEditContentDetailModal,
    closeEditContentDetailModal,
    openAddContentMultiple,
    closeAddContentMultiple,
    addContentMultiple
  }
})
