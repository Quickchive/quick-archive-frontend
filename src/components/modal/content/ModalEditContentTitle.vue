<template>
  <dialog class="content-add__modal">
    <header class="modal-header--edit-title">
      <button class="btn--transparent btn-32" @click="modalViewStore.hideModal('editContentTitle')">
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
        ref="inputRef"
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
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useContentStore } from '@/stores/useContentStore.ts'
import { ref, computed } from 'vue'

const modalViewStore = useModalViewStore()
const contentStore = useContentStore()
const isMultipleContent = ref(contentStore.multipleContentList.length >= 1 ? true : false)
const inputRef = ref(null) // inputRef 선언 추가
const title = ref(
  isMultipleContent.value
    ? contentStore.multipleContentList[contentStore.focusedContent.index].title
    : contentStore.contentObj.title
)

const setTitle = (e) => {
  title.value = e.target.value
}

const isTitleValid = computed(() => {
  return 1 <= title.value.length ? true : false
})

const saveContentTitle = () => {
  if (isMultipleContent.value) {
    contentStore.setMultipleTitle(title.value)
  } else {
    contentStore.setContentTitle(title.value)
  }
  modalViewStore.hideModal('editContentTitle')
}

const clearTitle = () => {
  title.value = ''
  inputRef.value?.focus()
}
</script>

<style></style>
