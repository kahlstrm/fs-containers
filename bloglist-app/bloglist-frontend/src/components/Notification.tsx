import React from 'react'
import { useAppSelector } from '../hooks'
const Notification = () => {
  const { message, color } = useAppSelector((state) => state.message)
  const notificationStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  if (message === '') {
    return null
  }
  console.log(message);
  
  return <div style={notificationStyle}>{message}</div>
}
export default Notification
