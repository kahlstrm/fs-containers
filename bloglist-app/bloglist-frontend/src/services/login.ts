import axios from 'axios'
import { baseUrl } from '../config'
const url = baseUrl + '/api/login'
interface Credentials {
  username: string
  password: string
}
const login = async (credentials: Credentials) => {
  const response = await axios.post(url, credentials)
  console.log(response.data)
  return response.data
}
const loginService = { login }
export default loginService
