const filterByCategoryIsNull = (data) => {
  let result = []

  data.forEach((item) => {
    if (item.category.name === '미지정') {
      result.push(item)
    }
  })

  return result
}

const filterByFavoriteAndCategoryIsNull = (data) => {
  let result = []

  data.forEach((item) => {
    if (item.category.name === '미지정' && item.favorite === true) {
      result.push(item)
    }
  })

  return result
}

const filterByFavorite = (data) => {
  let result = []

  data.forEach((item) => {
    if (item.favorite === true) {
      result.push(item)
    }
  })

  return result
}

export { filterByCategoryIsNull, filterByFavoriteAndCategoryIsNull, filterByFavorite }
