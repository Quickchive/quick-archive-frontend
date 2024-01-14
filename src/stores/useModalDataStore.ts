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
import { ref, reactive, computed } from 'vue'

export const useModalDataStore = defineStore('modalData', () => {
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

  // 카테고리 추가 모달
  const newCategoryName = ref('')

  // 카테고리 추가 & 콘텐츠 추가 모달 공통
  const selectedLocation: any = ref({
    name: '미지정'
  })

  // 콘텐츠 추가 모달 데이터
  const addContentData = reactive({
    category: selectedLocation.value,
    favorite: false,
    memo: '',
    link: '',
    title: '작은집으로 이사가야 해서 미니멀리즘을 열...'
  })

  const getSelectedCategory = computed(() => {
    const selectedCategory = defaultCategory.find((e) => {
      return e.selected == true
    })
    return selectedCategory
  })
  const isSelectedCategory = () => selectedLocation.value.name !== '미지정'
  const getCategoryImgByIconName = (iconName: string) => {
    const icon: any = defaultCategory.find((e) => e.iconName === iconName)
    if (icon === undefined) {
      return categoryWatch
    }
    return icon.img
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

  // 카테고리 생성 위치 라디오 버튼 선택 이벤트
  function selectCategoryLocation(categoryName: string) {
    selectedLocation.value.name = categoryName
  }
  function resetCategoryLocation() {
    selectedLocation.value = { name: '미지정' }
  }

  function clickRadioButton(category: any) {
    selectedLocation.value = category
  }

  // 콘텐츠 추가
  function setAddContentData(contentData: any) {
    addContentData.category = contentData.category ? contentData.category : addContentData.category
    addContentData.memo = contentData.memo ? contentData.memo : addContentData.memo
    addContentData.link = contentData.link ? contentData.link : addContentData.link
    addContentData.title = contentData.title ? contentData.title : addContentData.title
  }
  function setFavoriteToggle() {
    addContentData.favorite = !addContentData.favorite
  }
  function setMemo(contentAddMemo: string) {
    addContentData.memo = contentAddMemo
  }
  function setLink(link: string) {
    addContentData.link = link
  }
  function setTitle(title: string) {
    addContentData.title = title
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
    addContentData,
    setAddContentData,
    setFavoriteToggle,
    setMemo,
    setLink,
    setTitle
  }
})
