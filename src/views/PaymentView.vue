<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  'pk_test_51R5VCmQ9xphEXMBUWdhOzwXrUaFydy8lxW3ZCkZKgOeQvbGPWnKdIgRcfUQVigDkbNsKOPRprfYnSMBLd82DRNOc00JcSibhrL',
)
const cardElement = ref(null)
const confirmedPayment = ref(false)

onBeforeMount(async () => {
  const stripe = await stripePromise
  const elements = stripe.elements()

  cardElement.value = elements.create('card', {
    style: {
      base: {
        fontSize: '20px',
        fontFamily: 'Impact, Haettenschweiler',
        color: 'purple',
        '::placeholder': {
          color: 'coral',
        },
        iconColor: 'aqua',
      },
      invalid: {
        color: 'blue',
        iconColor: 'gold',
      },
    },
  })
  cardElement.value.mount('#card-element')
})

const props = defineProps({
  id: { required: true },
})

const offerInfo = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures`,
    )
    offerInfo.value = data.data.attributes
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <main>
    <div class="wrapper">
      <div>
        <form>
          <h2>Finalisez votre paiement</h2>
          <section class="formSection">
            <div>
              <h3>Information personnelles</h3>
              <p>Une pièce d'identité vous sera demandé pour récupérer votre colis</p>
            </div>
            <label for="firstName">Prénom</label>
            <input type="text" id="firstName" />
            <label for="lastName">Nom</label>
            <input type="text" id="lastName" />
            <label for="phone">Téléphone</label>
            <input type="number" id="phone" />
            <p>Recevoir un SMS pour l'arrivée de votre colis ou de votre code de locker</p>
          </section>

          <p>
            Vous ne serez débités que lorsque le vendeur aura confirmé la disponibilité de la
            commande
          </p>
          <section class="formSection">
            <h3>Coordonnées bancaires</h3>
            <p v-if="confirmedPayment">Commande effectuée</p>

            <div v-else>
              <div id="card-element"></div>
              <button @click="handlePayment">Payer</button>
              <p>Paiement sécurisé</p>
            </div>
          </section>
        </form>
      </div>
      <div>
        <section class="formSection">
          <img v-if="offerInfo.pictures" :src="offerInfo.pictures.data[0].attributes.url" alt="" />
          <h3>{{ offerInfo.title }}</h3>
          <p>{{ offerInfo.price }} €</p>
        </section>
      </div>
    </div>
  </main>
</template>
<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
}
.wrapper > div {
  /* border: blue solid 1px; */
  flex: 1;
}
.formSection {
  margin: 10px 0;
}
.formSection input {
  border: grey 1px solid;
  height: 40px;
}
img {
  width: 100px;
}
</style>
