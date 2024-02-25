<template>
  <dialog class="content-add__modal">
    <modal-header :modalTitle="modalTitle" :closeModal="closeModal"></modal-header>
    <div class="wrapper__content-modal-input">
      <input
        class="input__content-modal"
        placeholder="링크를 입력해주세요"
        :value="link"
        @input="setLink"
        autofocus
      />
    </div>
    <ul class="ul__content-modal">
      <li>• 링크 여러 개를 한번에 저장할 수 있어요.</li>
      <li>• 저장할 링크를 모두 붙여넣고 다음을 눌러보세요.</li>
    </ul>
    <div class="modal-footer">
      <button
        class="btn-confirm"
        :class="isLinkValid ? 'active' : 'inactive'"
        @click="toModalContentAddStep02"
        :disabled="!isLinkValid"
      >
        다음
      </button>
    </div>
  </dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'

import ModalHeader from '@/components/header/ModalHeader.vue'
import {} from '@/api/contents.js'

const props = defineProps({
  modalTitle: String,
  closeModal: Function
})

const modalViewStore = useModalViewStore()
const modalDataStore = useModalDataStore()

const link = ref('')

const setLink = (e) => {
  link.value = e.target.value
}

// 카테고리 명 유효성 검사
const isLinkValid = computed(() => {
  return 1 <= link.value.length ? true : false
})

// const closeModal = () => {
//   modalViewStore.closeAddContentModal()
//   modalViewStore.closeSelectModal()
// }

const toModalContentAddStep02 = async () => {
  modalDataStore.setLink(link.value)
  await modalDataStore.fetchOgData(link.value)
  await modalViewStore.openAddContentDetailModal()
}
</script>

<style></style>
