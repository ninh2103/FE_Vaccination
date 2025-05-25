import React, { createContext, useContext, useState } from 'react'

const LayoutContext = createContext<{
  isCollapsed: boolean
  toggleSidebar: () => void
}>({
  isCollapsed: false,
  toggleSidebar: () => {}
})

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev)
  }

  return <LayoutContext.Provider value={{ isCollapsed, toggleSidebar }}>{children}</LayoutContext.Provider>
}

export const useLayout = () => useContext(LayoutContext)
