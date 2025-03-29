<script setup>
import axios from 'axios'
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const GlobalStore = inject('GlobalStore')

const title = ref('')
const description = ref('')
const price = ref(null)
const pictures = ref(null)

const errorMessage = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  if (!title.value || !description.value || !price.value || !pictures.value) {
    errorMessage.value = 'Veuillez remplir tous les champs'
  } else {
    const formData = new FormData()
    for (const key in pictures.value) {
      if (Object.hasOwnProperty.call(pictures.value, key)) {
        formData.append('files.pictures', pictures.value[key])
      }
    }
    const stringifiedInfos = JSON.stringify({
      title: title.value,
      description: description.value,
      price: price.value,
      owner: GlobalStore.userId.value,
    })
    formData.append('data', stringifiedInfos)

    try {
      const response = await axios.post(
        'https://site--backend-leboncoin--p4zjh85jtpgn.code.run/api/offers',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + GlobalStore.userInfo.value.token,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log(response)

      router.push({ name: 'offer', params: { id: response.data.data.id } })
    } catch (error) {
      console.log(error.response.data.message)
      console.log(error)
    }
  }
  isSubmitting.value = false
}

const selectPictures = (event) => {
  errorMessage.value = ''
  if (event.target.files.length <= 10) {
    pictures.value = event.target.files
  } else {
    errorMessage.value = `Vous avez selectionné ${event.target.files.length} photos. La limite est de 10 photos`
    console.log(errorMessage)
  }
}

const imagePreview = computed(() => {
  const tab = []
  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      tab.push(URL.createObjectURL(pictures.value[key]))
    }
  }
  return tab
})

const buttonText = computed(() => {
  if (isSubmitting.value) {
    return 'Envoi en cours'
  } else {
    return 'Déposer mon annonce'
  }
})

const clearErrorMessage = () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}
</script>
<template>
  <main>
    token={{ GlobalStore }}
    <div class="wrapper">
      <h2>Déposer une annonce</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="title">Titre de l'annonce</label>
          <input type="text" id="title" v-model="title" @input="clearErrorMessage" />
          <p>Vous n'avez pas besoin de mentionner "achat" ou "Vente" ici.</p>
        </div>
        <div>
          <label for="description">Description de l'annonce</label>
          <textarea
            cols="50"
            rows="10"
            id="description"
            v-model="description"
            @input="clearErrorMessage"
          />
          <p>
            Nous vous rappelons que la vente de contrefaçons est interdite. Nous vous invitons à
            ajouter tout élément permettant de prouver l’authenticité de votre article: numéro de
            série, facture, certificat, inscription de la marque sur l’article, emballage etc.
            Indiquez dans le texte de l’annonce si vous proposez un droit de rétractation à
            l’acheteur. En l’absence de toute mention, l’acheteur n’en bénéficiera pas et ne pourra
            pas demander le remboursement ou l’échange du bien ou service proposé
          </p>
        </div>
        <div>
          <label for="price">Votre prix de vente</label>
          <div class="price">
            <input type="number" id="price" v-model="price" @input="clearErrorMessage" />
            <p>€</p>
          </div>
        </div>
        <div class="pictures">
          <label for="pictures"
            >Ajoutez des photos
            <div class="pictureSelector">
              <font-awesome-icon :icon="['fas', 'camera']" />
              <p>Sélectionnez jusqu'à 10 photos</p>
            </div>
          </label>

          <input type="file" id="pictures" multiple @input="selectPictures" />

          <div class="pictureDisplay">
            <div v-for="picture in imagePreview" :key="picture">
              <img :src="picture" />
            </div>
          </div>
        </div>
        <div class="errorText" v-if="errorMessage">{{ errorMessage }}</div>

        <button :disabled="isSubmitting">{{ buttonText }}</button>
      </form>
      <!-- <p>Title : {{ title }} /// Description : {{ description }} // Price :{{ price }}</p>
      <p>Token : {{ GlobalStore.userInfo.value.token }}</p>
      <p>User : {{ GlobalStore.userId.value }}</p>
      <p>type : {{ typeof GlobalStore.userId.value }}</p> -->
    </div>
  </main>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 30px 0;
  width: 100%;
}
form div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
button {
  align-self: flex-end;
}
label {
  font-size: 20px;
}
p {
  color: grey;
  font-size: 15px;
  /* border: 1px solid blue; */
  width: 70%;
}
input,
textarea {
  padding: 15px;
  border-radius: 12px;
  border: 1px solid grey;
  width: 70%;
}
.price {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 25%;
  border: 1px solid grey;
  border-radius: 12px;
}
.price input {
  width: 90%;
  border: none;
  border-right: 1px solid grey;
  border-radius: 12px 0 0 12px;
}
.price p {
  font-size: 20px;
  margin: 0 auto;
  padding: 0 10px;
  width: 40px;
}

/* --- */

.pictures {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.pictureSelector {
  border: 1px solid grey;
  border-radius: 12px;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}
.pictureSelector {
  cursor: pointer;
}
.pictureSelector p {
  color: var(--blue-);
  text-align: center;
  font-size: 18px;
  width: 90%;
}
.pictureSelector svg {
  color: var(--blue-);
  font-size: 50px;
}
.pictureDisplay {
  display: flex;
  flex-direction: row;
  width: 70%;
  flex-wrap: wrap;
}
.pictures img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

input[type='file'] {
  display: none;
}
</style>
