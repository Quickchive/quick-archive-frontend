<template>
  <div class="flex-container__row toast">
    <div class="wrapper__main-toast-content">
      <img :src="failIcon" />
      <span class="toast-content">{{ modalDataStore.toast.message }}</span>
    </div>
    <button v-if="modalDataStore.toast.func" class="btn-toast">
      {{ modalDataStore.toast.func.message }}
    </button>
  </div>
</template>

<script setup>
import failIcon from '@/assets/ic/ic_fail.svg'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'

const modalDataStore = useModalDataStore()
</script>

<style></style>
