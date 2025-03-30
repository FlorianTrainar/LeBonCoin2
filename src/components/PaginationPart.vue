<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const props = defineProps(['pagination'])

const router = useRouter()
const route = useRoute()
// const page = ref(parseInt(route.query.page) || 1)

const handlePageSelector = (num) => {
  const queries = { ...route.query }
  queries.page = num
  // page.value = queries.page
  router.push({ name: 'home', query: queries })
}
</script>
<template>
  <section>
    <button v-if="pagination.page > 1" @click="handlePageSelector(pagination.page - 1)">
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </button>
    <div>
      <button
        :class="{
          selected: pageNumber === pagination.page,
        }"
        v-for="pageNumber in props.pagination.pageCount"
        :key="pageNumber"
        @click="handlePageSelector(pageNumber)"
      >
        {{ pageNumber }}
      </button>
    </div>
    <button
      v-if="pagination.page < pagination.pageCount"
      @click="handlePageSelector(pagination.page + 1)"
    >
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </button>
  </section>
  <!-- page = {{ page }} test = {{ props.pagination }} -->
</template>
<style scoped>
section {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
}
section div {
  display: flex;
  justify-content: center;
  gap: 7px;
}
button {
  background: none;
  color: black;
  font-weight: normal;
  padding: 5px 8px;
  border-radius: 0;
  font-size: 18px;
}
.selected {
  background-color: black;
  color: white;
}
</style>
