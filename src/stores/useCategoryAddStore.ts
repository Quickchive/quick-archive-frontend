import { defineStore } from 'pinia'
import categoryBook from '@/assets/img/category/img_category_book.png'
import categoryCafe from '@/assets/img/category/img_category_cafe.png'
import categoryCake from '@/assets/img/category/img_category_cake.png'
import categoryCook from '@/assets/img/category/img_category_cook.png'
import categoryDocument from '@/assets/img/category/img_category_document.png'
import categoryFolder from '@/assets/img/category/img_category_folder.png'
import categoryGame from '@/assets/img/category/img_category_game.png'
import categoryGift from '@/assets/img/category/img_category_gift.png'
import categoryShopping from '@/assets/img/category/img_category_shopping.png'
import categoryStar from '@/assets/img/category/img_category_star.png'
import categoryTrip from '@/assets/img/category/img_category_trip.png'
import categoryWatch from '@/assets/img/category/img_category_watch.png'
// import { getCategories } from '@/api/category'
// import { getContents } from '@/api/contents'
import { ref, reactive, computed } from 'vue'

export const useCategoryAddStore = defineStore('categoryAdd', () => {
  // 화살표 함수는 전체 유형 유추을 위해 권장됨.
  // state: () => {
  //   return {
  const defaultCategory = reactive([
    {
      id: 0,
      img: categoryFolder,
      selected: true,
      iconName: 'Folder'
    },
    {
      id: 1,
      img: categoryCook,
      selected: false,
      iconName: 'Cook'
    },
    {
      id: 2,
      img: categoryCafe,
      selected: false,
      iconName: 'Cafe'
    },
    {
      id: 3,
      img: categoryCake,
      selected: false,
      iconName: 'Cake'
    },
    {
      id: 4,
      img: categoryWatch,
      selected: false,
      iconName: 'Watch'
    },
    {
      id: 5,
      img: categoryStar,
      selected: false,
      iconName: 'Star'
    },
    {
      id: 6,
      img: categoryGift,
      selected: false,
      iconName: 'Gift'
    },
    {
      id: 7,
      img: categoryShopping,
      selected: false,
      iconName: 'Shopping'
    },
    {
      id: 8,
      img: categoryDocument,
      selected: false,
      iconName: 'Document'
    },
    {
      id: 9,
      img: categoryBook,
      selected: false,
      iconName: 'Book'
    },
    {
      id: 10,
      img: categoryGame,
      selected: false,
      iconName: 'Game'
    },
    {
      id: 11,
      img: categoryTrip,
      selected: false,
      iconName: 'Trip'
    }
  ])

  // step 01 - 카테고리 추가 모달
  const newCategoryName = ref('')
  const selectedLocation: any = ref({
    name: '미지정'
  })
  // }
  // },
  // getters: {
  const getSelectedCategory = computed(() => {
    const selectedCategory = defaultCategory.find((e) => {
      return e.selected == true
    })
    // console.log('선택된 아이콘', selectedCategory)
    return selectedCategory
  })
  const isSelectedCategory = () => selectedLocation.value.name !== '미지정'
  const getCategoryImgByIconName = (iconName: string) => {
    const icon: any = defaultCategory.find((e) => e.iconName === iconName)
    // console.log(icon)
    if (icon === undefined) {
      return categoryWatch
    }
    return icon.img
  }

  // actions: {
  // 카테고리 아이콘 선택 이벤트
  function selectCategoryIcon(i: { id: number; img: string; selected: boolean }) {
    i.selected = true
    defaultCategory.map((e) => {
      if (i !== e) {
        e.selected = false
      }
    })
  }

  // 카테고리 생성 위치 라디오 버튼 선택 이벤트
  function selectCategoryLocation(categoryName: string) {
    selectedLocation.value.name = categoryName
  }
  function resetCategoryLocation() {
    selectedLocation.value = { name: '미지정' }
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
    resetCategoryLocation
  }
})
