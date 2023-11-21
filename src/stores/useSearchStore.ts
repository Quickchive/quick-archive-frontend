import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const keyword = ref('')
  const searchedCategoryCount = ref(0)
  const searchedContentCount = ref(0)

  function clearSearchText() {
    keyword.value = ''
  }

  return { keyword, searchedCategoryCount, searchedContentCount, clearSearchText }
})
