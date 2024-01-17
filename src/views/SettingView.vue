<template>
  <div class="wrapper__setting-component">
    <router-view></router-view>
  </div>
  <div class="alert-overlay" v-if="modalViewStore.settingAlertOverlay"></div>

  <!-- 얼럿 모달: 로그아웃 -->
  <div class="alert-view" v-if="modalViewStore.logoutModal">
    <alert-confirm :alertData="alertDataStore.logoutAlertData"></alert-confirm>
  </div>
  <!-- 얼럿 모달: 회원 탈퇴 -->
  <div class="alert-view" v-if="modalViewStore.withdrawalModal">
    <alert-confirm :alertData="alertDataStore.withdrawalAlertData"></alert-confirm>
  </div>
</template>

<script setup>
import AlertConfirm from '@/components/modal/alert/AlertConfirm.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
const alertDataStore = useAlertDataStore()
const modalViewStore = useModalViewStore()
</script>
