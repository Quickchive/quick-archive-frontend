<template>
  <dialog class="content-add__modal">
    <modal-header
      :modalTitle="modalTitle"
      :isBtnOnLeft="false"
      :closeModal="closeModal"
    ></modal-header>
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
      여러 링크를 한꺼번에 저장하고 싶나요?
      <li>• 2개 이상의 링크를 입력창에 넣고 ‘다음'을 누르면<br /></li>
      <li>&nbsp;&nbsp;&nbsp;한 카테고리에 링크를 한꺼번에 저장할 수 있어요.</li>
      <li>• 링크 사이에 스페이스바를 한 번 눌러 링크를 구분해주세요.<br /></li>
      <li class="wrapper__spaceRectangle">
        &nbsp;&nbsp;&nbsp;www.google.com/24013<img :src="spaceRectangle" />www.google.com/24013
      </li>
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
import { useContentStore } from '@/stores/useContentStore.ts'

import spaceRectangle from '@/assets/img/spacebar-rectangle.png'

import ModalHeader from '@/components/header/ModalHeader.vue'
import {} from '@/api/contents.js'

const props = defineProps({
  modalTitle: String,
  closeModal: Function
})

const modalViewStore = useModalViewStore()
const contentStore = useContentStore()

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
    contentStore.setSingleLink(linkStr)
    modalViewStore.showModalWithOverlay('addContentDetail', 'default')

    // 링크 2개인 경우
  } else if (numOfLink > 1) {
    const linkArr = setMultipleLinkArr(linkStr)
    const multipleLink = await contentStore.fetchMultipleLinksOgData(linkArr)
    contentStore.setMultipleLinks(multipleLink)
    modalViewStore.showModalWithOverlay('addContentMultiple', 'default')
  }
}
</script>

<style></style>
