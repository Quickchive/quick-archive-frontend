<template>
  <div class="flex-container__col contents__empty">
    <img :src="emptyImg" class="img-empty" />
    <span>저장된 콘텐츠가 없습니다.</span>
  </div>
</template>

<script>
import emptyImg from '@/assets/img/img-empty-nocontent.png'

export default {
  data() {
    return {
      emptyImg
    }
  }
}
</script>

<style></style>
