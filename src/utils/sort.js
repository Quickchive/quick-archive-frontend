// 최신 순
const sortByCreatedAtDescending = (contents) => {
  return contents.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return dateB - dateA
  })
}

// 오래된 순
const sortByCreatedAtAscending = (contents) => {
  return contents.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return dateA - dateB
  })
}

export { sortByCreatedAtDescending, sortByCreatedAtAscending }
