<template>
  <div class="category-item">
    <!-- 1차 카테고리 -->
    <ul v-if="categoryDepth1.name" class="category-list__first-ul">
      <li>
        <div class="flex-container__row--align-center">
          <button
            class="button--transparent expand-button"
            @click="controlCategoryDepth1(categoryDepth1.children)"
          >
            <img v-if="categoryDepth2.show" :src="expandLessIcon" />
            <img v-if="!categoryDepth2.show" :src="expandMoreIcon" />
          </button>
          <button
            class="button--transparent category-list__button"
            @click="toCategoryPage(categoryDepth1.id, categoryDepth1.name)"
          >
            <img :src="categoryIcon" class="category-icon img-category-icon" />
            {{ categoryDepth1.name }}
          </button>
        </div>
        <button class="button--transparent moreButton" @click="showMoreButton(categoryDepth1.id)">
          <img :src="moreIcon" /> <more-button v-if="moreButton[categoryDepth1.id]"></more-button>
        </button>
      </li>
      <!-- 2차 카테고리 -->
      <template v-if="categoryDepth2.show">
        <ul v-for="(categoryItem2, i) in categoryDepth1.children" :key="i">
          <li>
            <div class="flex-container__row--align-center">
              <button class="button--transparent expand-button" @click="controlCategoryDepth2(i)">
                <img v-if="categoryDepth3[i]" :src="expandLessIcon" />
                <img v-if="!categoryDepth3[i]" :src="expandMoreIcon" />
              </button>
              <button
                class="button--transparent category-list__button"
                @click="toCategoryPage(categoryItem2.id, categoryItem2.name)"
              >
                <img :src="categoryIcon" class="category-icon img-category-icon" />{{
                  categoryItem2.name
                }}
              </button>
            </div>
            <button
              class="button--transparent moreButton"
              @click="showMoreButton(categoryItem2.id)"
            >
              <img :src="moreIcon" />
              <more-button v-if="moreButton[categoryItem2.id]"></more-button>
            </button>
          </li>
          <!-- 3차 카테고리 -->
          <template v-if="categoryDepth3[i]">
            <ul v-for="(categoryItem3, k) in categoryItem2.children" :key="k">
              <li>
                <div class="flex-container__row--align-center">
                  <button class="button--transparent expand-button">
                    <img :src="expandMoreIcon" />
                  </button>
                  <button
                    class="button--transparent category-list__button"
                    @click="toCategoryPage(categoryItem3.id, categoryItem3.name)"
                  >
                    <img :src="categoryIcon" class="category-icon img-category-icon" />{{
                      categoryItem3.name
                    }}
                  </button>
                </div>
                <button
                  class="button--transparent moreButton"
                  @click="showMoreButton(categoryItem3.id)"
                >
                  <img :src="moreIcon" />
                  <more-button v-if="moreButton[categoryItem3.id]"></more-button>
                </button>
              </li>
            </ul>
          </template>
        </ul>
      </template>
    </ul>
  </div>
</template>

<script setup>
import expandMoreIcon from '@/assets/ic/ic-expand-more.svg'
import expandLessIcon from '@/assets/ic/ic-expand-less.svg'
import moreIcon from '@/assets/ic/ic-more.svg'
import categoryIcon from '@/assets/img/category/img_category_cook.png'
import { defineProps, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import MoreButton from '@/components/button/MoreButton.vue'

const categoryStore = useCategoryStore()

const router = useRouter()

const props = defineProps({
  categoryDepth1: Object
})

const categoryDepth3 = reactive([])
const categoryDepth2 = reactive({ show: false })

const moreButton = reactive([])

watch(props.categoryDepth1, {
  deep: true,
  handler: (value) => {
    console.log(value)
  }
})

if (props.categoryDepth1.children) {
  categoryDepth3.length = Number(props.categoryDepth1.children.length)
  for (let i = 0; i < props.categoryDepth1.children.length; i++) {
    console.log(props.categoryDepth1.children.length)
    categoryDepth3[i] = false
  }
}

const controlCategoryDepth1 = (children) => {
  if (children) {
    categoryDepth2.show = !categoryDepth2.show
  }
}

const controlCategoryDepth2 = (index) => {
  console.log(index, 'index')
  categoryDepth3[index] = !categoryDepth3[index]
  console.log('categoryDepth3', categoryDepth3[index])
}

const toCategoryPage = (categoryId, categoryName) => {
  router.push(`/home/${categoryId}`)
  categoryStore.setCategoryName(categoryName)
  console.log('home', categoryId, categoryName)
}

// const showFirstMoreButton = (id) => {
//   // moreButton.first = !moreButton.first
//   // 카테고리 삭제/수정을 위해 더보기 버튼 클릭한 카테고리 아이디를 세팅함
//   // console.log(props.categoryDepth1.id)
//   console.log('더보기 버튼', id)
//   moreButton[id] = !moreButton[id]

//   categoryStore.setFocusedCategory(props.categoryDepth1.id)
// }

const showMoreButton = (id) => {
  console.log('더보기 버튼', id)
  moreButton[id] = !moreButton[id]

  categoryStore.setFocusedCategory(props.categoryDepth1.id)
}
</script>

<style></style>
