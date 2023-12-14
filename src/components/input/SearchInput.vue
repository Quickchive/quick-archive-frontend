<template>
  <div :class="isSizeSm ? 'search-container--sm' : 'search-container--lg'" class="search-bar">
    <img class="img-navi-search" :src="naviSearch" />
    <input
      class="input__naviSearch"
      :placeholder="props.placeholderText"
      v-model="searchStore.keyword"
    />
    <button v-show="isInputValid" class="button-clear" @click="searchStore.$reset()">
      <img :src="textfieldCancelIcon" />
    </button>
  </div>
</template>

<script setup>
import naviSearch from '@/assets/ic/ic-navi-search-unselected.svg'
import { ref, computed } from 'vue'
// import { defineProps } from 'vue'
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import { useSearchStore } from '@/stores/useSearchStore.ts'
const searchStore = useSearchStore()

// const searchText = ref('')
// const searchText = ref(searchStore.keyword)

const props = defineProps({
  placeholderText: String,
  isSizeSm: Boolean
})

// 카테고리 명 유효성 검사

const isInputValid = computed(() => {
  return searchStore.keyword.length >= 1 ? true : false
})
</script>

<style></style>
