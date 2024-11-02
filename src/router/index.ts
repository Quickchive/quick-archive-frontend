// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore.ts'
import { useRoute } from 'vue-router'

// 인증이 필요한 라우트
const authenticatedRoutes = [
  {
    path: '/home',
    component: () => import('@/views/AuthenticatedView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('@/views/HomeView.vue'),
        children: [
          {
            path: '',
            component: () => import('@/components/home/DefaultCategoryPage.vue')
          },
          {
            path: 'detail/:id',
            component: () => import('@/components/home/CustomCategoryPage.vue')
          }
        ]
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/SearchView.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/SettingView.vue'),
        children: [
          {
            path: '',
            component: () => import('@/components/setting/SettingDefault.vue')
          },
          {
            path: 'myinfo',
            component: () => import('@/components/setting/SettingMyInfo.vue')
          }
        ]
      }
    ]
  }
]

// 공개 라우트
const publicRoutes = [
  {
    path: '/',
    name: 'onboarding',
    component: () => import('@/views/OnboardingView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/login/tester',
    name: 'logintester',
    component: () => import('@/views/TesterLogin.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/reset/:code',
    component: () => import('@/components/login/ResetPwForm.vue'),
    meta: { requiresGuest: true }
  },
  // 소셜 로그인 콜백 라우트
  {
    path: '/auth/:provider/callback',
    name: 'socialCallback',
    component: () => import('@/components/login/SocialLoginCallback.vue'),
    props: (route: any) => ({
      provider: route.params.provider,
      code: route.query.code
    })
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authenticatedRoutes, ...publicRoutes]
})

// 전역 네비게이션 가드
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  try {
    // 프로필 정보 최초 1회만 체크
    if (!userStore.profileChecked) {
      await userStore.getUserProfile()
    }

    const isAuthenticated = userStore.isLogin
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

    // 인증이 필요한 페이지
    if (requiresAuth && !isAuthenticated) {
      next('/login')
      return
    }

    // 비로그인 사용자만 접근 가능한 페이지
    if (requiresGuest && isAuthenticated) {
      next('/home')
      return
    }

    next()
  } catch (error) {
    console.error('Navigation guard error:', error)
    next('/login')
  }
})

export default router
