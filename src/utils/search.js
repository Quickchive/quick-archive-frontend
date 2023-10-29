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

export { searchCategoryDataById }
