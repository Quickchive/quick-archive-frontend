<template>
  <div :class="isSizeSm ? 'search-container--sm' : 'search-container--lg'" class="search-container">
    <img class="img-navi-search" :src="naviSearch" />
    <input class="input__naviSearch" :placeholder="props.placeholderText" v-model="searchText" />
    <button v-show="isInputValid" class="button-clear" @click="clearSearchText()">
      <img :src="textfieldCancelIcon" />
    </button>
  </div>
</template>

<script setup>
import naviSearch from '@/assets/ic/ic-navi-search-unselected.svg'
import { ref, computed } from 'vue'
import { defineProps } from 'vue'
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'

const searchText = ref('')

const props = defineProps({
  placeholderText: String,
  isSizeSm: Boolean
})

// 카테고리 명 유효성 검사
const isInputValid = computed(() => {
  return 1 <= searchText.value.length ? true : false
})

const clearSearchText = () => {
  searchText.value = ''
}
</script>

<style></style>
