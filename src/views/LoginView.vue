<script setup>
import axios from 'axios'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const Store = inject('GlobalStore')

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    if (email.value && password.value) {
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local',
        { identifier: email.value, password: password.value },
      )
      console.log(data)
      Store.changeUserInfo({
        username: data.user.username,
        token: data.jwt,
      })
      router.push({ name: 'home' })
    } else {
      errorMessage.value = 'Veuillez remplir tous les champs'
    }
  } catch (error) {
    console.log(error.response.data.error)
    errorMessage.value = 'Un problème est survenu'
  }
  isSubmitting.value = false
}
</script>
<template>
  <main>
    <div class="wrapper">
      <section>
        <h2>Bonjour !</h2>
        <p>Connectez-vous pour découvrir toutes nos fonctionnalités</p>
        <form @submit.prevent="handleSubmit">
          <label for="email">E-mail</label>
          <input type="text" id="email" v-model="email" />
          <label for="password">Mot de passe</label>
          <input type="text" id="password" v-model="password" />

          <button v-if="!isSubmitting">Se connecter fleche</button>
          <button type="button" v-else>Connexion en cours</button>

          <p v-if="errorMessage">{{ errorMessage }}</p>
        </form>
        <p>Pas de compte ? <RouterLink :to="{ name: 'signup' }">Créez en un</RouterLink></p>
      </section>
      <section>
        <p>test : {{ Store.userInfo.value }}</p>
        <p>Envoi : {{}}</p>
      </section>
    </div>
  </main>
</template>
<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 5px grey;
  width: 400px;
  margin: 10px auto;
  padding: 20px 0;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
