<template>
  <article class="flex-container__row item-container">
    <img :src="thumbnail" class="thumbnail__wrapper" />
    <article class="item__wrapper">
      <h1>{{ title }}</h1>
      <p>{{ text }}</p>
      <footer class="flex-container__row">
        <img class="ic-category" :src="categoryIcon" />
        {{ category }}
        <img :src="divider" />
        {{ siteName }}
      </footer>
    </article>
    <button class="img-btn"><img :src="moreIcon" /></button>
  </article>
</template>

<script>
import thumbnail from '@/assets/img/thumbnail1.png'
import categoryIcon from '@/assets/ic/ic-category.svg'
import divider from '@/assets/img/divider_14px.svg'
import moreIcon from '@/assets/ic/ic-more.svg'

export default {
  // props: {
  //   thumbnail: String,
  //   categoryIcon,
  //   title: String,
  //   text: String
  //   category: '브런치',
  //   siteName: 'Brunch',
  // },
  data() {
    return {
      thumbnail,
      categoryIcon,
      title: '돈 있어도 못 사는 건 샤넬백만이 아니다',
      text: '샤넬백이 없지만 어린이집 등원시킬 때, 학원에 데리러 갈 때 그 백을 맬 필요는 없으니 됐다고 했다. 그 백을 사려면 돈만 있다고 되는 게 아니라고 했다. 경차 한 대 값 정도의 그 백은 백화점 문도 열기 전 새벽부터 줄을 서서 사야 한다고 했다. 재테크 좋아해서 "주식하는 아주머니"라면서 샤테크도 모르냐고 그 백이 있는 친구는 말했다. 하나 사라고. 값이 더 오를 거라고. 중고로 팔아도 된다고.',
      divider,
      category: '브런치',
      siteName: 'Brunch',
      moreIcon
    }
  }
}
</script>

<style></style>
