import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/room',
    name: 'MainRoom',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/room/:roomId',
    name: 'Room',
    component: () => import(/* webpackChunkName: "about" */ '../views/Room.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
