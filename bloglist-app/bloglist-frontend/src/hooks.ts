import { useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { clearMessage, setMessage } from './reducers/messageReducer'
import { AppDispatch, RootState } from './store'
import { Message } from './types'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useNotification = () => {
  const dispatch = useAppDispatch()
  const [timeoutId, setTimeoutId] = useState<number>()
  const setNotification = (message: Message, seconds: number) => {
    dispatch(setMessage(message))

    clearTimeout(timeoutId)
    setTimeoutId(
      window.setTimeout(() => dispatch(clearMessage()), seconds * 1000)
    )
  }
  return setNotification
}
