<template>
  <article class="flex-container__row item-container">
    <div class="thumbnail__wrapper">
      <img :src="item.coverImg" class="thumbnail" />
      <button class="button--transparent btn-favorite" @click="favoriteEvent()">
        <img :src="favoriteSelectedIcon" v-if="item.favorite" />
        <img :src="favoriteUnselectedIcon" v-if="!item.favorite" />
      </button>
    </div>
    <article class="item__wrapper">
      <h1>{{ item.title }}</h1>
      <p>{{ item.description }}</p>
      <footer class="flex-container__row">
        <img class="ic-category" :src="categoryIcon" />
        {{ item.category || '미지정' }}
        <img :src="divider" />
        {{ item.siteName }}
      </footer>
    </article>
    <button class="button--transparent btn--more"><img :src="moreIcon" /></button>
  </article>
</template>

<script setup>
import categoryIcon from '@/assets/img/category/img_category_watch.png'
import divider from '@/assets/img/divider_14px.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import favoriteSelectedIcon from '@/assets/ic/ic-favorite-seleted_32px.svg'
import favoriteUnselectedIcon from '@/assets/ic/ic-favorite-unseleted_32px.svg'
import { addFavorite } from '@/api/contents.js'
import { useContentStore } from '@/stores/useContentStore.ts'

const contentStore = useContentStore()

const props = defineProps({
  item: Object
})

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
</script>

<style></style>
