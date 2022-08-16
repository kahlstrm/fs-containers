import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { NewBlog } from '../components/Blogs'
import blogService, { createComment } from '../services/blogs'
import { Blog } from '../types'

// export const initializeBlogs = () => {
//   return async (dispatch) => {
//     const blogs = await blogService.getAll()
//     dispatch({ type: 'INIT', data: blogs })
//   }
// }
//  const createBlog = (blog: Blog) => {
//   return async (dispatch) => {
//     const newBlog = await blogService.createBlog(blog)
//     dispatch({ type: 'CREATE', data: newBlog })
//   }
// }
export const initializeBlogs = createAsyncThunk('blog/Initialize', async () => {
  const blogs = await blogService.getAll()
  return blogs
})
export const createBlog = createAsyncThunk(
  'blog/create',
  async (blog: NewBlog) => {
    return await blogService.createBlog(blog)
  }
)

export const likeBlog = createAsyncThunk('blog/update', async (blog: Blog) => {
  await blogService.update(blog)
  return blog
})
interface AddComment {
  comment: string
  blogId: number
}
export const addComment = createAsyncThunk(
  'blog/comment',
  async ({ comment, blogId }: AddComment) => {
    const res = await createComment(comment, blogId)
    console.log(res)
    return res
  }
)
export const deleteBlog = createAsyncThunk(
  'blog/delete',
  async (blog: Blog) => {
    await blogService.remove(blog)
    return blog
  }
)
const blogSlice = createSlice({
  name: 'blog',
  initialState: [] as Blog[],
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(initializeBlogs.fulfilled, (_, action) =>
        action.payload.sort((a, b) => b.likes - a.likes)
      )
      .addCase(createBlog.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        return state
          .map((n) => (n.id === action.payload.id ? action.payload : n))
          .sort((a, b) => b.likes - a.likes)
      })
      .addCase(addComment.fulfilled, (state, action) => {
        return state.map((n) =>
          n.id === action.payload.id ? action.payload : n
        )
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter((n) => n.id !== action.payload.id)
      })
  },
})

export default blogSlice.reducer
