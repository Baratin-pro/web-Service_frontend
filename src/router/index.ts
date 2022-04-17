import { isAuthenticated, loadLocalToken } from '@/api/auth.service';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    alias: '/',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
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
