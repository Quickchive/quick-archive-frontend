<template>
  <dialog class="flex-container__col alert-modal">
    <h1 class="alert-title">알림</h1>
    <p class="alert-content">
      동일한 이름의 카테고리가 <br />'{{ modalStore.duplicatedCategoryLocation }}'내에 있어요.
      <br />카테고리 이름을 변경해주세요.
    </p>
    <div class="flex-container__row wrapper__alert-button--single">
      <button class="flex-container alert-confirm-button">확인</button>
    </div>
  </dialog>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore.ts'
const modalStore = useModalStore()
</script>

<style></style>
