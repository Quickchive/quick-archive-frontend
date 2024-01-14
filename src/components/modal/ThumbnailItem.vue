<template>
  <div class="box__thumbnail">
    <img class="thumbnail__sm" :src="thumbnail" />
    <div class="wrapper__thumbnail-content">
      <div class="box__input--content-title">
        <span class="text__contentTitle">{{ modalDataStore.addContentData.title }}</span>
        <button class="button--transparent" @click="modalViewStore.openEditContentTitleModal">
          <img :src="editIcon" />
        </button>
      </div>
      <span class="text__contentLink">{{ modalDataStore.addContentData.link }}</span>
    </div>
  </div>
</template>

<script setup>
import thumbnail from '@/assets/img/thumbnail-sm.png'
import editIcon from '@/assets/ic/ic-edit.svg'
import checkboxOn from '@/assets/ic/ic-control-checkbox-on.svg'
import checkboxOff from '@/assets/ic/ic-control-checkbox-off.svg'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'

const modalDataStore = useModalDataStore()
const modalViewStore = useModalViewStore()
</script>

<style></style>
