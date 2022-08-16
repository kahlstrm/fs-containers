import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { Credentials, user as userType, User } from '../types'

type UserState = User | null
export const logOut = createAsyncThunk('user/logout', async () => {
  await loginService.logout()
})
export const logIn = createAsyncThunk(
  'user/login',
  async (credentials: Credentials) => {
    const user = await loginService.login(credentials)
    console.log(user)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    blogService.setToken(user.token)
    return userType.parse(user)
  }
)
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
    builder
      .addCase(logOut.fulfilled, (state) => {
        return null
      })
      .addCase(logIn.fulfilled, (state, action) => {
        return action.payload
      })
  },
})
export const { setUser } = userReducer.actions
export default userReducer.reducer
