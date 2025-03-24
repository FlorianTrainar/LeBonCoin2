<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeMount, inject } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'vue-router'

const router = useRouter()

const GlobalStore = inject('GlobalStore')

const stripePromise = loadStripe(
  'pk_test_51R5VCmQ9xphEXMBUWdhOzwXrUaFydy8lxW3ZCkZKgOeQvbGPWnKdIgRcfUQVigDkbNsKOPRprfYnSMBLd82DRNOc00JcSibhrL',
)
const props = defineProps({
  id: { required: true },
})

const cardElement = ref(null)
const confirmedPayment = ref(false)

onBeforeMount(async () => {
  const stripe = await stripePromise
  const elements = stripe.elements()

  cardElement.value = elements.create('card', {
    style: {
      base: {
        fontSize: '16px',
        // fontFamily: 'Impact, Haettenschweiler',
        color: 'black',
        '::placeholder': {
          color: 'grey',
        },
        iconColor: 'grey',
      },
      invalid: {
        color: 'blue',
        iconColor: 'gold',
      },
    },
  })
  cardElement.value.mount('#card-element')
})

const offerInfo = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:1337/api/offers/${props.id}?populate[0]=pictures`,
    )
    offerInfo.value = data.data.attributes
  } catch (error) {
    console.log(error)
  }
})

const handlePayment = async () => {
  try {
    const stripe = await stripePromise
    const { token } = await stripe.createToken(cardElement.value)
    const stripeToken = token.id

    const response = await axios.post(
      'http://localhost:1337/api/offers/buy',
      {
        token: stripeToken,
        amount: offerInfo.value.price,
        title: offerInfo.value.title,
      },
      {
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfo.value.token,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    if (response.data.status === 'succeeded') {
      confirmedPayment.value = true
      console.log('OK')
      alert('OK')
    } else {
      console.log('erreur')
    }
  } catch (error) {
    console.log('error>>', error, 'FOctionne pas')
  }
}
</script>
<template>
  <main>
    <p>Payé : {{ confirmedPayment }}</p>
    <p>token : {{ GlobalStore.userInfo.value.token }}</p>
    <p>id : {{ props.id }}</p>
    <div class="wrapper">
      <h2>Finalisez votre paiement</h2>
      <div>
        <div class="payZone">
          <form @submit.prevent="handlePayment">
            <section class="formSection">
              <div>
                <h3>Information personnelles</h3>
                <p>Une pièce d'identité vous sera demandé pour récupérer votre colis</p>
              </div>
              <label for="firstName">Prénom</label>
              <div class="inputField">
                <input type="text" id="firstName" />
              </div>
              <label for="lastName">Nom</label>
              <div class="inputField">
                <input type="text" id="lastName" />
              </div>
              <label for="phone">Téléphone</label>
              <div class="inputField">
                <input type="number" id="phone" />
              </div>
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
                <div id="card-element" class="inputField"></div>

                <button>Payer</button>
                <p>Paiement sécurisé</p>
              </div>
            </section>
          </form>
        </div>
        <div class="infoZone">
          <section class="formSection">
            <img
              v-if="offerInfo.pictures"
              :src="offerInfo.pictures.data[0].attributes.url"
              alt=""
            />
            <h3>{{ offerInfo.title }}</h3>
            <p>{{ offerInfo.price }} €</p>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.wrapper > div {
  display: flex;
  justify-content: space-between;
}
.payZone {
  /* border: blue solid 1px; */
  width: 69%;
}
.infoZone {
  /* border: rgb(0, 255, 102) solid 1px; */
  width: 29%;
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
#card-element {
  display: block;
  padding: 9px 0 0 10px;
}
</style>
