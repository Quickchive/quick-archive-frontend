import type { Ref, reactive } from 'vue'

interface CategoryIdMap {
  [id: number]: boolean
}

interface Overlay {
  // alert: boolean
  // default: boolean
  // settingAlert: boolean
  [key: string]: boolean
}
interface Modal {
  // [key: string]: Ref<boolean>
  [key: string]: boolean

  // addContent: Ref<boolean>
  // addContentDetail: Ref<boolean>
  // addContentMultiple: Ref<boolean>
  // shareContent: Ref<boolean>
  // deleteContent: Ref<boolean>
  // editContent: Ref<boolean>
  // editContentDetail: Ref<boolean>
  // select: Ref<boolean>
  // selectCategory: Ref<boolean>
  // categoryLocation: Ref<boolean>
  // editContentTitle: Ref<boolean>
  // completeAddNewCategory: Ref<boolean>
  // logout: Ref<boolean>
  // withdrawal: Ref<boolean>
  // alert: Ref<boolean>
  // addCategory: Ref<boolean>
  // editCategory: Ref<boolean>
  // addNewCategory: Ref<boolean>
  // deleteCategory: Ref<boolean>
}

export type { CategoryIdMap, Modal, Overlay }
