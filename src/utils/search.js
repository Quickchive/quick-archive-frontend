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

// 실시간 검색 적용
// 검색 조건: 제목, 메모, 카테고리명에 검색어에 해당되는 텍스트가 있는 경우
// 검색결과 정렬 순서: 검색조건에 맞는 콘텐츠 및 카테고리가 최근 추가된 순서대로 노출

const getContentIdWithKeyword = (keyword, contentData) => {
  const titleWithKeyword = contentData
    .filter((data) => data.title.toLowerCase().includes(keyword))
    .map((data) => data.id)

  const commentWithKeyword = contentData
    .filter((data) => data.comment && data.comment.toLowerCase().includes(keyword))
    .map((data) => data.id)

  const categoryWithKeyword = contentData
    .filter((data) => data.category && data.category.name.toLowerCase().includes(keyword))
    .map((data) => data.id)

  const contentIdListWithKeyword = [
    ...titleWithKeyword,
    ...commentWithKeyword,
    ...categoryWithKeyword
  ]

  const set = new Set(contentIdListWithKeyword)
  const result = [...set]
  return result
}

const getCategoryIdWithKeyword = (keyword, categoryData) => {
  const categoryListWithKeyword = []

  // 1차 카테고리 검색
  const categoryDepth1WithKeyword = categoryData
    .filter((data) => data.name.toLowerCase().includes(keyword))
    .map((data) => data.id)

  categoryListWithKeyword.push(...categoryDepth1WithKeyword)

  // 2차, 3차 카테고리 검색
  categoryData.forEach((category) => {
    if (category.children) {
      const categoryDepth2WithKeyword = category.children
        .filter((child) => child && child.name.toLowerCase().includes(keyword))
        .map((child) => child.id)

      categoryListWithKeyword.push(...categoryDepth2WithKeyword)

      if (category.children.length > 0) {
        category.children.forEach((child) => {
          // 3차 카테고리 검색
          const categoryDepth3WithKeyword = (child.children || [])
            .filter((grandChild) => grandChild.name.toLowerCase().includes(keyword))
            .map((grandChild) => grandChild.id)

          categoryListWithKeyword.push(...categoryDepth3WithKeyword)
        })
      }
    }
  })

  // 중복 제거
  const set = new Set(categoryListWithKeyword)
  const result = [...set]
  return result
}

export { searchCategoryDataById, getCategoryIdWithKeyword, getContentIdWithKeyword }
