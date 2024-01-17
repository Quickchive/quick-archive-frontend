import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

export const useAlertDataStore = defineStore('alertData', () => {
  const userStore = useUserStore()
  const modalViewStore = useModalViewStore()
  const categoryStore = useCategoryStore()

  // settingView: 로그아웃 얼럿 데이터
  const logoutAlertData = reactive({
    message: '정말 로그아웃 하시겠어요?',
    checkbox: false,
    leftButtonMessage: '닫기',
    rightButtonMessage: '확인',
    leftButtonEvent: () => {
      modalViewStore.closeLogoutModal()
    },
    rightButtonEvent: () => {
      userStore.logout()
    }
  })

  // settingView: 회원탈퇴 얼럿 데이터
  const withdrawalAlertData = reactive({
    message: `퀵카이브 탈퇴 시, 
모든 콘텐츠가 삭제되며 복구되지 않습니다.
그래도 퀵카이브를 탈퇴하시겠어요?`,
    checkbox: false,
    leftButtonMessage: '탈퇴',
    rightButtonMessage: '닫기',
    leftButtonEvent: () => {
      userStore.withdrawal()
    },
    rightButtonEvent: () => {
      modalViewStore.closeWithdrawalModal()
    }
  })

  // ModalView: 카테고리 삭제 얼럿 데이터
  const deleteCategoryAlertData = reactive({
    message: '카테고리를 삭제할까요?',
    checkbox: true,
    checkboxEvent: () => {
      categoryStore.deleteContentsInCategory()
    },
    leftButtonMessage: '닫기',
    rightButtonMessage: '삭제',
    leftButtonEvent: () => {
      modalViewStore.closeDeleteCategoryModal()
    },
    rightButtonEvent: () => {
      categoryStore.deleteCategory()
    }
  })

  return {
    logoutAlertData,
    withdrawalAlertData,
    deleteCategoryAlertData
  }
})
