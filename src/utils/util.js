const deleteNullContentProp = (contentObj) => {
  let contentData = { ...contentObj }

  delete contentData.id
  delete contentData.categoryIconName
  delete contentData.siteName

  if (contentObj.categoryName === '전체 콘텐츠' || '') {
    delete contentData.categoryName
  }
  if (contentObj.comment === '') {
    delete contentData.comment
  }
  if (contentObj.categoryId === -1) {
    delete contentData.categoryId
  }
  return contentData
}

// 다중 콘텐츠 배열을 받아 선택된 항목의 링크만을 모은 배열로 반환한다.
const formatMultipleLinks = (multipleContentList) => {
  const links = multipleContentList.filter((item) => item.checked).map((item) => item.link)
  return links
}

const deleteNullEditContentProp = (contentObj) => {
  let contentData = { ...contentObj }

  delete contentData.categoryId
  delete contentData.categoryIconName
  delete contentData.siteName

  if (contentObj.categoryName === '전체 콘텐츠' || '') {
    delete contentData.categoryName
  }
  if (contentObj.comment === '') {
    delete contentData.comment
  }
  if (contentObj.parentId === -1) {
    delete contentData.parentId
  }
  return contentData
}

const deleteNullCategoryProp = (categoryObj) => {
  let categoryData = { ...categoryObj }

  if (categoryData.parentId === -1) {
    delete categoryData.parentId
  }

  return categoryData
}

const formatAddCategoryData = (categoryObj) => {
  let categoryData = { ...categoryObj }

  delete categoryData.parentIconName
  delete categoryData.parentCategoryName

  if (categoryData.iconName === '') {
    categoryData.iconName = 'Folder'
  }

  if (categoryData.parentId === -1) {
    delete categoryData.parentId
  }

  return categoryData
}

const formatEditCategoryData = (categoryObj) => {
  let categoryData = { ...categoryObj }

  delete categoryData.parentIconName
  delete categoryData.parentCategoryName

  if (categoryData.parentId === -1) {
    delete categoryData.parentId
  }

  return categoryData
}

export {
  deleteNullContentProp,
  deleteNullEditContentProp,
  deleteNullCategoryProp,
  formatAddCategoryData,
  formatEditCategoryData,
  formatMultipleLinks
}
