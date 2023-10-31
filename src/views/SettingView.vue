<template>
  <div class="wrapper__navbar">
    <the-nav-bar></the-nav-bar>
  </div>
  <div class="wrapper__setting-component">
    <router-view></router-view>
  </div>

  <!-- 얼럿 모달: 로그아웃 -->
  <div class="alert-overlay" v-if="modalStore.settingAlertOverlay"></div>
  <div class="alert-view" v-if="modalStore.logoutModal">
    <alert-confirm
      :message="logoutMessage"
      :closeModal="closeLogoutModal"
      :confirm="logout"
      :checkbox="logoutCheckbox"
      :closeButtonMessage="logoutCloseButtonMessage"
      :confirmButtonMessage="logoutConfirmButtonMessage"
    ></alert-confirm>
  </div>

  <!-- 얼럿 모달: 회원 탈퇴 -->
  <div class="alert-view" v-if="modalStore.withdrawalModal">
    <alert-confirm
      :message="withdrawalMessage"
      :closeModal="withdrawal"
      :confirm="closeWithdrawalModal"
      :checkbox="withdrawalCheckbox"
      :closeButtonMessage="withdrawalCloseButtonMessage"
      :confirmButtonMessage="withdrawalConfirmButtonMessage"
    ></alert-confirm>
  </div>
</template>

<script setup>
import TheNavBar from '@/components/nav/TheNavBar.vue'
import AlertConfirm from '@/components/modal/alert/AlertConfirm.vue'
import { useModalStore } from '@/stores/useModalStore.ts'
import { useUserStore } from '@/stores/useUserStore.ts'

const logoutMessage = '정말 로그아웃 하시겠어요?'
const logoutCheckbox = false
const logoutCloseButtonMessage = '닫기'
const logoutConfirmButtonMessage = '확인'

const withdrawalMessage = `퀵카이브 탈퇴 시, 
모든 콘텐츠가 삭제되며 복구되지 않습니다.
그래도 퀵카이브를 탈퇴하시겠어요?`
const withdrawalCheckbox = false
const withdrawalCloseButtonMessage = '탈퇴'
const withdrawalConfirmButtonMessage = '닫기'

const modalStore = useModalStore()
const userStore = useUserStore()

const closeLogoutModal = () => {
  modalStore.closeLogoutModal()
}

const logout = () => {
  userStore.logout()
}

const closeWithdrawalModal = () => {
  modalStore.closeWithdrawalModal()
}

const withdrawal = () => {
  userStore.withdrawal()
}
</script>
