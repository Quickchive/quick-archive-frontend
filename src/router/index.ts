import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 로그인 되었을 때만 접근 가능한 페이지
    {
      path: '/',
      component: () => import('@/views/AuthenticatedView.vue'),
      children: [
        {
          path: '/',
          component: () => import('@/views/HomeView.vue'),
          children: [
            {
              path: '/',
              component: () => import('@/components/home/DefaultCategoryPage.vue')
            },
            {
              path: '/:id',
              component: () => import('@/components/home/CustomCategoryPage.vue')
            }
          ]
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
          component: () => import('@/views/SettingView.vue'),
          children: [
            {
              path: '/setting',
              component: () => import('@/components/setting/SettingDefault.vue')
            },
            {
              path: '/setting/myinfo',
              component: () => import('@/components/setting/SettingMyInfo.vue')
            }
          ]
        }
      ]
    },

    // 로그인 권한 필요 없는 페이지
    // 온보딩 페이지
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('@/views/OnboardingView.vue')
    },
    // 로그인 페이지
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

export default router
