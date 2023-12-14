import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const keyword = ref('')
  const searchedCategoryCount = ref(0)
  const searchedContentCount = ref(0)
  const searchedCategory = ref([])
  const searchedContent = ref([])

  function $reset() {
    keyword.value = ''
    searchedCategoryCount.value = 0
    searchedContentCount.value = 0
    searchedCategory.value = []
    searchedContent.value = []
  }

  return {
    keyword,
    searchedCategoryCount,
    searchedContentCount,
    searchedCategory,
    searchedContent,
    $reset
  }
})
