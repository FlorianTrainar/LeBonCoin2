<script setup>
import axios from 'axios'
import { inject, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

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

// const handleSubmit = async () => {
//   try {
//     isSubmitting.value = true
//     if (email.value && password.value) {
//       const { data } = await axios.post(
//         'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local',
//         { identifier: email.value, password: password.value },
//       )
//       console.log(data)

//       const userInfo = { username: data.user.username, token: data.jwt }
//       const userId = data.user.id
//       Store.changeUserInfo(userInfo, userId)

//       $cookies.set('userInfo', userInfo)
//       $cookies.set('userId', userId)

//       router.push({ name: route.query.redirect || 'home' })
//       console.log(route.query.redirect)
//     } else {
//       errorMessage.value = 'Veuillez remplir tous les champs'
//     }
//   } catch (error) {
//     console.log(error.response.data.error)
//     errorMessage.value = 'Un problème est survenu'
//   }
//   isSubmitting.value = false
// }

// const handleSubmit = async () => {
//   try {
//     isSubmitting.value = true
//     if (email.value && password.value) {
//       const { data } = await axios.post('http://localhost:1337/api/auth/local', {
//         identifier: email.value,
//         password: password.value,
//       })
//       console.log(data)

//       const userInfo = { username: data.user.username, token: data.jwt }
//       const userId = data.user.id
//       Store.changeUserInfo(userInfo, userId)

//       $cookies.set('userInfo', userInfo)
//       $cookies.set('userId', userId)

//       router.push({ path: route.query.redirect || '/' })
//       console.log(route.query.redirect)
//     } else {
//       errorMessage.value = 'Veuillez remplir tous les champs'
//     }
//   } catch (error) {
//     console.log(error.response.data.error)
//     errorMessage.value = 'Un problème est survenu'
//   }
//   isSubmitting.value = false
// }

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    if (email.value && password.value) {
      const { data } = await axios.post(
        'https://site--backend-leboncoin--p4zjh85jtpgn.code.run/api/auth/local',
        {
          identifier: email.value,
          password: password.value,
        },
      )
      console.log(data)

      const userInfo = { username: data.user.username, token: data.jwt }
      const userId = data.user.id
      Store.changeUserInfo(userInfo, userId)

      $cookies.set('userInfo', userInfo)
      $cookies.set('userId', userId)

      router.push({ path: route.query.redirect || '/' })
      console.log(route.query.redirect)
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
      <section class="formSection">
        <h2>Bonjour !</h2>
        <p>Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
        <form @submit.prevent="handleSubmit">
          <label for="email">E-mail *</label>
          <div class="inputField">
            <input type="text" id="email" v-model="email" @:input="errorMessage = ''" />
          </div>

          <label for="password">Mot de passe *</label>
          <div v-if="visible" class="inputField password">
            <input type="text" id="password" v-model="password" @:input="errorMessage = ''" />
            <font-awesome-icon @click="toggleVisibility" :icon="['fas', 'eye']" />
          </div>
          <div v-if="!visible" class="inputField password">
            <input type="password" id="password" v-model="password" @:input="errorMessage = ''" />
            <font-awesome-icon @click="toggleVisibility" :icon="['fas', 'eye-slash']" />
          </div>

          <button v-if="!isSubmitting">
            Se connecter<font-awesome-icon :icon="['fas', 'arrow-right']" />
          </button>
          <button type="button" v-else>Connexion en cours</button>

          <p v-if="errorMessage">{{ errorMessage }}</p>
        </form>
        <p>
          Envie de nous rejoindre ?
          <span><RouterLink :to="{ name: 'signup' }">Créez un compte</RouterLink></span>
        </p>
      </section>
      <!-- <section>
        <p>test : {{ Store.userInfo.value }}</p>
        <p>Envoi : {{}}</p>
      </section> -->
    </div>
  </main>
</template>
<style scoped>
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
  width: 100%;
}
.formSection {
  width: 430px;
  margin: 10px auto;
  align-items: center;
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
button {
  width: 100%;
  height: 40px;
  margin-top: 20px;
}
button svg {
  margin-left: 10px;
}
span {
  font-weight: bold;
  text-decoration: underline;
}
</style>
