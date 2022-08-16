import axios from 'axios'
import { z } from 'zod'
import { NewBlog } from '../components/Blogs'
import { baseUrl } from '../config'
import { blog, Blog } from '../types'
const url = baseUrl + '/api/blogs'

export let token = ''

const setToken = (newtoken: string) => {
  token = `bearer ${newtoken}`
}
const createBlog = async (newBlog: NewBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const request = axios.post(url, newBlog, config)
  const response = await request
  return response.data
}
export const createComment = async (comment: string, id: number) => {
  const res = await axios.post(`${url}/${id}/comments`, { comment })
  const updatedBlog = blog.parse(res.data)
  return updatedBlog
}
const getAll = async () => {
  const request = await axios.get(url)

  const blogs = z.array(blog).parse(request.data)
  return blogs
}
const update = async (updatedBlog: Blog) => {
  const userId = updatedBlog.user?.id
  const request = axios.put(`${url}/${updatedBlog.id}`, {
    ...updatedBlog,
    user: userId,
  })
  const response = await request
  return response.data
}
const remove = async (blog: Blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogId = blog.id
  const request = axios.delete(`${url}/${blogId}`, config)
  const response = await request
  return response.data
}
const blogService = { getAll, setToken, createBlog, update, remove }
export default blogService
