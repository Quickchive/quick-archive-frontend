<template>
  <div class="category-item">
    <!-- 1차 카테고리 -->
    <ul v-if="categoryData.name" class="category-list__first-ul">
      <li>
        <div class="flex-container__row--align-center">
          <button
            class="button--transparent expand-button"
            @click="controlFirstCategory(categoryData.children)"
          >
            <img v-if="secondCategory.show" :src="expandLessIcon" />
            <img v-if="!secondCategory.show" :src="expandMoreIcon" />
          </button>
          <button
            class="button--transparent category-list__button"
            @click="toCategoryPage(categoryData.id)"
          >
            <img :src="categoryIcon" class="category-icon img-category-icon" />
            {{ categoryData.name }}
          </button>
        </div>
        <button class="button--transparent moreButton" @click="showMoreButton()">
          <img :src="moreIcon" /> <more-button v-if="moreButton.first"></more-button>
        </button>
      </li>
      <!-- 2차 카테고리 -->
      <template v-if="secondCategory.show">
        <ul v-for="(categoryItem2, i) in categoryData.children" :key="i">
          <li>
            <div class="flex-container__row--align-center">
              <button class="button--transparent expand-button" @click="controlSecondCategory(i)">
                <img v-if="thirdCategoryArr[i]" :src="expandLessIcon" />
                <img v-if="!thirdCategoryArr[i]" :src="expandMoreIcon" />
              </button>
              <button
                class="button--transparent category-list__button"
                @click="toCategoryPage(categoryItem2.id)"
              >
                <img :src="categoryIcon" class="category-icon img-category-icon" />{{
                  categoryItem2.name
                }}
              </button>
            </div>
            <button class="button--transparent moreButton" @click="showSecondMoreButton(i)">
              <!-- <more-button v-if="moreButton.second[i]"></more-button><img :src="moreIcon" /> -->
            </button>
          </li>
          <!-- 3차 카테고리 -->
          <template v-if="thirdCategoryArr[i]">
            <ul v-for="(categoryItem3, k) in categoryItem2.children" :key="k">
              <li>
                <div class="flex-container__row--align-center">
                  <button class="button--transparent expand-button">
                    <img :src="expandMoreIcon" />
                  </button>
                  <button
                    class="button--transparent category-list__button"
                    @click="toCategoryPage(categoryItem3.id)"
                  >
                    <img :src="categoryIcon" class="category-icon img-category-icon" />{{
                      categoryItem3.name
                    }}
                  </button>
                </div>
                <button class="button--transparent moreButton" @click="showThirdMoreButton(i, k)">
                  <img :src="moreIcon" />
                  <!-- <more-button v-if="moreButton.second[i].third[k]"></more-button -->
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
import MoreButton from '@/components/button/MoreButton.vue'
import { isProxy, toRaw } from 'vue'

const router = useRouter()

const props = defineProps({
  categoryData: Object
})

let thirdCategoryArr = reactive([])
const secondCategory = reactive({ show: false })
// let addMoreButton = reactive([])
// let secondMoreButton = reactive([])
// let thirdMoreButton = reactive([])

let moreButton = reactive({
  // first: false,
  // second: [
  //   {
  //     show: false,
  //     third: [
  //       {
  //         show: false
  //       }
  //     ]
  //   }
  // ]
})

moreButton.first = false

if (props.categoryData.children) {
  console.log(toRaw(props.categoryData), '카테고리데이터터터터터')
  thirdCategoryArr.length = Number(props.categoryData.children.length)
  for (let i = 0; i < props.categoryData.children.length; i++) {
    console.log(props.categoryData.children.length)
    thirdCategoryArr[i] = false
    // moreButton.second[i].show = false
    // if (props.categoryData.children[i].children.length !== 0) {
    // for (let j = 0; j < props.categoryData.children[i].children.length; j++) {
    // moreButton.second[i].third[j].show = false
    // }
    // }
  }
  console.log('morebutton', toRaw(moreButton))
}

const controlFirstCategory = (children) => {
  if (children) {
    secondCategory.show = !secondCategory.show
  }
}

const controlSecondCategory = (index) => {
  console.log(index, 'index')
  // if (index) {
  thirdCategoryArr[index] = !thirdCategoryArr[index]
  console.log('thirdCategoryArr', thirdCategoryArr[index])
  // }
}

const toCategoryPage = (categoryId) => {
  router.push(`/category/${categoryId}`)
  console.log('tocategorypage', categoryId)
}

const showMoreButton = (index) => {
  if (!index) {
    moreButton.first = !moreButton.first
  }
}

const showSecondMoreButton = (index) => {
  moreButton.second[index].show = !moreButton.second[index].show
}

const showThirdMoreButton = (i, k) => {
  moreButton.second[i].third[k].show = !moreButton.second[i].third[k].show
}
</script>

<style></style>
