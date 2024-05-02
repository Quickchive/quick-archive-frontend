import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toast = ref({
    message: '',
    func: {
      message: '',
      execute: () => {
        console.log('토스트 함수')
      }
    }
  })

  const errorToast = ref({
    message: ''
  })

  const toastModal = ref(false)
  const toastErrorModal = ref(false)

  // 토스트 메시지
  function setMessage(toastData: any) {
    toast.value.message = toastData.message
    if (toastData.func) {
      toast.value.func.message = toastData.func.message
      toast.value.func.execute = toastData.func.execute
    }
  }

  // 에러 메시지
  function setErrorMessage(errorMsg: string) {
    errorToast.value.message = errorMsg
  }

  function showDefaultToast() {
    toastModal.value = true
    setTimeout(() => (toastModal.value = false), 2500)
  }

  function showErrorToast() {
    toastErrorModal.value = true
    setTimeout(() => (toastErrorModal.value = false), 2500)
  }

  function executeDefaultToast(toastData: object) {
    setMessage(toastData)
    showDefaultToast()
  }

  function executeErrorToast(errorMsg: string) {
    setErrorMessage(errorMsg)
    showErrorToast()
  }

  return {
    toast,
    errorToast,
    toastModal,
    toastErrorModal,
    executeDefaultToast,
    executeErrorToast,
    setMessage,
    showDefaultToast,
    showErrorToast,
    setErrorMessage
  }
})
