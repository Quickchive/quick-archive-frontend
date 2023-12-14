<template>
  <div :class="isSizeSm ? 'search-container--sm' : 'search-container--lg'" class="search-bar">
    <img class="img-navi-search" :src="naviSearch" />
    <input
      class="input__naviSearch"
      :placeholder="props.placeholderText"
      :value="searchStore.keyword"
      @input="setKeyword"
    />
    <button v-show="isInputValid" class="button-clear" @click="searchStore.$reset()">
      <img :src="textfieldCancelIcon" />
    </button>
  </div>
</template>

<script setup>
import naviSearch from '@/assets/ic/ic-navi-search-unselected.svg'
import { computed } from 'vue'
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import { useSearchStore } from '@/stores/useSearchStore.ts'
const searchStore = useSearchStore()

const props = defineProps({
  placeholderText: String,
  isSizeSm: Boolean
})

// 카테고리 명 유효성 검사
const isInputValid = computed(() => {
  return searchStore.keyword.length >= 1 ? true : false
})

const setKeyword = (e) => {
  console.log(e.target.value)
  searchStore.keyword = e.target.value
}
</script>

<style></style>
