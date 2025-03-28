<script setup>
import AddButton from './AddButton.vue'
</script>

<template>
  <section class="wrapper">
    <h1>Des millions de petites annonces et autant d'occasions de se faire plaisir</h1>
    <div class="cover">
      <img
        src="https://res.cloudinary.com/dnq2ftd45/image/upload/v1743137082/onde-corail-4Af4yJVc_hokqw5.svg"
        alt=""
      />
      <h2>C'est le moment de vendre</h2>
      <AddButton />
      <img
        src="https://res.cloudinary.com/dnq2ftd45/image/upload/v1743137082/te%CC%81le%CC%81chargement_wiqwwl.svg"
        alt=""
      />
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
