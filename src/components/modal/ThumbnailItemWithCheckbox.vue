<template>
  <div class="box__thumbnail">
    <div class="box__thumbnail-img">
      <img class="thumbnail__sm" :src="thumbnail" />
      <!-- <img class="thumbnail__checkbox" :src="checkboxOn" /> -->
      <button class="button__checkbox">
        <img :src="checkboxOff" />
      </button>
    </div>
    <div class="wrapper__thumbnail-content">
      <div class="box__input--content-title">
        <span class="text__contentTitle">{{ contentTitle }}</span>
        <button class="button--transparent"><img :src="editIcon" /></button>
      </div>
      <span class="text__contentLink">{{ contentLink }}</span>
    </div>
  </div>
</template>

<script>
import thumbnail from '@/assets/img/thumbnail-sm.png'
import editIcon from '@/assets/ic/ic-edit.svg'
import checkboxOn from '@/assets/ic/ic-control-checkbox-on.svg'
import checkboxOff from '@/assets/ic/ic-control-checkbox-off.svg'

export default {
  data() {
    return {
      thumbnail,
      editIcon,
      checkboxOn,
      checkboxOff,
      contentTitle:
        '작은집으로 이사가야 해서 미니멀리즘을 열...' /*'작은집으로 이사가야 해서 미니멀리즘을 열심히 실천한다',*/,
      contentLink: 'https://brunch.co.kr/@21d3b3e76882478/32'
    }
  }
}
</script>

<style></style>
