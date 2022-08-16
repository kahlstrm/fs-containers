import { createStore, combineReducers, applyMiddleware, AnyAction } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
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
const store = createStore(reducer, applyMiddleware(thunk))
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
export default store
