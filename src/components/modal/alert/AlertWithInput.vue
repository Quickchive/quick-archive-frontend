<template>
  <dialog class="confirm-modal">
    <h1 class="alert-title">{{ props.alertData.title }}</h1>
    <p class="text__confirm-content">
      {{ props.alertData.message }}
    </p>
    <div class="wrapper__confirm-input" v-if="props.alertData.input">
      <input
        class="input__sm--default"
        :placeholder="props.alertData.placeholder"
        :value="alertDataStore.newCategoryName"
        maxlength="15"
        @input="setNewCategory"
      />
      <button class="btn--transparent" @click="clearInput()">
        <img :src="textfieldCancelIcon" />
      </button>
    </div>
    <div class="wrapper__confirm-button">
      <div class="alert-btn__wrapper">
        <button class="alert-btn cancel btn-48" @click="props.alertData.leftButtonEvent()">
          {{ props.alertData.leftButtonMessage }}
        </button>
      </div>
      <div class="alert-btn__wrapper">
        <button
          class="alert-btn btn-48"
          :class="isCategoryNameValid ? 'confirm' : 'inactive'"
          :disabled="!isCategoryNameValid"
          @click="props.alertData.rightButtonEvent()"
        >
          {{ props.alertData.rightButtonMessage }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import { computed } from 'vue'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'

const props = defineProps({
  alertData: Object
})

const alertDataStore = useAlertDataStore()

const setNewCategory = (e) => {
  alertDataStore.newCategoryName = e.target.value
}

// 카테고리 명 유효성 검사
const isCategoryNameValid = computed(() => {
  return 2 <= alertDataStore.newCategoryName.length && alertDataStore.newCategoryName.length <= 15
    ? true
    : false
})

const clearInput = () => {
  alertDataStore.newCategoryName.value = ''
}
</script>

<style></style>
