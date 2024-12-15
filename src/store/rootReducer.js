import { authReducer } from './Reducers/authReducer'
import { employeeReducer } from './Reducers/employeeReducer'
import { leaverequestReducer } from './Reducers/leaveRequestReducer'
const { departmentReducer } = require('./Reducers/departmentReducer')

const rootReducer = {
  auth: authReducer.reducer,
  employee: employeeReducer.reducer,
  department: departmentReducer.reducer,
  leaverequest: leaverequestReducer.reducer,
}

export default rootReducer
