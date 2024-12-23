import { defineStore } from 'pinia'
import { googleLogin, kakaoLogin, appleLogin } from '@/api/oauth'
import { logoutUser, loginUser } from '@/api/auth'
import { getProfile, deleteProfile, editProfile } from '@/api/user'
import {
  saveAccessTokenToCookie,
  saveRefreshTokenToCookie,
  getRefreshTokenFromCookie,
  deleteCookie,
  saveHideAlertToCookie,
  saveAutoCategorizeSettingFromCookie,
  getAutoCategorizeSettingFromCookie,
  saveSocialInfoToCookie,
  getSocialInfoFromCookie
} from '@/utils/cookies'
import { useRouter } from 'vue-router'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const modalViewStore = useModalViewStore()
  const accessToken = ref('')
  const refreshToken = ref('')
  const isLogin = ref(false)
  const nickname = ref('testnickname')
  const email = ref('tester@naver.com')
  const profileChecked = ref(false)
  // 마이페이지
  const recommendationMode: any = ref(true)
  const socialLoginInfo: any = ref('')
  function getRefreshToken() {
    return refreshToken.value
  }

  // 로그인
  async function testerLogin(userData: any) {
    try {
      const response: any = await loginUser(userData)
      console.log('로그인 응답', response)
      saveRefreshTokenToCookie(response.data.refresh_token)
      saveAccessTokenToCookie(response.data.access_token)
      saveHideAlertToCookie(false)
      refreshToken.value = response.data.refresh_token
      isLogin.value = true
      if (response.data.statusCode === 201) {
        router.push('/main')
      }
    } catch (error) {
      console.error(error)
      window.alert(error)
    }
  }

  async function kakaoSocialLogin(code: any) {
    try {
      const response: any = await kakaoLogin(code)
      console.log('카카오 응답', response)
      if (response.data.statusCode == 200) {
        saveRefreshTokenToCookie(response.data.refresh_token)
        saveAccessTokenToCookie(response.data.access_token)
        saveHideAlertToCookie(false)

        nickname.value = response.data.name
        email.value = response.data.email
        refreshToken.value = response.data.refresh_token
        isLogin.value = true
      }
    } catch (error) {
      console.error(error)
    }
  }
  async function googleSocialLogin(code: any) {
    try {
      const response: any = await googleLogin(code)
      console.log('google 응답', response)
      if (response.data.statusCode == 200) {
        saveRefreshTokenToCookie(response.data.refresh_token)
        saveAccessTokenToCookie(response.data.access_token)
        saveHideAlertToCookie(false)

        nickname.value = response.data.name
        email.value = response.data.email
        refreshToken.value = response.data.refresh_token
        isLogin.value = true
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function appleSocialLogin(code: any) {
    try {
      const response: any = await appleLogin(code)
      console.log('apple 응답', response)
      if (response.data.statusCode == 200) {
        saveRefreshTokenToCookie(response.data.refresh_token)
        saveAccessTokenToCookie(response.data.access_token)
        saveHideAlertToCookie(false)

        nickname.value = response.data.name
        email.value = response.data.email
        refreshToken.value = response.data.refresh_token
        isLogin.value = true
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function logout() {
    try {
      const refresh_token = {
        refresh_token: getRefreshTokenFromCookie()
      }
      const response = await logoutUser(refresh_token)
      if (response.data.statusCode === 201 || response.data.statusCode === 200) {
        modalViewStore.hideModalWithOverlay('logout', 'settingAlert')
        nickname.value = ''
        email.value = ''
        accessToken.value = ''
        refreshToken.value = ''
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        localStorage.removeItem('oauthInfo')
        isLogin.value = false
        router.push('/login')
      }
    } catch (error) {
      console.error(error)
    }
  }
  // 프로필 조회
  async function getUserProfile() {
    try {
      const response: any = await getProfile()
      console.log(response)
      nickname.value = response.data.name
      email.value = response.data.email
      if (response.status === 201 || response.status === 200) {
        isLogin.value = true
        profileChecked.value = true
      }
    } catch (error) {
      isLogin.value = false
      profileChecked.value = false
      console.error(error)
    }
  }

  // 회원 탈퇴
  async function withdrawal() {
    try {
      const response = await deleteProfile()
      console.log(response)
      if (response.data.statusCode === 201 || response.data.statusCode === 200) {
        modalViewStore.hideModalWithOverlay('withdrawal', 'settingAlert')

        router.push('/login')
      }
    } catch (error) {
      console.error(error)
    }
  }
  // 액세스 토큰 갱신
  function renewAccessToken(access_token: string) {
    accessToken.value = access_token
    saveAccessTokenToCookie(access_token)
  }
  // 리프레시 토큰 갱신
  function renewRefreshToken(refresh_token: string) {
    refreshToken.value = refresh_token
    saveRefreshTokenToCookie(refresh_token)
  }
  /******* 마이 페이지 ********/
  // 카테고리 추천
  function enableRecommendationMode() {
    recommendationMode.value = !recommendationMode.value
    saveAutoCategorizeSettingFromCookie(recommendationMode.value)
    // 카테고리 추천 모드 요청 로직
  }

  function getRecommendationMode() {
    recommendationMode.value = getAutoCategorizeSettingFromCookie()
    return recommendationMode.value
  }

  // 프로필 수정(닉네임 수정)
  async function editNickname(newNickname: string) {
    const profileData = {
      name: newNickname
    }

    try {
      const response = await editProfile(profileData)
      nickname.value = newNickname
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  function setSocialLoginInfo(snsName: string) {
    socialLoginInfo.value = snsName
    saveSocialInfoToCookie(snsName)
  }

  function getSocialLoginInfo() {
    console.log('oauthInfo', getSocialInfoFromCookie())

    if (getSocialInfoFromCookie() !== null) {
      socialLoginInfo.value = getSocialInfoFromCookie()
    }

    return getSocialInfoFromCookie()
  }

  return {
    accessToken,
    refreshToken,
    isLogin,
    nickname,
    email,
    recommendationMode,
    socialLoginInfo,
    // function
    kakaoSocialLogin,
    googleSocialLogin,
    appleSocialLogin,
    logout,
    getUserProfile,
    withdrawal,
    renewAccessToken,
    renewRefreshToken,
    enableRecommendationMode,
    editNickname,
    setSocialLoginInfo,
    testerLogin,
    getRefreshToken,
    getSocialLoginInfo,
    getRecommendationMode,
    profileChecked
  }
})
