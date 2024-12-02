<!-- 생성위치 모달: 검색 했을 때 -->

<template>
  <!-- 1차 카테고리인 경우 -->
  <template v-if="props.category.parentId == undefined">
    <li class="category-list__first-ul">
      <div class="flex-container__row--align-center">
        <div
          class="btn--transparent category-list__btn--radio"
          @click="handleRadioClick(props.category)"
        >
          <img :src="convertedIconName" class="category-icon img-category-icon--lg" />
          <div class="category-item-radio__text-container">
            <!-- 카테고리 명 -->
            <span class="category-item-radio__category-name">{{ props.category.name }}</span>
          </div>
        </div>
      </div>
      <div class="wrapper__radio-btn">
        <!-- 카테고리 자동 추천 태그 -->
        <div
          v-if="
            userStore.recommendationMode &&
            (modalViewStore.modal.addContent || modalViewStore.modal.addContentDetail) &&
            categoryStore.isRecommended &&
            categoryStore.recommendedCategoryId === props.category.id
          "
          class="wrapper__ai-tag"
        >
          <span class="ai-tag"> 추천 </span>
        </div>
        <!-- 라디오 버튼 -->
        <div class="radio-buttons">
          <label :for="props.category.id" class="radio-button">
            <input
              type="radio"
              :id="props.category.id"
              name="grades"
              :checked="props.category.name === categoryStore.parentCategory.name"
              @change="handleRadioClick(props.category)"
            />
            <span class="custom-radio"></span>
          </label>
        </div>
      </div>
    </li>
  </template>
  <!-- 2차 카테고리인 경우 -->
  <template v-if="props.category.parentId !== null && props.children">
    <li class="category-list__first-ul">
      <div class="flex-container__row--align-center">
        <div
          class="btn--transparent category-list__btn--radio"
          @click="handleRadioClick(props.category)"
        >
          <img :src="convertedIconName" class="category-icon img-category-icon--lg" />
          <div class="category-item-radio__text-container">
            <!-- 카테고리 명 -->
            <span class="category-item-radio__category-name">{{ props.category.name }}</span>
            <!-- 카테고리 위치 -->
            <span class="category-item-radio__category-parent-name">
              {{ searchStore.getCategoryDepth2NameById(props.category.categoryId) }}</span
            >
          </div>
        </div>
      </div>
      <div class="wrapper__radio-btn">
        <!-- 카테고리 자동 추천 태그 -->
        <div
          v-if="
            userStore.recommendationMode &&
            (modalViewStore.modal.addContent || modalViewStore.modal.addContentDetail) &&
            categoryStore.isRecommended &&
            categoryStore.recommendedCategoryId === props.category.id
          "
          class="wrapper__ai-tag"
        >
          <span class="ai-tag"> 추천 </span>
        </div>
        <!-- 라디오 버튼 -->
        <div class="radio-buttons">
          <label :for="props.category.id" class="radio-button">
            <input
              type="radio"
              :id="props.category.id"
              name="grades"
              :checked="props.category.name === categoryStore.parentCategory.name"
              @click="handleRadioClick(props.category)"
            />
            <span class="custom-radio"></span>
          </label>
        </div>
      </div>
    </li>
  </template>
</template>

<script setup>
import { computed } from 'vue'
import { useSearchStore } from '@/stores/useSearchStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'

const searchStore = useSearchStore()
const categoryStore = useCategoryStore()
const userStore = useUserStore()
const modalViewStore = useModalViewStore()

const props = defineProps({
  category: Object,
  children: Array,
  activeExpandButton: Boolean
})

// 라디오 영역 클릭 처리
const handleRadioClick = (category) => {
  selectRadioButton(category)
}

const selectRadioButton = (categoryDepth) => {
  if (categoryStore.parentCategory?.name === categoryDepth.name) {
    categoryStore.resetParentCategory() // store에서 정의한 메소드 호출
  } else {
    categoryStore.setParentCategory(categoryDepth)
  }
}

const convertedIconName = computed(() => {
  console.log(props.category)
  if (props.category.iconName == 'None') {
    return categoryStore.getCategoryImgByIconName('Folder')
  } else {
    return categoryStore.getCategoryImgByIconName(props.category.iconName)
  }
})
</script>

<style></style>
