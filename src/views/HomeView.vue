<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

import SellZone from '../components/SellZone.vue'
import OfferCard from '@/components/OfferCard.vue'

const offersList = ref({})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=owner.avatar&populate[1]=pictures',
    )

    offersList.value = data
    console.log(offersList.value)
  } catch (error) {
    console.log('catch>>', error)
  }
})
</script>

<template>
  <main>
    <div class="wrapper">
      <section>
        <form action="">
          <div class="price">
            <p>Prix</p>
            <div>
              <label><input type="text" placeholder="Minimum" /><span>€</span></label>
              <label><input type="text" placeholder="Maximum" /><span>€</span></label>
            </div>
          </div>
          <div>
            <p for="">Tri</p>
            <div>
              <label for="croissant">Prix croissants</label>
              <input type="radio" id="croissant" value="croissant" v-model="tri" />
              <label for="décroissant">Prix décroissants</label>
              <input type="radio" id="décroissant" value="décroissant" v-model="tri" />
              <label for="none">Pas de tri</label>
              <input type="radio" id="none" value="none" v-model="tri" />
            </div>
          </div>

          <button>Rechercher</button>
        </form>

        <sell-zone />
      </section>
      <div class="offerCardZone">
        <OfferCard
          v-for="offer in offersList.data"
          :key="offer.id"
          :offerInfos="offer.attributes"
          :id="offer.id"
        />
      </div>
    </div>
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
  margin-bottom: 30px;
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
  border-radius: 12px;
  font-size: 16px;
  border: 1px var(--grey-border-) solid;
  padding-left: 8px;
}
.price input {
  border-right: 1px solid var(--grey-border-);
  padding: 10px;
  font-size: 15px;
  width: 165px;
}
.price span {
  margin: 0px 10px;
}
.offerCardZone {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
