<!-- JumpingLoader.vue -->
<template>
  <div v-show="loading" class="jumping-loader">
    <div
      v-for="i in dotsCount"
      :key="i"
      class="dot"
      :id="`dot_${i}`"
      :style="{
        'animation-delay': `${(i - 1) * 0.2}s`,
        'animation-duration': '0.9s'
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

// 점 3개 고정
const dotsCount = 3
</script>

<style scoped>
.jumping-loader {
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: #fff;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: jumpingAnimation infinite cubic-bezier(0.15, 0.46, 0.6, 1);
}

#dot_1 {
  background: #e8eaef;
}

#dot_2 {
  background: #b6b8bd;
}

#dot_3 {
  background: #84868b;
}

@keyframes jumpingAnimation {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
</style>
