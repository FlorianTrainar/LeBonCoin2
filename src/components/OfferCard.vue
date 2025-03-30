<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { inject } from 'vue'

const GlobalStore = inject('GlobalStore')

const props = defineProps({
  offerInfos: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
})
const price = props.offerInfos.price.toString()
// const correctedPrice = computed(() => {
//   let newPrice = ''

//   for (let i = price.length - 1; i >= 0; i--) {
//     if (newPrice.length === 3 || newPrice.length === 7) {
//       newPrice = price[i] + ' ' + newPrice
//     } else {
//       newPrice = price[i] + newPrice
//     }
//   }
//   return newPrice
// })

const correctedDate = computed(() => {
  let date = props.offerInfos.publishedAt.slice(0, 10).replaceAll('-', '/')
  return date.split('/').reverse().join('/')
})
</script>
<template>
  <section>
    <RouterLink :to="{ name: 'offer', params: { id: id } }">
      <div class="card">
        <div>
          <div class="ownerZone">
            <img
              v-if="offerInfos.owner.data.attributes.avatar.data"
              :src="offerInfos.owner.data.attributes.avatar.data.attributes.url"
              alt=""
            />
            <div v-else>
              <p>{{ offerInfos.owner.data.attributes.username[0].toUpperCase() }}</p>
            </div>
            <h4>{{ offerInfos.owner.data.attributes.username }}</h4>
          </div>
          <div class="offerZone">
            <img
              v-if="offerInfos.pictures.data"
              :src="offerInfos.pictures.data[0].attributes.url"
              alt=""
            />
            <img
              v-else
              src="../assets/img/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            />
            <h4>{{ offerInfos.title }}</h4>
            <h4>{{ GlobalStore.correctedPrice(price) }} €</h4>
          </div>
        </div>
        <div class="bottomZone">
          <p class="date">{{ correctedDate }}</p>
          <font-awesome-icon :icon="['far', 'heart']" />
        </div>
      </div>
    </RouterLink>
  </section>
</template>
<style scoped>
section {
  margin: 10px 5px 30px 5px;
  width: 199px;
  height: 350px;
}
.card {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.ownerZone {
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 5px;
  margin-bottom: 5px;
  height: 30px;
}
.ownerZone img {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  object-fit: contain;
}
.ownerZone > div {
  background-color: var(--grey-);
  color: white;
  font-size: 20px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
/* --- */

.offerZone {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
  height: 300px;
}
.offerZone h4 {
  padding-left: 5px;
}
.offerZone img {
  height: 220px;
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.bottomZone {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}

/*  */
/* ------- Media Query -------- */
/*  */

@media (max-width: 1070px) {
  .offerZone {
    height: 280px;
    gap: 2px;
  }
  section {
    width: 23%;
  }
}
@media (max-width: 960px) {
  section {
    width: 31%;
  }
}
@media (max-width: 650px) {
  section {
    width: 60%;
  }
  .ownerZone {
    display: flex;
    justify-content: center;
  }
  .offerZone {
    align-items: center;
  }
  .offerZone img {
    object-fit: contain;
  }
  .offerZone h4 {
    text-align: center;
    margin: 5px 0 1px;
  }
}
</style>
