import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FullCalendarView from '@/views/CalendarView_old.vue';
import ScreenView from '@/views/ScreenView.vue';
import CalendarView from '@/views/CalendarView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ScreenView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView
    }
  ]
});

export default router;
