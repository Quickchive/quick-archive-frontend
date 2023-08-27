import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 온보딩 페이지
    {
      path: '/',
      name: 'onboarding',
      component: () => import('@/views/OnboardingView.vue')
    },
    // 로그인 페이지
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    // 홈 페이지
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    // 검색 페이지
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue')
    },
    // 설정 페이지
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/SettingView.vue')
    },
    // 테스트용 페이지
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestView.vue')
    }
  ]
})

export default router
