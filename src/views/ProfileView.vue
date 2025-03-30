<script setup>
import { onMounted, ref, inject } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
import AddButton from '@/components/AddButton.vue'

const router = useRouter()

const GlobalStore = inject('GlobalStore')
const userInfos = ref(null)
const offerList = ref([])
const userInitial = ref('')

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--backend-leboncoin--p4zjh85jtpgn.code.run/api/users/me?populate=*',
      {
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfo.value.token,

          'Content-Type': 'multipart/form-data',
        },
      },
    )
    userInfos.value = data
    userInitial.value = userInfos.value.username.slice(0, 1)

    for (let i = 0; i < userInfos.value.offers.length; i++) {
      console.log(userInfos.value.offers[i].id)
      try {
        const { data } = await axios.get(
          `https://site--backend-leboncoin--p4zjh85jtpgn.code.run/api/offers/${userInfos.value.offers[i].id}?populate=pictures`,
        )
        offerList.value.push(data.data)
        console.log(offerList.value)
      } catch (error) {
        console.log('catch >>>', error)
      }
    }
  } catch (error) {
    console.log('catch >>>', error)
  }
})

const deleteOffer = async (id) => {
  try {
    const { data } = await axios.delete(
      `https://site--backend-leboncoin--p4zjh85jtpgn.code.run/api/offers/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfo.value.token,

          'Content-Type': 'multipart/form-data',
        },
      },
    )
    console.log(data)
    alert(`L'offre a bien été supprimée`)

    router.go()
  } catch (error) {
    console.log('Delete= ' + error)
  }
}
</script>

<template>
  <main>
    <div class="wrapper" v-if="userInfos">
      <section>
        <img v-if="userInfos.avatar" id="avatar" :src="userInfos.avatar.url" alt="" />
        <div v-else id="noAvatar">
          <p>{{ userInitial }}</p>
        </div>
        <div id="userInfo">
          <h2>{{ userInfos.username }}</h2>
          <p>{{ userInfos.email }}</p>
        </div>
      </section>
      <h3 v-if="offerList.length === 1">{{ offerList.length }} annonce</h3>
      <h3 v-else-if="offerList.length > 1">{{ offerList.length }} annonces</h3>

      <section v-if="offerList.length > 0">
        <div class="offerCard" v-for="offer in offerList" :key="offer.id">
          <div>
            <RouterLink :to="{ name: 'offer', params: { id: offer.id } }">
              <img
                v-if="offer.attributes.pictures.data"
                :src="offer.attributes.pictures.data[0].attributes.url"
                alt=""
              />
              <img
                v-else
                src="../assets/img/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
              />
              <h3>{{ offer.attributes.title }}</h3>
            </RouterLink>
          </div>
          <div>
            <p>{{ GlobalStore.correctedPrice(offer.attributes.price.toString()) }} €</p>
          </div>
          <div class="icons">
            <font-awesome-icon :icon="['fas', 'edit']" @click="updateOffer(offer.id)" />

            <font-awesome-icon :icon="['fas', 'trash']" @click="deleteOffer(offer.id)" />
          </div>
        </div>
      </section>

      <div class="noOffer" v-else>
        <img src="../assets/img/sans-annonce.png" alt="" />
        <h2>C'est désert ici !</h2>
        <p><span>Vous n'avez aucune annonce en ligne</span></p>
        <div>
          <AddButton />
        </div>
      </div>

      <!-- test= {{ GlobalStore.userInfo.value.token }} test={{ userInfos }} -->
    </div>
  </main>
</template>
<style scoped>
section {
  border: solid 2px var(--grey-border-);
  border-radius: 6px;
  padding: 10px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* --- */

section:first-child {
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

#noAvatar {
  background-color: var(--grey-);
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
#avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: contain;
}

#noAvatar p {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  color: white;
  width: 100%;
  height: 100%;
  line-height: 75px;
}

/* --- */

.offerCard {
  padding: 5px;
  box-shadow: 0 0 5px grey;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
}
.offerCard div:first-child {
  width: 65%;
}

.offerCard a {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  gap: 15px;
}

.offerCard img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  /* border: solid 1px grey; */
}
.offerCard p {
  color: var(--check-);
  font-weight: bold;
  font-size: 18px;
}
.icons svg {
  color: var(--orange-);
  margin: 0 5px;
  cursor: pointer;
}

/* ---  */

.noOffer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.noOffer div {
  padding: 0 75px;
  background-color: var(--orange-);
  border-radius: 15px;
}

/* --- */
/* ---Media Query */
/* --- */

@media (max-width: 1070px) {
}
@media (max-width: 960px) {
}

@media (max-width: 650px) {
  h3 {
    font-size: 15px;
  }
  .offerCard p {
    font-size: 16px;
  }
  .icons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
