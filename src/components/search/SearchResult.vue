<template>
  <div class="flex-container__col--100">
    <header class="titleHeader">
      <h1>{{ searchStore.keyword }} 검색 결과</h1>
    </header>
    <div class="divider"></div>
    <!-- 검색 결과 -->
    <article class="flex-container__col search-container">
      <!-- 1. 콘텐츠 검색 결과 -->
      <section>
        <!-- 1.1 검색 결과 O -->
        <div class="contents-num__wrapper">콘텐츠 {{ searchStore.searchedContentCount }}개</div>
        <template v-if="searchStore.searchedContent !== undefined">
          <div
            class="wrapper__searchResult-content"
            v-for="content in searchStore.searchedContent"
            :key="content.id"
          >
            <ContentsItem :item="content"></ContentsItem>
          </div>
          <!-- 더보기 버튼 -->
          <div
            v-if="
              searchStore.searchedContent !== undefined && searchStore.searchedContent.length >= 6
            "
            class="wrapper__show-more-button"
          >
            <button>더보기</button>
          </div>
        </template>
        <!-- 1.2 검색 결과 X -->
        <template v-if="searchStore.searchedContentCount === 0 || searchStore.keyword === ''">
          <div class="flex-container__col contents__empty">
            <img :src="emptyContentImg" class="img-empty" />
            <span>저장된 콘텐츠가 없습니다.</span>
          </div>
        </template>
        <!-- 2. 카테고리 검색 결과 -->
      </section>
      <div class="searchpage-divider"></div>
      <section>
        <div class="contents-num__wrapper">카테고리 {{ searchStore.searchedCategoryCount }}개</div>
        <!-- 2.1 검색 결과 O -->
        <template v-if="searchStore.searchedCategory !== undefined">
          <div
            class="wrapper__searchResult-category"
            v-for="category in searchStore.searchedCategory"
            :key="category.id"
          >
            <article class="wrapper__searchResult-category-item">
              <div class="searchResult-category-item">
                <img
                  :src="categoryAddStore.getCategoryImgByIconName(category.iconName)"
                  class="img-search-category-result"
                />
                <!-- 1차 카테고리만 존재 -->
                <div class="searchResult-category-text-box" v-if="category.parentId === null">
                  <h1 class="searchResult-category-title">{{ category.name }}</h1>
                  <div class="searchResult-category-detail">
                    <!-- 카테고리 위치 -->
                    <span>454개 콘텐츠</span>
                  </div>
                </div>
                <!-- 1차 카테고리 && 2차 카테고리 존재 -->
                <div
                  class="searchResult-category-text-box"
                  v-if="category.parentId !== null && category.children"
                >
                  <h1 class="searchResult-category-title">{{ category.name }}</h1>
                  <div class="searchResult-category-detail">
                    <!-- 카테고리 위치 -->
                    <span>{{ categoryStore.getCategoryDepth2NameById(category.parentId) }} </span>
                    <img :src="dividerIcon" />
                    <span>454개 콘텐츠</span>
                  </div>
                </div>
                <!-- 1차 카테고리 && 2차 카테고리 && 3차 카테고리 존재 -->
                <div
                  class="searchResult-category-text-box"
                  v-if="
                    category.parentId !== null && categoryStore.isCategoryDepth3(category.parentId)
                  "
                >
                  <h1 class="searchResult-category-title">{{ category.name }}</h1>
                  <div class="searchResult-category-detail">
                    <!-- 카테고리 위치 -->
                    <span>{{ categoryStore.getCategoryDepth3NameById(category.parentId) }} </span>
                    <img :src="nextIcon" class="icon-ex-small" />
                    <span>{{ categoryStore.getCategoryDepth2NameById(category.parentId) }}</span>
                    <img :src="dividerIcon" />
                    <span>454개 콘텐츠</span>
                  </div>
                </div>
              </div>
              <button class="button--transparent"><img :src="moreIcon" /></button>
            </article>
          </div>
          <!-- 더보기 버튼 -->
          <div class="wrapper__show-more-button">
            <button
              v-if="
                searchStore.searchedCategory !== undefined &&
                searchStore.searchedCategory.length >= 6
              "
            >
              더보기
            </button>
          </div>
        </template>
        <!-- 2.2 검색 결과 X -->
        <template v-if="searchStore.searchedCategoryCount === 0 || searchStore.keyword === ''">
          <div class="flex-container__col contents__empty">
            <img :src="emptyCategoryImg" class="img-empty" />
            <span>생성된 카테고리가 없습니다.</span>
          </div>
        </template>
      </section>
    </article>
  </div>
</template>

<script setup>
import { useSearchStore } from '@/stores/useSearchStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useCategoryAddStore } from '@/stores/useCategoryAddStore.ts'
import emptyContentImg from '@/assets/img/img_empty_nocontent.png'
import emptyCategoryImg from '@/assets/img/img_empty_nocategory.png'
import dividerIcon from '@/assets/ic/divider_14px.svg'
import nextIcon from '@/assets/ic/ic_next_gray_24px.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import { getCategoryIdWithKeyword, getContentIdWithKeyword } from '@/utils/search.js'
import { toRaw } from 'vue'
import ContentsItem from '@/components/home/ContentsItem.vue'

const searchStore = useSearchStore()
const categoryStore = useCategoryStore()
const contentStore = useContentStore()
const categoryAddStore = useCategoryAddStore()

searchStore.$subscribe(() => {
  if (searchStore.keyword.value !== '') {
    // 카테고리
    searchStore.searchedCategory = getCategoryIdWithKeyword(
      searchStore.keyword,
      categoryStore.userCategoryList
    )

    if (searchStore.searchedCategory !== undefined) {
      searchStore.searchedCategoryCount = searchStore.searchedCategory.length
    }

    // 콘텐츠
    searchStore.searchedContent = toRaw(
      getContentIdWithKeyword(searchStore.keyword, contentStore.userContentList)
    )

    if (searchStore.searchedContent !== undefined) {
      searchStore.searchedContentCount = searchStore.searchedContent.length
    }
  }
})
</script>

<style></style>
