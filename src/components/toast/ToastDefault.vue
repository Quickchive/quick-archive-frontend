<template>
  <div class="flex-container__row toast">
    <div class="wrapper__main-toast-content">
      <img :src="doneIcon" />
      <span class="toast-content">{{ modalDataStore.toast.message }}</span>
    </div>
    <button
      v-if="modalDataStore.toast.func"
      class="btn-toast"
      @click="modalDataStore.toast.func.execute()"
    >
      {{ modalDataStore.toast.func.message }}
    </button>
  </div>
</template>

<script setup>
import doneIcon from '@/assets/ic/ic-done.svg'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'

const modalDataStore = useModalDataStore()
</script>

<style></style>
