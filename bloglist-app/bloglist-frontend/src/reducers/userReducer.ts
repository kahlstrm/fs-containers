import { AppDispatch } from '../store'
import { User } from '../types'

export const setUser = (user: User) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: 'SETUSER', data: user })
  }
}

interface UserReducerAction {
  type: 'SETUSER'
  data: User
}
const userReducer = (state: User | null = null, action: UserReducerAction) => {
  switch (action.type) {
    case 'SETUSER':
      return action.data
    default:
      return state
  }
}

export default userReducer
