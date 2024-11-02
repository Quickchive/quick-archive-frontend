import { defineStore } from 'pinia'
import { deleteCategories } from '@/api/category.js'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { addCategories, updateCategories } from '@/api/category.js'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useToastStore } from '@/stores/useToastStore.ts'
import { defaultCategoryList } from '@/assets/model/defaultCategory'
import categoryFolder from '@/assets/img/category/img_category_folder.png'
import { ref, reactive, computed, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import {
  filterByCategoryIsNull,
  filterByFavoriteAndCategoryIsNull,
  filterByFavorite
} from '@/utils/filter.js'
import type { CategoryIdMap } from '@/utils/interface'
import { getCategories, getRecommendedCategory } from '@/api/category'
import { formatAddCategoryData, formatEditCategoryData } from '@/utils/util.js'
import { searchCategoryDataById, searchCategoryDataByName } from '@/utils/search.js'
export const useCategoryStore = defineStore('category', () => {
  const modalViewStore = useModalViewStore()
  const alertDataStore = useAlertDataStore()
  const contentStore = useContentStore()
  const toastStore = useToastStore()
  const router = useRouter()

  /*** state ***/
  // 사용: 카테고리 조회
  const categoryList: any = ref([])

  // 상단 필터
  const isUnselectedChipOn = ref(false)
  const isFavoriteChipOn = ref(false)
  const isRecommended = ref(false)

  const curCategoryName = ref('전체 콘텐츠')

  // 현재 추천된 카테고리 아이디
  const recommendedCategoryId = ref(-1)

  // 기본 카테고리 아이콘 정보
  const defaultCategory = reactive(defaultCategoryList)

  // 사용: navbar 카테고리 트리에서 펼침 또는 더보기 클릭 했을 때
  const focusedCategory: any = ref({
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

  const getSelectedCategory: any = computed(() => {
    const selectedCategory = defaultCategory.find((e) => {
      return e.selected == true
    })
    return selectedCategory
  })

  // 카테고리 라디오 버튼 선택 여부
  const hasSelectedCategory: any = computed(() => {
    return parentCategory.value.name.length > 0 && !(parentCategory.value.name === '전체 콘텐츠')
  })

  // 사용: 카테고리 추가
  const addCategoryObj = ref({
    categoryName: '',
    iconName: 'Folder',
    parentId: parentCategory.value.id,
    parentIconName: parentCategory.value.iconName,
    parentCategoryName: parentCategory.value.name
  })

  // 사용: 카테고리 추가
  const editCategoryObj = ref({
    categoryId: -1,
    name: '',
    iconName: '',
    parentId: -1,
    parentIconName: '',
    parentCategoryName: '전체 콘텐츠'
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

  function setFocusedCategory(categoryData: any, parentData: any) {
    console.log('categoryData', categoryData)
    focusedCategory.value.children = categoryData.children
    focusedCategory.value.iconName = categoryData.iconName
    focusedCategory.value.name = categoryData.name
    focusedCategory.value.id = categoryData.id

    editCategoryObj.value.iconName = categoryData.iconName
    editCategoryObj.value.name = categoryData.name
    editCategoryObj.value.categoryId = categoryData.id

    if (parentData) {
      // parent
      focusedCategory.value.parentId = parentData.id
      focusedCategory.value.parentCategoryName = parentData.name
      focusedCategory.value.parentIconName = parentData.iconName

      editCategoryObj.value.parentId = parentData.id
      editCategoryObj.value.parentCategoryName = parentData.name
      editCategoryObj.value.parentIconName = parentData.iconName
    }
  }

  function resetParentCategory() {
    parentCategory.value.name = '전체 콘텐츠'
    parentCategory.value.iconName = 'Folder'
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

  const getCategoryImgByIconName = (iconName: string) => {
    const icon: any = defaultCategory.find((e) => e.iconName === iconName)
    if (icon === undefined) {
      return categoryFolder
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
    focusedCategory.value.parentId = parentCategory.value.id

    editCategoryObj.value.parentCategoryName = parentCategory.value.name
    editCategoryObj.value.parentIconName = parentCategory.value.iconName
    editCategoryObj.value.parentId = parentCategory.value.id
  }

  function setCategoryIcon() {
    addCategoryObj.value.iconName = getSelectedCategory.value.iconName
    editCategoryObj.value.iconName = getSelectedCategory.value.iconName
  }

  function resetCategoryIcon() {
    editCategoryObj.value.iconName = focusedCategory.value.iconName
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
          message: ''
        }
      }
      toastStore.executeDefaultToast(toastData)
    } catch (error: any) {
      toastStore.executeErrorToast(error.message)
    }
  }

  async function addCategory() {
    // 카테고리 추가
    try {
      const response = await addCategories(formatAddCategoryData(addCategoryObj.value))
      console.log(response)

      await getUserCategoryList()

      const searchedCategory = searchCategoryDataByName(
        toRaw(categoryList.value),
        addCategoryObj.value.categoryName
      )
      console.log('searchedCategory', searchedCategory)

      const toastData = {
        message: '카테고리가 추가되었습니다.',
        func: {
          message: '보러가기',
          execute: () => {
            setCategoryName(addCategoryObj.value.categoryName)
            router.push({
              name: 'categoryDetail',
              params: { id: searchedCategory.id }
            })
          }
        }
      }
      toastStore.executeDefaultToast(toastData)
      modalViewStore.resetAll()
      resetParentCategory()
    } catch (error: any) {
      if (error.response.data.statusCode === 409) {
        if (error.response.data.message === 'Category already exists') {
          modalViewStore.setDuplicatedCategoryName(parentCategory.value.name)
          const alertData = {
            title: '알림',
            content: [
              '동일한 이름의 카테고리가',
              `${modalViewStore.duplicatedCategoryLocation}내에 있어요.`,
              '카테고리 이름을 변경해주세요.'
            ]
          }
          alertDataStore.setDefaultAlertData(alertData)
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

          alertDataStore.setDefaultAlertData(alertData)
          modalViewStore.showModalWithOverlay('alert', 'alert')
        }
      } else {
        toastStore.executeErrorToast(error.message)
      }
    }
  }

  async function editCategory() {
    try {
      const response = await updateCategories(formatEditCategoryData(editCategoryObj.value))
      if (response.data.statusCode === 200) {
        modalViewStore.hideModalWithOverlay('editCategory', 'default')
        await updateUserCategoryList()
        resetParentCategory()
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 409) {
        modalViewStore.setDuplicatedCategoryName(parentCategory.value.name)
        const alertData = {
          title: '알림',
          content: [
            '동일한 이름의 카테고리가',
            `${modalViewStore.duplicatedCategoryLocation}내에 있어요.`,
            '카테고리 이름을 변경해주세요.'
          ]
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

  async function getAutoCategorizedName(link: string) {
    try {
      const response = await getRecommendedCategory(link)

      // 카테고리 추천 정상 완료 여부
      isRecommended.value = response.data.name !== 'None'
      console.log('카테고리 추천 정상 완료 여부: ', isRecommended.value)
      console.log('카테고리 자동 추천 결과', response)

      if (isRecommended.value === true) {
        const recommendedCategoryObj = searchCategoryDataById(categoryList.value, response.data.id)
        const recommendedCategory = {
          name: response.data.name,
          iconName: toRaw(recommendedCategoryObj).iconName,
          id: response.data.id
        }
        recommendedCategoryId.value = response.data.id
        setParentCategory(recommendedCategory)
        contentStore.setContentCategory(recommendedCategory)
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw error
      }
      console.error('카테고리 추천 중 오류 발생:', error)
    }
  }

  // 카테고리 추가 관련
  function resetAddCategoryName() {
    addCategoryObj.value.categoryName = ''
  }

  // 카테고리 추가 관련
  function resetEditCategoryName() {
    editCategoryObj.value.name = ''
  }

  // 카테고리 추가 관련
  function resetAddCategoryObj() {
    addCategoryObj.value.categoryName = ''
    addCategoryObj.value.iconName = ''
    resetParentCategory()
  }

  return {
    resetAddCategoryName,
    resetAddCategoryObj,
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
    setCategory,
    addCategoryObj,
    editCategoryObj,
    setCategoryIcon,
    resetEditCategoryName,
    resetCategoryIcon,
    getAutoCategorizedName,
    isRecommended,
    hasSelectedCategory,
    recommendedCategoryId
  }
})
