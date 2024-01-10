<template>
  <div class="testerLogin">
    <div class="testerLogin-form">
      <h1>Tester Login</h1>

      <form>
        <div>
          <label id="email">이메일</label>
          <input type="text" v-model="email" id="email" @keyup.enter="submitForm()" />
        </div>
        <div>
          <label id="pw">비밀번호</label>
          <input type="password" v-model="pw" id="pw" @keyup.enter="submitForm()" />
        </div>
      </form>
      <button :disabled="!email || !pw" type="button" @click="submitForm()">로그인</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore.ts'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const email = ref('')
const pw = ref('')

const userStore = useUserStore()
const router = useRouter()

// 로그인 요청
const submitForm = async () => {
  try {
    const userData = {
      email: email.value,
      password: pw.value,
      auto_login: true
    }
    await userStore.testerLogin(userData)
  } catch (error) {
    console.log(error)
  } finally {
    router.push('/home')
  }
}
</script>
<style></style>
