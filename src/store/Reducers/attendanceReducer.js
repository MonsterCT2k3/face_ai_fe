import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const get_attendances = createAsyncThunk(
  'attendance/get_attendances',
  async (info, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      return rejectWithValue('No access token available') // Handle token absence
    }

    const { startDate, endDate } = info
    try {
      const { data } = await api.get(
        `/attendance/admin/summary?start_date=${startDate}&&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to header
          },
          withCredentials: true,
        }
      )
      return data // Return data directly instead of fulfillWithValue
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Something went wrong' // Handle missing data in error response
      )
    }
  }
)

export const get_attendance_detail = createAsyncThunk(
  'attendance/get_attendance_detail',
  async (info, { rejectWithValue }) => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      return rejectWithValue('No access token available') // Handle token absence
    }

    const { startDate, endDate, id } = info
    try {
      const { data } = await api.get(
        `/attendance/employee/${id}?start_date=${startDate}&&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to header
          },
          withCredentials: true,
        }
      )
      return data // Return data directly instead of fulfillWithValue
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Something went wrong' // Handle missing data in error response
      )
    }
  }
)

export const attendanceReducer = createSlice({
  name: 'attendance',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    attendances: [],
    attendance_detail: [],
    summary_late: 0,
    summary_absent: 0,
    summary_worked: 0,
    summary_late_detail: 0,
    summary_absent_detail: 0,
    summary_worked_detail: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_attendances.pending, (state, _) => {
        state.loader = true
      })
      .addCase(get_attendances.fulfilled, (state, { payload }) => {
        state.loader = false
        state.attendances = payload.attendance_data
        state.summary_late = payload.summary.late
        state.summary_absent = payload.summary.absent
        state.summary_worked = payload.summary.worked
      })
      .addCase(get_attendances.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
      })

      .addCase(get_attendance_detail.pending, (state, _) => {
        state.loader = true
      })
      .addCase(get_attendance_detail.fulfilled, (state, { payload }) => {
        state.loader = false
        state.attendance_detail = payload.attendance_data
        state.summary_late_detail = payload.summary.late
        state.summary_absent_detail = payload.summary.absent
        state.summary_worked_detail = payload.summary.worked
      })
      .addCase(get_attendance_detail.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
      })
  },
})

export const { messageClear } = attendanceReducer.actions
export default attendanceReducer.reducer
