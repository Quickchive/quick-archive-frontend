import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 로그인 되었을 때만 접근 가능한 페이지
    {
      path: '/home',
      component: () => import('@/views/AuthenticatedView.vue'),
      beforeEnter: async (to, from, next) => {
        const userStore = useUserStore()
        await userStore.getUserProfile()
        if (!userStore.isLogin) {
          next('/login')
        } else {
          next()
        }
      },
      children: [
        {
          path: '/home',
          component: () => import('@/views/HomeView.vue'),
          children: [
            {
              path: '/home',
              component: () => import('@/components/home/DefaultCategoryPage.vue')
            },
            {
              path: '/home/:id',
              component: () => import('@/components/home/CustomCategoryPage.vue')
            }
          ]
        },
        // 검색 페이지
        {
          path: '/home/search',
          name: 'search',
          component: () => import('@/views/SearchView.vue')
        },
        // 설정 페이지
        {
          path: '/home/setting',
          name: 'setting',
          component: () => import('@/views/SettingView.vue'),
          children: [
            {
              path: '/home/setting',
              component: () => import('@/components/setting/SettingDefault.vue')
            },
            {
              path: '/home/setting/myinfo',
              component: () => import('@/components/setting/SettingMyInfo.vue')
            }
          ]
        }
      ]
    },
    // 로그인 권한 필요 없는 페이지
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
    {
      path: '/login/tester',
      name: 'logintester',
      component: () => import('@/views/TesterLogin.vue')
    },
    {
      path: '/reset/:code',
      component: () => import('@/components/login/ResetPwForm.vue')
    }
  ]
})

export default router
