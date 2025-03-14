// import React from 'react'

// interface ILayoutMainProps {
//   children: React.ReactNode
// }

// const LayoutMain: React.FC<ILayoutMainProps> = ({ children }) => {
//   return (
//     <div className='flex flex-col h-screen overflow-hidden'>
//       <div className='flex flex-1 overflow-hidden'>
//         <main className='flex-1 overflow-auto px-2 py-2 bg-[#F4F4F4]'>{children}</main>
//       </div>
//     </div>
//   )
// }

// export default LayoutMain
// LayoutMain.tsx
import React, { useState } from 'react'
import Topbar from '@/app/layout/top-bar' // Đảm bảo import đúng đường dẫn
import Sidebar from '@/app/layout/side-bar' // Đảm bảo import đúng đường dẫn
import Footer from '@/app/layout/footer'
interface ILayoutMainProps {
  children: React.ReactNode
}

const LayoutMain: React.FC<ILayoutMainProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Topbar onToggleSidebar={handleToggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <main className='flex-1 overflow-auto px-2 py-2 bg-[#F4F4F4]'>{children}</main>
      </div>
      <Footer/>
    </div>
  )
}

export default LayoutMain
