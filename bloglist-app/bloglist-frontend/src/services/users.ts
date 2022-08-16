import axios from 'axios'
import { baseUrl } from '../config'
const url = baseUrl + '/api/users'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}
const userService = { getAll }
export default userService
