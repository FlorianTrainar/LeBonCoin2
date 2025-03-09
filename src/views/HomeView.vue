<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

import SellZone from '../components/SellZone.vue'
import OfferCard from '@/components/OfferCard.vue'

let offersList = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=owner.avatar&populate[1]=pictures',
    )

    offersList.value = data.data
    console.log(offersList.value)
  } catch (error) {
    console.log('catch>>', error)
  }
})
</script>

<template>
  <main class="wrapper">
    <section>
      <form action="">
        <div class="price">
          <p>Prix</p>
          <div>
            <label><input type="text" placeholder="Minimum" />€</label>
            <label><input type="text" placeholder="Maximum" />€</label>
          </div>
        </div>
        <div>
          <p for="">Tri</p>
          <div>
            <label for="">Prix croissants</label>
            <input type="radio" />
            <label for="">Prix décroissants</label>
            <input type="radio" />
            <label for="">Pas de tri</label>
            <input type="radio" />
          </div>
        </div>

        <button>Rechercher</button>
      </form>

      <sell-zone />
    </section>
    <OfferCard :offersList="offersList" />
    {{}}
  </main>
</template>

<style scoped>
form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
form > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
}
form > div > div {
  display: flex;
  gap: 15px;
}
form input {
  border: none;
}
form p {
  font-size: 18px;
  font-weight: bold;
}
.price label {
  border-radius: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px grey solid;
}
</style>
