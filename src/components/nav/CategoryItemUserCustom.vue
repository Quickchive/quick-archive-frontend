<template>
  <div class="category-item">
    <!-- 1차 카테고리 -->
    <ul v-if="categoryData.name" class="category-list__first-ul">
      <li>
        <div class="flex-container__row--align-center">
          <button class="button--transparent expand-button" @click="controlFirstCategory()">
            <img v-if="categoryData.children" :src="expandLessIcon" />
            <img v-if="!categoryData.children" :src="expandMoreIcon" />
          </button>
          <button class="button--transparent category-list__button">
            <img :src="categoryIcon" class="category-icon img-category-icon" />
            {{ categoryData.name }}
          </button>
        </div>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
      <!-- 2차 카테고리 -->
      <div>
        <ul v-for="categoryItem2 in categoryData.children" :key="categoryItem2">
          <li v-for="categoryItem2 in categoryData.children" :key="categoryItem2">
            <div class="flex-container__row--align-center">
              <button class="button--transparent expand-button">
                <img v-if="categoryData.children.children" :src="expandLessIcon" />
                <img v-if="!categoryData.children.children" :src="expandMoreIcon" />
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
          <ul>
            <li v-for="categoryItem3 in categoryItem2.children" :key="categoryItem3">
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
        </ul>
      </div>
    </ul>
  </div>
</template>

<script setup>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import categoryIcon from '@/assets/img/category/img_category_cook.png'
import { defineProps } from 'vue'

const props = defineProps({
  categoryData: Object
})
console.log(props.categoryData, 'props')
</script>

<style></style>
