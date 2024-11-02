import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore.ts'

// 인증이 필요한 라우트 설정
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
            path: 'kakao',
            component: () => import('@/components/home/DefaultCategoryPage.vue')
          },
          {
            path: ':code',
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

// 인증이 필요없는 라우트 설정
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
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
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
    // 사용자 프로필 정보 가져오기 (첫 접속시에만)
    if (!userStore.profileChecked) {
      await userStore.getUserProfile()
    }

    const isAuthenticated = userStore.isLogin
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)

    // 인증이 필요한 페이지에 접근하려는 경우
    if (requiresAuth && !isAuthenticated) {
      next('/login')
      return
    }

    // 비로그인 사용자만 접근 가능한 페이지에 로그인 사용자가 접근하려는 경우
    if (requiresGuest && isAuthenticated) {
      next('/home')
      return
    }

    // 그 외의 경우 정상적으로 라우팅
    next()
  } catch (error) {
    console.error('Navigation guard error:', error)
    // 에러 발생시 로그인 페이지로 리다이렉트
    next('/login')
  }
})

export default router
