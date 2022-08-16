import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { User } from '../types'

type UserState = User | null
export const logOut = createAsyncThunk('user/logout', async () => {
  await loginService.logout()
})

const initialState = null as UserState
const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action: PayloadAction<User>) {
      return action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(logOut.fulfilled, (state) => {
      return null
    })
  },
})
export const { setUser } = userReducer.actions
export default userReducer.reducer
