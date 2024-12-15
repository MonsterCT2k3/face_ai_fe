import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const get_leaverequests = createAsyncThunk(
  'leaverequest/get_leaverequest',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/leave_request/getAll?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      )
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// End Method

export const get_leaverequest_by_id = createAsyncThunk(
  'leaverequest/get_leaverequest_by_id',
  async (leaverequestId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/leaverequest/${leaverequestId}`, {
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

export const update_leaverequest = createAsyncThunk(
  'leaverequest/update_leaverequest',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    const { id } = product.id
    try {
      const { data } = await api.post(`/leaverequest/update/${id}`, product, {
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

export const leaverequestReducer = createSlice({
  name: 'leaverequest',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    leaverequests: [],
    totalleaverequest: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(get_leaverequests.fulfilled, (state, { payload }) => {
        state.totalleaverequest = payload.data.totalleaverequest
        state.leaverequests = payload.data.leaverequests
      })

      .addCase(update_leaverequest.fulfilled, (state, { payload }) => {
        state.loader = false
        state.successMessage = payload.data.message
        const index = state.leaverequests.findIndex(
          (cat) => cat._id === payload.data.leaverequest._id
        )
        if (index !== -1) {
          state.leaverequests[index] = payload.data.leaverequest
        }
      })

      .addCase(update_leaverequest.rejected, (state, { payload }) => {
        state.loader = false
        state.errorMessage = payload.error
      })
  },
})
export const { messageClear } = leaverequestReducer.actions
export default leaverequestReducer.reducer
