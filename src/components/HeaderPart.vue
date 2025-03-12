<script setup>
import { RouterLink } from 'vue-router'
import { inject } from 'vue'
const Store = inject('GlobalStore')

const disconnect = () => {
  Store.changeUserInfo({ username: '', token: '' })
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
        <button>
          <font-awesome-icon :icon="['far', 'plus-square']" />
          Déposer une Annonce
        </button>
        <div>
          <input type="text" placeholder="Rechercher sur leboncoin" />
          <button>
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>

        <div v-if="!Store.userInfo.value.token">
          <RouterLink :to="{ name: 'login' }">
            <font-awesome-icon :icon="['far', 'user']" />
            <button>se connecter</button>
          </RouterLink>
        </div>
        <div v-if="Store.userInfo.value.token">
          <font-awesome-icon :icon="['far', 'user']" />
          <p>{{ Store.userInfo.value.username }}</p>
          <RouterLink :to="{ name: 'home' }">
            <p @click="disconnect">Icone de deconnexion</p>
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
.bottomPart {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.bottomPart svg {
  font-size: 2px;
  align-self: center;
}
</style>
