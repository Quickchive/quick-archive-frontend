<template>
  <article class="contents-item">
    <div class="item-container">
      <div class="thumbnail__wrapper">
        <a :href="item.link" target="_blank">
          <img
            :src="item.coverImg ? item.coverImg : ''"
            class="thumbnail"
            @error="handleImageError"
          />
        </a>
        <button class="btn--transparent btn-favorite" @click="favoriteEvent()">
          <img :src="favoriteSelectedIcon" v-if="item.favorite" />
          <img :src="favoriteUnselectedIcon" v-if="!item.favorite" />
        </button>
      </div>
      <footer class="item__wrapper">
        <a :href="item.link" target="_blank">
          <h1>
            {{ item.title }}
          </h1>
          <p>{{ item.description }}</p>
        </a>
        <footer class="flex-container__row">
          <div id="thumbnail-category" @click="toCategoryPage()">
            <img
              v-if="item.category"
              class="ic-category"
              :src="categoryStore.getCategoryImgByIconName(item.category.iconName)"
            />
            {{ item.category ? item.category.name : '전체 콘텐츠' }}
          </div>
          <a v-if="item.siteName" :href="item.link" target="_blank">
            <img :src="divider" />
            {{ item.siteName }}
          </a>
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
        >
        </more-button>
        <div
          v-if="contentStore.moreBtnContentIdTree[item.id]"
          @click="hideButton(item.id)"
          class="outside-click-area"
        ></div>
      </button>
    </div>
  </article>
  <!-- 메모 -->
  <memo-item :comment="item.comment"></memo-item>
</template>

<script setup>
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
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { getHideAlertFromCookie } from '@/utils/cookies.js'
import defaultImg from '@/assets/img/img_default.png'
import { useToastStore } from '@/stores/useToastStore.ts'

const modalViewStore = useModalViewStore()
const contentStore = useContentStore()
const categoryStore = useCategoryStore()
const toastStore = useToastStore()

const router = useRouter()
const props = defineProps({
  item: Object
})

const favoriteEvent = async () => {
  try {
    const response = await addFavorite(props.item.id)
    if (response.status === 200) {
      // eslint-disable-next-line vue/no-mutating-props
      props.item.favorite = !props.item.favorite // 즐겨찾기 상태 업데이트
    }
  } catch (error) {
    console.error('즐겨찾기 토글 오류:', error)
  }
}

const toCategoryPage = () => {
  if (props.item.category !== null) {
    categoryStore.setCategoryName(props.item.category.name)
    router.push(`/main/detail/${props.item.category.id}`)
  } else {
    categoryStore.setUnselectedContentChip(true)
    // router.push(`/home`)
  }
}

const btnList = [
  {
    name: '수정하기',
    clickEvent: () => modalViewStore.showModalWithOverlay('editContentDetail', 'default')
  },
  {
    name: '공유하기',
    clickEvent: () => copyLinkToClipboard()
  },
  {
    name: '삭제하기',
    clickEvent: () =>
      getHideAlertFromCookie()
        ? contentStore.deleteContent()
        : modalViewStore.openDeleteContentModal()
  }
]

/* 공유하기 */
const copyLinkToClipboard = async () => {
  const contentLink = contentStore.contentObj.link

  try {
    await navigator.clipboard.writeText(contentLink)

    const toastData = {
      message: 'URL이 복사되었습니다.',
      func: {
        message: ''
      }
    }
    toastStore.executeDefaultToast(toastData)
  } catch (err) {
    console.error('복사 실패:', err)
  }
}

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
  console.log(contentData)
  contentStore.moreBtnContentIdTree = excludeItem(contentStore.moreBtnContentIdTree, contentData.id)
  contentStore.setFocusedContent(contentData)
  categoryStore.setParentCategory(contentData.category)
}

const handleImageError = (event) => {
  event.target.src = defaultImg
}

const hideButton = (id) => {
  console.log('hide')
  contentStore.value.moreBtnContentIdTree[id] = false
}
</script>
<style></style>
