import MainLayout from '../../layout/MainLayout'
import { privateRoutes } from './privateRoutes'
import ProtectRoutes from './ProtectRoutes'

export const getRoutes = () => {
  privateRoutes.map((r) => {
    r.element = <ProtectRoutes route={r}>{r.element}</ProtectRoutes>
  })

  return {
    path: '/',
    element: <MainLayout />,
    children: privateRoutes,
  }
}
