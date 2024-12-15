import { lazy } from 'react'
const Home = lazy(() => import('../../views/Home'))
const AdminLogin = lazy(() => import('../../views/auth/AdminLogin'))
const UnAuthorized = lazy(() => import('../../views/UnAuthorized'))

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/auth/login',
    element: <AdminLogin />,
  },
  {
    path: '/unauthorized',
    element: <UnAuthorized />,
  },
]

export default publicRoutes
