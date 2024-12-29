import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const employee_add = createAsyncThunk(
  'employee/employee_add',
  async (employee, { rejectWithValue, fulfillWithValue }) => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      return rejectWithValue('No access token available') // Handle token absence
    }
    try {
      const { data } = await api.post('/auth/register', employee, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to header
        },
        withCredentials: true,
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// End Method

export const get_employees = createAsyncThunk(
  'employee/get_employee',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      return rejectWithValue('No access token available') // Handle token absence
    }
    try {
      const { data } = await api.get(
        `/employee/getAll?page=${page}&&searchValue=${searchValue}&&perPage=${parPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to header
          },
          withCredentials: true,
        }
      )
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// End Method

export const get_employee_by_id = createAsyncThunk(
  'employee/get_employee_by_id',
  async (employee_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/employee/${employee_id}`, {
        withCredentials: true,
      })
      console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const update_employee = createAsyncThunk(
  'employee/update_employee',
  async ({id, dataObj}, { rejectWithValue, fulfillWithValue }) => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      return rejectWithValue('No access token available') // Handle token absence
    }
    try {
      const { data } = await api.put(`/employee/update/${id}`,dataObj, {
        headers: {
            Authorization: `Bearer ${token}`, // Add token to header
          },
        withCredentials: true,
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// End Method

export const delete_employee = createAsyncThunk(
  'employee/delete_employee',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      return rejectWithValue('No access token available') // Handle token absence
    }
    try {
      const response = await api.post(
        `/employee/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to header
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

// End Method

export const employeeReducer = createSlice({
  name: 'employee',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    employees: [],
    totalEmployee: 0,
    employee: '',
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(employee_add.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(employee_add.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
      })
      .addCase(employee_add.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.msg
      })

      .addCase(get_employee_by_id.fulfilled, (state, { payload }) => {
        state.loader = false
        state.employee = payload.employee
      })

      .addCase(get_employees.fulfilled, (state, { payload }) => {
        state.totalEmployee = payload.total
        state.employees = payload.employees
      })

      .addCase(update_employee.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.data.message
        const index = state.employees.findIndex(
          (e) => e.id_employee === payload.data.employee.id_employee
        )
        if (index !== -1) {
          state.employees[index] = payload.data.employee
        }
      })

      .addCase(update_employee.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload
      })

      .addCase(delete_employee.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.meta.arg
        )
        state.successMessage = action.payload.message
      })
      .addCase(delete_employee.rejected, (state, action) => {
        state.errorMessage = action.payload
      })
  },
})
export const { messageClear } = employeeReducer.actions
export default employeeReducer.reducer
