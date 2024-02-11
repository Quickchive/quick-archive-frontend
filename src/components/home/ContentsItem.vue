<template>
  <article class="contents-item">
    <div class="item-container">
      <div class="thumbnail__wrapper">
        <img :src="item.coverImg" class="thumbnail" />
        <button class="btn--transparent btn-favorite" @click="favoriteEvent()">
          <img :src="favoriteSelectedIcon" v-if="item.favorite" />
          <img :src="favoriteUnselectedIcon" v-if="!item.favorite" />
        </button>
      </div>
      <footer class="item__wrapper">
        <h1>{{ item.title }}</h1>
        <p>{{ item.description }}</p>
        <footer class="flex-container__row">
          <div id="thumbnail-category" @click="toCategoryPage(item.category.id)">
            <img class="ic-category" :src="categoryIcon" />
            {{ item.category ? item.category.name : '미지정' }}
          </div>
          <img :src="divider" />
          {{ item.siteName }}
        </footer>
      </footer>
    </div>
    <div class="contents-item__btn__wrapper">
      <button class="moreButton" @click="showMoreButton(item)">
        <img :src="moreIcon" class="btn-32" />
        <!-- 더보기 버튼 -->
        <more-button
          v-if="contentStore.moreBtnContentIdTree[item.id]"
          :btnList="btnList"
          class="more-button--contents"
        ></more-button>
      </button>
    </div>
  </article>
  <!-- 메모 -->
  <memo-item :comment="item.comment"></memo-item>
</template>

<script setup>
import categoryIcon from '@/assets/img/category/img_category_watch.png'
import divider from '@/assets/img/divider_14px.svg'
import moreIcon from '@/assets/ic/ic_more-32px.svg'
import MoreButton from '@/components/button/MoreButton.vue'
import favoriteSelectedIcon from '@/assets/ic/ic-favorite-seleted_32px.svg'
import favoriteUnselectedIcon from '@/assets/ic/ic-favorite-unseleted_32px.svg'
import { addFavorite } from '@/api/contents.js'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useRouter } from 'vue-router'
import MemoItem from '@/components/home/MemoItem.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { getHideAlertFromCookie } from '@/utils/cookies.js'

const modalViewStore = useModalViewStore()
const contentStore = useContentStore()
const router = useRouter()
const props = defineProps({
  item: Object
})

const favoriteEvent = async () => {
  try {
    const response = await addFavorite(props.item.id)
    console.log(response)
    if (response.statusCode === 201) {
      contentStore.fetchContents()
    }
  } catch (error) {
    console.log(error)
  }
}

const toCategoryPage = async (categoryId) => {
  router.push(`/home/${categoryId}`)
}

const btnList = [
  {
    name: '편집하기',
    clickEvent: () => modalViewStore.openEditCategoryModal()
  },
  {
    name: '공유하기',
    clickEvent: () => modalViewStore.openShareContentModal()
  },
  {
    name: '삭제하기',
    clickEvent: () =>
      getHideAlertFromCookie()
        ? contentStore.deleteContent()
        : modalViewStore.openDeleteContentModal()
  }
]

const excludeItem = (obj, excludedKey) => {
  let result = {}

  for (let key in obj) {
    if (key == excludedKey) {
      result[key] = !obj[key]
    } else {
      result[key] = false
    }
  }
  return result
}

const showMoreButton = (contentData) => {
  contentStore.moreBtnContentIdTree = excludeItem(contentStore.moreBtnContentIdTree, contentData.id)
  contentStore.setFocusedContent(contentData.id)
  contentStore.setFocusedContentData(contentData)
}
</script>
<style></style>
