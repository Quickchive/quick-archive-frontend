<template>
  <div class="flex-container__row toast">
    <div class="wrapper__main-toast-content">
      <img :src="doneIcon" />
      <span class="toast-content">{{ toastStore.toast.message }}</span>
    </div>
    <button v-if="toastStore.toast.func" class="btn-toast" @click="toastStore.toast.func.execute()">
      {{ toastStore.toast.func.message }}
    </button>
  </div>
</template>

<script setup>
import doneIcon from '@/assets/ic/ic-done.svg'
import { useToastStore } from '@/stores/useToastStore.ts'

const toastStore = useToastStore()
</script>

<style></style>
