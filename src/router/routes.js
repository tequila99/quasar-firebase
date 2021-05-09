
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
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'profile',
        name: 'Профиль',
        component: () => import('pages/user/UserProfile.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/notes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Заметки',
        component: () => import('pages/notes/ListNotes.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'add',
        name: 'Новая заметка',
        component: () => import('pages/notes/AddNote.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: ':id',
        name: 'Редактирование заметки',
        component: () => import('pages/notes/EditNote.vue'),
        props: true,
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
