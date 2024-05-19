import { defineStore } from 'pinia'
import { deleteCategories } from '@/api/category.js'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { addCategories, updateCategories } from '@/api/category.js'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useToastStore } from '@/stores/useToastStore.ts'
import { defaultCategoryList } from '@/assets/model/defaultCategory'
import categoryWatch from '@/assets/img/category/img_category_watch.png'
import { ref, reactive, computed } from 'vue'
import {
  filterByCategoryIsNull,
  filterByFavoriteAndCategoryIsNull,
  filterByFavorite
} from '@/utils/filter.js'
import type { CategoryIdMap } from '@/utils/interface'
import { getCategories } from '@/api/category'
export const useCategoryStore = defineStore('category', () => {
  const modalViewStore = useModalViewStore()
  const alertDataStore = useAlertDataStore()
  const contentStore = useContentStore()
  const toastStore = useToastStore()

  /*** state ***/
  // 사용: 카테고리 조회
  const categoryList: any = ref([])

  // 상단 필터
  const isUnselectedChipOn = ref(false)
  const isFavoriteChipOn = ref(false)

  const curCategoryName = ref('전체 콘텐츠')

  // 기본 카테고리 아이콘 정보
  const defaultCategory = reactive(defaultCategoryList)

  // 사용: navbar 카테고리 트리에서 펼침 또는 더보기 클릭 했을 때
  const focusedCategory = ref({
    id: -1,
    name: '',
    children: [],
    iconName: '',
    parentId: null,
    parentIconName: '',
    parentCategoryName: '전체 콘텐츠',
    slug: '',
    updatedAt: '',
    createdAt: ''
  })

  // 사용: 카테고리 추가 & 콘텐츠 추가 모달
  const parentCategory: any = ref({
    name: '전체 콘텐츠',
    iconName: '',
    id: -1
  })

  // 카테고리 트리 depth show/hide 컨트롤 용
  const categoryIdTree = ref<CategoryIdMap>({})
  const categoryIdTreeRadio = ref<CategoryIdMap>({})
  const moreBtnCategoryIdTree = ref<CategoryIdMap>({})
  const moreBtnCategoryIdTree__search = ref<CategoryIdMap>({})

  const isSelectedCategory = ref(parentCategory.value.name !== '전체 콘텐츠')

  /*** actions ***/

  function setCategoryName(categoryName: string) {
    curCategoryName.value = categoryName
  }

  function setFocusedCategory(categoryData: any) {
    console.log('categoryData', categoryData)
    focusedCategory.value.children = categoryData.children
    focusedCategory.value.iconName = categoryData.iconName
    focusedCategory.value.name = categoryData.name
    focusedCategory.value.parentId = categoryData.parentId
    focusedCategory.value.id = categoryData.id
  }

  function resetParentCategory() {
    parentCategory.value.name = '전체 콘텐츠'
    parentCategory.value.iconName = 'watch'
    parentCategory.value.id = -1
  }

  function setParentCategory(category: any) {
    if (category !== null) {
      parentCategory.value.name = category.name
      parentCategory.value.iconName = category.iconName
      parentCategory.value.id = category.id
    } else {
      resetParentCategory()
    }
  }

  function selectCategoryLocation(categoryName: string) {
    parentCategory.value.name = categoryName
  }

  function resetContentChip() {
    contentStore.contentList = contentStore.allContentList
    isFavoriteChipOn.value = false
    isUnselectedChipOn.value = false
  }

  function setUnselectedContentChip(offBtn: Boolean) {
    if (offBtn) {
      isUnselectedChipOn.value = !isUnselectedChipOn.value
    } else {
      isFavoriteChipOn.value = false
      isUnselectedChipOn.value = true
    }

    // 카테고리 미지정 on
    if (isUnselectedChipOn.value === true) {
      // && 즐겨찾기 on
      if (isFavoriteChipOn.value === true) {
        contentStore.contentList = filterByFavoriteAndCategoryIsNull(contentStore.allContentList)
      }
      // && 즐겨찾기 off
      else {
        contentStore.contentList = filterByCategoryIsNull(contentStore.allContentList)
      }
    }
    // 카테고리 미지정 off
    else {
      // && 즐겨찾기 on
      if (isFavoriteChipOn.value === true) {
        contentStore.contentList = filterByFavorite(contentStore.allContentList)
      }
      // && 즐겨찾기 off
      else {
        contentStore.contentList = contentStore.allContentList
      }
    }
  }

  function setFavoriteContentChip(offBtn: Boolean) {
    // 캡슐 버튼
    if (offBtn) {
      isFavoriteChipOn.value = !isFavoriteChipOn.value
    }
    // navBar
    else {
      isFavoriteChipOn.value = true
      isUnselectedChipOn.value = false
    }

    // 카테고리 미지정 on
    if (isUnselectedChipOn.value === true) {
      // && 즐겨찾기 on
      if (isFavoriteChipOn.value === true) {
        contentStore.contentList = filterByFavoriteAndCategoryIsNull(contentStore.allContentList)
      }
      // && 즐겨찾기 off
      else {
        contentStore.contentList = filterByCategoryIsNull(contentStore.allContentList)
      }
    }
    // 카테고리 미지정 off
    else {
      // && 즐겨찾기 on
      if (isFavoriteChipOn.value === true) {
        contentStore.contentList = filterByFavorite(contentStore.allContentList)
      }
      // && 즐겨찾기 off
      else {
        contentStore.contentList = contentStore.allContentList
      }
    }
  }

  // 카테고리 트리 depth show/hide 컨트롤 용
  function showChildrenCategory(children: any) {
    if (children) {
      for (const child of children) {
        if (child.id in categoryIdTree.value) {
          categoryIdTree.value[child.id] = !categoryIdTree.value[child.id]
        }
      }
    }
  }

  function showChildrenCategoryRadio(children: any) {
    if (children) {
      for (const child of children) {
        if (child.id in categoryIdTreeRadio.value) {
          categoryIdTreeRadio.value[child.id] = !categoryIdTreeRadio.value[child.id]
        }
      }
    }
  }

  function createCategoryIdMap(items: any[]) {
    return items.reduce((acc, item) => {
      acc[item.id] = false
      if (item.children && Array.isArray(item.children)) {
        const nestedMap = createCategoryIdMap(item.children)
        Object.assign(acc, nestedMap)
      }
      return acc
    }, {})
  }

  const getSelectedCategory: any = computed(() => {
    const selectedCategory = defaultCategory.find((e) => {
      return e.selected == true
    })
    return selectedCategory
  })

  const getCategoryImgByIconName = (iconName: string) => {
    const icon: any = defaultCategory.find((e) => e.iconName === iconName)
    if (icon === undefined) {
      return categoryWatch
    }
    return icon.img
  }

  const getIconDatagByIconName = (iconName: string) => {
    const icon: any = defaultCategory.find((e) => e.iconName === iconName)
    return icon
  }

  // 카테고리 아이콘 선택 이벤트
  function selectCategoryIcon(i: { id: number; img: string; selected: boolean }) {
    i.selected = true
    defaultCategory.map((e) => {
      if (i !== e) {
        e.selected = false
      }
    })
  }

  function setCategory() {
    focusedCategory.value.parentCategoryName = parentCategory.value.name
    focusedCategory.value.parentIconName = parentCategory.value.iconName
    focusedCategory.value.parentId = parentCategory.value.iconName
  }

  /*** api 함수 ***/

  async function getUserCategoryList() {
    try {
      const response = await getCategories()
      if (response.data.statusCode === 200) {
        categoryList.value = response.data.categoriesTree
        const categoryIdMap = createCategoryIdMap(categoryList.value)
        categoryIdTree.value = Object.assign({}, categoryIdMap)
        categoryIdTreeRadio.value = Object.assign({}, categoryIdMap)
        moreBtnCategoryIdTree.value = Object.assign({}, categoryIdMap)
        moreBtnCategoryIdTree__search.value = Object.assign({}, categoryIdMap)
      }
    } catch (error: any) {
      toastStore.executeErrorToast(error.message)
    }
  }

  async function deleteCategory() {
    try {
      const focusedCategory_id = focusedCategory.value.id
      const response = await deleteCategories(focusedCategory_id, alertDataStore.checkboxChecked)
      console.log('deleteCategory', response)
      await updateUserCategoryList()
      modalViewStore.hideModalWithOverlay('deleteCategory', 'default')
      const toastData = {
        message: '카테고리가 삭제되었습니다.',
        func: {
          message: '취소하기'
        }
      }
      toastStore.executeDefaultToast(toastData)
    } catch (error: any) {
      toastStore.executeErrorToast(error.message)
    }
  }

  async function addCategory(categoryData: any) {
    // 카테고리 추가
    try {
      const response = await addCategories(categoryData)
      console.log(response)
      const toastData = {
        message: '카테고리가 추가되었습니다.',
        func: {
          message: '보러가기'
        }
      }
      toastStore.executeDefaultToast(toastData)
      modalViewStore.closeAddCategoryModal()
      modalViewStore.closeSelectModal()
      await updateUserCategoryList()
    } catch (error: any) {
      if (error.response.data.statusCode === 409) {
        if (error.response.data.message === 'Category already exists') {
          modalViewStore.setDuplicatedCategoryName(parentCategory.value.name)

          const alertData = {
            title: '알림',
            content: `동일한 이름의 카테고리가 ${modalViewStore.duplicatedCategoryLocation}내에 있어요.\n카테고리 이름을 변경해주세요.`
          }

          alertDataStore.setDefaultAlertData(alertData)
          modalViewStore.showModalWithOverlay('alert', 'alert')
        }
        if (error.response.data.message === "Root categories can't be more than 10 in one user") {
          const alertData = {
            title: '알림',
            content: `무료 버전에서는 메인 카테고리를
          10개까지만 만들 수 있어요. 
          단, 서브 카테고리는 개수 제한 없이 만들 수 있어요.`
          }
          modalViewStore.setDuplicatedCategoryName(parentCategory.value.name)

          alertDataStore.setDefaultAlertData(alertData)
          modalViewStore.showModalWithOverlay('alert', 'alert')
        }
      } else {
        toastStore.executeErrorToast(error.message)
      }
    }
  }

  async function editCategory(categoryData: any) {
    console.log(categoryData)
    try {
      const response = await updateCategories(categoryData)
      if (response.data.statusCode === 200) {
        modalViewStore.hideModalWithOverlay('editCategory', 'default')
        await updateUserCategoryList()
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 409) {
        modalViewStore.setDuplicatedCategoryName(parentCategory.value.name)
        const alertData = {
          title: '알림',
          content: `동일한 이름의 카테고리가 
          ${modalViewStore.duplicatedCategoryLocation}내에 있어요.
          카테고리 이름을 변경해주세요.`
        }
        alertDataStore.setDefaultAlertData(alertData)
        modalViewStore.showModalWithOverlay('alert', 'alert')
      } else {
        toastStore.executeErrorToast(error.message)
      }
    }
  }

  async function updateUserCategoryList() {
    try {
      const response = await getCategories()
      if (response.data.statusCode === 200) {
        categoryList.value = response.data.categoriesTree
      }
    } catch (error: any) {
      toastStore.executeErrorToast(error.message)
    }
  }

  return {
    categoryIdTree,
    categoryIdTreeRadio,
    moreBtnCategoryIdTree,
    moreBtnCategoryIdTree__search,
    createCategoryIdMap,
    showChildrenCategory,
    getUserCategoryList,
    showChildrenCategoryRadio,
    curCategoryName,
    focusedCategory,
    deleteCategory,
    setCategoryName,
    setFocusedCategory,
    addCategory,
    editCategory,
    isFavoriteChipOn,
    isUnselectedChipOn,
    setUnselectedContentChip,
    setFavoriteContentChip,
    resetContentChip,
    updateUserCategoryList,
    categoryList,
    isSelectedCategory,
    selectCategoryLocation,
    resetParentCategory,
    setParentCategory,
    parentCategory,
    defaultCategory,
    getSelectedCategory,
    getCategoryImgByIconName,
    selectCategoryIcon,
    getIconDatagByIconName,
    setCategory
  }
})
