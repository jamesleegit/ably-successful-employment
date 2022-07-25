import {createApp} from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw, START_LOCATION } from 'vue-router'
import App from './App.vue'
import core from './service/core.service'

import './registerServiceWorker'

const loginGuard = (to: any, from: any) => {
  return core.state.isLoggedIn;
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '마이페이지',
      component: () => import('./views/page/main-page.vue'),
      meta: { loginGuard: true }
    },
    {
      path: '/auth/login',
      name: '로그인',
      component: () => import('./views/page/login-page.vue')
    },
    {
      path: '/auth/reset-password',
      name: '비밀번호 재설정',
      component: () => import('./views/page/reset-password-page.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  (<any>document).title = to.name;

  const proms = core.updateUser();
  
  if (to.matched.some((v) => v.meta.loginGuard)) {
    if (!core.state.inited) {
      try { await proms; } catch(e) {}
    }
    if (!core.state.isLoggedIn) {
      next('/auth/login');
      return;
    }
  }
  next();
});

createApp(App).use(router).mount('#app');