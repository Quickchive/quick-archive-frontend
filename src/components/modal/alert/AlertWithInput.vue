<template>
  <dialog class="confirm-modal">
    <h1 class="alert-title">{{ props.alertData.title }}</h1>
    <p class="text__confirm-content">
      <pre>{{ props.alertData.message }}</pre>
    </p>
    <div class="wrapper__confirm-input" v-if="props.alertData.input">
      <input
        class="input__sm--default"
        :placeholder="props.alertData.placeholder"
        :value="alertDataStore.newCategoryName"
        maxlength="15"
        @input="setNewCategory"
        ref="input"
      />
      <button v-show="isCategoryNameValid" class="btn--transparent" @click="clearInput()">
        <img :src="textfieldCancelIcon" />
      </button>
    </div>
    <div class="wrapper__confirm-button">
      <div class="alert-btn__wrapper">
        <button class="alert-btn cancel btn-48" @click="handleLeftButtonClick">
          {{ props.alertData.leftButtonMessage }}
        </button>
      </div>
      <div class="alert-btn__wrapper">
        <button
          class="alert-btn btn-48"
          :class="isCategoryNameValid ? 'confirm' : 'inactive'"
          :disabled="!isCategoryNameValid"
          @click="handleRightButtonClick"
        >
          {{ props.alertData.rightButtonMessage }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import { computed, ref } from 'vue'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'

const props = defineProps({
  alertData: {
    type: Object,
    required: true
  }
})

const alertDataStore = useAlertDataStore()
const input = ref(null)

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
  alertDataStore.newCategoryName = ''
  if (input.value) {
    input.value.focus()
  }
}


// 버튼 이벤트 핸들러
const handleLeftButtonClick = () => {
  try {
    console.log('Left button clicked') // 디버깅용
    if (typeof props.alertData.leftButtonEvent === 'function') {
      props.alertData.leftButtonEvent()
    }
  } catch (error) {
    console.error('Left button event error:', error)
  }
}

const handleRightButtonClick = async () => {
  try {
    console.log('Right button clicked') // 디버깅용
    if (!isCategoryNameValid.value) return

    if (typeof props.alertData.rightButtonEvent === 'function') {
      await props.alertData.rightButtonEvent()
    }
  } catch (error) {
    console.error('Right button event error:', error)
  }
}
</script>

<style></style>
