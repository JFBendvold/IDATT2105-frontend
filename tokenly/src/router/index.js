import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/UserStore'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  scrollBehavior() {
    return { top: 0 }
  },
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
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../views/DiscoverView.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue')
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/PublishView.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/docs/TermsView.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/docs/PrivacyView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

//TODO: works fine, but needs to be implemented
router.beforeEach(async (from, to) => {
  if (from.name == 'profile' && to.name == 'profile') {
    // Reload the page
    window.location.href = from.fullPath
    return true
  }

  const privatePages = ['publish', 'favorites', 'chat']
  const authorized = useUserStore().isLoggedIn
  if (authorized && (to.name == 'login' || to.name == 'signup')) {
    return true
  } else if (privatePages.includes(to.name) && !authorized) {
    return '/login'
  } else {
    return true
  }
})

export default router
