<template>
  <dialog class="content-add__modal">
    <modal-header-step :modalTitle="modalTitle" :isBtnOnLeft="isBtnOnLeft"></modal-header-step>
    <!-- 썸네일 -->
    <div class="wrapper__modal-thumbnail">
      <img class="thumbnail__sm" :src="thumbnail" />
      <div class="wrapper__thumbnail-content">
        <div class="box__input--content-title">
          <span class="text__contentTitle">{{ contentTitle }}</span>
          <button class="button--transparent"><img :src="editIcon" /></button>
        </div>
        <span class="text__contentLink">{{ contentLink }}</span>
      </div>
    </div>
    <!-- 카테고리 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__row--space-between">
        <label class="label__modal"> 카테고리 </label>
        <button class="button--go-next">미지정<img :src="nextBlackIcon" /></button>
      </div>
    </div>

    <!-- 즐겨찾기 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__row--space-between">
        <label class="label__modal">즐겨찾기</label>
        <toggle-button :value="value"></toggle-button>
      </div>
    </div>
    <!-- 메모 -->
    <div class="wrapper__modal-inner">
      <div class="flex-container__col">
        <label class="label__modal">메모</label>
        <div class="wrapper__textarea">
          <textarea class="textarea__memo" placeholder="메모를 남겨보세요"></textarea>
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <button class="confirm-button--inactive">저장</button>
    </div>
  </dialog>
</template>

<script>
import ModalHeaderStep from '@/components/header/ModalHeaderStep.vue'
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import thumbnail from '@/assets/img/thumbnail-sm.png'
import editIcon from '@/assets/ic/ic-edit.svg'
import ToggleButton from '@/components/ToggleButton.vue'

export default {
  components: { ModalHeaderStep, ToggleButton },
  data() {
    return {
      modalTitle: '콘텐츠 추가',
      isBtnOnLeft: true,
      nextBlackIcon,
      thumbnail,
      editIcon,
      contentTitle:
        '작은집으로 이사가야 해서 미니멀리즘을 열...' /*'작은집으로 이사가야 해서 미니멀리즘을 열심히 실천한다',*/,
      contentLink: 'https://brunch.co.kr/@21d3b3e76882478/32',
      value: false
    }
  }
}
</script>

<style></style>
