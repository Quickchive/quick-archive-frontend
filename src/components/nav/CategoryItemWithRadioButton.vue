<template>
  <div class="category-item-radio">
    <!-- 1차 카테고리 -->
    <ul v-if="categoryData.firstCategory" class="category-list__first-ul">
      <li>
        <div class="flex-container__row--align-center">
          <button class="button--transparent expand-button">
            <img v-if="categoryData.secondCategory" :src="expandLessIcon" />
            <img v-if="!categoryData.secondCategory" :src="expandMoreIcon" />
          </button>
          <button class="button--transparent category-list__button">
            <img :src="categoryIcon" class="category-icon img-category-icon" />
            {{ categoryData.firstCategory.name }}
          </button>
        </div>
        <div class="radio-buttons">
          <label :for="categoryData.firstCategory.id" class="radio-button">
            <input type="radio" :id="categoryData.firstCategory.id" name="grades" />
            <span class="custom-radio"></span>
          </label>
        </div>
      </li>
      <!-- 2차 카테고리 -->
      <ul class="category-list__second-ul" v-if="categoryData.secondCategory">
        <li>
          <div class="flex-container__row--align-center">
            <button class="button--transparent expand-button">
              <img :src="expandMoreIcon" />
            </button>
            <button class="button--transparent category-list__button">
              <img :src="categoryIcon" class="category-icon img-category-icon" />{{
                categoryData.secondCategory.name
              }}
            </button>
          </div>
          <div class="radio-buttons">
            <label :for="categoryData.secondCategory.id" class="radio-button">
              <input type="radio" :id="categoryData.secondCategory.id" name="grades" />
              <span class="custom-radio"></span>
            </label>
          </div>
        </li>
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
      categoryIcon,
      categoryData: {
        firstCategory: {
          name: '1차 카테고리',
          id: 1
        },
        secondCategory: {
          name: '2차 카테고리',
          id: 2
        }
      }
    }
  }
}
</script>

<style></style>
