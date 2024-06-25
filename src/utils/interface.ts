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

interface ContentObj {
  id: number
  link: string
  title: string
  siteName: string
  description: string
  comment: string
  favorite: boolean
  categoryName: string
  categoryIconName?: string
  categoryId?: number
  parentId: number
  createdAt?: number
  updatedAt?: number
  coverImg?: string
  checked?: boolean
  focused?: boolean
}

interface OgContent {
  link: string
  coverImg: string
  title: string
  description: string
  siteName: string
}

interface ContentList extends Array<ContentObj> {}

export type { CategoryIdMap, Modal, Overlay, ContentObj, ContentList, OgContent }
