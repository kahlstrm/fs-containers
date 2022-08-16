import blogService from '../services/blogs'
import { AppThunk } from '../store'
import { Blog } from '../types'

export const initializeBlogs = (): AppThunk => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT', data: blogs })
  }
}
export const createBlog = (blog: Blog): AppThunk => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blog)
    dispatch({ type: 'CREATE', data: newBlog })
  }
}
export const likeBlog = (blog: Blog): AppThunk => {
  return async (dispatch) => {
    await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({ type: 'LIKE', data: blog })
  }
}
export const deleteBlog = (blog: Blog): AppThunk => {
  return async (dispatch) => {
    await blogService.remove(blog)
    dispatch({ type: 'DELET THIS', data: blog })
  }
}
export const updateBlog = (blog: Blog): AppThunk => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE', data: blog })
  }
}
interface BlogListReducerAction {
  type: 'INIT'
  data: Blog[]
}
interface SingleBlogReducerAction {
  type: 'CREATE' | 'LIKE' | 'DELET THIS' | 'UPDATE'
  data: Blog
}
//this shouldn't be done https://phryneas.de/redux-typescript-no-discriminating-union
// but I did it anyway :D
type BlogReducerAction = SingleBlogReducerAction | BlogListReducerAction
const blogReducer = (state: Blog[] = [], action: BlogReducerAction) => {
  switch (action.type) {
    case 'INIT':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'CREATE':
      return state.concat(action.data)
    case 'LIKE':
      return state
        .map((n) => (n.id !== action.data.id ? n : action.data))
        .sort((a, b) => b.likes - a.likes)
    case 'DELET THIS':
      return state.filter((n) => n.id !== action.data.id)
    case 'UPDATE':
      return state.map((n) => (n.id === action.data.id ? action.data : n))
    default:
      return state
  }
}

export default blogReducer
