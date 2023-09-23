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
import { getCategories } from '@/api/category'
import { getContents } from '@/api/contents'

export const useCategoryStore = defineStore('category', {
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
      // 더미
      userCategoryList: [
        {
          id: 23,
          createdAt: '2023-09-20T14:43:26.954Z',
          updatedAt: '2023-09-20T14:43:26.954Z',
          name: '테스트카테고리',
          slug: '테스트카테고리',
          parentId: null,
          userId: 7
        },
        {
          id: 33,
          createdAt: '2023-09-20T23:36:28.027Z',
          updatedAt: '2023-09-20T23:36:28.027Z',
          name: '쇼핑',
          slug: '쇼핑',
          parentId: null,
          userId: 7
        },
        {
          id: 34,
          createdAt: '2023-09-20T23:36:35.059Z',
          updatedAt: '2023-09-20T23:36:35.059Z',
          name: '맛집',
          slug: '맛집',
          parentId: null,
          userId: 7,
          children: [
            {
              id: 41,
              createdAt: '2023-09-20T23:39:41.268Z',
              updatedAt: '2023-09-20T23:39:41.268Z',
              name: '서울 맛집',
              slug: '서울-맛집',
              parentId: 34,
              userId: 7
            }
          ]
        },
        {
          id: 35,
          createdAt: '2023-09-20T23:36:38.288Z',
          updatedAt: '2023-09-20T23:36:38.288Z',
          name: '문서',
          slug: '문서',
          parentId: null,
          userId: 7
        },
        {
          id: 36,
          createdAt: '2023-09-20T23:37:17.774Z',
          updatedAt: '2023-09-20T23:37:17.774Z',
          name: '여행',
          slug: '여행',
          parentId: null,
          userId: 7,
          children: [
            {
              id: 38,
              createdAt: '2023-09-20T23:38:52.899Z',
              updatedAt: '2023-09-20T23:38:52.899Z',
              name: '국내 여행',
              slug: '국내-여행',
              parentId: 36,
              userId: 7,
              children: [
                {
                  id: 42,
                  createdAt: '2023-09-20T23:39:21.779Z',
                  updatedAt: '2023-09-20T23:39:21.779Z',
                  name: '부산',
                  slug: '부산',
                  parentId: 38,
                  userId: 7
                }
              ]
            },
            {
              id: 39,
              createdAt: '2023-09-20T23:39:01.686Z',
              updatedAt: '2023-09-20T23:39:01.686Z',
              name: '해외 여행',
              slug: '해외-여행',
              parentId: 36,
              userId: 7,
              children: [
                {
                  id: 40,
                  createdAt: '2023-09-20T23:39:21.779Z',
                  updatedAt: '2023-09-20T23:39:21.779Z',
                  name: '파리',
                  slug: '파리',
                  parentId: 39,
                  userId: 7
                },
                {
                  id: 41,
                  createdAt: '2023-09-20T23:39:21.779Z',
                  updatedAt: '2023-09-20T23:39:21.779Z',
                  name: '프랑스',
                  slug: '프랑스',
                  parentId: 39,
                  userId: 7
                }
              ]
            }
          ]
        },
        {
          id: 37,
          createdAt: '2023-09-20T23:37:23.377Z',
          updatedAt: '2023-09-20T23:37:23.377Z',
          name: '게임',
          slug: '게임',
          parentId: null,
          userId: 7
        }
      ],
      // 더미
      userContentData: [
        {
          id: 0,
          createdAt: '2023-09-23T05:47:38.105Z',
          updatedAt: '2023-09-23T05:47:38.105Z',
          link: 'ex.com',
          title: 'string',
          siteName: 'string',
          coverImg: 'string',
          description: 'string',
          comment: 'string',
          reminder: '2022-08-20',
          favorite: true,
          category: {
            id: 23,
            createdAt: '2023-09-23T05:47:38.105Z',
            updatedAt: '2023-09-23T05:47:38.105Z',
            name: '테스트 카테고리',
            slug: 'string',
            parentId: 0,
            userId: 0
          },
          userId: 0
        },
        {
          id: 1,
          createdAt: '2023-09-23T05:47:38.105Z',
          updatedAt: '2023-09-23T05:47:38.105Z',
          link: 'ex.com',
          title: 'string',
          siteName: 'string',
          coverImg: 'string',
          description: 'string',
          comment: 'string',
          reminder: '2022-08-20',
          favorite: false,
          category: {
            id: 33,
            createdAt: '2023-09-23T05:47:38.105Z',
            updatedAt: '2023-09-23T05:47:38.105Z',
            name: '쇼핑',
            slug: 'string',
            parentId: 0,
            userId: 0
          },
          userId: 0
        }
      ]
    }
  },
  getters: {
    getSelectedCategory(state) {
      const selectedCategory = state.defaultCategory.find((e) => {
        console.log(e)
        e.selected == true
      })
      // return selectedCategory
      console.log(selectedCategory)
      return state.defaultCategory[0].img
    }
  },
  actions: {
    selectCategory(i: { id: number; img: string; selected: boolean }) {
      i.selected = true
      this.defaultCategory.map((e) => {
        if (i !== e) {
          e.selected = false
        }
      })
    },
    async getUserCategoryList() {
      try {
        const response = await getCategories()
        console.log('store', response)
        if (response.data.statusCode == 200) {
          this.userCategoryList = response.data.categoriesTree
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getContents(categoryId: Number) {
      try {
        const response = await getContents(categoryId)
        console.log('store', response)
        if (response.data.statusCode == 200) {
          this.userContentData = response.data.contents
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
