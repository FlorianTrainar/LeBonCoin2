import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import PublishView from '@/views/PublishView.vue'
import { inject } from 'vue'
import PaymentView from '@/views/PaymentView.vue'

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
    {
      path: '/publish',
      name: 'publish',
      component: PublishView,
      meta: { requireAuth: true },
    },
    {
      path: '/payment/:id',
      name: 'payment',
      component: PaymentView,
      meta: { requireAuth: true },
      props: true,
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})
router.beforeEach((to, from) => {
  const GlobalStore = inject('GlobalStore')
  if (to.meta.requireAuth && !GlobalStore.userInfo.value.token) {
    return { name: 'login', query: { redirect: to.path }, params: to.params }
  }
})

export default router
