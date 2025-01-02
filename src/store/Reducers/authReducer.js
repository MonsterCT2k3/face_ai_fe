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
      console.log(data)
      document.cookie = `access_token=${data.access_token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }`
      localStorage.setItem("id", data.id)
      localStorage.setItem('access_token', data.access_token)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const get_user_info = createAsyncThunk(
  'auth/get_user_info',
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/employee/${id}`, {
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
      localStorage.removeItem('access_token')
      return ''
    } else {
      return 'admin'
    }
  } else {
    return ''
  }
}

const returnUserInfo = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token)
    return decodeToken
  }
}

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: {},
    
    role: returnRole(localStorage.getItem('access_token')),
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
      .addCase(admin_login.fulfilled, (state, action) => {
        if (action) {
          state.successMessage = 'Login successful 123';    // Thông báo thành công
          console.log('Login payload:', action);       // Kiểm tra payload
        } else {
          // Trường hợp payload không có dữ liệu (hiếm gặp)
          console.error('Login payload is empty or invalid');
        }
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false
      })

      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false
        state.userInfo = payload.data
      })
  },
})

export const { messageClear } = authReducer.actions
export default authReducer.reducer
