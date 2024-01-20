<template>
  <div class="category-list">
    <!-- default 카테고리 -->
    <category-item-default></category-item-default>
    <!-- divider -->
    <div class="category-list__divider"></div>
    <!-- 유저 카테고리 -->
    <category-item-user-custom></category-item-user-custom>
  </div>
</template>

<script setup>
import CategoryItemUserCustom from '@/components/nav/CategoryItemUserCustom.vue'
import CategoryItemDefault from '@/components/nav/CategoryItemDefault.vue'
</script>

<style></style>
