<template>
  <div class="box__thumbnail">
    <img
      class="thumbnail__sm"
      :src="contentStore.contentObj.coverImg ? contentStore.contentObj.coverImg : ''"
      @error="handleImageError"
    />
    <div class="wrapper__thumbnail-content">
      <div class="box__input--content-title">
        <span class="text__contentTitle">{{ contentStore.contentObj.title }}</span>
        <button class="btn--transparent" @click="modalViewStore.showModal('editContentTitle')">
          <img :src="editIcon" />
        </button>
      </div>
      <span class="text__contentLink">{{ contentStore.contentObj.link }}</span>
    </div>
  </div>
</template>

<script setup>
import editIcon from '@/assets/ic/ic-edit.svg'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import defaultImg from '@/assets/img/img_default.png'
import { useContentStore } from '@/stores/useContentStore.ts'

const modalViewStore = useModalViewStore()
const contentStore = useContentStore()

const handleImageError = (event) => {
  event.target.src = defaultImg
}
</script>

<style></style>
