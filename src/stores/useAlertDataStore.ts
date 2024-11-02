import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { addCategories } from '@/api/category.js'
import { addContents } from '@/api/contents'
import { useContentStore } from '@/stores/useContentStore.ts'
import { searchCategoryDataByName } from '@/utils/search.js'
import { useToastStore } from '@/stores/useToastStore.ts'
import { deleteNullContentProp } from '@/utils/util.js'
import { useRouter } from 'vue-router'

export const useAlertDataStore = defineStore('alertData', () => {
  const userStore = useUserStore()
  const modalViewStore = useModalViewStore()
  const categoryStore = useCategoryStore()
  const contentStore = useContentStore()
  const checkboxChecked = ref(false)
  const toastStore = useToastStore()
  const router = useRouter()

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
      modalViewStore.hideModalWithOverlay('logout', 'settingAlert')
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
      modalViewStore.resetAll()
      modalViewStore.hideModalWithOverlay('withdrawal', 'settingAlert')
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
      modalViewStore.resetAll()
    },
    rightButtonEvent: () => {
      categoryStore.deleteCategory()
      modalViewStore.resetAll()
    }
  })

  // ModalView: 새 카테고리 추가 얼럿
  const newCategoryName = ref('')

  const addNewCategoryAlertData = reactive({
    title: '새 카테고리',
    message: '새 카테고리 이름을 입력해 주세요.\n현재 위치는 카테고리 수정 시 변경할 수 있어요.',
    placeholder: '이름을 입력해주세요(2~15글자)',
    input: true,
    leftButtonMessage: '닫기',
    rightButtonMessage: '저장',
    leftButtonEvent: () => {
      modalViewStore.resetAllModal()
      if (modalViewStore.setCategoryLocation === 'category') {
        modalViewStore.showModal('categoryLocation')
      } else {
        modalViewStore.showModal('contentLocation')
      }
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
        console.log(response)
        const toastData = {
          message: '카테고리가 추가되었습니다.'
          // func: {
          //   message: '보러가기',
          // }
        }
        toastStore.executeDefaultToast(toastData)
        modalViewStore.resetAllModal()
        modalViewStore.showModal('completeAddNewCategory')
        await categoryStore.getUserCategoryList()
        categoryStore.resetParentCategory()
      } catch (error: any) {
        if (error.response.data.statusCode === 409) {
          if (error.response.data.message === 'Category already exists') {
            modalViewStore.setDuplicatedCategoryName(categoryStore.parentCategory.value.name)
            const alertData = {
              title: '알림',
              content: [
                '동일한 이름의 카테고리가',
                `${modalViewStore.duplicatedCategoryLocation}내에 있어요.`,
                '카테고리 이름을 변경해주세요.'
              ]
            }
            setDefaultAlertData(alertData)
            modalViewStore.showModalWithOverlay('alert', 'alert')
          }
          if (error.response.data.message === "Root categories can't be more than 10 in one user") {
            const alertData = {
              title: '알림',
              content: [
                '무료 버전에서는 메인 카테고리를',
                '10개까지만 만들 수 있어요.',
                '단, 서브 카테고리는 개수 제한 없이 만들 수 있어요.'
              ]
            }

            setDefaultAlertData(alertData)
            modalViewStore.showModalWithOverlay('alert', 'alert')
          }
        } else {
          toastStore.executeErrorToast(error.message)
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
      modalViewStore.resetAllModal()
      if (modalViewStore.setCategoryLocation === 'category') {
        modalViewStore.showModal('categoryLocation')
      } else {
        modalViewStore.showModal('contentLocation')
      }
    },
    rightButtonEvent: async () => {
      // 콘텐츠 추가
      try {
        const newCategoryInfo = searchCategoryDataByName(
          categoryStore.categoryList,
          newCategoryName.value
        )

        contentStore.setContentCategory(newCategoryInfo)
        const contentData = deleteNullContentProp(contentStore.contentObj)

        // categoryStore.selectCategoryLocation(newCategoryName.value)
        const response: any = await addContents(contentData)
        // 상태코드로 에러 처리 하기
        if (response.data.statusCode === 201) {
          console.log('닫았다')
          modalViewStore.resetAll()
        }
      } catch (error: any) {
        console.error(error)
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
      modalViewStore.resetAll()
    },
    rightButtonEvent: () => {
      contentStore.deleteContent()
      modalViewStore.resetAll()
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
