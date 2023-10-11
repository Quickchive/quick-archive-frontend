<template>
  <dialog class="content-add__modal">
    <modal-header :modalTitle="modalTitle" :closeModal="closeModal"></modal-header>
    <div class="wrapper__content-modal-input">
      <input
        class="input__content-modal"
        placeholder="링크를 입력해주세요"
        v-model="link"
        autofocus
      />
    </div>
    <ul class="ul__content-modal">
      <li>• 링크 여러 개를 한번에 저장할 수 있어요.</li>
      <li>• 저장할 링크를 모두 붙여넣고 다음을 눌러보세요.</li>
    </ul>
    <div class="modal-footer">
      <button
        class="confirm-button--inactive"
        :class="{ 'confirm-button--active': isLinkValid }"
        @click="modalStore.openAddContentDetailModal()"
        :disabled="!isLinkValid"
      >
        다음
      </button>
    </div>
  </dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useModalStore } from '@/stores/useModalStore.ts'
import ModalHeader from '@/components/header/ModalHeader.vue'
const modalTitle = '콘텐츠 추가'
const link = ref('')
const modalStore = useModalStore()

// 카테고리 명 유효성 검사
const isLinkValid = computed(() => {
  return 1 <= link.value.length ? true : false
})

const closeModal = () => {
  modalStore.closeAddContentModal()
  modalStore.closeSelectModal()
}
</script>

<style></style>
