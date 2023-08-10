<template>
  <div class="flex-container__col">
    <test-view></test-view>
    <RouterView />
  </div>
</template>

<script>
  import TestView from '@/views/TestView.vue'
  export default {
    components: { TestView }
  }
</script>

