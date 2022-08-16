import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { User } from '../types'

export const initializeUsers = createAsyncThunk(
  'users/INIT_USERS',
  async () => {
    return await userService.getAll()
  }
)
const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      initializeUsers.fulfilled,
      (_, action) => action.payload
    )
  },
})
export default usersSlice.reducer
