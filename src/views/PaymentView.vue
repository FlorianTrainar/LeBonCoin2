<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeMount, inject, computed } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'vue-router'

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const props = defineProps({
  id: { required: true },
})

// ----

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

// ---

const offerInfo = ref('')
const offerPrice = ref(0)
const offerPicture = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--backend-leboncoin--p4zjh85jtpgn.code.run/api/offers/${props.id}?populate[0]=pictures`,
    )
    offerInfo.value = data.data.attributes
    offerPrice.value = parseFloat(offerInfo.value.price).toFixed(2)
    if (offerInfo.value.pictures.data) {
      offerPicture.value = offerInfo.value.pictures.data[0].attributes.url
    }
  } catch (error) {
    console.log(error)
  }
})

// ---

const deliveryPrice = ref(0)

const total = computed(() => {
  return (offerInfo.value.price + 0.99 + parseInt(deliveryPrice.value)).toFixed(2)
})

// ---
const firstName = ref('')
const lastName = ref('')
const phone = ref(null)
const errorMessage = ref('')
const clearErrorMessage = () => {
  if (clearErrorMessage) {
    errorMessage.value = ''
  }
}

const handlePayment = async () => {
  if (!firstName.value || !lastName.value || !phone.value) {
    errorMessage.value = 'Merci de remplir tous les champs'
    return errorMessage
  } else {
    try {
      const stripe = await stripePromise
      const { token } = await stripe.createToken(cardElement.value)
      const stripeToken = token.id

      const response = await axios.post(
        'https://site--backend-leboncoin--p4zjh85jtpgn.code.run/api/offers/buy',
        {
          token: stripeToken,
          amount: total.value,
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
        alert(
          `Paiement de ${total.value} validé pour l'achat de ${offerInfo.value.title} par ${firstName.value} ${lastName.value}`,
        )
      } else {
        console.log('erreur')
      }
    } catch (error) {
      console.log('error>>', error, 'FOctionne pas')
    }
  }
}
</script>
<template>
  <main>
    <!-- <p>Payé : {{ confirmedPayment }}</p>
    <p>token : {{ GlobalStore.userInfo.value.token }}</p>
    <p>id : {{ props.id }}</p> -->
    <div class="wrapper">
      <h2>Finalisez votre paiement</h2>
      <!--  -->

      <div class="articleArea" id="smallScreen">
        <section class="articleSection">
          <div class="infoZone">
            <div>
              <img v-if="offerPicture" :src="offerPicture" alt="" />
              <img
                v-else
                src="../assets/img/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
              />
              <h3>{{ offerInfo.title }}</h3>
            </div>
            <p class="price">{{ GlobalStore.correctedPrice(offerPrice.toString()) }} €</p>
          </div>
          <div class="deliveryZone">
            <form action="">
              <h3>Mode de remise</h3>
              <div>
                <input
                  type="radio"
                  id="option1"
                  name="delivery"
                  value="0"
                  v-model="deliveryPrice"
                  @click="$emit(deliveryMethod, 0)"
                />
                <label for="option1"
                  ><p>Remise en main propre</p>
                  <span
                    >Payez en ligne et récupérer votre achat en main propre lors de votre
                    rendez-vous avec le vendeur</span
                  ></label
                >
              </div>
              <div>
                <div>
                  <input
                    type="radio"
                    id="option2"
                    name="delivery"
                    value="15,60"
                    v-model="deliveryPrice"
                  />
                  <label for="option2"
                    ><p>Colissimo</p>
                    <span>à votre domicile sous 2-3 jours</span></label
                  >
                </div>
                <p class="price">15, 60 €</p>
              </div>
            </form>
            <div>
              <div>
                <h3>Protection leboncoin</h3>
                <p class="price">0, 99 €</p>
              </div>
              <p>Votre argent est sécurisé et versé au bon moment</p>
              <p>Notre service client dédié vous accompagne</p>
            </div>
          </div>
          <div class="totalZone">
            <h3>Total</h3>
            <p class="price">{{ GlobalStore.correctedPrice(total.toString()) }} €</p>
          </div>
        </section>
      </div>

      <!--  -->

      <div>
        <!-- User Area -->

        <div class="userArea">
          <form @submit.prevent="handlePayment">
            <section class="formSection">
              <div>
                <h3>Information personnelles</h3>
                <p>Une pièce d'identité vous sera demandé pour récupérer votre colis</p>
              </div>
              <label for="firstName">Prénom</label>
              <div class="inputField">
                <input type="text" id="firstName" v-model="firstName" @input="clearErrorMessage" />
              </div>
              <label for="lastName">Nom</label>
              <div class="inputField">
                <input type="text" id="lastName" v-model="lastName" @input="clearErrorMessage" />
              </div>
              <label for="phone">Téléphone</label>
              <div class="inputField">
                <input type="number" id="phone" v-model="phone" @input="clearErrorMessage" />
              </div>
              <p>Recevoir un SMS pour l'arrivée de votre colis ou de votre code de locker</p>
              <p class="errorText" v-if="errorMessage">{{ errorMessage }}</p>
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

        <!-- Article Area -->

        <div class="articleArea" id="fullScreen">
          <section class="articleSection">
            <div class="infoZone">
              <div>
                <img v-if="offerPicture" :src="offerPicture" alt="" />
                <img
                  v-else
                  src="../assets/img/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                />
                <h3>{{ offerInfo.title }}</h3>
              </div>
              <p class="price">{{ GlobalStore.correctedPrice(offerPrice.toString()) }} €</p>
            </div>
            <div class="deliveryZone">
              <form action="">
                <h3>Mode de remise</h3>
                <div>
                  <input
                    type="radio"
                    id="option1"
                    name="delivery"
                    value="0"
                    v-model="deliveryPrice"
                    @click="$emit(deliveryMethod, 0)"
                  />
                  <label for="option1"
                    ><p>Remise en main propre</p>
                    <span
                      >Payez en ligne et récupérer votre achat en main propre lors de votre
                      rendez-vous avec le vendeur</span
                    ></label
                  >
                </div>
                <div>
                  <div>
                    <input
                      type="radio"
                      id="option2"
                      name="delivery"
                      value="15,60"
                      v-model="deliveryPrice"
                    />
                    <label for="option2"
                      ><p>Colissimo</p>
                      <span>à votre domicile sous 2-3 jours</span></label
                    >
                  </div>
                  <p class="price">15, 60 €</p>
                </div>
              </form>
              <div>
                <div>
                  <h3>Protection leboncoin</h3>
                  <p class="price">0, 99 €</p>
                </div>
                <p>Votre argent est sécurisé et versé au bon moment</p>
                <p>Notre service client dédié vous accompagne</p>
              </div>
            </div>
            <div class="totalZone">
              <h3>Total</h3>
              <p class="price">{{ GlobalStore.correctedPrice(total.toString()) }} €</p>
            </div>
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
  gap: 15px;
}
.userArea {
  width: 63%;
}

.articleArea {
  width: 360px;
}
#smallScreen {
  display: none;
}

/* UserArea */

.formSection {
  margin: 10px 0;
  border-radius: 10px;
}
.formSection input {
  border: grey 1px solid;
  height: 40px;
}

#card-element {
  display: block;
  padding: 9px 0 0 10px;
}

/* ArticleArea */

.articleSection {
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 0 5px grey;
  margin: 10px 0;
  border-radius: 10px;
  padding: 0;
}

.price {
  color: var(--check-);
  font-weight: bold;
  font-size: 18px;
}
img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
span {
  color: grey;
  font-size: 14px;
  line-height: 20px;
}
/* --- */
.infoZone {
  margin: 25px 15px 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.infoZone > div:first-of-type {
  display: flex;
  align-items: center;
  gap: 10px;
}
.infoZone > div:first-of-type > h3 {
  width: 110px;

  word-wrap: break-word;
}
/* --- */
.deliveryZone {
  border-top: 1px grey solid;
  border-bottom: 1px grey solid;
  margin-top: 25px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
form,
.deliveryZone > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.deliveryZone > div > div {
  display: flex;
  justify-content: space-between;
}

form > div {
  display: flex;
  gap: 10px;
  align-items: center;
}
form > div:nth-of-type(2) {
  justify-content: space-between;
}
form > div > div {
  display: flex;
  gap: 10px;
}
/* --- */

.totalZone {
  margin: 25px 15px 20px 15px;
  display: flex;
  justify-content: space-between;
}

/*  */
/* ------- Media Query -------- */
/*  */

@media (max-width: 1070px) {
  #fullScreen {
    flex-shrink: 0;
  }
}
@media (max-width: 960px) {
  #smallScreen {
    display: block;
    width: 100%;
  }
  #fullScreen {
    display: none;
  }
  .infoZone > div:first-of-type > h3 {
    width: 350px;
  }
  .userArea {
    width: 100%;
  }
}
@media (max-width: 650px) {
  .infoZone > div:first-of-type > h3 {
    width: 140px;
  }
}
</style>
