<template>
  <the-nav-bar></the-nav-bar>
  <section class="flex-container__col">
    <title-bar></title-bar>
    <div class="divider"></div>
    <article class="flex-container__col contents-container">
      <div class="contents-num__wrapper">{{ contentsNum }}개</div>
      <div class="flex-container__col contents-list__wrapper">
        <contents-item v-for="item in items" :key="item"></contents-item>
      </div>
    </article>
  </section>
</template>

<script>
import TheNavBar from '@/components/home/TheNavBar.vue'
import TitleBar from '@/components/home/TitleBar.vue'
import ContentsItem from '@/components/home/ContentsItem.vue'

export default {
  components: {
    TheNavBar,
    TitleBar,
    ContentsItem
  },
  data() {
    return {
      contentsNum: '0',
      items: 5
    }
  }
}
</script>
