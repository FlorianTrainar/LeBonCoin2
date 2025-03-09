<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  offersList: Array,
})
</script>
<template>
  <section>
    <div v-for="offer in offersList" :key="offer.id">
      <RouterLink :to="{ name: 'offer', params: { id: offer.id } }">
        <div class="ownerZone">
          <img
            v-if="offer.attributes.owner.data.attributes.avatar.data"
            :src="offer.attributes.owner.data.attributes.avatar.data.attributes.url"
            alt=""
          />
          <h4>{{ offer.attributes.owner.data.attributes.username }}</h4>
        </div>
        <div class="offerZone">
          <img
            class="offerPicture"
            :src="offer.attributes.pictures.data[0].attributes.url"
            alt=""
          />
          <h3>{{ offer.attributes.title }}</h3>
          <h3>{{ offer.attributes.price }} €</h3>
          <div>
            <p>{{ offer.attributes.publishedAt }}</p>
            <font-awesome-icon :icon="['far', 'heart']" />
          </div>
        </div>
      </RouterLink>
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
  width: 19%;
  margin: 10px 0;
}
.ownerZone {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px;
}
.ownerZone img {
  border-radius: 50%;
  width: 28px;
}
.offerZone {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.offerZone img {
  width: 100%;
  height: 230px;
  border-radius: 20px;
  object-fit: cover;
}
.offerZone div {
  color: grey;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
