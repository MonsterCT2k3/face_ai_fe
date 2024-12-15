import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'
import { jwtDecode } from 'jwt-decode'

export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/auth/login', info, {
        withCredentials: true,
      })
      localStorage.setItem('accessToken', data.access_token)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_user_info = createAsyncThunk(
  'auth/get_user_info',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/employee', {
        withCredentials: true,
      })
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const returnRole = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token)
    const expireTime = new Date(decodeToken.exp * 1000)
    if (new Date() > expireTime) {
      localStorage.removeItem('accessToken')
      return ''
    } else {
      return decodeToken.role
    }
  } else {
    return ''
  }
}

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: '',
    role: returnRole(localStorage.getItem('accessToken')),
    token: localStorage.getItem('accessToken'),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state, { payload }) => {
        state.loader = true
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false
        // state.successMessage = payload.data.message
        state.token = payload.access_token
        state.role = returnRole(payload.access_token)
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false
        // state.errorMessage = payload.data.error
      })

      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false
        state.userInfo = payload.data.userInfo
      })
  },
})

export const { messageClear } = authReducer.actions
export default authReducer.reducer
