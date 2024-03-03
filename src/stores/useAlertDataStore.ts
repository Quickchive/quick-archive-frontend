import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { addCategories } from '@/api/category.js'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'

export const useAlertDataStore = defineStore('alertData', () => {
  const userStore = useUserStore()
  const modalViewStore = useModalViewStore()
  const categoryStore = useCategoryStore()
  const categoryTreeStore = useCategoryTreeStore()
  const modalDataStore = useModalDataStore()
  const contentStore = useContentStore()
  const checkboxChecked = ref(false)

  const defaultAlertData = reactive({
    title: '',
    content: ''
  })

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
    checkboxMessage: '카테고리 내 콘텐츠도 함께 삭제하기',
    leftButtonMessage: '닫기',
    rightButtonMessage: '삭제',
    leftButtonEvent: () => {
      modalViewStore.closeDeleteCategoryModal()
    },
    rightButtonEvent: () => {
      categoryStore.deleteCategory()
    }
  })

  // ModalView: 새 카테고리 추가 얼럿
  const newCategoryName = ref('')

  const addNewCategoryAlertData = reactive({
    title: '새 카테고리',
    message: '새 카테고리 이름을 입력해 주세요.\n생성 위치는 카테고리 수정 시 변경할 수 있어요.',
    placeholder: '이름을 입력해주세요(2~15글자)',
    input: true,
    leftButtonMessage: '닫기',
    rightButtonMessage: '저장',
    leftButtonEvent: () => {
      modalViewStore.closeSetNewCategoryModal()
      modalViewStore.openSetCategoryLocationModal()
    },
    rightButtonEvent: async () => {
      // 카테고리 생성
      const categoryData = {
        categoryName: newCategoryName.value,
        iconName: 'Book'
      }
      // 카테고리 추가
      try {
        const response = await addCategories(categoryData)
        // 상태코드로 에러 처리 하기
        if (response.data.statusCode === 201) {
          modalViewStore.closeSetNewCategoryModal()
          modalViewStore.openCompleteAddCategoryModal()
          await categoryTreeStore.updateUserCategoryList()
        }
      } catch (error: any) {
        if (error.response.data.statusCode === 409) {
          modalViewStore.setDuplicatedCategoryName(modalDataStore.selectedLocation.name)
          modalViewStore.openAlertModal()
        }
      }
    }
  })

  const completeAddCategoryAlertData = reactive({
    title: '카테고리 생성 완료',
    message: '방금 생성한 카테고리에\n 콘텐츠를 저장할까요?',
    placeholder: '이름을 입력해주세요(2~15글자)',
    input: false,
    leftButtonMessage: '닫기',
    rightButtonMessage: '저장',
    leftButtonEvent: () => {
      modalViewStore.closeCompleteAddCategoryModal()
    },
    rightButtonEvent: async () => {
      // 콘텐츠 추가
      try {
        modalDataStore.selectCategoryLocation(newCategoryName.value)
        const response: any = await contentStore.addContent()
        // 상태코드로 에러 처리 하기
        if (response.data.statusCode === 201) {
          modalViewStore.closeSelectModal()
        }
        modalViewStore.closeCompleteAddCategoryModal()
      } catch (error: any) {
        console.log(error)
      }
    }
  })

  // ModalView: 콘텐츠 삭제 얼럿 데이터
  const deleteContentAlertData = reactive({
    message: '콘텐츠를 삭제할까요?',
    checkbox: true,
    checkboxMessage: '알림 다시 보지 않기',
    leftButtonMessage: '닫기',
    rightButtonMessage: '삭제',
    leftButtonEvent: () => {
      modalViewStore.closeDeleteContentModal()
    },
    rightButtonEvent: () => {
      contentStore.deleteContent()
    }
  })

  // ModalView: 얼럿 체크박스 온오프
  const toggleCheckbox = () => {
    checkboxChecked.value = !checkboxChecked.value
  }

  // 기본 얼럿 데이터 세팅
  const setDefaultAlertData = (data: any) => {
    defaultAlertData.title = data.title
    defaultAlertData.content = data.content
  }

  return {
    logoutAlertData,
    withdrawalAlertData,
    deleteCategoryAlertData,
    addNewCategoryAlertData,
    newCategoryName,
    completeAddCategoryAlertData,
    deleteContentAlertData,
    checkboxChecked,
    toggleCheckbox,
    defaultAlertData,
    setDefaultAlertData
  }
})
