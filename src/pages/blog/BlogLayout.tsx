import React from 'react'
import { Outlet } from 'react-router-dom'
import BlogList from './BlogList'

const BlogLayout: React.FC = () => {
  return (
    <div className='flex h-screen'>
      <BlogList />
      <Outlet />
    </div>
  )
}

export default BlogLayout
