<script setup>
const props = defineProps({
  offersList: Array,
})
</script>
<template>
  <section>
    <div v-for="offer in offersList" :key="offer.id">
      <h4>{{ offer.attributes.owner.data.attributes.username }}</h4>
      <img :src="offer.attributes.pictures.data[0].attributes.url" alt="" />
      <h3>{{ offer.attributes.title }}</h3>
      <h3>{{ offer.attributes.price }} €</h3>
      <!-- <p>{{ offer.attributes.updatedAt }}</p> -->
    </div>
  </section>
</template>
<style scoped>
section {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
}
section > div {
  border: red solid 1px;
  width: 19%;
  margin: 10px 0;
}
img {
  width: 100%;
  height: 250px;
  border-radius: 20px;
  object-fit: cover;
}
</style>
