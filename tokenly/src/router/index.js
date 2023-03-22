import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/UserStore'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/nft',
      name: 'nft',
      component: () => import('../views/NFTView.vue')
    },
    ///TODO: needs to actually be implemented
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../views/DiscoverView.vue')
    },
    {
      path: '/sell',
      name: 'sell',
      component: () => import('../views/SellView.vue')
    },
  ]
})

//TODO: works fine, but needs to be implemented
router.beforeEach(async (to) => {
  const privatePages = ['nft', 'sell', 'discover']
  const authorized = useUserStore().isLoggedIn
  console.log(authorized)
  if (privatePages.includes(to.name) && !authorized) {
    return '/login'
  }
  else {
    return true
  }
})

export default router
