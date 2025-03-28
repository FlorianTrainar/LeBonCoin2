<script setup>
import { RouterLink } from 'vue-router'
import { inject, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import AddButton from './AddButton.vue'

const router = useRouter()
const route = useRoute()

const Store = inject('GlobalStore')

const searchInput = ref('')

const handleSearch = () => {
  const queries = { ...route.query }
  if (searchInput.value) {
    queries.title = searchInput.value
  } else {
    delete queries.title
  }
  router.push({ name: 'home', query: queries })
}

const disconnect = () => {
  Store.changeUserInfo({ username: '', token: '' })
  $cookies.remove('userInfo')
  $cookies.remove('userId')
}
</script>
<template>
  <header>
    <div class="wrapper">
      <div class="topPart">
        <RouterLink :to="{ name: 'home' }">
          <img
            src="https://lereacteur-vue-le-bon-coin.netlify.app/assets/logo-C49bVZy7.svg"
            alt="logo"
          />
        </RouterLink>

        <div class="centerBlock">
          <AddButton />

          <form @submit.prevent="handleSearch" id="searchInput">
            <input type="text" placeholder="Rechercher sur leboncoin" v-model="searchInput" />
            <button>
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </form>
        </div>
        <div id="logIn" v-if="!Store.userInfo.value.token">
          <RouterLink :to="{ name: 'login' }">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>se connecter</p>
          </RouterLink>
        </div>
        <div id="logOut" v-if="Store.userInfo.value.token">
          <RouterLink :to="{ name: 'profile' }">
            <div>
              <font-awesome-icon :icon="['far', 'user']" />
              <p>{{ Store.userInfo.value.username }}</p>
            </div>
          </RouterLink>
          <RouterLink :to="{ name: 'home' }">
            <p @click="disconnect">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
            </p>
          </RouterLink>
        </div>
      </div>
      <div class="bottomPart">
        <p>Immobilier</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Véhicules</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Location de vacances</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Emploi</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Mode</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Maison & Jardin</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Famille</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Electronique</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Loisirs</p>
        <font-awesome-icon :icon="['fas', 'circle']" />
        <p>Autres</p>
      </div>
    </div>
  </header>
</template>
<style scoped>
header {
  border-bottom: 1px grey solid;
  background-color: white;
  position: fixed;
  width: 100%;
  height: var(--header-height-);
  top: 0px;
}

.topPart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
.topPart img {
  width: 150px;
}
.centerBlock {
  display: flex;
  gap: 20px;
}
#searchInput {
  background-color: var(--background-);
  padding: 5px;
  border-radius: 10px;
}
#searchInput input {
  border: none;
  background: none;
  font-size: 16px;
  width: 230px;
}
#searchInput button {
  color: black;
  font-size: 13px;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  text-align: center;
  line-height: 8px;
}

.bottomPart {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.bottomPart svg {
  font-size: 2px;
  align-self: center;
}
#logIn a,
#logOut div:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  /* border: 1px solid blue; */
  font-size: 15px;
}
#logOut {
  display: flex;
  align-items: center;
  gap: 15px;
}
#logOut > a:last-child {
  color: grey;
}
</style>
