<template class="authenticated-view">
  <div class="wrapper__navbar">
    <the-nav-bar></the-nav-bar>
  </div>
  <RouterView />
  <!-- 토스트 -->
  <Transition name="toast">
    <toast-default v-if="modalViewStore.toastModal"></toast-default>
  </Transition>
  <!-- 토스트 -->
  <Transition name="toast">
    <toast-error v-if="modalViewStore.toastErrorModal"></toast-error>
  </Transition>
</template>

<script setup>
import TheNavBar from '@/components/nav/TheNavBar.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import ToastDefault from '@/components/toast/ToastDefault.vue'
import ToastError from '@/components/toast/ToastError.vue'
const modalViewStore = useModalViewStore()
</script>
