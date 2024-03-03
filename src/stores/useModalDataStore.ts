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
import { getOgData } from '@/api/contents'

export const useModalDataStore = defineStore('modalData', () => {
  const toast = ref({
    message: '',
    func: {
      message: ''
    }
  })

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
    name: '전체 콘텐츠'
  })

  // 콘텐츠 추가 모달 데이터 - 단일 링크
  const addContentData: any = ref({
    id: -1,
    category: selectedLocation.value,
    favorite: false,
    memo: '',
    link: '',
    title: '',
    coverImg: '',
    siteName: '',
    description: '',
    parentId: ''
  })

  // 콘텐츠 추가 모달 데이터 - 단일 링크
  const focusedAddContentIndex: any = ref()

  const setFocusedAddContentIndex = (index: Number) => {
    focusedAddContentIndex.value = index
  }

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

  // 콘텐츠 추가
  function setAddContentData(contentData: any) {
    addContentData.value.category = contentData.category
      ? contentData.category
      : addContentData.value.category
    addContentData.value.memo = contentData.memo ? contentData.memo : addContentData.value.memo
    addContentData.value.link = contentData.link ? contentData.link : addContentData.value.link
    addContentData.value.title = contentData.title ? contentData.title : addContentData.value.title
  }
  function setFavoriteToggle() {
    addContentData.value.favorite = !addContentData.value.favorite
  }
  function setMemo(contentAddMemo: string) {
    addContentData.value.memo = contentAddMemo
  }

  function checkLinkInMultipleLink(index: any) {
    console.log('isChecked', addContentData.value[index].checked)
    addContentData.value[index].checked = !addContentData.value[index].checked
  }

  function setTitle(title: string) {
    addContentData.value.title = title
  }

  function setMultipleTitle(title: string) {
    addContentData.value[focusedAddContentIndex.value].title = title
  }

  // og 데이터 추출
  async function fetchOgData(link: string) {
    try {
      const response: any = await getOgData(link)
      console.log('ogdata', response)
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        return response.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function setSingleLink(link: string) {
    addContentData.value.link = link
    const ogData = await fetchOgData(link)
    addContentData.value.coverImg = ogData.coverImg
    addContentData.value.title = ogData.title
    addContentData.value.description = ogData.description
    addContentData.value.siteName = ogData.siteName
  }

  async function fetchMultipleLinksOgData(links: any) {
    const multipleLinksArr: {
      link: any
      coverImg: any
      title: any
      description: any
      siteName: any
    }[] = []

    for (let i = 0; i < links.length; i++) {
      const ogData = await fetchOgData(links[i])
      const linkData = {
        link: links[i],
        coverImg: ogData.coverImg,
        title: ogData.title,
        description: ogData.description,
        siteName: ogData.siteName,
        checked: true
      }
      multipleLinksArr.push(linkData)
    }

    return multipleLinksArr
  }

  function setMultipleLinks(linkArrData: any) {
    addContentData.value = linkArrData
  }

  // 토스트 메시지
  function setToastMessage(toastData: any) {
    toast.value.message = toastData.message
    toast.value.func.message = toastData.func.message
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
    setSingleLink,
    setMultipleLinks,
    setTitle,
    fetchOgData,
    getIconDatagByIconName,
    checkLinkInMultipleLink,
    fetchMultipleLinksOgData,
    focusedAddContentIndex,
    setFocusedAddContentIndex,
    setMultipleTitle,
    setToastMessage,
    toast
  }
})
