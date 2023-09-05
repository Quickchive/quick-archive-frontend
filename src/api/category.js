import { authInstance } from './index'

// 카테고리 추가
function addCategories(categoryData) {
  return authInstance.post('categories', categoryData)
}

// 카테고리 수정
function updateCategories(categoryData) {
  return authInstance.patch('categories', categoryData)
}

// 자신의 카테고리 조회
function getCategories() {
  return authInstance.get('categories')
}

// 카테고리 삭제
function deleteCategories(categoryId, deleteContentFlag) {
  return authInstance.delete(`categories/${categoryId}?deleteContentFlag=${deleteContentFlag}`)
}
// 최근 저장한 카테고리 조회
function getFrequentSavedCategories() {
  return authInstance.get('categories/frequent')
}
export {
  addCategories,
  updateCategories,
  deleteCategories,
  getCategories,
  getFrequentSavedCategories
}
