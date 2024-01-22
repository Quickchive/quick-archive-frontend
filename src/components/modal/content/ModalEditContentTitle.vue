<template>
  <dialog class="content-add__modal">
    <header class="modal-header--edit-title">
      <button class="btn--transparent btn-32" @click="modalViewStore.closeEditContentTitleModal()">
        <img :src="topCloseIcon" />
      </button>
      <button class="btn--transparent" @click="clearTitle()">내용 전체삭제</button>
    </header>
    <modal-header-edit-title></modal-header-edit-title>
    <div class="wrapper__modal-input-edit">
      <textarea
        class="input__edit-title"
        :value="title"
        placeholder="제목을 1자 이상 입력해주세요"
        @input="setTitle"
        autofocus
      />
    </div>
    <div class="modal-footer">
      <button
        class="btn-confirm"
        :class="isTitleValid ? 'active' : 'inactive'"
        @click="saveContentTitle()"
        :disabled="!isTitleValid"
      >
        완료
      </button>
    </div>
  </dialog>
</template>

<script setup>
import topCloseIcon from '@/assets/ic/ic-top-close.svg'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { ref, computed } from 'vue'
const modalDataStore = useModalDataStore()
const modalViewStore = useModalViewStore()
const title = ref(modalDataStore.addContentData.title)

const setTitle = (e) => {
  title.value = e.target.value
}

const isTitleValid = computed(() => {
  return 1 <= title.value.length ? true : false
})

const saveContentTitle = () => {
  modalViewStore.closeEditContentTitleModal()
  modalDataStore.setTitle(title.value)
}

const clearTitle = () => {
  title.value = ''
}
</script>

<style></style>
