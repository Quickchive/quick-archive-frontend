import { instance, authInstance } from './index'

// 로그인
function loginUser(userData) {
  return instance.post('auth/login', userData)
}

// 로그아웃
function logoutUser(refreshToken) {
  return authInstance.post('auth/logout', refreshToken)
}

// 토큰 재발행
function reissueToken(refreshToken) {
  return instance.post('auth/token', refreshToken)
}

// 비밀번호 재설정을 위한 메일 전송
function sendPwResetEmail(email) {
  return instance.get(`auth/send-password-reset-email/${email}`)
}

export { loginUser, logoutUser, reissueToken, sendPwResetEmail }
