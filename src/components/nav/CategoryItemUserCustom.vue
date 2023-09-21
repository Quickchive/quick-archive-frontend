<template>
  <div class="category-item">
    <!-- 1차 카테고리 -->
    <ul v-if="categoryData.name" class="category-list__first-ul">
      <li>
        <div class="flex-container__row--align-center">
          <button class="button--transparent expand-button">
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
      <ul v-if="categoryData.children">
        <li>
          <div class="flex-container__row--align-center">
            <button class="button--transparent expand-button">
              <img v-if="categoryData.children.children" :src="expandLessIcon" />
              <img v-if="!categoryData.children.children" :src="expandMoreIcon" />
            </button>
            <button class="button--transparent category-list__button">
              <img :src="categoryIcon" class="category-icon img-category-icon" />{{
                categoryData.children.name
              }}
            </button>
          </div>
          <button class="button--transparent"><img :src="moreIcon" /></button>
        </li>
        <!-- 3차 카테고리 -->
        <ul v-if="categoryData.children.children">
          <li>
            <div class="flex-container__row--align-center">
              <button class="button--transparent expand-button">
                <img :src="expandMoreIcon" />
              </button>
              <button class="button--transparent category-list__button">
                <img :src="categoryIcon" class="category-icon img-category-icon" />{{
                  categoryData.children.children.name
                }}
              </button>
            </div>
            <button class="button--transparent"><img :src="moreIcon" /></button>
          </li>
        </ul>
      </ul>
    </ul>
  </div>
</template>

<script>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import categoryIcon from '@/assets/img/category/img_category_cook.png'

export default {
  data() {
    return {
      expandMoreIcon,
      expandLessIcon,
      moreIcon,
      categoryIcon
    }
  },
  props: {
    categoryData: Object
  }
}
</script>

<style></style>
