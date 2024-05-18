const deleteNullContentProp = (contentObj) => {
  let contentData = contentObj

  delete contentData.id
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

const deleteNullEditContentProp = (contentObj) => {
  let contentData = contentObj

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

export { deleteNullContentProp, deleteNullEditContentProp }
