import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
const reducer = combineReducers({
  message: messageReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer,
})
const store = configureStore({
  reducer,
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
