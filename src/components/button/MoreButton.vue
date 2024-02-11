<template>
  <div>
    <template v-for="btn in btnList" :key="btn">
      <button class="single-btn" @click="handleClick(btn)">{{ btn.name }}</button>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  btnList: Array
})

const handleClick = (btn) => {
  btn.clickEvent()
}
</script>

<style></style>
