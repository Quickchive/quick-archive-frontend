<template>
  <dialog class="confirm-modal">
    <h1 class="alert-title">새 카테고리</h1>
    <p class="text__confirm-content">
      새 카테고리 이름을 입력해 주세요.<br />
      생성 위치는 카테고리 수정 시 변경할 수 있어요.
    </p>
    <div class="wrapper__confirm-input">
      <input class="input__sm--default" placeholder="이름을 입력해주세요(2~15글자)" />
      <button class="button--transparent">
        <img :src="textfieldCancelIcon" />
      </button>
    </div>
    <div class="wrapper__confirm-button">
      <button class="button__confirm-modal">닫기</button>
      <button class="button__confirm-modal">저장</button>
    </div>
  </dialog>
</template>

<script>
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'

export default {
  data() {
    return {
      textfieldCancelIcon
    }
  }
}
</script>

<style></style>
