import { instance, authInstance } from './index'

// 프로필 수정
function editProfile(userData) {
  return authInstance.patch('user', userData)
}

// 프로필 조회
function getProfile() {
  return authInstance.get('user')
}

// 회원탈퇴
function deleteProfile() {
  return authInstance.delete('user')
}

// 비밀번호 재설정
function resetPw(pwData) {
  return instance.post('user/password', pwData)
}

export { editProfile, getProfile, deleteProfile, resetPw }
