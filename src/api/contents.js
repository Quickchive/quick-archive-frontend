import { authInstance } from './index'

// 콘텐츠 추가(단일)
function addContents(contentsData) {
  return authInstance.post('contents', contentsData)
}

// 콘텐츠 정보 수정
function updateContents(contentsData) {
  return authInstance.patch('contents', contentsData)
}

// 콘텐츠 조회
function getContents(categoryId) {
  return authInstance.get(`contents?categoryId=${categoryId}`)
}

// 전체 콘텐츠
function getAllContents() {
  return authInstance.get('contents')
}

// 콘텐츠 추가(다수)
function addMultipleContents(contentsData) {
  return authInstance.post('contents/multiple', contentsData)
}

// 즐겨찾기 등록 및 해제
function addFavorite(contentId) {
  return authInstance.patch(`contents/${contentId}/favorite`)
}

// 콘텐츠 삭제
function deleteContents(contentId) {
  return authInstance.delete(`contents/${contentId}`)
}

// 자신의 즐겨찾기 조회
function getFavorites() {
  return authInstance.get('contents/favorite')
}

// 자신의 리마인더 조회
function getReminderCount() {
  return authInstance.get('contents/reminder-count')
}

// 문서 요약
function summarizeContents(contentId) {
  return authInstance.get(`contents/${contentId}/summarize`)
}

// OG 데이터 크롤링
function getOgData(link) {
  return authInstance.get(`contents/og?link=${link}`)
}

export {
  addContents,
  updateContents,
  getContents,
  addMultipleContents,
  addFavorite,
  deleteContents,
  getFavorites,
  getReminderCount,
  summarizeContents,
  getAllContents,
  getOgData
}
