<template>
  <dialog class="flex-container__col alert-modal">
    <h1 class="alert-title">알림</h1>
    <p class="select-alert-content">카테고리를 삭제할까요?</p>
    <button class="flex-container__row button--alert-checkbox">
      <img :src="checkboxOffIcon" />카테고리 내 콘텐츠도 함께 삭제하기
    </button>
    <div class="flex-container__row wrapper__alert-button">
      <button class="flex-container alert-cancel-button">닫기</button>
      <button class="flex-container alert-confirm-button">삭제</button>
    </div>
  </dialog>
  <!-- <dim-default></dim-default> -->
</template>

<script>
// import DimDefault from '@/components/dim/DimDefault.vue'
import checkboxOffIcon from '@/assets/ic/ic-control-checkbox-off.svg'
export default {
  data() {
    return {
      checkboxOffIcon
    }
  }
}
</script>

<style></style>
