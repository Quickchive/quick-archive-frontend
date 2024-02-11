<template>
  <dialog class="flex-container__col alert-modal">
    <h1 class="alert-title">알림</h1>
    <p class="select-alert-content">{{ props.alertData.message }}</p>

    <div class="alert-btn--checkbox__wrapper">
      <button
        class="alert-btn--checkbox"
        @click="alertDataStore.toggleCheckbox()"
        v-if="props.alertData.checkbox"
      >
        <img :src="checkboxOffIcon" v-if="!alertDataStore.checkboxChecked" class="icon-small" />
        <img :src="checkboxOnIcon" v-if="alertDataStore.checkboxChecked" class="icon-small" />
      </button>
      <span>{{ props.alertData.checkboxMessage }}</span>
    </div>

    <div class="wrapper__alert-button--double">
      <button class="alert-btn cancel btn-48" @click="props.alertData.leftButtonEvent()">
        {{ props.alertData.leftButtonMessage }}
      </button>
      <button class="alert-btn confirm btn-48" @click="props.alertData.rightButtonEvent()">
        {{ props.alertData.rightButtonMessage }}
      </button>
    </div>
  </dialog>
</template>

<script setup>
import checkboxOffIcon from '@/assets/ic/ic-control-checkbox-off.svg'
import checkboxOnIcon from '@/assets/ic/ic-control-checkbox-on.svg'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'

const alertDataStore = useAlertDataStore()

const props = defineProps({
  alertData: Object
})
</script>

<style></style>
