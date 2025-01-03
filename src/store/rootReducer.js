import { attendanceReducer } from './Reducers/attendanceReducer'
import { authReducer } from './Reducers/authReducer'
import { chartReducer } from './Reducers/chartReducer'
import { employeeReducer } from './Reducers/employeeReducer'
import { homeReducer } from './Reducers/homeReducer'
import { leaverequestReducer } from './Reducers/leaveRequestReducer'
const { departmentReducer } = require('./Reducers/departmentReducer')

const rootReducer = {
  auth: authReducer.reducer,
  employee: employeeReducer.reducer,
  department: departmentReducer.reducer,
  leaverequest: leaverequestReducer.reducer,
  attendance: attendanceReducer.reducer,
  chart: chartReducer.reducer,
  home: homeReducer.reducer,
}

export default rootReducer
