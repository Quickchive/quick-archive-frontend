<template>
  <div class="category-item-radio">
    <!-- 1차 카테고리 -->
    <ul v-if="categoryData.name" class="category-list__first-ul">
      <li>
        <div class="flex-container__row--align-center">
          <button
            class="button--transparent expand-button"
            @click="controlFirstCategory(categoryData.children)"
          >
            <img v-if="categoryData.show" :src="expandLessIcon" />
            <img v-if="!categoryData.show" :src="expandMoreIcon" />
          </button>
          <button class="button--transparent category-list__button--radio">
            <img :src="categoryIcon" class="img-category-icon--lg" />
            {{ categoryData.name }}
          </button>
        </div>
        <!-- 라디오 버튼 -->
        <div class="radio-buttons">
          <label :for="categoryData.id" class="radio-button">
            <input
              type="radio"
              :id="categoryData.id"
              name="grades"
              v-model="selectedLocation"
              :value="categoryData"
            />
            <span class="custom-radio"></span>
          </label>
        </div>
      </li>
      <!-- 2차 카테고리 -->
      <template v-if="secondCategory.show">
        <ul
          class="category-list__second-ul"
          v-for="(categoryItem2, i) in categoryData.children"
          :key="i"
        >
          <li>
            <div class="flex-container__row--align-center">
              <button class="button--transparent expand-button">
                <img v :src="expandMoreIcon" />
              </button>
              <button class="button--transparent category-list__button--radio">
                <img :src="categoryIcon" class="category-icon img-category-icon--lg" />{{
                  categoryItem2.name
                }}
              </button>
            </div>
            <!-- 라디오 버튼 -->
            <div class="radio-buttons">
              <label :for="categoryItem2.id" class="radio-button">
                <input
                  type="radio"
                  :id="categoryItem2.id"
                  name="grades"
                  v-model="selectedLocation"
                  :value="categoryItem2"
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
import categoryIcon from '@/assets/img/category/img_category_cook.png'
import { defineProps, reactive, ref, watch, toRaw } from 'vue'
import { useCategoryAddStore } from '@/stores/useCategoryAddStore.ts'

// 스토어 선언
const categoryAddStore = useCategoryAddStore()

const props = defineProps({
  categoryData: Object
})

const secondCategory = reactive({ show: false })

// 카테고리 열고/닫기
const controlFirstCategory = (children) => {
  if (children) {
    secondCategory.show = !secondCategory.show
  }
}

const selectedLocation = ref()

watch(selectedLocation, () => {
  console.log('watch', selectedLocation)
  categoryAddStore.$patch((state) => {
    state.selectedLocation = selectedLocation
  })
})

// categoryAddStore.$patch((state) => {
//   state.selectedLocation = selectedLocation
// })

// const selectCategory = (categoryName) => {
//   categoryAddStore.selectCategoryLocation(categoryName)
//   console.log(categoryName)
// }
</script>

<style></style>
