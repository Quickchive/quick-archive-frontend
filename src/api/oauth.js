import { instance } from './index'

// 카카오 계정 로그인 요청: 카카오 계정 로그인 창이 켜지는 Redirect url 반환
function kakaoAuth() {
  return instance.get('oauth/kakao-auth')
}

// 카카오 로그인: 회원가입 안되어 있으면 회원가입 처리 후 로그인 처리
function kakaoLogin(code) {
  return instance.get(`oauth/kakao-login?code=${code}`)
}

// 구글 계정 로그인 요청: 구글 계정 로그인 창이 켜지는 Redirect url 반환
function googleAuth() {
  return instance.get('oauth/google-auth')
}

// 구글 로그인: 회원가입 안되어 있으면 회원가입 처리 후 로그인 처리
function googleLogin(code) {
  return instance.get(`oauth/google-login?code=${code}`)
}

// 애플 계정 로그인 요청: 애플 계정 로그인 창이 켜지는 Redirect url 반환
function appleAuth() {
  return instance.get('oauth/apple-auth')
}

// 애플 로그인:
function appleCode(code) {
  return instance.post(`oauth/apple-login?code=${code}`)
}

// 애플 로그인: 회원가입 안되어 있으면 회원가입 처리 후 로그인 처리
function appleLogin(code) {
  return instance.get(`oauth/apple-login?code=${code}`)
}

export { kakaoAuth, kakaoLogin, googleAuth, googleLogin, appleAuth, appleCode, appleLogin }
