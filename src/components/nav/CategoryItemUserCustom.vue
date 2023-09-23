<template>
  <div class="category-item">
    <!-- 1차 카테고리 -->
    <ul v-if="categoryData.name" class="category-list__first-ul">
      <li>
        <div class="flex-container__row--align-center">
          <button
            class="button--transparent expand-button"
            @click="controlFirstCategory(categoryData.children)"
          >
            <img v-if="secondCategory.show" :src="expandLessIcon" />
            <img v-if="!secondCategory.show" :src="expandMoreIcon" />
          </button>
          <button class="button--transparent category-list__button">
            <img :src="categoryIcon" class="category-icon img-category-icon" />
            {{ categoryData.name }}
          </button>
        </div>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
      <!-- 2차 카테고리 -->
      <template v-if="secondCategory.show">
        <ul v-for="(categoryItem2, index) in categoryData.children" :key="index">
          <li>
            <div class="flex-container__row--align-center">
              <button
                class="button--transparent expand-button"
                @click="controlSecondCategory(index)"
              >
                <img v-if="thirdCategoryArr[index]" :src="expandLessIcon" />
                <img v-if="!thirdCategoryArr[index]" :src="expandMoreIcon" />
              </button>
              <button class="button--transparent category-list__button">
                <img :src="categoryIcon" class="category-icon img-category-icon" />{{
                  categoryItem2.name
                }}
              </button>
            </div>
            <button class="button--transparent"><img :src="moreIcon" /></button>
          </li>
          <!-- 3차 카테고리 -->
          <template v-if="thirdCategoryArr[index]">
            <ul v-for="categoryItem3 in categoryItem2.children" :key="categoryItem3">
              <li>
                <div class="flex-container__row--align-center">
                  <button class="button--transparent expand-button">
                    <img :src="expandMoreIcon" />
                  </button>
                  <button class="button--transparent category-list__button">
                    <img :src="categoryIcon" class="category-icon img-category-icon" />{{
                      categoryItem3.name
                    }}
                  </button>
                </div>
                <button class="button--transparent"><img :src="moreIcon" /></button>
              </li>
            </ul>
          </template>
        </ul>
      </template>
    </ul>
  </div>
</template>

<script setup>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import categoryIcon from '@/assets/img/category/img_category_cook.png'
import { defineProps, reactive } from 'vue'

const props = defineProps({
  categoryData: Object
})

let thirdCategoryArr = reactive([])

if (props.categoryData.children) {
  thirdCategoryArr.length = Number(props.categoryData.children.length)
  for (let i = 0; i < props.categoryData.children.length; i++) {
    thirdCategoryArr[i] = false
  }
  console.log('thirdCategoryArr', thirdCategoryArr)
}

const secondCategory = reactive({ show: false })
const thirdCategory = reactive({ show: false })
const controlFirstCategory = (children) => {
  if (children) {
    secondCategory.show = !secondCategory.show
  }
}

const controlSecondCategory = (index) => {
  console.log(index, 'index')
  // if (index) {
  thirdCategoryArr[index] = !thirdCategoryArr[index]
  console.log('thirdCategoryArr', thirdCategoryArr[index])
  // }
}
</script>

<style></style>
