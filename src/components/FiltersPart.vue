<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const props = defineProps(['sort', 'pricemin', 'pricemax'])
const sortRequested = ref(0)
const priceminRequested = ref(props.pricemin)
const pricemaxRequested = ref(props.pricemax)

const handleSubmit = () => {
  const queries = { ...route.query }

  if (sortRequested.value) {
    queries.sort = sortRequested.value
  } else {
    delete queries.sort
  }
  if (priceminRequested.value) {
    queries.pricemin = priceminRequested.value
  } else {
    delete queries.pricemin
  }
  if (pricemaxRequested.value) {
    queries.pricemax = pricemaxRequested.value
  } else {
    delete queries.pricemax
  }
  queries.page = 1
  router.push({ name: 'home', query: queries })
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <div class="price">
      <p>Prix</p>
      <div>
        <label
          ><input type="number" placeholder="Minimum" v-model="priceminRequested" /><span
            >€</span
          ></label
        >
        <label
          ><input type="number" placeholder="Maximum" v-model="pricemaxRequested" /><span
            >€</span
          ></label
        >
      </div>
    </div>
    <div>
      <p for="">Tri</p>
      <div>
        <label for="croissant">Prix croissants</label>
        <input type="radio" id="croissant" value="price:asc" v-model="sortRequested" />
        <label for="décroissant">Prix décroissants</label>
        <input type="radio" id="décroissant" value="price:desc" v-model="sortRequested" />
        <label for="none">Pas de tri</label>
        <input type="radio" id="none" value="" v-model="sortRequested" />
      </div>
    </div>

    <button>Rechercher</button>
  </form>
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

/*  */
/* ------- Media Query -------- */
/*  */

@media (max-width: 1070px) {
  form {
    flex-direction: column;
    margin-bottom: 20px;
  }
  form > div {
    align-items: center;
  }
}
@media (max-width: 960px) {
}
@media (max-width: 650px) {
}
</style>
