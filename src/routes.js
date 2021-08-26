import React from 'react'

// const Login = React.lazy(() => import('./views/examples/pages/login/Login'))
// const Register = React.lazy(() => import('./views/examples/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/examples/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/examples/pages/page500/Page500'))

const User = React.lazy(() => import('./views/pages/users/components/User'))
const ManageUsers = React.lazy(() => import('./views/pages/users/components/ManageUsers'))
const ManageQuarters = React.lazy(() => import('./views/pages/quarter/components/ManageQuarters'))
const Quarter = React.lazy(() => import('./views/pages/quarter/components/Quarter'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/profile/:id', name: 'User', component: User },
  { path: '/dashboard', name: 'Dashboard', component: ManageUsers },
  { path: '/quarters', name: 'ManageQuarters', component: ManageQuarters },
  { path: '/quarter/create', name: 'Quarter', component: Quarter },
  { path: '/quarter/:id', name: 'Quarter', component: Quarter },

  // { path: '/login', name: 'Login', component: Login },
  // { path: '/register', name: 'Register', component: Register },
  // { path: '/404', name: '404', component: Page404 },
  // { path: '/500', name: '500', component: Page500 },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
]

export default routes
