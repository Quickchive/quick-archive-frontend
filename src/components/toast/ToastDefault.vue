<template>
  <div class="flex-container__row toast">
    <img :src="doneIcon" />
    <span class="toast-content">{{ toastText }}</span>
    <button class="btn-toast">보러가기</button>
  </div>
</template>

<script>
import doneIcon from '@/assets/ic/ic-done.svg'
export default {
  data() {
    return {
      doneIcon,
      toastText: '카테고리가 추가되었습니다.'
    }
  }
}
</script>

<style></style>
