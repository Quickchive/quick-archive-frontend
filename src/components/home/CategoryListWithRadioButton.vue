<template>
  <div class="category-list__container">
    <!-- <div class="category-list__divider"></div> -->
    <!-- 사용자 지정 카테고리-->
    <ul class="category-list-radio__top-ul">
      <li>
        <button class="category-list-radio__category-button">
          <img class="ic__expandMore" :src="expandMoreIcon" />
          <img class="ic__category" :src="categoryIcon" />
          <span>쇼핑</span>
        </button>
        <div class="radio-buttons-1">
          <label for="grade-1" class="radio-button">
            <input type="radio" id="grade-1" name="grades" />
            <span class="custom-radio"></span>
          </label>
        </div>
      </li>
    </ul>
    <ul class="category-list-radio__top-ul">
      <li>
        <button class="category-list-radio__category-button">
          <img class="ic__expandMore" :src="expandMoreIcon" />
          <img class="ic__category" :src="categoryIcon" />
          ㅇㅇ
        </button>
        <div class="radio-buttons-1">
          <label for="grade-1" class="radio-button">
            <input type="radio" id="grade-1" name="grades" />
            <span class="custom-radio"></span>
          </label>
        </div>
      </li>
    </ul>
    <!-- <ul class="category-list-radio__top-ul">
      <li>
        <button class="category-list-radio__category-button">
          <img class="ic__expandMore" :src="expandLessIcon" />
          <img class="ic__category" :src="categoryIcon" />
          카테고리명이 해당 영역 넘...
        </button>
        <div class="radio-buttons-1">
          <label for="grade-1" class="radio-button">
            <input type="radio" id="grade-1" name="grades" />
            <span class="custom-radio"></span>
          </label>
        </div>
      </li> -->
    <!-- <ul>
        <li>
          <button class="button--transparent expand-button">
            <img :src="expandLessIcon" />
          </button>
          <button class="button--transparent category-list__button">
            <img :src="categoryIcon" class="category-icon" />카테고리명이 해당 영...
          </button>
          <div class="radio-buttons-1">
            <label for="grade-1" class="radio-button">
              <input type="radio" id="grade-1" name="grades" />
              <span class="custom-radio"></span>
            </label>
          </div>
        </li>
      </ul> -->
    <!-- </ul> -->
  </div>
</template>

<script>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import categoryIcon from '@/assets/ic/ic-category-list.png'

export default {
  data() {
    return {
      expandMoreIcon,
      expandLessIcon,
      moreIcon,
      categoryIcon
    }
  }
}
</script>

<style></style>
