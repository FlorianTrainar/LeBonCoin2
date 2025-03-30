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
      <div>
        <h2>C'est le moment de vendre</h2>
        <AddButton />
      </div>
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
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 30px;
}
.cover h2 {
  margin-top: 5px;
}
.cover > div {
  display: flex;
  justify-content: space-evenly;
  flex: 1;
}
img {
  object-fit: cover;
  height: 100%;
}
img:first-of-type {
  object-position: right;
}
img:last-of-type {
  object-position: left;
}

/*  */
/* ------- Media Query -------- */
/*  */

@media (max-width: 1070px) {
  h1 {
    font-size: 25px;
  }
}
@media (max-width: 960px) {
  h1,
  h2 {
    font-size: 18px;
  }
  .cover {
    height: 100px;
  }

  .cover > div {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 25%;
  }
}
@media (max-width: 650px) {
  h2 {
    text-align: center;
  }
  img {
    width: 20%;
  }
}
</style>
