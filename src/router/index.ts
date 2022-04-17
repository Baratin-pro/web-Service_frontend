import { isAuthenticated, loadLocalToken } from '@/api/auth.service';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/page-d\'accueil',
    name: 'Home',
    alias: '/',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/auteurs',
    name: 'Authors',
    component: () => import(/* webpackChunkName: "authors" */ '../views/Authors.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/films',
    name: 'Movies',
    component: () => import(/* webpackChunkName: "movies" */ '../views/Movies.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/emissions-tele',
    name: 'Tvshows',
    component: () => import(/* webpackChunkName: "tvshows" */ '../views/Tvshows.vue'),
    meta: {
      requiresAuth: false,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// Guards
router.beforeEach(async (to, from, next) => {
  if (to.meta?.requiresAuth === true && !isAuthenticated()) {
    loadLocalToken();
  }
  else {
    next();
  }
});


export default router
