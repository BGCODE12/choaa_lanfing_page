/**
 * router/index.ts
 *
 * Routes for ./src/pages/*.vue
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/pages/index.vue'
import Admin from '@/pages/admin.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/admin',
      component: Admin,
    },
  ],
})

export default router
