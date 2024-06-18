<template>
  <div :class="isSizeSm ? 'search-container--sm' : 'search-container--lg'" class="search-bar">
    <img class="img-navi-search" :src="naviSearch" />
    <input
      class="input__naviSearch"
      :placeholder="props.placeholderText"
      :value="props.location"
      @input="setKeyword"
      ref="input"
    />
    <button v-show="isInputValid" class="button-clear" @click="reset()">
      <img :src="textfieldCancelIcon" />
    </button>
  </div>
</template>

<script setup>
import naviSearch from '@/assets/ic/ic-navi-search-unselected.svg'
import { computed, ref } from 'vue'
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import { useSearchStore } from '@/stores/useSearchStore.ts'
import { useRouter } from 'vue-router'
import { isHangul, checkHangulCompletion } from '@/utils/search.js'

const searchStore = useSearchStore()
const router = useRouter()
const input = ref(null)

const props = defineProps({
  keyword: String,
  location: String,
  placeholderText: String,
  isSizeSm: Boolean,
  searchEvent: Function
})

// 카테고리 명 유효성 검사
const isInputValid = computed(() => {
  if (props.keyword === 'main') {
    return searchStore.keyword.main.length >= 1 ? true : false
  } else {
    return searchStore.keyword.modal.length >= 1 ? true : false
  }
})

const setKeyword = (e) => {
  // 1. 메인 검색 인풋(카테고리명 + 콘텐츠 검색)
  if (props.keyword === 'main') {
    console.log(e.target.value)
    searchStore.keyword.main = e.target.value
    // 한글인 경우 조합이 완성되었을 때만 검색 요청을 보낸다.
    if (isHangul(e.target.value)) {
      if (checkHangulCompletion(e.target.value)) {
        searchStore.searchEvent()
        router.push('/home/search')
      }
    }
    // 영문 검색
    else {
      searchStore.searchEvent()
      router.push('/home/search')
    }
  }
  // 2. 모달 검색 인풋(카테고리 명 검색)
  else if (props.keyword === 'modal') {
    searchStore.keyword.modal = e.target.value
    // 한글인 경우 조합이 완성되었을 때만 검색 요청을 보낸다.
    if (isHangul(e.target.value)) {
      if (checkHangulCompletion(e.target.value)) {
        searchStore.searchCategoryEvent()
      }
    }
    // 영문 검색
    else {
      searchStore.searchCategoryEvent()
    }
  }
}

const reset = () => {
  if (input.value) {
    input.value.focus()
  }
  if (props.keyword === 'main') {
    searchStore.keyword.main = ''
    searchStore.searchedCategoryCount = 0
    searchStore.searchedContentCount = 0
    searchStore.searchedCategory = []
    searchStore.searchedContent = []
  } else if (props.keyword === 'modal') {
    searchStore.keyword.modal = ''
  }
}
</script>

<style></style>
