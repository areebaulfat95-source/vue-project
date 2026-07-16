import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import History from '../views/History.vue'
import Login from '../views/Login.vue'
import Translate from '../views/Translate.vue'
import About from '../views/About.vue'
import Register from '../views/Register.vue'
import Contact from '../views/Contact.vue'
import Profile from '../views/ProfileInfo.vue'
import Settings from '../views/Settings.vue'
import { useAuth } from '../composables/useAuth.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { public: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/translate',
      name: 'Translate',
      component: Translate,
      meta: { requiresAuth: true }
    },
    {
      path: '/history',
      name: 'History',
      component: History,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { public: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { public: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { public: true }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: { public: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Settings,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next({ name: 'Login' })
  }

  if (to.meta.public && isAuthenticated.value && (to.name === 'Login' || to.name === 'Register')) {
    return next({ name: 'Dashboard' })
  }

  return next()
})

export default router
