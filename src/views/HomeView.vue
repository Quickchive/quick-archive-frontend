<template>
  <section class="home-container">
    <router-view></router-view>
  </section>
  <!-- 토스트
  <Transition name="toast">
    <toast-default v-if="modalViewStore.toastModal"></toast-default>
  </Transition> -->
</template>

<script setup>
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import ToastDefault from '@/components/toast/ToastDefault.vue'
const modalViewStore = useModalViewStore()
</script>
