<template>
  <div class="box__thumbnail--multiple">
    <div class="box__thumbnail-img" @click="modalDataStore.checkLinkInMultipleLink(index)">
      <img
        class="thumbnail__sm"
        :src="contentStore.multipleContentList[index].coverImg"
        @error="handleImageError"
      />
      <!-- <img v-if="contentData.checked" class="thumbnail__checkbox" :src="checkboxOn" /> -->
      <button class="button__checkbox">
        <img :src="checkboxOff" v-if="!contentStore.multipleContentList[index].checked" />
        <img :src="checkboxOn" v-if="contentStore.multipleContentList[index].checked" />
      </button>
    </div>
    <div class="wrapper__thumbnail-content">
      <div class="box__input--content-title">
        <span class="text__contentTitle">{{ contentStore.multipleContentList[index].title }}</span>
        <button class="btn--transparent">
          <img :src="editIcon" @click="openEditContentTitleModal()" />
        </button>
      </div>
      <span class="text__contentLink">{{ contentStore.multipleContentList[index].link }}</span>
    </div>
  </div>
</template>

<script setup>
import checkboxOn from '@/assets/ic/ic-control-checkbox-on.svg'
import checkboxOff from '@/assets/ic/ic-control-checkbox-off.svg'
import editIcon from '@/assets/ic/ic-edit.svg'
import defaultImg from '@/assets/img/img_default.png'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'

const modalDataStore = useModalDataStore()
const modalViewStore = useModalViewStore()

const props = defineProps({
  index: Number
})

const contentStore = useContentStore()

const handleImageError = (event) => {
  event.target.src = defaultImg
}

const openEditContentTitleModal = () => {
  console.log('openEditContentTitle', props.index)
  contentStore.setFocusedContentIndex(props.index)
  modalViewStore.showModal('editContentTitle')
}
</script>

<style></style>
