<template>
  <div class="flex-container__col--100">
    <title-header :title="title"></title-header>
    <div class="divider"></div>
    <!-- 검색 결과 -->
    <article class="flex-container__col search-container">
      <!-- 1. 콘텐츠 검색 결과 -->
      <section>
        <!-- 1.1 검색 결과 O -->
        <div class="contents-num__wrapper">콘텐츠 {{ contentListDummy.contents.length }}개</div>
        <template v-if="contentListDummy.contents.length !== 0">
          <div class="wrapper__searchResult-content">
            <article class="wrapper__searchResult-content-item">
              <div class="wrapper__searchResult-content-item">
                <div class="thumbnail__wrapper">
                  <img :src="contentListDummy.contents[0].coverImg" class="thumbnail" />
                  <button class="button--transparent btn-favorite" @click="favoriteEvent()">
                    <img :src="favoriteSelectedIcon" />
                    <!-- <img :src="favoriteUnselectedIcon" v-if="!item.favorite" /> -->
                  </button>
                </div>
                <article class="item__wrapper">
                  <h1>{{ contentListDummy.contents[0].title }}</h1>
                  <p>{{ contentListDummy.contents[0].description }}</p>
                  <footer class="flex-container__row">
                    <img class="ic-category" :src="categoryWatch" />
                    {{ contentListDummy.contents[0].category || '미지정' }}
                    <img :src="dividerIcon" />
                    {{ contentListDummy.contents[0].siteName }}
                  </footer>
                </article>
                <button class="button--transparent btn--more"><img :src="moreIcon" /></button>
              </div>
            </article>
            <!-- 메모 -->
            <article class="searhResult-content-memo">
              <h1 class="searhResult-content-memo__title">메모</h1>
              <p class="searhResult-content-memo__content">
                공간의 이름과 걸맞게 따뜻하고 포근한 햇빛에 광합성 하기 좋은 보태니컬 무드를 가진
                망원동의 광합성 카페는 햇살과 잘 어울리고 재지하면서도 감성적인 무드의 곡들이 잘
                어울릴 것 같아요. 여유로우면서도 트렌디한 망원동의 무드와 광합성 카페의 브런치들과
                잘 어울리는 플레이리스트를 추천해 드릴게요!공간의 이름과 걸맞게 따뜻하고 포근한
                햇빛에 광합성 하기 좋은 보태니컬 무드를 가진 망원동의 광합성 카페는 햇살과 잘
                어울리고 재지하면서도 감성적인 무드의 곡들이 잘 어울릴 것 같아요. 여유로우면서도
                트렌디한 망원동의 무드와 광합성 카페의 브런치들과 잘 어울리는 플레이리스트를 추천해
                드릴게요!
              </p>
              <button class="searchResult-content-memo__button">
                더보기<img :src="viewMoreIcon" />
              </button>
            </article>
          </div>
          <!-- 더보기 버튼 -->
          <div class="wrapper__show-more-button">
            <button>더보기</button>
          </div>
        </template>
        <!-- 1.2 검색 결과 X -->
        <template v-if="contentListDummy.contents.length === 0">
          <div class="flex-container__col contents__empty">
            <img :src="emptyContentImg" class="img-empty" />
            <span>저장된 콘텐츠가 없습니다.</span>
          </div>
        </template>
        <!-- 2. 카테고리 검색 결과 -->
      </section>
      <div class="searchpage-divider"></div>
      <section>
        <div class="contents-num__wrapper">카테고리 {{ categoryListDummy.length }}개</div>
        <!-- 2.1 검색 결과 O -->
        <template v-if="categoryListDummy.length !== 0">
          <div class="wrapper__searchResult-category">
            <article class="wrapper__searchResult-category-item">
              <div class="searchResult-category-item">
                <img :src="categoryWatch" class="img-search-category-result" />
                <div class="searchResult-category-text-box">
                  <h1 class="searchResult-category-title">서울 브런치 카페 7곳 추천</h1>
                  <div class="searchResult-category-detail">
                    <!-- 카테고리 위치 -->
                    <span>요리 레시피 </span>
                    <img :src="nextIcon" class="icon-ex-small" />
                    <span>양식</span>
                    <img :src="dividerIcon" />
                    <span>454개 콘텐츠</span>
                  </div>
                </div>
              </div>
              <button class="button--transparent"><img :src="moreIcon" /></button>
            </article>
            <!------->
            <article class="wrapper__searchResult-category-item">
              <div class="searchResult-category-item">
                <img :src="categoryWatch" class="img-search-category-result" />
                <div class="searchResult-category-text-box">
                  <h1 class="searchResult-category-title">서울 브런치 카페 7곳 추천</h1>
                  <div class="searchResult-category-detail">
                    <!-- 카테고리 위치 -->
                    <span>요리 레시피 </span>
                    <img :src="nextIcon" class="icon-ex-small" />
                    <span>양식</span>
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
            <button>더보기</button>
          </div>
        </template>
        <!-- 2.2 검색 결과 X -->
        <template v-if="categoryListDummy.length === 0">
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
import TitleHeader from '../header/TitleHeader.vue'
import { ref } from 'vue'
import { useSearchStore } from '@/stores/useSearchStore.ts'
import emptyContentImg from '@/assets/img/img_empty_nocontent.png'
import emptyCategoryImg from '@/assets/img/img_empty_nocategory.png'
import contentListDummy from '@/assets/model/contentList.json'
import categoryListDummy from '@/assets/model/categoryList.json'
import ContentsItem from '@/components/home/ContentsItem.vue'
import categoryWatch from '@/assets/img/category/img_category_watch.png'
import dividerIcon from '@/assets/ic/divider_14px.svg'
import nextIcon from '@/assets/ic/ic_next_gray_24px.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import favoriteSelectedIcon from '@/assets/ic/ic-favorite-seleted_32px.svg'
import favoriteUnselectedIcon from '@/assets/ic/ic-favorite-unseleted_32px.svg'
import viewMoreIcon from '@/assets/ic/ic_view-more.svg'

const keyword = ref('')
const title = `${keyword.value} 검색 결과`

const searchStore = useSearchStore()
</script>

<style></style>
