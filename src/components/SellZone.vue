<script setup>
import AddButton from './AddButton.vue'
</script>

<template>
  <section class="wrapper">
    <h1>Des millions de petites annonces et autant d'occasions de se faire plaisir</h1>
    <div class="cover">
      <img src="../assets/img/onde-corail-4Af4yJVc.svg" alt="" />
      <h2>C'est le moment de vendre</h2>
      <AddButton />
      <img src="../assets/img/téléchargement.svg" alt="" />
    </div>
  </section>
</template>

<style scoped>
.cover {
  background-color: var(--cover-background-);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 30px;
}
</style>
