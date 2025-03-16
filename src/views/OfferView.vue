<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { useCycleList } from '@vueuse/core'

const offerInfo = ref(null)

const props = defineProps({
  id: { required: true },
})

const cycleList = computed(() => {
  if (offerInfo.value.attributes.pictures.data) {
    const { state, next, prev } = useCycleList(offerInfo.value.attributes.pictures.data)
    console.log(state)
    return { state, next, prev }
  }
  return {}
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=owner.avatar&populate[1]=pictures`,
    )
    offerInfo.value = data.data
    console.log(offerInfo.value)
  } catch (error) {
    console.log('catch>>', error)
  }
})
</script>

<template>
  <main>
    <p class="wrapper" v-if="offerInfo === null">Chargement</p>
    <div class="wrapper" v-else>
      <section class="topPart">
        <div class="productPicture">
          <button @click="cycleList.prev()">
            <font-awesome-icon :icon="['fas', 'angle-left']" />
          </button>
          <img
            v-if="offerInfo.attributes.pictures.data"
            :src="cycleList.state.value.attributes.url"
            alt="photo"
          />
          <img
            v-else
            src="../assets/img/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
          />
          <button @click="cycleList.next()">
            <font-awesome-icon :icon="['fas', 'angle-right']" />
          </button>
        </div>
        <div class="ownerBlock">
          <div class="ownerInfo">
            <div>
              <img
                v-if="offerInfo.attributes.owner.data.attributes.avatar.data"
                :src="offerInfo.attributes.owner.data.attributes.avatar.data.attributes.url"
                alt=""
              />

              <h3>{{ offerInfo.attributes.owner.data.attributes.username }}</h3>
            </div>
            <div v-if="offerInfo.attributes.owner.data.attributes.confirmed">
              <font-awesome-icon :icon="['fas', 'check-double']" /> Pièce d'identité vérifiée
            </div>
            <div v-else>La pièce d'identité n'est pas vérifiée</div>
            <div><font-awesome-icon :icon="['far', 'clock']" /> Répond généralement en 1 heure</div>
          </div>
          <div class="buttonZone"><button>Acheter</button> <button>Message</button></div>
        </div>
      </section>
      <section class="bottomPart">
        <h2>{{ offerInfo.attributes.title }}</h2>
        <div>
          <h3>{{ offerInfo.attributes.price }} €</h3>
          <p>{{ offerInfo.attributes.publishedAt }}</p>
        </div>
        <div>
          <h3>Description</h3>
          <p>{{ offerInfo.attributes.description }}</p>
        </div>
        <p><font-awesome-icon :icon="['fas', 'map-marker-alt']" /> Paris (75001)</p>
      </section>
    </div>
  </main>
</template>

<style scoped>
section {
  margin: 25px 0;
}
.topPart {
  display: flex;
  justify-content: space-between;
}
.productPicture {
  flex: 5;
  display: flex;
  justify-content: space-evenly;
  gap: 100px;
}
.productPicture img {
  height: 380px;
}
.productPicture button {
  color: black;
  background-color: white;
  font-size: 25px;
  font-weight: normal;
}
.ownerBlock {
  box-shadow: 0 0 5px var(--grey-border-);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 2;
  padding: 20px;
}
.ownerInfo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.ownerInfo > div:first-child {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ownerInfo > div:nth-child(2) {
  background-color: var(--background-check-);
  color: var(--check-);
  width: fit-content;
  padding: 3px 6px;
  border-radius: 20px;
}
.ownerBlock img {
  border-radius: 50%;
  width: 70px;
}
.buttonZone {
  display: flex;
  flex-direction: column;
  border-top: var(--grey-border-) solid 1px;
  padding-top: 12px;
  align-items: flex-end;
  gap: 10px;
}
.buttonZone button {
  width: 100%;
  font-size: 16px;
  padding: 13px;
}
.buttonZone button:last-of-type {
  background-color: var(--blue-);
}

.bottomPart {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.bottomPart div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: var(--grey-border-) solid 1px;
  height: 100px;
}
</style>
