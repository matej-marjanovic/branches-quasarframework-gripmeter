import { projectAuth } from '../firebase/config';

// auth guard
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  console.log('requireAuth', user);
  if (!user) {
    next({ name: 'LoginJoin' });
  } else {
    next();
  }
};

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  console.log('requireNoAuth', user);
  if (!user) {
    next();
  } else {
    next({ name: 'Account' });
  }
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/login-join/',
        component: () => import('pages/LoginJoin.vue'),
        name: 'LoginJoin',
        beforeEnter: requireNoAuth,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
