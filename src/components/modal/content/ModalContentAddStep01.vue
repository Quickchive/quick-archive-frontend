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
        @click="submitLink"
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

// 링크를 찾기 위한 정규표현식
const linkPattern = /(https?|http):\/\/\S+/g

// 링크 여부
const isLink = (str) => {
  // 정규표현식을 사용하여 문자열이 링크 형식인지 확인합니다.
  return linkPattern.test(str)
}

const countLinks = (str) => {
  let url = 'http'
  let pos = str.indexOf(url)
  let count = 0
  while (pos !== -1) {
    count++
    pos = str.indexOf(url, pos + 1)
  }
  return count
}

const setMultipleLinkArr = (str) => {
  var urlRegex = /(https?:\/\/[^ ]+)/g
  var allUrls = str.match(urlRegex)
  var separatedUrls = []

  allUrls.forEach(function (url) {
    var index = 0
    while (index < url.length) {
      var foundIndex = url.indexOf('http', index + 1)
      if (foundIndex === -1) {
        separatedUrls.push(url.substring(index))
        break
      } else {
        separatedUrls.push(url.substring(index, foundIndex))
        index = foundIndex
      }
    }
  })
  return separatedUrls
}

const submitLink = async () => {
  const linkStr = link.value.trim()
  const numOfLink = countLinks(linkStr)

  // 링크 1개인 경우
  if (numOfLink === 1) {
    modalDataStore.setSingleLink(linkStr)
    modalViewStore.openAddContentSingle()
    // 링크 2개인 경우
  } else if (numOfLink > 1) {
    const linkArr = setMultipleLinkArr(linkStr)
    const multipleLink = await modalDataStore.fetchMultipleLinksOgData(linkArr)
    await modalDataStore.setMultipleLinks(multipleLink)
    await modalViewStore.openAddContentMultiple()
  }
}
</script>

<style></style>
