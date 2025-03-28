<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <main>
    <div class="wrapper">
      <section>
        <div>
          <h2>404</h2>
          <h2>Perdu dans les</h2>
          <p><span>RAYONS !</span></p>
        </div>
        <div>
          <p>Désolé, on a cherché dans tous les coins, on n'a pas trouvé la bonne page</p>
        </div>
        <div>
          <RouterLink :to="{ name: 'home' }">
            <p><font-awesome-icon :icon="['fas', 'arrow-left']" /> Retour à l'accueil</p>
          </RouterLink>
        </div>
      </section>
      <section>
        <img src="../assets/img/notfound-D8MXZORp.webp" alt="" />
      </section>
    </div>
  </main>
</template>
<style scoped>
main {
  margin-top: var(--header-height-);
  margin-bottom: -4px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}
section:first-child {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
}
h2:first-of-type {
  color: var(--orange-);
  font-size: 40px;
}
h2:last-of-type {
  font-size: 50px;
}
span {
  font-size: 70px;
  color: white;
  -webkit-text-stroke: 2px var(--orange-);
}

section:last-child {
  width: 40%;
  height: 100%;
  object-fit: cover;
}
img {
  width: 100%;
}
</style>
