import { getToken } from '@/api/auth.service';
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
      requiresAuth: true,
    }
  },
  {
    path: '/connexion',
    name: 'Authentication',
    component: () => import(/* webpackChunkName: "authentication" */ '../views/Authentication.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/auteurs',
    name: 'Authors',
    component: () => import(/* webpackChunkName: "authors" */ '../views/Authors.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/films',
    name: 'Movies',
    component: () => import(/* webpackChunkName: "movies" */ '../views/Movies.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/emissions-tele',
    name: 'Tvshows',
    component: () => import(/* webpackChunkName: "tvshows" */ '../views/Tvshows.vue'),
    meta: {
      requiresAuth: true,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// Guards
router.beforeEach(async (to, from, next) => {
  if (to.meta?.requiresAuth === true && !getToken()) {
    next({ name: 'Authentication' });
  } else if (to.meta?.requiresAuth === true && getToken()) {
    next();
  }
  else if (to.name === 'Authentication') {
    next();
  }
  else {
    next({ name: 'Authentication' });
  }
});

export default router