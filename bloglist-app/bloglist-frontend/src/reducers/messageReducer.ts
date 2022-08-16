import { AppDispatch } from '../store'

interface MessageReducer {
  message: string
  color?: string
}
interface MessageReducerAction {
  type: 'SET' | 'CLEAR'
  message?: MessageReducer
}
const messageReducer = (
  state: MessageReducer = { message: '', color: '' },
  action: MessageReducerAction
) => {
  switch (action.type) {
    case 'SET':
      return action.message ?? state
    case 'CLEAR':
      return { message: '', color: '' }
    default:
      return state
  }
}
export const setNotification = (message: MessageReducer, time: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: 'SET', message })
    setTimeout(() => dispatch({ type: 'CLEAR' }), time * 1000)
  }
}

export default messageReducer
