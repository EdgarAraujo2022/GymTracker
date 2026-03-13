
import { Header } from '@/components/ui/header/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </>
  )
}
