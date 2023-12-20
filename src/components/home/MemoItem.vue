<template>
  <article v-if="props.comment" class="searhResult-content-memo">
    <h1 class="searhResult-content-memo__title">메모</h1>
    <p
      class="searhResult-content-memo__content"
      ref="paragraphElement"
      :class="{ hideMemo: !isMemoShowAll }"
    >
      {{ props.comment }}
    </p>
    <button class="searchResult-content-memo__button" v-if="isMemoShowAll" @click="toggleMemo()">
      접기<img :src="viewFoldIcon" />
    </button>
    <button
      class="searchResult-content-memo__button"
      v-if="paragraphHeight >= 44 && !isMemoShowAll"
      @click="toggleMemo()"
    >
      더보기<img :src="viewMoreIcon" />
    </button>
  </article>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const isMemoShowAll = ref(false)
const paragraphElement = ref(null)
const paragraphHeight = ref(22)
import viewMoreIcon from '@/assets/ic/ic_view-more.svg'
import viewFoldIcon from '@/assets/ic/ic_view-fold.svg'

const props = defineProps({
  comment: String
})

onMounted(() => {
  if (paragraphElement.value) {
    const computedStyle = window.getComputedStyle(paragraphElement.value)
    paragraphHeight.value = parseInt(computedStyle.height, 10)
  }
})

const toggleMemo = () => {
  isMemoShowAll.value = !isMemoShowAll.value
}
</script>

<style></style>
