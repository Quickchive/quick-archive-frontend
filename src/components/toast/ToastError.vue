<template>
  <div class="flex-container__row toast">
    <div class="wrapper__main-toast-content">
      <img :src="failIcon" />
      <span class="toast-content">{{ toastStore.toast.message }}</span>
    </div>
    <button v-if="toastStore.toast.func" class="btn-toast">
      {{ toastStore.toast.func.message }}
    </button>
  </div>
</template>

<script setup>
import failIcon from '@/assets/ic/ic_fail.svg'
import { useToastStore } from '@/stores/useToastStore.ts'

const toastStore = useToastStore()
</script>

<style></style>
