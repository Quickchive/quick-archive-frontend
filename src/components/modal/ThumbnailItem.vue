<template>
  <div class="box__thumbnail">
    <img
      class="thumbnail__sm"
      :src="modalDataStore.addContentData.coverImg"
      @error="handleImageError"
    />
    <div class="wrapper__thumbnail-content">
      <div class="box__input--content-title">
        <span class="text__contentTitle">{{ modalDataStore.addContentData.title }}</span>
        <button class="btn--transparent" @click="modalViewStore.showModal('editContentTitle')">
          <img :src="editIcon" />
        </button>
      </div>
      <span class="text__contentLink">{{ modalDataStore.addContentData.link }}</span>
    </div>
  </div>
</template>

<script setup>
import editIcon from '@/assets/ic/ic-edit.svg'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import defaultImg from '@/assets/img/img_default.png'

const modalDataStore = useModalDataStore()
const modalViewStore = useModalViewStore()

const handleImageError = (event) => {
  event.target.src = defaultImg
}
</script>

<style></style>
