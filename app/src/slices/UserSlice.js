import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import errors from '../constants/errors'

const initialState = {
  email: '',
  loading: false,
  error: null,
}

const { REACT_APP_SERVER_URL } = process.env

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }) => {
    const resp = await fetch(`${REACT_APP_SERVER_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'same-origin',
      mode: 'cors',
    }).then((r) => r.json())

    if (resp.message === 'Invalid credentials') {
      throw new Error('Invalid credentials')
    }

    if ('accessToken' in resp) {
      localStorage.setItem('access-token', resp.accessToken)
    }

    return resp
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loginUser.fulfilled, (state, { meta }) => {
      state.email = meta.arg.email
      state.error = null
      state.loading = false
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.error = errors.INVALID_CREDENTIALS
      state.loading = false
    })
  },
})

export const selectUser = (state) => state.user

export default userSlice.reducer
