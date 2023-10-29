import { defineStore } from 'pinia'

// Or set it per toast

// `defineStore()`의 반환 값(함수)을 할당할 변수의 이름은 원하는 대로 지정할 수 있지만,
// 스토어 이름을 사용하고 `use`와 `Store`로 묶는 것이 가장 좋습니다.
// 예: `useUserStore`, `useCartStore`, `useProductStore`
// 첫 번째 인자는 앱 전체에서 스토어의 고유 ID입니다.

// 1. 옵션 스토어
// state는 스토어의 data,
// getters는 스토어의 computed 속성,
// actions은 methods로 생각할 수 있습니다.

export const useModalStore = defineStore('modal', {
  // 화살표 함수는 전체 유형 유추을 위해 권장됨.
  state: () => {
    return {
      selectModal: false,
      // 카테고리 모달
      addCategoryModal: false,
      // 카테고리 수정 모달
      selectCategoryModal: false,
      alertOverlay: false,
      overlay: false,
      categoryLocationModal: false,
      // 콘텐츠 모달
      addContentModal: false,
      addContentDetailModal: false,
      contentLocationModal: false,
      alertModal: false,
      duplicatedCategoryLocation: '올리비아..',
      // 카테고리 삭제/수정 모달
      editCategoryModal: false,
      deleteCategoryModal: false,
      toastMessage: ''
    }
  },
  getters: {},
  actions: {
    // step 1
    openSelectModal() {
      this.selectModal = true
      this.overlay = true
    },
    closeSelectModal() {
      this.selectModal = false
      this.addCategoryModal = false
      this.selectCategoryModal = false
      this.overlay = false
    },
    // step 1.2 - 카테고리
    openAddCategoryModal() {
      this.selectModal = false
      this.addCategoryModal = true
      this.overlay = true
    },
    closeAddCategoryModal() {
      this.addCategoryModal = false
      this.selectModal = true
    },
    // step 1.2.1
    openSelectCategoryModal() {
      this.selectCategoryModal = true
    },
    closeSelectCategoryModal() {
      this.selectCategoryModal = false
    },
    // step 1.2.2 - 생성 위치
    openSetCategoryLocationModal() {
      this.categoryLocationModal = true
    },
    closeSetCategoryLocationModal() {
      this.categoryLocationModal = false
    },
    // step 1.1 - 콘텐츠
    openAddContentModal() {
      this.selectModal = false
      this.addContentModal = true
      this.overlay = true
    },
    closeAddContentModal() {
      this.addContentModal = false
      this.selectModal = true
    },
    openAddContentDetailModal() {
      this.addContentDetailModal = true
      this.overlay = true
    },
    closeAddContentDetailModal() {
      this.addContentDetailModal = false
    },
    returnAddContentModal() {
      this.addContentDetailModal = false
    },
    openSetContentLocationModal() {
      this.addContentModal = false
      this.addContentDetailModal = false
      this.contentLocationModal = true
    },
    closeSetContentLocationModal() {
      this.contentLocationModal = false
    },
    openAlertModal() {
      this.alertModal = true
      this.alertOverlay = true
    },
    closeAlertModal() {
      this.alertModal = false
      this.alertOverlay = false
    },
    setDuplicatedCategoryName(categoryName: string) {
      this.duplicatedCategoryLocation = categoryName
    },
    // 카테고리 삭제 모달
    openDeleteCategoryModal() {
      this.deleteCategoryModal = true
      this.overlay = true
    },
    closeDeleteCategoryModal() {
      this.deleteCategoryModal = false
      this.overlay = false
    },
    // 카테고리 수정 모달
    openEditCategoryModal() {
      this.editCategoryModal = true
      this.overlay = true
    },
    closeEditCategoryModal() {
      this.editCategoryModal = false
      this.overlay = false
    },
    // 토스트 메시지
    setToastMessage(toastMessage: string) {
      this.toastMessage = toastMessage
    }
  }
})
