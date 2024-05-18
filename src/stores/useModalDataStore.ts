import { defineStore } from 'pinia'
import { defaultCategoryList } from '@/assets/model/defaultCategory'
import categoryWatch from '@/assets/img/category/img_category_watch.png'
import { ref, reactive, computed } from 'vue'
export const useModalDataStore = defineStore('modalData', () => {
  // 기본 카테고리 아이콘 정보
  const defaultCategory = reactive(defaultCategoryList)

  // 카테고리 추가 모달
  const newCategoryName = ref('')

  // 카테고리 추가 & 콘텐츠 추가 모달 공통
  const selectedLocation: any = ref({
    name: '전체 콘텐츠'
  })

  const getSelectedCategory: any = computed(() => {
    const selectedCategory = defaultCategory.find((e) => {
      return e.selected == true
    })
    return selectedCategory
  })

  const isSelectedCategory = () => selectedLocation.value.name !== '전체 콘텐츠'

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

  // 카테고리 현재 위치 라디오 버튼 선택 이벤트
  function selectCategoryLocation(categoryName: string) {
    selectedLocation.value.name = categoryName
  }
  function resetCategoryLocation() {
    selectedLocation.value = { name: '전체 콘텐츠' }
  }
  function clickRadioButton(category: any) {
    selectedLocation.value = category
  }

  return {
    defaultCategory,
    newCategoryName,
    selectedLocation,
    getSelectedCategory,
    isSelectedCategory,
    getCategoryImgByIconName,
    selectCategoryIcon,
    selectCategoryLocation,
    resetCategoryLocation,
    clickRadioButton,
    getIconDatagByIconName
  }
})
