<template>
  <li :class="props.treeWidth">
    <div class="flex-container__row--align-center">
      <button class="btn--transparent expand-button" @click="clickArrowEvent()">
        <img v-if="isChildrenCategoryShow" :src="expandLessIcon" />
        <img v-if="!isChildrenCategoryShow" :src="expandMoreIcon" />
      </button>
      <button class="btn--transparent category-list__btn--radio">
        <img
          :src="
            props.category.iconName == undefined
              ? modalDataStore.getCategoryImgByIconName('Book')
              : modalDataStore.getCategoryImgByIconName(props.category.iconName)
          "
          class="category-icon img-category-icon--lg"
        />
        {{ props.category.name }}
      </button>
    </div>
    <!-- 라디오 버튼 -->
    <div class="radio-buttons">
      <label :for="props.category.id" class="radio-button">
        <input
          type="radio"
          :id="props.category.id"
          name="grades"
          :checked="props.category.name === modalDataStore.selectedLocation.name"
          @click="selectRadioButton(props.category)"
        />
        <span class="custom-radio"></span>
      </label>
    </div>
  </li>
</template>

<script setup>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import { ref } from 'vue'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useCategoryTreeStore } from '@/stores/useCategoryTreeStore.ts'

const modalDataStore = useModalDataStore()
const categoryTreeStore = useCategoryTreeStore()
const isChildrenCategoryShow = ref(false)

const props = defineProps({
  category: Object,
  showChildren: Boolean,
  clickArrowEvent: Function,
  children: Array,
  treeWidth: String,
  activeExpandButton: Boolean
})

const clickArrowEvent = () => {
  if (props.activeExpandButton === false) return
  if (props.children) {
    isChildrenCategoryShow.value = !isChildrenCategoryShow.value
    categoryTreeStore.showChildrenCategoryRadio(props.children)
  }
}

const selectRadioButton = (categoryDepth) => {
  modalDataStore.clickRadioButton(categoryDepth)
}
</script>

<style></style>
