<script setup>
import { RouterView } from 'vue-router'
import HeaderPart from './components/HeaderPart.vue'
import FooterPart from './components/FooterPart.vue'
</script>

<template>
  <HeaderPart />

  <RouterView />

  <FooterPart />
</template>

<style scoped></style>
