import { AiOutlineDashboard } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { FaCodePullRequest } from 'react-icons/fa6'

export const allNav = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <AiOutlineDashboard />,
    role: 'admin',
    path: '/admin/dashboard',
  },

  {
    id: 4,
    title: 'Employees',
    icon: <FaUsers />,
    role: 'admin',
    path: '/admin/dashboard/employees',
  },
  {
    id: 5,
    title: 'Add Employee',
    icon: <FaUsers />,
    role: 'admin',
    path: '/admin/dashboard/addemployee',
  },
  {
    id: 6,
    title: 'Attendances',
    icon: <FaCodePullRequest />,
    role: 'admin',
    path: '/admin/dashboard/attendances',
  },

  {
    id: 7,
    title: 'Employee Request',
    icon: <FaCodePullRequest />,
    role: 'admin',
    path: '/admin/dashboard/employee-request',
  },
]
