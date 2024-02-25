const filterByCategoryIsNull = (data) => {
  let result = []

  data.forEach((item) => {
    if (item.category === null) {
      result.push(item)
    }
  })

  return result
}

const filterByFavoriteAndCategoryIsNull = (data) => {
  let result = []

  data.forEach((item) => {
    if (item.category === null && item.favorite === true) {
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
