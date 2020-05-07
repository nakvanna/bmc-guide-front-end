
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home ', component: () => import('pages/Index.vue') },
      { path: 'location', name: 'Location', component: () => import('pages/location/Location.vue') },
      { path: 'user', name: 'User', component: () => import('pages/user/User.vue') },
    ]
  },

  //Login Route
  {
    path: '/',
    component: () => import('layouts/MainLayoutLogin.vue'),
    children: [
      {
        path: 'login', name: 'Login Page', component: () => import('pages/user/Login.vue')
      }
    ]
  },
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes