<template>
  <dialog class="content-add__modal">
    <modal-header-edit-title></modal-header-edit-title>
    <div class="wrapper__modal-input-edit">
      <textarea
        class="input__edit-title"
        v-model="contentTitle"
        placeholder="제목을 1자 이상 입력해주세요"
        autofocus
      />
    </div>
    <div class="modal-footer">
      <button class="confirm-button--inactive">완료</button>
    </div>
  </dialog>
</template>

<script>
import ModalHeaderEditTitle from '@/components/header/ModalHeaderEditTitle.vue'

export default {
  components: { ModalHeaderEditTitle },
  data() {
    return {
      contentTitle: '작은집으로 이사가야 해서 미니멀리즘을 열심히 실천한다'
    }
  }
}
</script>

<style></style>
