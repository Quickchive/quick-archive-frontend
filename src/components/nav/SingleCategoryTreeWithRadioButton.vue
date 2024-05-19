<template>
  <li :class="props.treeWidth">
    <div class="singleCategoryTreeWithRadio">
      <button class="btn--transparent expand-button" @click="clickArrowEvent()">
        <img v-if="isChildrenCategoryShow" :src="expandLessIcon" />
        <img v-if="!isChildrenCategoryShow" :src="expandMoreIcon" />
      </button>

      <div class="category-list__btn-wrapper" @click="selectRadioButton(props.category)">
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
        <!-- 라디오 버튼 -->
        <div class="radio-buttons">
          <label :for="props.category.id" class="radio-button">
            <input
              type="radio"
              :id="props.category.id"
              name="grades"
              :checked="props.category.name === modalDataStore.selectedLocation.name"
            />
            <span class="custom-radio"></span>
          </label>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import { ref } from 'vue'
import { useModalDataStore } from '@/stores/useModalDataStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'

const modalDataStore = useModalDataStore()
const categoryStore = useCategoryStore()
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
    categoryStore.showChildrenCategoryRadio(props.children)
  }
}

const selectRadioButton = (categoryDepth) => {
  modalDataStore.clickRadioButton(categoryDepth)
}
</script>

<style></style>
