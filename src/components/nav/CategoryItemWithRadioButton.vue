<template>
  <div class="category-item-radio">
    <!-- 1차 카테고리 -->
    <ul v-if="categoryDepth1.name" class="category-list__first-ul">
      <li>
        <div class="flex-container__row--align-center">
          <button
            class="button--transparent expand-button"
            @click="controlFirstCategory(categoryDepth1.children)"
          >
            <img v-if="categoryDepth1.show" :src="expandLessIcon" />
            <img v-if="!categoryDepth1.show" :src="expandMoreIcon" />
          </button>
          <button class="button--transparent category-list__button--radio">
            <img
              :src="modalDataStore.getCategoryImgByIconName(categoryDepth1.iconName)"
              class="img-category-icon--lg"
            />
            {{ categoryDepth1.name }}
          </button>
        </div>
        <!-- 라디오 버튼 -->
        <div class="radio-buttons">
          <label :for="categoryDepth1.id" class="radio-button">
            <input
              type="radio"
              :id="categoryDepth1.id"
              name="grades"
              :checked="categoryDepth1.name === modalDataStore.selectedLocation.name"
              @click="selectRadioButton(categoryDepth1)"
            />
            <span class="custom-radio"></span>
          </label>
        </div>
      </li>
      <!-- 2차 카테고리 -->
      <template v-if="secondCategory.show">
        <ul
          class="category-list__second-ul"
          v-for="(categoryDepth2, i) in categoryDepth1.children"
          :key="i"
        >
          <li>
            <div class="flex-container__row--align-center">
              <button class="button--transparent expand-button">
                <img v :src="expandMoreIcon" />
              </button>
              <button class="button--transparent category-list__button--radio">
                <img
                  :src="modalDataStore.getCategoryImgByIconName(categoryDepth2.iconName)"
                  class="category-icon img-category-icon--lg"
                />{{ categoryDepth2.name }}
              </button>
            </div>
            <!-- 라디오 버튼 -->
            <div class="radio-buttons">
              <label :for="categoryDepth2.id" class="radio-button">
                <input
                  type="radio"
                  :id="categoryDepth2.id"
                  name="grades"
                  :checked="categoryDepth2.name === modalDataStore.selectedLocation.name"
                  @click="selectRadioButton(categoryDepth2)"
                />
                <span class="custom-radio"></span>
              </label>
            </div>
          </li>
        </ul>
      </template>
    </ul>
  </div>
</template>

<script setup>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import { reactive, watch } from 'vue'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'

// 스토어 선언
const modalDataStore = useModalDataStore()

const props = defineProps({
  categoryDepth1: Object,
  clickRadioButton: Function
})

const secondCategory = reactive({ show: false })

// 카테고리 열고/닫기
const controlFirstCategory = (children) => {
  if (children) {
    secondCategory.show = !secondCategory.show
  }
}

watch(props.categoryDepth1, {
  deep: true,
  handler: (value) => {
    console.log(value)
  }
})

const selectRadioButton = (categoryDepth) => {
  modalDataStore.clickRadioButton(categoryDepth)
}
</script>

<style></style>
