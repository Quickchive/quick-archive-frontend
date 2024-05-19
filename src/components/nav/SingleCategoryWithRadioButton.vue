<!-- 생성위치 모달: 검색 했을 때 -->

<template>
  <!-- 1차 카테고리인 경우 -->
  <template v-if="props.category.parentId == undefined">
    <li class="category-list__first-ul">
      <div class="flex-container__row--align-center">
        <div class="btn--transparent category-list__btn--radio">
          <img :src="convertedIconName" class="category-icon img-category-icon--lg" />
          <div class="category-item-radio__text-container">
            <!-- 카테고리 명 -->
            <span class="category-item-radio__category-name">{{ props.category.name }}</span>
          </div>
        </div>
      </div>
      <!-- 라디오 버튼 -->
      <div class="radio-buttons">
        <label :for="props.category.id" class="radio-button">
          <input
            type="radio"
            :id="props.category.id"
            name="grades"
            :checked="props.category.name === categoryStore.parentCategory.name"
            @click="selectRadioButton(props.category)"
          />
          <span class="custom-radio"></span>
        </label>
      </div>
    </li>
  </template>
  <!-- 2차 카테고리인 경우 -->
  <template v-if="props.category.parentId !== null && props.children">
    <li class="category-list__first-ul">
      <div class="flex-container__row--align-center">
        <div class="btn--transparent category-list__btn--radio">
          <img :src="convertedIconName" class="category-icon img-category-icon--lg" />
          <div class="category-item-radio__text-container">
            <!-- 카테고리 명 -->
            <span class="category-item-radio__category-name">{{ props.category.name }}</span>
            <!-- 카테고리 위치 -->
            <span class="category-item-radio__category-parent-name">
              {{ searchStore.getCategoryDepth2NameById(props.category.parentId) }}</span
            >
          </div>
        </div>
      </div>
      <!-- 라디오 버튼 -->
      <div class="radio-buttons">
        <label :for="props.category.id" class="radio-button">
          <input
            type="radio"
            :id="props.category.id"
            name="grades"
            :checked="props.category.name === categoryStore.parentCategory.name"
            @click="selectRadioButton(props.category)"
          />
          <span class="custom-radio"></span>
        </label>
      </div>
    </li>
  </template>
</template>

<script setup>
import { computed } from 'vue'
import { useSearchStore } from '@/stores/useSearchStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

const searchStore = useSearchStore()
const categoryStore = useCategoryStore()

const props = defineProps({
  category: Object,
  children: Array,
  activeExpandButton: Boolean
})

const selectRadioButton = (categoryDepth) => {
  categoryStore.setParentCategory(categoryDepth)
}

const convertedIconName = computed(() => {
  console.log(props.category)
  if (props.category.iconName == 'None') {
    return categoryStore.getCategoryImgByIconName('Watch')
  } else {
    return categoryStore.getCategoryImgByIconName(props.category.iconName)
  }
})
</script>

<style></style>
