<template class="authenticated-view">
  <div class="wrapper__navbar">
    <the-nav-bar></the-nav-bar>
  </div>
  <RouterView />
  <!-- 토스트 -->
  <div class="wrapper__toast">
    <Transition name="toast">
      <toast-default v-if="toastStore.toastModal"></toast-default>
    </Transition>
    <!-- 토스트 -->
    <Transition name="toast">
      <toast-error v-if="toastStore.toastErrorModal"></toast-error>
    </Transition>
  </div>
</template>

<script setup>
import TheNavBar from '@/components/nav/TheNavBar.vue'
import ToastDefault from '@/components/toast/ToastDefault.vue'
import ToastError from '@/components/toast/ToastError.vue'
import { useToastStore } from '@/stores/useToastStore.ts'

const toastStore = useToastStore()
</script>
