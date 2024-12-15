import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const departmentAdd = createAsyncThunk(
  'department/departmentAdd',
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('image', image)
      const { data } = await api.post('/department-add', formData, {
        withCredentials: true,
      })
      // console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
)

// End Method

export const get_department = createAsyncThunk(
  'department/get_department',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(`/get-department`, {
        withCredentials: true,
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// End Method

export const updatedepartment = createAsyncThunk(
  'department/updatedepartment',
  async ({ id, name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      if (image) {
        formData.append('image', image)
      }
      const { data } = await api.put(`/department-update/${id}`, formData, {
        withCredentials: true,
      })
      // console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
)

// End Method

export const deletedepartment = createAsyncThunk(
  'department/deletedepartment',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/department/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

// End Method

export const departmentReducer = createSlice({
  name: 'department',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    departments: [],
    totaldepartment: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_department.fulfilled, (state, { payload }) => {
      state.departments = payload.data.departments
    })
  },
})
export const { messageClear } = departmentReducer.actions
export default departmentReducer.reducer
