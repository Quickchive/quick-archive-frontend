<template>
  <dialog class="content-add__modal">
    <modal-header :modalTitle="modalTitle"></modal-header>
    <div class="wrapper__content-modal-input">
      <input class="input__content-modal" placeholder="링크를 입력해주세요" />
    </div>
    <ul class="ul__content-modal">
      <li>• 링크 여러 개를 한번에 저장할 수 있어요.</li>
      <li>• 저장할 링크를 모두 붙여넣고 다음을 눌러보세요.</li>
    </ul>
    <div class="modal-footer">
      <button class="confirm-button--inactive">다음</button>
    </div>
  </dialog>
</template>

<script>
import ModalHeader from '@/components/header/ModalHeader.vue'

export default {
  components: { ModalHeader },
  data() {
    return {
      modalTitle: '콘텐츠 추가'
    }
  }
}
</script>

<style></style>
