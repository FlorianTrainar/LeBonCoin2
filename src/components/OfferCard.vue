<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  offerInfos: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})

const correctedPrice = computed(() => {
  const price = props.offerInfos.price.toString()

  let newPrice = ''

  for (let i = price.length - 1; i >= 0; i--) {
    if (newPrice.length === 3 || newPrice.length === 7) {
      newPrice = price[i] + ' ' + newPrice
    } else {
      newPrice = price[i] + newPrice
    }
  }
  return newPrice
})
</script>
<template>
  <section>
    <RouterLink :to="{ name: 'offer', params: { id: id } }">
      <div class="card">
        <div>
          <div class="ownerZone">
            <img
              v-if="offerInfos.owner.data.attributes.avatar.data"
              :src="offerInfos.owner.data.attributes.avatar.data.attributes.url"
              alt=""
            />
            <h4>{{ offerInfos.owner.data.attributes.username }}</h4>
          </div>
          <div class="offerZone">
            <img
              v-if="offerInfos.pictures.data"
              :src="offerInfos.pictures.data[0].attributes.url"
              alt=""
            />
            <img
              v-else
              src="../assets/img/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            />
            <h3>{{ offerInfos.title }}</h3>
            <h3>{{ correctedPrice }} €</h3>
          </div>
        </div>
        <div class="bottomZone">
          <p>{{ offerInfos.publishedAt }}</p>
          <font-awesome-icon :icon="['far', 'heart']" />
        </div>
      </div>
    </RouterLink>
  </section>
</template>
<style scoped>
section {
  margin: 10px 0 30px 0;
  width: 18%;
  height: 370px;
  border: solid 1px blues;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
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
  object-fit: cover;
}
.offerZone {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}
.offerZone img {
  width: 100%;
  height: 220px;
  border-radius: 20px;
  object-fit: cover;
}
.offerZone div {
  color: grey;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.bottomZone {
  display: flex;
  justify-content: space-between;
}
p {
  font-size: 14px;
}
h4 {
}
</style>
