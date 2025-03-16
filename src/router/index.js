import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
// import OfferView from '@/views/OfferView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => ({
        title: route.query.title || '',
        page: parseInt(route.query.page) || 1,
        pricemin: Number(route.query.pricemin) || '',
        pricemax: Number(route.query.pricemax) || '',
        sort: route.query.sort || '',
      }),
    },
    {
      path: '/offer/:id',
      name: 'offer',
      component: () => import('../views/OfferView.vue'),
      props: true,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})

export default router
