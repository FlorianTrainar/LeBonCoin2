<script setup>
import { RouterLink } from 'vue-router'
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

        <div>
          <font-awesome-icon :icon="['far', 'user']" />
          <p>se connecter</p>
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
}
.wrapper {
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
