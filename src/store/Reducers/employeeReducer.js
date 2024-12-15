import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const employee_add = createAsyncThunk(
  'employee/employee_add',
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('image', image)
      const { data } = await api.post('/category-add', formData, {
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
    try {
      const { data } = await api.get(
        `/employee/getAll?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
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
  async (employeeId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/employee/${employeeId}`, {
        withCredentials: true,
      })
      console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
)

export const update_employee = createAsyncThunk(
  'employee/update_employee',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    const { id } = product.id
    try {
      const { data } = await api.post(`/employee/update/${id}`, product, {
        withCredentials: true,
      })
      console.log(data)
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
    try {
      const response = await api.delete(`/employee/delete/${id}`)
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
        state.errorMessage = payload.data.error
      })
      .addCase(employee_add.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.data.message
        state.employees = [...state.employees, payload.data.employees]
      })

      .addCase(get_employees.fulfilled, (state, { payload }) => {
        state.totalEmployee = payload.data.totalEmployee
        state.employees = payload.data.employees
      })

      .addCase(update_employee.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.data.message
        const index = state.employees.findIndex(
          (cat) => cat._id === payload.data.employee._id
        )
        if (index !== -1) {
          state.employees[index] = payload.data.employee
        }
      })

      .addCase(update_employee.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
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
