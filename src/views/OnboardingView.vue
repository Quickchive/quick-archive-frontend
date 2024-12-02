<template>
  <div class="onboarding">
    <header class="header">
      <button @click="toMainPage()" class="btn--transparent"><img :src="mainLogo" /></button>
      <transition name="fade">
        <div class="wrapper__header-button" v-show="showSmButton">
          <button id="btn__app--sm">모바일 앱 다운로드</button>
          <button id="btn__web--sm" @click="toLoginPage">웹에서 이용하기</button>
        </div>
      </transition>
    </header>
    <div class="wrapper__article">
      <article class="wrapper__article-main">
        <section class="section__main">
          <h2>
            나중에 다시 보고 싶은 링크, <br />
            퀵카이브에 담아보세요.
          </h2>
          <p>저장만 해주세요. 귀찮은 카테고리 정리는 대신해 드릴게요.</p>
          <div class="wrapper__section-button" v-show="showLgButton">
            <button id="btn__app">모바일 앱 다운로드</button>
            <button id="btn__web" @click="toLoginPage">웹에서 이용하기</button>
          </div>
        </section>
      </article>
      <article class="wrapper__article__sub">
        <article class="article__img-background" id="onboarding_img-1">
          <img :src="onboarding1" />
        </article>
        <article class="article__text">
          <img :src="num1" />
          <h3>저장 버튼 한 번만 누르세요. <br />카테고리 분류는 퀵카이브가 알아서!</h3>
          <p>
            콘텐츠를 저장하기 전에 카테고리를 만들어보세요. <br />AI가 카테고리 이름과 내부
            알고리즘에 따라 콘텐츠를 저장할 카테고리를 추천해줘요.
          </p>
        </article>
      </article>
      <article class="wrapper__article__sub">
        <article class="article__text-reversed">
          <img :src="num2" />
          <h3>
            PC, 모바일 어디 기기에서든<br />
            퀵카이브를 사용할 수 있어요.
          </h3>
          <p>사무실에서도 지하철에서도 자유롭게 사용하세요.</p>
        </article>
        <article class="article__img-background" id="onboarding_img-2">
          <img :src="onboarding2" />
        </article>
      </article>
      <article class="wrapper__article__sub">
        <article class="article__img-background" id="onboarding_img-3">
          <img :src="onboarding3" />
        </article>
        <article class="article__text">
          <img :src="num3" />
          <h3>
            모아둔 콘텐츠가<br />
            나의 자산이 되는 걸 느껴보세요.
          </h3>
          <p>
            유용한 콘텐츠들이 일상에 크고 작은 도움이 될 거예요. <br />한 번 퀵카이브를 시작해
            볼까요?
          </p>
        </article>
      </article>
    </div>
    <footer class="footer__onboarding">
      <div class="wrapper__footer-onboarding">
        <ul>
          <button class="btn-main">
            <a href="https://quickarchive.co.kr/">퀵카이브</a>
          </button>

          <li>
            <a href="https://www.notion.so/fabc4b39c85b446bab8f2bb8549926b7?pvs=4">약관 및 정책</a>
          </li>
          <img :src="divider" />
          <li>
            <a href="https://www.notion.so/6bf8991d981b440bafe3c6bb9dfe3ba1?pvs=4">
              서비스 만든 사람</a
            >
          </li>
          <img :src="divider" />
          <li>이메일 문의</li>
        </ul>
        <button class="btn--instagram">
          <a
            href="https://www.instagram.com/quick_archive/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
            ><img :src="instagramLogo"
          /></a>
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import mainLogo from '@/assets/logo/logo_black_20px.svg'
import num1 from '@/assets/ic/number/ic_num_1.svg'
import num2 from '@/assets/ic/number/ic_num_2.svg'
import num3 from '@/assets/ic/number/ic_num_3.svg'
import onboarding1 from '@/assets/img/onboarding/onboarding1.png'
import onboarding2 from '@/assets/img/onboarding/onboarding2.png'
import onboarding3 from '@/assets/img/onboarding/onboarding3.png'
import divider from '@/assets/ic/divider_14px.svg'
import instagramLogo from '@/assets/ic/ic-instagram.svg'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const toLoginPage = () => {
  router.push('/login')
}

const toMainPage = () => {
  router.push('/main')
}

onMounted(() => {
  document.addEventListener('scroll', scrollEvents, true)
})

const showSmButton = ref(false)
const showLgButton = ref(true)

const scrollEvents = () => {
  if (document.querySelector('.onboarding').scrollTop > 580) {
    showSmButton.value = true
    showLgButton.value = false
  } else {
    showSmButton.value = false
    showLgButton.value = true
  }
}
</script>

<style></style>
