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

export const useCategoryAddStore = defineStore('categoryAdd', {
  // 화살표 함수는 전체 유형 유추을 위해 권장됨.
  state: () => {
    return {
      defaultCategory: [
        {
          id: 0,
          img: categoryFolder,
          selected: true
        },
        {
          id: 1,
          img: categoryCook,
          selected: false
        },
        {
          id: 2,
          img: categoryCafe,
          selected: false
        },
        {
          id: 3,
          img: categoryCake,
          selected: false
        },
        {
          id: 4,
          img: categoryWatch,
          selected: false
        },
        {
          id: 5,
          img: categoryStar,
          selected: false
        },
        {
          id: 6,
          img: categoryGift,
          selected: false
        },
        {
          id: 7,
          img: categoryShopping,
          selected: false
        },
        {
          id: 8,
          img: categoryDocument,
          selected: false
        },
        {
          id: 9,
          img: categoryBook,
          selected: false
        },
        {
          id: 10,
          img: categoryGame,
          selected: false
        },
        {
          id: 11,
          img: categoryTrip,
          selected: false
        }
      ],
      // step 01 - 카테고리 추가 모달
      newCategoryName: '',
      selectedLocation: {
        name: '미지정'
      }
    }
  },
  getters: {
    getSelectedCategory(state) {
      const selectedCategory = state.defaultCategory.find((e) => {
        return e.selected == true
      })
      console.log('선택된 아이콘', selectedCategory)
      return selectedCategory
    }
  },
  actions: {
    // 카테고리 아이콘 선택 이벤트
    selectCategoryIcon(i: { id: number; img: string; selected: boolean }) {
      i.selected = true
      this.defaultCategory.map((e) => {
        if (i !== e) {
          e.selected = false
        }
      })
    },
    // 카테고리 생성 위치 라디오 버튼 선택 이벤트
    selectCategoryLocation(categoryName: string) {
      this.selectedLocation.name = categoryName
    }
  }
})
