<template>
  <Toggle :value="value" class="toggle-button" @click="toggleOn()" />
</template>

<script setup>
import Toggle from '@vueform/toggle'
import { defineProps } from 'vue'

const props = defineProps({
  value: Boolean,
  toggleOn: Function
})
</script>
<style src="@vueform/toggle/themes/default.css"></style>
