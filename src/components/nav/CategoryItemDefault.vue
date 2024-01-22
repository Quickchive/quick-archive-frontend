<template>
  <div class="category-item">
    <!-- 전체 콘텐츠 -->
    <ul class="category-list__first-ul">
      <li>
        <div class="category-item__btn__wrapper">
          <button class="btn--transparent expand-button" @click="controlAllCategory()">
            <img v-if="allCategory.show" :src="expandLessIcon" />
            <img v-if="!allCategory.show" :src="expandMoreIcon" />
          </button>
          <button class="btn--transparent category-list__button btn-26">전체 콘텐츠</button>
        </div>
      </li>
      <ul v-if="allCategory.show" class="category-list__second-ul">
        <!-- 즐겨찾기한 콘텐츠 -->
        <li>
          <div class="category-item__btn__wrapper">
            <button class="btn--transparent expand-button">
              <img :src="expandMoreIcon" />
            </button>
            <button class="btn--transparent category-list__btn btn-26">즐겨찾기한 콘텐츠</button>
          </div>
        </li>
        <!-- 미지정 콘텐츠 -->
        <li>
          <div class="category-item__btn__wrapper">
            <button class="btn--transparent expand-button">
              <img :src="expandMoreIcon" />
            </button>
            <button class="btn--transparent category-list__btn btn-26">카테고리 미지정</button>
          </div>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script setup>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import { reactive } from 'vue'

const allCategory = reactive({ show: true })

const controlAllCategory = () => {
  allCategory.show = !allCategory.show
}
</script>

<style></style>
