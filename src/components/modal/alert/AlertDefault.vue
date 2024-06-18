<template>
  <dialog class="flex-container__col alert-modal">
    <h1 class="alert-title">{{ alertDataStore.defaultAlertData.title }}</h1>
    <p class="alert-content">
      <span v-for="(alertData, index) in alertDataStore.defaultAlertData.content" :key="index">
        {{ alertData }}<br />
      </span>
    </p>
    <div class="flex-container__row wrapper__alert-button--single">
      <button
        class="alert-btn confirm"
        @click="modalViewStore.hideModalWithOverlay('alert', 'alert')"
      >
        확인
      </button>
    </div>
  </dialog>
</template>

<script setup>
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
const modalViewStore = useModalViewStore()
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
const alertDataStore = useAlertDataStore()
</script>

<style></style>
