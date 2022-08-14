import axios from 'axios'
import { baseUrl } from '../config'
const url = baseUrl + '/api/blogs'

let token = ''

const setToken = (newtoken) => {
  token = `bearer ${newtoken}`
}
const createBlog = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const request = axios.post(url, newBlog, config)
  return request.then((response) => response.data)
}
export const createComment = (comment, id, blogs, setComment) => {
  console.log(comment)
  const request = axios.post(`${url}/${id}/comments`, { comment })
  return request.then((response) => {
    if (response.status === 200) {
      setComment(blogs.concat(comment))
    }
    return response.data
  })
}
const getAll = () => {
  const request = axios.get(url)
  return request.then((response) => response.data)
}
const update = (updatedBlog) => {
  const userId = updatedBlog.user.id
  const request = axios.put(`${url}/${updatedBlog.id}`, {
    ...updatedBlog,
    user: userId,
  })
  return request.then((response) => response.data)
}
const remove = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogId = blog.id
  const request = axios.delete(`${url}/${blogId}`, config)
  return request.then((response) => response.data)
}
const blogService = { getAll, setToken, createBlog, update, remove }
export default blogService
