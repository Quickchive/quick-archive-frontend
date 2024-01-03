<template>
  <div class="onboarding">
    <header class="header">
      <button @click="toMainPage()" class="button--transparent"><img :src="mainLogo" /></button>
    </header>
    <div class="wrapper__article">
      <article class="wrapper__article-main">
        <section class="section__main">
          <h2>
            나중에 다시 보고 싶은 링크, <br />
            퀵카이브에 담아보세요.
          </h2>
          <p>저장만 해주세요. 귀찮은 카테고리 정리는 대신해 드릴게요.</p>
          <div class="wrapper__section-button">
            <button id="btn__app">모바일 앱 다운로드</button>
            <button id="btn__web">웹에서 이용하기</button>
          </div>
        </section>
      </article>
      <article class="wrapper__article__sub">
        <article class="article__img-background"></article>
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
        <article class="article__img-background"></article>
      </article>
      <article class="wrapper__article__sub">
        <article class="article__img-background"></article>
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

    <footer></footer>
  </div>
</template>

<script setup>
import mainLogo from '@/assets/logo/logo_black_20px.svg'
import num1 from '@/assets/ic/number/ic_num_1.svg'
import num2 from '@/assets/ic/number/ic_num_2.svg'
import num3 from '@/assets/ic/number/ic_num_3.svg'
</script>

<style></style>
