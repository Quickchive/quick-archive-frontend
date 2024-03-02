<template>
  <div class="box__thumbnail--multiple">
    <div class="box__thumbnail-img" @click="modalDataStore.checkLinkInMultipleLink(index)">
      <img class="thumbnail__sm" :src="contentData.coverImg" @error="handleImageError" />
      <!-- <img v-if="contentData.checked" class="thumbnail__checkbox" :src="checkboxOn" /> -->
      <button class="button__checkbox">
        <img :src="checkboxOff" v-if="!contentData.checked" />
        <img :src="checkboxOn" v-if="contentData.checked" />
      </button>
    </div>
    <div class="wrapper__thumbnail-content">
      <div class="box__input--content-title">
        <span class="text__contentTitle">{{ contentData.title }}</span>
        <button class="btn--transparent">
          <img :src="editIcon" @click="openEditContentTitleModal()" />
        </button>
      </div>
      <span class="text__contentLink">{{ contentData.link }}</span>
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

const modalDataStore = useModalDataStore()
const modalViewStore = useModalViewStore()

const props = defineProps({
  contentData: Object,
  index: Number
})

const handleImageError = (event) => {
  event.target.src = defaultImg
}

const openEditContentTitleModal = () => {
  modalDataStore.setFocusedAddContentIndex(props.index)
  modalViewStore.openEditContentTitleModal()
}
</script>

<style></style>
