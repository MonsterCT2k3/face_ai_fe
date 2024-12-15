import { lazy } from 'react'
import LeaveRequestDetail from '../../views/admin/LeaveRequestDetail'
import EditEmployee from '../../views/admin/EditEmployee'
const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'))
const Employees = lazy(() => import('../../views/admin/Employees'))
const SellerRequest = lazy(() => import('../../views/admin/LeaveRequest'))
const EmployeeDetail = lazy(() => import('../../views/admin/EmployeeDetail'))
const AddEmployee = lazy(() => import('../../views/admin/AddEmployee'))
export const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: <AdminDashboard />,
    role: 'admin',
  },

  {
    path: 'admin/dashboard/employees',
    element: <Employees />,
    role: 'admin',
  },

  {
    path: 'admin/dashboard/leave-request/details/:leaveId',
    element: <LeaveRequestDetail />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/addemployee',
    element: <AddEmployee />,
    role: 'admin',
  },

  {
    path: '/admin/dashboard/edit-employee/:employeeId',
    element: <EditEmployee />,
    role: 'admin',
  },

  {
    path: 'admin/dashboard/employee-request',
    element: <SellerRequest />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/employee/details/:employeeid',
    element: <EmployeeDetail />,
    role: 'admin',
  },
]
