<template>
  <div class="category-item">
    <!-- 전체 콘텐츠 -->
    <ul class="category-list__first-ul">
      <li>
        <div class="flex-container__row--align-center">
          <button class="button--transparent expand-button">
            <img :src="expandLessIcon" />
          </button>
          <button class="button--transparent category-list__button">전체 콘텐츠</button>
        </div>
      </li>
      <ul>
        <!-- 즐겨찾기한 콘텐츠 -->
        <li>
          <div class="flex-container__row--align-center">
            <button class="button--transparent expand-button">
              <img :src="expandMoreIcon" />
            </button>
            <button class="button--transparent category-list__button">즐겨찾기한 콘텐츠</button>
          </div>
        </li>
        <!-- 미지정 콘텐츠 -->
        <li>
          <div class="flex-container__row--align-center">
            <button class="button--transparent expand-button">
              <img :src="expandMoreIcon" />
            </button>
            <button class="button--transparent category-list__button">카테고리 미지정</button>
          </div>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'

export default {
  data() {
    return {
      expandMoreIcon,
      expandLessIcon
    }
  }
}
</script>

<style></style>
