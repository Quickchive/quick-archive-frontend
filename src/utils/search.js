const searchCategoryDataById = (arr, id) => {
  const result = arr.find((item) => item.id === id)
  if (result) return result
  for (const item of arr) {
    if (item.children) {
      const found = searchCategoryDataById(item.children, id)
      if (found) return found
    }
  }
  return null
}

const searchCategoryDataByName = (arr, name) => {
  const result = arr.find((item) => item.name === name)
  if (result) return result
  for (const item of arr) {
    if (item.children) {
      const found = searchCategoryDataById(item.children, name)
      if (found) return found
    }
  }
  return null
}

// 실시간 검색 적용
// 검색 조건: 제목, 메모, 카테고리명에 검색어에 해당되는 텍스트가 있는 경우
// 검색결과 정렬 순서: 검색조건에 맞는 콘텐츠 및 카테고리가 최근 추가된 순서대로 노출

const getContentIdWithKeyword = (keyword, contentData) => {
  if (keyword == '') {
    return []
  }
  const titleWithKeyword = contentData
    .filter((data) => data.title.toLowerCase().includes(keyword.toLowerCase()))
    .map((data) => data)

  const commentWithKeyword = contentData
    .filter((data) => data.comment && data.comment.toLowerCase().includes(keyword.toLowerCase()))
    .map((data) => data)

  const categoryWithKeyword = contentData
    .filter(
      (data) => data.category && data.category.name.toLowerCase().includes(keyword.toLowerCase())
    )
    .map((data) => data)

  const contentIdListWithKeyword = [
    ...titleWithKeyword,
    ...commentWithKeyword,
    ...categoryWithKeyword
  ]

  const set = new Set(contentIdListWithKeyword)
  const result = [...set]
  console.log('content', result)
  return result
}

const getCategoryIdWithKeyword = (keyword, categoryData) => {
  if (keyword == '') {
    return []
  }

  const categoryListWithKeyword = []

  // 1차 카테고리 검색
  const categoryDepth1WithKeyword = categoryData
    .filter((data) => data.name.toLowerCase().includes(keyword.toLowerCase()))
    .map((data) => data)

  categoryListWithKeyword.push(...categoryDepth1WithKeyword)

  // 2차, 3차 카테고리 검색
  categoryData.forEach((category) => {
    if (category.children) {
      const categoryDepth2WithKeyword = category.children
        .filter((child) => child && child.name.toLowerCase().includes(keyword.toLowerCase()))
        .map((child) => child)

      categoryListWithKeyword.push(...categoryDepth2WithKeyword)

      if (category.children.length > 0) {
        category.children.forEach((child) => {
          // 3차 카테고리 검색
          const categoryDepth3WithKeyword = (child.children || [])
            .filter((grandChild) => grandChild.name.toLowerCase().includes(keyword.toLowerCase()))
            .map((grandChild) => grandChild)

          categoryListWithKeyword.push(...categoryDepth3WithKeyword)
        })
      }
    }
  })

  // 중복 제거
  const set = new Set(categoryListWithKeyword)
  const result = [...set]
  console.log('category', result)
  return result
}

// 한글 조합이 완성되었는지 검색
const checkHangulCompletion = (char) => {
  var lastChar = char.charAt(char.length - 1)

  // 한글 조합이 완성되었는지 확인
  var isCompleted = isHangulCompleted(lastChar)

  if (isCompleted) {
    return true
  } else {
    return false
  }
}

const isHangulCompleted = (char) => {
  // 유니코드를 통해 한글 범위 확인
  var charCode = char.charCodeAt(0)
  return charCode >= 44032 && charCode <= 55203 // 한글 음절 범위
}

const isHangul = (char) => {
  var pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  return pattern.test(char)
}

export {
  searchCategoryDataById,
  getCategoryIdWithKeyword,
  getContentIdWithKeyword,
  checkHangulCompletion,
  isHangul,
  searchCategoryDataByName
}
