<template>
  <dialog class="flex-container__col alert-modal">
    <h1 class="alert-title">알림</h1>
    <p class="alert-content">
      동일한 이름의 카테고리가 <br />'{{ categoryName }}'내에 있어요. <br />카테고리 이름을
      변경해주세요.
    </p>
    <button class="flex-container alert-confirm-button">확인</button>
  </dialog>
  <dim-default></dim-default>
</template>

<script>
import DimDefault from '@/components/dim/DimDefault.vue'
export default {
  components: { DimDefault },
  // props: {
  //   categoryName: String
  // },
  data() {
    return {
      categoryName: '올리비아...'
    }
  }
}
</script>

<style></style>
