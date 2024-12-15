import MainLayout from '../../layout/MainLayout'
import { privateRoutes } from './privateRoutes'
import ProtectRoutes from './ProtectRoutes'

export const getRoutes = () => {
  privateRoutes.map((route) => ({
    ...route,
    element: <ProtectRoutes route={route}>{route.element}</ProtectRoutes>,
  }))

  return {
    path: '/',
    element: <MainLayout />,
    children: privateRoutes,
  }
}
