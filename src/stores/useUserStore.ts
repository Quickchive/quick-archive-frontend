import { defineStore } from 'pinia'
import { googleLogin, kakaoLogin } from '@/api/oauth'
import { logoutUser } from '@/api/auth'
import {
  saveAccessTokenToCookie,
  saveRefreshTokenToCookie,
  getRefreshTokenFromCookie,
  deleteCookie
} from '@/utils/cookies'

// `defineStore()`의 반환 값(함수)을 할당할 변수의 이름은 원하는 대로 지정할 수 있지만,
// 스토어 이름을 사용하고 `use`와 `Store`로 묶는 것이 가장 좋습니다.
// 예: `useUserStore`, `useCartStore`, `useProductStore`
// 첫 번째 인자는 앱 전체에서 스토어의 고유 ID입니다.

// 1. 옵션 스토어
// state는 스토어의 data,
// getters는 스토어의 computed 속성,
// actions은 methods로 생각할 수 있습니다.

export const useUserStore = defineStore('user', {
  // 화살표 함수는 전체 유형 유추을 위해 권장됨.
  state: () => {
    return {
      accessToken: '',
      refreshToken: '',
      isLogin: false,
      nickname: 'testnickname',
      email: ''
    }
  },
  getters: {
    getNickname: (state) => state.nickname
  },
  actions: {
    async kakaoLogin(code: any) {
      try {
        const response = await kakaoLogin(code)
        if (response.data.statusCode == 200) {
          saveRefreshTokenToCookie(response.data.refresh_token)
          saveAccessTokenToCookie(response.data.access_token)
          this.nickname = response.data.name
          this.email = response.data.email
          this.refreshToken = response.data.refresh_token
          this.isLogin = true
        }
      } catch (error) {
        console.error(error)
      }
    },
    async googleLogin(code: any) {
      try {
        const response = await googleLogin(code)
        if (response.data.statusCode == 200) {
          saveRefreshTokenToCookie(response.data.refresh_token)
          saveAccessTokenToCookie(response.data.access_token)
          this.nickname = response.data.name
          this.email = response.data.email
          this.refreshToken = response.data.refresh_token
          this.isLogin = true
        }
      } catch (error) {
        console.error(error)
      }
    },
    async appleLogin() {
      try {
        // login 로직
      } catch (error) {
        return error
      }
    },
    async logout() {
      try {
        const refreshToken = {
          refresh_token: getRefreshTokenFromCookie()
        }
        await logoutUser(refreshToken)
        this.nickname = ''
        this.email = ''
        this.accessToken = ''
        this.refreshToken = ''
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        localStorage.removeItem('oauthInfo')
        this.isLogin = false
      } catch (error) {
        console.error(error)
      }
    },
    // 액세스 토큰 갱신
    renewAccessToken(accessToken: string) {
      this.accessToken = accessToken
      saveAccessTokenToCookie(accessToken)
    },
    // 리프레시 토큰 갱신
    renewRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken
      saveRefreshTokenToCookie(refreshToken)
    }
  }
})