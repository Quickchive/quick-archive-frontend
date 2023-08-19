<template>
  <Toggle v-model="value" class="toggle-button" />
</template>

<script>
import Toggle from '@vueform/toggle'
export default {
  components: {
    Toggle
  },
  data: function () {
    return {
      value: false
    }
  }
}
</script>
<style src="@vueform/toggle/themes/default.css"></style>
