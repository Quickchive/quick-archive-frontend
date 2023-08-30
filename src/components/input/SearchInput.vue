<template>
  <div class="search-container">
    <img :src="naviSearch" />
    <input class="input__naviSearch" :placeholder="placeholderText" />
  </div>
</template>

<script>
import naviSearch from '@/assets/ic/ic-navi-search-unselected.svg'

export default {
  props: {
    placeholderText: String
  },
  data() {
    return {
      naviSearch
    }
  }
}
</script>

<style></style>
