import { createSlice } from '@reduxjs/toolkit'
import { Message } from '../types'

// export const setNotification = (message: MessageReducer, time: number) => {
//   return async (dispatch: AppDispatch) => {
//     dispatch({ type: 'SET', message })
//     setTimeout(() => dispatch({ type: 'CLEAR' }), time * 1000)
//   }
// }
const initialState: Message = { message: '', color: '' }

const messageSlicer = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage(state) {
      state.message = ''
    },
  },
})
export const { setMessage, clearMessage } = messageSlicer.actions
export default messageSlicer.reducer
