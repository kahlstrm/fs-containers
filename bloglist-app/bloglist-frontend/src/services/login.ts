import axios from 'axios'
import { token } from './blogs'
import { baseUrl } from '../config'
import { Credentials } from '../types'
const url = baseUrl + '/api/login'
const login = async (credentials: Credentials) => {
  const response = await axios.post(url, credentials)
  console.log(response.data)
  return response.data
}
const logout = async () => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(url, config)
}
const loginService = { login, logout }
export default loginService
