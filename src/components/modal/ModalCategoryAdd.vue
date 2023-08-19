<template>
  <dialog class="category-add__modal">
    <modal-header :modalTitle="modalTitle"></modal-header>
    <div class="wrapper__category-change">
      <button class="button--transparent category-change__button">
        <div class="icon__category-change">
          <img class="icon__category-box" :src="categoryBoxIcon" /><img
            class="icon__thumb-change"
            :src="thumbChangeIcon"
          />
        </div>
      </button>
    </div>
    <label class="input__category-modal">
      <input class="input__category-modal" placeholder="카테고리 이름(2~15글자)" />
      <button class="button--transparent">
        <img :src="textfieldCancelIcon" />
      </button>
    </label>
    <div class="flex-container__row wrapper__category-position">
      <label>생성 위치</label>
      <button class="button--transparent flex-container__row">
        미지정<img :src="nextBlackIcon" />
      </button>
    </div>
    <div class="modal-footer">
      <button class="confirm-button--inactive">저장</button>
    </div>
  </dialog>
</template>

<script>
import thumbChangeIcon from '@/assets/ic/ic-thumb-change.svg'
import categoryBoxIcon from '@/assets/ic/ic-category-box.png'
import nextBlackIcon from '@/assets/ic/ic-next-black.svg'
import textfieldCancelIcon from '@/assets/ic/ic-text-field-cancel.svg'
import ModalHeader from '@/components/modal/ModalHeader.vue'

export default {
  components: { ModalHeader },
  data() {
    return {
      thumbChangeIcon,
      categoryBoxIcon,
      nextBlackIcon,
      textfieldCancelIcon,
      modalTitle: '카테고리 추가',
      isBtnOnRight: true
    }
  }
}
</script>

<style></style>
