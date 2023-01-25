import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ScreenView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/ScreenView.vue')
    },
    {
      path: '/site',
      redirect: () => {
        window.location.href = 'https://habitica.starporthorizon.com/login';
        return '/site';
      },
      name: 'site'
      // component: () => import('../views/ExternalSiteView.vue')
    }
  ]
});

export default router;
