import userService from '../services/users'
import { AppDispatch } from '../store'
import { User } from '../types'

export const initializeUsers = () => {
  return async (dispatch: AppDispatch) => {
    const users = await userService.getAll()
    dispatch({ type: 'INIT_USERS', data: users })
  }
}
interface UsersReducerAction {
  type: 'INIT_USERS'
  data: User[]
}
const usersReducer = (state:User[] = [], action: UsersReducerAction) => {
  switch (action.type) {
    case 'INIT_USERS':
      console.log(action)
      return action.data
    default:
      return state
  }
}
export default usersReducer
