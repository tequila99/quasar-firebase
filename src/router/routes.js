
const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'forgotPassword',
        name: 'ForgotPassword',
        component: () => import('pages/ForgotPassword.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/UserAuth.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/UserAuth.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      {
        path: 'profile',
        name: 'Редактирование данных пользователя',
        component: () => import('pages/user/UserProfile.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { authRequired: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
