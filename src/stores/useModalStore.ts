import { defineStore } from 'pinia'

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
      addCategoryModal: false,
      selectCategoryModal: false,
      overlay: false,
      categoryLocationModal: false
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
    // step 2 - 카테고리
    openAddCategoryModal() {
      this.selectModal = false
      this.addCategoryModal = true
      this.overlay = true
    },
    closeAddCategoryModal() {
      this.addCategoryModal = false
      this.selectModal = true
      // this.overlay = true
    },
    // step 2-1
    openSelectCategoryModal() {
      this.selectCategoryModal = true
    },
    closeSelectCategoryModal() {
      this.selectCategoryModal = false
    },
    // 생성 위치
    openSetCategoryLocationModal() {
      this.categoryLocationModal = true
    },
    closeSetCategoryLocationModal() {
      this.categoryLocationModal = false
    }
  }
})
