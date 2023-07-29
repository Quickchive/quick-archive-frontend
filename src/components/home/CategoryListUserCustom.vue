<template>
  <div class="category-list__container">
    <!-- 사용자 지정 카테고리-->
    <ul class="category-list__top-ul">
      <li>
        <button class="button--transparent expand-button">
          <img :src="expandMoreIcon" />
        </button>
        <button class="button--transparent category-list__button">
          <img :src="categoryIcon" class="category-icon" />
          쇼핑
        </button>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
    </ul>
    <ul class="category-list__top-ul">
      <li>
        <button class="button--transparent expand-button">
          <img :src="expandMoreIcon" />
        </button>

        <button class="button--transparent category-list__button">
          <img :src="categoryIcon" class="category-icon" />꿀팁
        </button>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
    </ul>
    <ul class="category-list__top-ul">
      <li>
        <button class="button--transparent expand-button">
          <img :src="expandMoreIcon" />
        </button>

        <button class="button--transparent category-list__button">
          <img :src="categoryIcon" class="category-icon" />여행가자~~
        </button>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
    </ul>
    <ul class="category-list__top-ul">
      <li>
        <button class="button--transparent expand-button">
          <img :src="expandLessIcon" />
        </button>
        <button class="button--transparent category-list__button">
          <img :src="categoryIcon" class="category-icon" />
          카테고리명이 해당 영역 넘...
        </button>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
      <ul>
        <li>
          <button class="button--transparent expand-button">
            <img :src="expandLessIcon" />
          </button>

          <button class="button--transparent category-list__button">
            <img :src="categoryIcon" class="category-icon" />카테고리명이 해당 영...
          </button>
          <button class="button--transparent"><img :src="moreIcon" /></button>
        </li>
      </ul>
    </ul>
    <ul class="category-list__top-ul">
      <li>
        <button class="button--transparent expand-button">
          <img :src="expandMoreIcon" />
        </button>
        <button class="button--transparent category-list__button">
          <img :src="categoryIcon" class="category-icon" />피아노 악보
        </button>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
    </ul>
    <ul class="category-list__top-ul">
      <li>
        <button class="button--transparent expand-button">
          <img :src="expandMoreIcon" />
        </button>
        <button class="button--transparent category-list__button">
          <img :src="categoryIcon" class="category-icon" />
          과학
        </button>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
    </ul>
    <ul class="category-list__top-ul">
      <li>
        <button class="button--transparent expand-button">
          <img :src="expandMoreIcon" />
        </button>
        <button class="button--transparent category-list__button">
          <img :src="categoryIcon" class="category-icon" />
          강연자료
        </button>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
    </ul>
    <ul class="category-list__top-ul">
      <li>
        <button class="button--transparent expand-button">
          <img :src="expandMoreIcon" />
        </button>
        <button class="button--transparent category-list__button">
          <img :src="categoryIcon" class="category-icon" />
          워케이션
        </button>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
    </ul>
    <ul class="category-list__top-ul">
      <li>
        <button class="button--transparent expand-button">
          <img :src="expandMoreIcon" />
        </button>
        <button class="button--transparent category-list__button">
          <img :src="categoryIcon" class="category-icon" />
          부모님 선물 리스트
        </button>
        <button class="button--transparent"><img :src="moreIcon" /></button>
      </li>
    </ul>
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
