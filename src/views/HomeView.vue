<script setup>
import axios from 'axios'
import { ref, onMounted, watchEffect } from 'vue'

import FiltersPart from '@/components/FiltersPart.vue'
import SellZone from '../components/SellZone.vue'
import OfferCard from '@/components/OfferCard.vue'
import PaginationPart from '@/components/PaginationPart.vue'

const props = defineProps(['page', 'title', 'pricemin', 'pricemax', 'sort'])

const offersList = ref([])
const pagination = ref('')

// onMounted(async () => {
//   watchEffect(async () => {
//     try {
//       let pricefilters = ''
//       if (props.pricemax) {
//         pricefilters += `&filters[price][$lte]=${props.pricemax}`
//       }
//       if (props.pricemin) {
//         pricefilters += `&filters[price][$gte]=${props.pricemin}`
//       }
//       const { data } = await axios.get(
//         `http://localhost:1337/api/offers?populate[0]=owner.avatar&populate[1]=pictures&pagination[page]=${props.page}&pagination[pageSize]=10&sort=${props.sort}${pricefilters}&filters[title][$containsi]=${props.title}`,
//       )

//       offersList.value = data
//       pagination.value = data.meta.pagination

//       console.log(offersList.value)
//     } catch (error) {
//       console.log('catch>>', error)
//     }
//   })
// })

onMounted(async () => {
  watchEffect(async () => {
    try {
      let pricefilters = ''
      if (props.pricemax) {
        pricefilters += `&filters[price][$lte]=${props.pricemax}`
      }
      if (props.pricemin) {
        pricefilters += `&filters[price][$gte]=${props.pricemin}`
      }
      const { data } = await axios.get(
        `https://site--backend-leboncoin--p4zjh85jtpgn.code.run/api/offers?populate[0]=owner.avatar&populate[1]=pictures&pagination[page]=${props.page}&pagination[pageSize]=10&sort=${props.sort}${pricefilters}&filters[title][$containsi]=${props.title}`,
      )

      offersList.value = data
      pagination.value = data.meta.pagination

      console.log(offersList.value)
    } catch (error) {
      console.log('catch>>', error)
    }
  })
})
</script>

<template>
  <main>
    <!-- test = {{ offersList }} -->
    <div class="wrapper">
      <FiltersPart />
      <sell-zone />

      <div class="offerCardZone">
        <OfferCard
          v-for="offer in offersList.data"
          :key="offer.id"
          :offerInfos="offer.attributes"
          :id="offer.id"
        />

        <PaginationPart :pagination="pagination" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.offerCardZone {
  display: flex;
  flex-wrap: wrap;

  gap: 26px;
}
</style>
