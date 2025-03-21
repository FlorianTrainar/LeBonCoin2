<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <RouterLink :to="{ name: 'publish' }">
    <button>
      <font-awesome-icon :icon="['far', 'plus-square']" />
      Déposer une Annonce
    </button>
  </RouterLink>
</template>
<style scoped>
button {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
}
</style>
