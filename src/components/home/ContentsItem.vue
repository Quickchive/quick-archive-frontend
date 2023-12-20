<template>
  <article class="flex-container__row item-container">
    <div class="thumbnail__wrapper">
      <img :src="item.coverImg" class="thumbnail" />
      <button class="button--transparent btn-favorite" @click="favoriteEvent()">
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
    <button class="button--transparent btn--more"><img :src="moreIcon" /></button>
  </article>
  <!-- 메모 -->
  <memo-item :comment="comment"></memo-item>
</template>

<script setup>
import categoryIcon from '@/assets/img/category/img_category_watch.png'
import divider from '@/assets/img/divider_14px.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import favoriteSelectedIcon from '@/assets/ic/ic-favorite-seleted_32px.svg'
import favoriteUnselectedIcon from '@/assets/ic/ic-favorite-unseleted_32px.svg'
import { addFavorite } from '@/api/contents.js'
import { useContentStore } from '@/stores/useContentStore.ts'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import MemoItem from '@/components/home/MemoItem.vue'

const contentStore = useContentStore()
const router = useRouter()

const props = defineProps({
  item: Object
})

const comment = ref(props.item.comment)

const favoriteEvent = async () => {
  try {
    const response = await addFavorite(props.item.id)
    console.log(response)
    if (response.statusCode === 201) {
      contentStore.getContents()
    }
  } catch (error) {
    console.log(error)
  }
}

const toCategoryPage = (categoryId) => {
  router.push(`/home/${categoryId}`)
}
</script>
<style></style>
