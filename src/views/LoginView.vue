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

const visible = ref(false)

const toggleVisibility = () => {
  if (visible.value) {
    visible.value = false
  } else {
    visible.value = true
  }
}

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
        <p>Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
        <form @submit.prevent="handleSubmit">
          <label for="email">E-mail</label>
          <div>
            <input type="text" id="email" v-model="email" @:input="errorMessage = ''" />
          </div>

          <label for="password">Mot de passe</label>
          <div v-if="visible" class="password">
            <input type="text" id="password" v-model="password" @:input="errorMessage = ''" />
            <font-awesome-icon @click="toggleVisibility" :icon="['fas', 'eye']" />
          </div>
          <div v-if="!visible" class="password">
            <input type="password" id="password" v-model="password" @:input="errorMessage = ''" />
            <font-awesome-icon @click="toggleVisibility" :icon="['fas', 'eye-slash']" />
          </div>

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
  gap: 10px;
  box-shadow: 0 0 5px grey;
  width: 430px;
  margin: 10px auto;
  padding: 25px;
  border-radius: 20px;
}
section h2,
section > p:first-of-type {
  align-self: flex-start;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px;
}
form div {
  border: grey solid 1px;
  width: 300px;
  height: 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
input {
  border: none;
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.password svg {
  color: grey;
  margin: 0 auto;
}
.password svg:hover {
  cursor: pointer;
}
.password input {
  border-right: grey solid 1px;
  width: 85%;
  border-radius: 10px 0 0 10px;
  display: flex;
  align-items: center;
}
</style>
