<template>
  <div class="box__thumbnail">
    <img class="thumbnail__sm" :src="modalDataStore.addContentData.coverImg" />
    <div class="wrapper__thumbnail-content">
      <div class="box__input--content-title">
        <span class="text__contentTitle">{{ modalDataStore.addContentData.title }}</span>
        <button class="btn--transparent" @click="modalViewStore.openEditContentTitleModal">
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
import { useContentStore } from '@/stores/useContentStore.ts'

const modalDataStore = useModalDataStore()
const modalViewStore = useModalViewStore()
const contentStore = useContentStore()
</script>

<style></style>
